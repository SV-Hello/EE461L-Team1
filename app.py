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
    password = request.json["password"]
    user = users.find({"username": user}).next()
    if user is not None:
        if user["password"] == password:
            return {"result": "success"}
        else:
            return {"result": "failed"}
    return {"result": "not exist"}

@app.route('/adduser', methods=['POST'])
def addUser():
    username = request.json["username"]
    password = request.json["password"]
    for document in users.find():
        name = document["username"]
        if name == username:
            return {"result": "user already exists"}
    document = {
        "username": username,
        "password": password,
        "requests": []
    }
    users.insert_one(document)
    return {"result": "user successfully added"}

@app.route('/getProject/<string:id>')
def checkProject(id):
    for document in projects.find():
        projID = document["projectID"]
        if projID == id:
            #should send a message to frontend that project has been found
            print("project found!")
            return id
        else:
            #should send a message to frontend that project with id doesn't exist
            print("project with this id doesn't exist")
            return 'project with this id does not exist'

@app.route('/createproj')
def createproj():
   id  = request.args.get('id', None)
   description  = request.args.get('description', None)
   name  = request.args.get('name', None)
   hwSet1Cap  = request.args.get('hwSet1Cap', None)
   hwSet2Cap  = request.args.get('hwSet2Cap', None)

@app.route('/createproj')
def createProject(id, description, name, hwSet1Cap, hwSet2Cap):
    for document in projects.find():
        projID = document["projectID"]
        if projID == id:
            #should send message to frontend that project with this id already exists
            print("project already with this id already exists")
            return 0
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

@app.route('/checkout')
def checkout():
   projectID  = request.args.get('projectID', None)
   set  = request.args.get('set', None)
   qnt = request.args.get('qnt', None)
   username  = request.args.get('username', None)

@app.route('/checkout')
def checkOut(projectID, set, qnt, username):
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
                    for doc in users.find():
                        user = doc["username"]
                        if user == username:
                            filter = {"username": username}
                            update = {
                                "$push": {"requests": [[projectID, "checkout", set, leftover]]}
                            }
                            users.update_one(filter, update)
                    #should send message to frontend that quantity requested is more than that available
                    print("quantity requested is greater than that available, checked out all remaining units")
                    return 0
                else:
                    currAvail = document["hwSet1Availability"]
                    filter = {"projectID": projectID}
                    update = {
                        "$set": {"hwSet1Availability": currAvail - qnt}
                    }
                    projects.update_one(filter, update)
                    for doc in users.find():
                        user = doc["username"]
                        if user == username:
                            filter = {"username": username}
                            update = {
                                "$push": {"requests": [projectID, "checkout", set, qnt]}
                            }
                            users.update_one(filter, update)
                        print("successful checkout")
                        return 1
            if set == 2:
                if document["hwSet2Availability"] < qnt:
                    leftover = document["hwSet2Availability"]
                    filter = {"projectID": projectID}
                    update = {
                        "$set": {"hwSet2Availability": 0}
                    }
                    projects.update_one(filter, update)
                    for doc in users.find():
                        user = doc["username"]
                        if user == username:
                            filter = {"username": username}
                            update = {
                                "$push": {"requests": [[projectID, "checkout", set, leftover]]}
                            }
                            users.update_one(filter, update)
                    #should send message to frontend that quantity requested is more than that available
                    print("quantity requested is greater than that available, checked out all remaining units")
                    return 0
                else:
                    currAvail = document["hwSet2Availability"]
                    filter = {"projectID": projectID}
                    update = {
                        "$set": {"hwSet2Availability": currAvail - qnt}
                    }
                    projects.update_one(filter, update)
                    for doc in users.find():
                        user = doc["username"]
                        if user == username:
                            filter = {"username": username}
                            update = {
                                "$push": {"requests": [projectID, "checkout", set, qnt]}
                            }
                            users.update_one(filter, update)
                        print("successful checkout")
                        return 1

@app.route('/checkin')
def checkin():
   projectID  = request.args.get('projectID', None)
   set  = request.args.get('set', None)
   qnt = request.args.get('qnt', None)
   username  = request.args.get('username', None)

@app.route('/checkin')
def checkIn(projectID, set, qnt, username):
    for doc in users.find():
        name = doc["username"]
        if name == username:
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
                        filter = {"username": username}
                        update = {
                            "$push": {"requests": [projectID, "checkin", set, qnt]}
                        }
                        users.update_one(filter, update)
                        print("successful checkin")
                        return 1
                    else:
                        currAvail = document["hwSet2Availability"]
                        filter = {"projectID": projectID}
                        currAvail += qnt
                        update = {
                            "$set": {"hwSet2Availability": currAvail}
                        }
                        projects.update_one(filter, update)
                        filter = {"username": username}
                        update = {
                            "$push": {"requests": [projectID, "checkin", set, qnt]}
                        }
                        users.update_one(filter, update)
                        print("successful checkin")
                        return 1

if __name__ == '__main__':
    app.run(debug = True)
#addUser("johndoe", "1234")
#checkUser("shriya", "1234")
#createProject("A1", "birdhouse", "birdhouse", 100, 100)
#checkIn("A1", 1, 55, "shriya")

