import os
import pymongo
import sys

from flask import Flask, jsonify, url_for, redirect, request
#from flask_cors import cross_origin, CORS

app = Flask(__name__)
#app = Flask(__name__, static_folder='./build', static_url_path='/')
#cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'



client = pymongo.MongoClient('mongodb+srv://shriyabangaru:NAGXkC053TXkWTZk@cluster0.enyjvhm.mongodb.net/?retryWrites=true&w=majority')
userDB = client.get_database('Users')
users = userDB.get_collection('Users')
projectDB = client.get_database('Projects')
projects = projectDB.get_collection('Project')

@app.route('/user/', methods=['POST'])
def checkUser():
    user = request.json["username"]
    try:
        user = users.find({"username": user}).next()
    except StopIteration:
        return {"result": "not exist"}
    
    password = request.json["password"]
    decryptedPass = decrypt(user["password"], 3, 1)
    if decryptedPass == password:
        return {"result": "success"}
    else:
        return {"result": "failed"}


@app.route('/adduser', methods=['POST'])
def addUser():
    username = request.json["username"]
    password = request.json["password"]
    for document in users.find():
        name = document["username"]
        if name == username:
            return {"result": "failed", "message": "user already exists"}
    encryptedPass = encrypt(password, 3, 1)
    document = {
        "username": username,
        "password": encryptedPass,
        "requests": []
    }
    users.insert_one(document)
    return {"result": "success"}

@app.route('/getProject', methods=["POST"])
def checkProject():
    id = request.json["id"]
    try:
        proj = projects.find({"projectID": id}).next()
    except StopIteration:
        {"result": "not exist"}
    return{"result": "success"}

@app.route('/getproj/<projectID>', methods=['POST'])
def getProject(projectID):
    proj = projects.find({"projectID": projectID}).next()
    params = request.json["params"]
    return {key: proj[key] for key in params}

@app.route('/createproj', methods=["POST"])
def createProject():
    id = request.json["id"]
    description = request.json["description"]
    name = request.json["name"]
    hwSet1Cap = request.json["hwSet1Cap"]
    hwSet2Cap = request.json["hwSet2Cap"]
    for document in projects.find():
        projID = document["projectID"]
        if projID == id:
            return{"result": "failed", "message": "project with this id already exists"}
    document = {
        "projectID": id,
        "name": name,
        "description": description,
        "hwSet1Capacity": hwSet1Cap,
        "hwSet1Availability": hwSet1Cap,
        "hwSet2Capacity": hwSet2Cap,
        "hwSet2Availability": hwSet2Cap
    }
    projects.insert_one(document)
    return{"result": "success"}

@app.route('/checkOut', methods=["POST"])
def checkOut():
    projectID = request.json["projectID"]
    num = request.json["set"]
    qnt = request.json["qnt"]
    proj = projects.find({"projectID": projectID}).next()
    currAvail = proj[f"hwSet{num}Availability"]
    currAvail -= qnt
    if currAvail < 0:
        return {"result": "failed", "message": "requested checkout amount greater than what is available"}
    filter = {"projectID": projectID}
    update = {"$set": {f"hwSet{num}Availability": currAvail}}
    projects.update_one(filter, update)
    return {'result': 'success'}

@app.route('/checkIn', methods=['POST'])
def checkIn():
    projectID = request.json["projectID"]
    num = request.json["set"]
    qnt = request.json["qnt"]
    proj = projects.find({"projectID": projectID}).next()
    currAvail = proj[f"hwSet{num}Availability"]
    currAvail += qnt
    if currAvail > proj[f"hwSet{num}Capacity"]:
        return {'result': 'failed', 'message': 'capacity exceeded'}
    filter = {"projectID": projectID}
    update = {"$set": {f"hwSet{num}Availability": currAvail}}
    projects.update_one(filter, update)
    return {'result': 'success'}

def encrypt(inputText, n, d):
    if n < 1:
        print("invalid input")
        return None
    if d != 1 and d != -1:
        print("invalid input")
        return None
    rev = inputText[::-1]
    shifted = ""
    #if inputText.count(' ') > 0 and inputText.count('!') > 0 :
    if d == 1:
        for i in range(len(rev)):
            if inputText[i] == " " or inputText[i] == "!":
                shifted += inputText[i]
                #print("invalid input")
                #return None
            else:
                val = ord(rev[i])
                val += n
                c = chr(val)
                shifted += c 
    elif d == -1: 
        for i in range(len(rev)):
            if inputText[i] == " " or inputText[i] == "!":
                shifted += inputText[i]
                #print("invalid input")
                #return None
            else:
                val = ord(rev[i])
                val -= n
                c = chr(val)
                shifted += c
    return shifted

def decrypt(inputText, n, d):
    if n < 1:
        print("invalid input")
        return None
    if d != 1 and d != -1:
        print("invalid input")
        return None
    rev = inputText[::-1]
    unshifted = ""
    if d == 1:
        for i in range(len(rev)):
            if inputText[i] == " " or inputText[i] == "!":
                unshifted += inputText[i]
            else:
                val = ord(rev[i])
                val -= n
                c = chr(val)
                unshifted += c 
    elif d == -1: 
        for i in range(len(rev)):
            if inputText[i] == " " or inputText[i] == "!":
                unshifted += inputText[i]
            else:
                val = ord(rev[i])
                val -= n
                c = chr(val)
                unshifted += c
    return unshifted

if __name__ == '__main__':
    app.run(debug = True)
#addUser("johndoe", "1234")
#checkUser("shriya", "1234")
#createProject("A1", "birdhouse", "birdhouse", 100, 100)
#checkIn("A1", 1, 55, "shriya")

