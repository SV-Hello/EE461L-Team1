import os
import pymongo

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

@app.route('/user/<username>')
def checkUser(username):
    for document in users.find():
        name = document["username"]
        passwrd = document["pass"]
        if username == name:
            print("login success!")
            return 'login success'
        else:
            #should send a message to the frontend that user doesn't exist & to create new account
            print("user doesn't exist")
            return 'user does not exist'

@app.route('/user/<username>')
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

@app.route('/createProject/<string:id>')
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

@app.route('/checkOut/<string:projectID>')
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
@app.route('/checkIn/<string:projectID>')
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

