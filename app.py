import os
import pymongo

from flask import Flask, jsonify
from flask_cors import cross_origin, CORS

app = Flask(__name__, static_folder='./build', static_url_path='/')
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'



client = pymongo.MongoClient('mongodb+srv://shriyabangaru:NAGXkC053TXkWTZk@cluster0.enyjvhm.mongodb.net/?retryWrites=true&w=majority')
userDB = client.get_database('Users')
users = userDB.get_collection('Users')
projectDB = client.get_database('Projects')
projects = projectDB.get_collection('Project')

def checkUser(username, password):
    for document in users.find():
        name = document["username"]
        passwrd = document["pass"]
        if username == name and password == passwrd:
            print("login success!")
            return 1
        elif username == name:
            #should send a message to the frontend to indicate wrong password was entered but user exists
            print("Wrong password")
            return 0
        else:
            #should send a message to the frontend that user doesn't exist & to create new account
            print("user doesn't exist")
            return 0
        
def addUser(username, password):
    for document in users.find():
        name = document["username"]
        if name == username:
            #should send message to the frontend that user already exists
            print("user already exists")
            return 0
    document = {
        "username": username,
        "pass": password,
        "requests": []
    }
    users.insert_one(document)

def checkProject(id):
    for document in projects.find():
        projID = document["projectID"]
        if projID == id:
            #should send a message to frontend that project has been found
            print("project found!")
            return 1
        else:
            #should send a message to frontend that project with id doesn't exist
            print("project with this id doesn't exist")
            return 0

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

def checkOut(projectID, set, qnt, username):
    for document in projects.find():
        projID = document["projectID"]
        if projID == projectID:
            if set == 1:
                if document["hwSet1Availability"] > qnt:
                    document["hwSet1Availabilty"] = 0
                    for doc in users.find():
                        user = document["username"]
                        if user == username:
                            document["requests"] = [projectID, set, qnt]
                    #should send message to frontend that quantity requested is more than that available
                    print("quantity requested is greater than that available, checked out all remaining units")
                    return 0
                else:
                    document["hwSet1Availability"] -= qnt
                    for doc in users.find():
                        user = doc["username"]
                        if user == username:
                            doc["requests"] = [projectID, set, qnt]
                        print("successful checkout")
                        return 1
            if set == 2:
                if document["hwSet2Availability"] > qnt:
                    document["hwSet2Availabilty"] = 0
                    for doc in users.find():
                        user = document["username"]
                        if user == username:
                            document["requests"] = [projectID, "checkout", set, qnt]
                    #should send message to frontend that quantity requested is more than that available
                    print("quantity requested is greater than that available, checked out all remaining units")
                    return 0
                else:
                    document["hwSet2Availability"] -= qnt
                    for doc in users.find():
                        user = doc["username"]
                        if user == username:
                            doc["requests"] = [projectID, "checkout", set, qnt]
                        print("successful checkout")
                        return 1
                    
def checkIn(projectID, set, qnt, username):
    for doc in users.find():
        name = doc["username"]
        if name == username:
            for document in projects.find():
                projID = document["projectID"]
                if projID == projectID:
                    if set == 1:
                        document["hwSet1Availability"] += qnt
                        doc["requests"] = [projectID, "checkin", set, qnt]
                        print("successful checkin")
                        return 1
                    else:
                        document["hwSet2Availability"] += qnt
                        doc["requests"] = [projectID, "checkin", set, qnt]
                        print("successful checkin")
                        return 1


addUser("johndoe", "1234")
checkUser("shriya", "1234")

