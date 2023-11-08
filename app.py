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
            return {"result": "user already exists"}
    encryptedPass = encrypt(password, 3, 1)
    document = {
        "username": username,
        "password": encryptedPass,
        "requests": []
    }
    users.insert_one(document)
    return {"result": "user successfully added"}

@app.route('/getProject')
def checkProject():
    id = request.json["id"]
    for document in projects.find():
        projID = document["projectID"]
        if projID == id:
            return{"result": "project found"}
        else:
            return{"result": "project with this id doesn't exist"}

@app.route('/createproj')
def createProject():
    id = request.json["id"]
    description = request.json["description"]
    name = request.json["name"]
    hwSet1Cap = request.json["hwSet1Cap"]
    hwSet2Cap = request.json["hwSet2Cap"]
    for document in projects.find():
        projID = document["projectID"]
        if projID == id:
            return{"result": "project with this id already exists"}
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
    return{"result": "project added"}

@app.route('/checkOut')
def checkOut():
    projectID = request.json["projectID"]
    set = request.json["set"]
    qnt = request.json["qnt"]
    for document in projects.find():
        projID = document["projectID"]
        if projID == projectID:
            if set == 1:
                if document["hwSet1Availability"] < qnt:
                    leftover = document["hwSet1Availability"]
                    filter = {"projectID": projectID}
                    update = {
                        "$set": {"hwSet1Availability": 0}
                    }
                    projects.update_one(filter, update)
                    '''for doc in users.find():
                        user = doc["username"]
                        if user == username:
                            filter = {"username": username}
                            update = {
                                "$push": {"requests": [[projectID, "checkout", set, leftover]]}
                            }
                            users.update_one(filter, update)'''
                    return{"result":"quantity requested is greater than that available, checked out all remaining units" }
                else:
                    currAvail = document["hwSet1Availability"]
                    filter = {"projectID": projectID}
                    update = {
                        "$set": {"hwSet1Availability": currAvail - qnt}
                    }
                    projects.update_one(filter, update)
                    '''for doc in users.find():
                        user = doc["username"]
                        if user == username:
                            filter = {"username": username}
                            update = {
                                "$push": {"requests": [projectID, "checkout", set, qnt]}
                            }
                            users.update_one(filter, update)'''
                    return{"result": "successful checkout"}
            if set == 2:
                if document["hwSet2Availability"] < qnt:
                    leftover = document["hwSet2Availability"]
                    filter = {"projectID": projectID}
                    update = {
                        "$set": {"hwSet2Availability": 0}
                    }
                    projects.update_one(filter, update)
                    '''for doc in users.find():
                        user = doc["username"]
                        if user == username:
                            filter = {"username": username}
                            update = {
                                "$push": {"requests": [[projectID, "checkout", set, leftover]]}
                            }
                            users.update_one(filter, update)'''
                    return{"result": "quantity requested is greater than that available, checked out all remaining units"}
                else:
                    currAvail = document["hwSet2Availability"]
                    filter = {"projectID": projectID}
                    update = {
                        "$set": {"hwSet2Availability": currAvail - qnt}
                    }
                    projects.update_one(filter, update)
                    '''for doc in users.find():
                        user = doc["username"]
                        if user == username:
                            filter = {"username": username}
                            update = {
                                "$push": {"requests": [projectID, "checkout", set, qnt]}
                            }
                            users.update_one(filter, update)'''
                    return{"result": "successful checkout"}

@app.route('/checkIn')
def checkIn():
    projectID = request.json["projectID"]
    set = request.json["set"]
    qnt = request.json["qnt"]
    '''for doc in users.find():
        name = doc["username"]
        if name == username:'''
    for document in projects.find():
                projID = document["projectID"]
                if projID == projectID:
                    if set == 1:
                        currAvail = document["hwSet1Availability"]
                        filter = {"projectID": projectID}
                        currAvail += qnt
                        update = {
                            "$set": {"hwSet1Availability": currAvail}
                        }
                        projects.update_one(filter, update)
                        '''filter = {"username": username}
                        update = {
                            "$push": {"requests": [projectID, "checkin", set, qnt]}
                        }
                        users.update_one(filter, update)'''
                        return{"result": "successful checkin"}
                    else:
                        currAvail = document["hwSet2Availability"]
                        filter = {"projectID": projectID}
                        currAvail += qnt
                        update = {
                            "$set": {"hwSet2Availability": currAvail}
                        }
                        projects.update_one(filter, update)
                        '''filter = {"username": username}
                        update = {
                            "$push": {"requests": [projectID, "checkin", set, qnt]}
                        }
                        users.update_one(filter, update)'''
                        return{"result": "successful checkin"}

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

