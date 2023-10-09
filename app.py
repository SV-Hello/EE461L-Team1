import os
import pymongo

from flask import Flask, jsonify
from flask_cors import cross_origin, CORS

app = Flask(__name__, static_folder='./build', static_url_path='/')
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

users = []
projects = []

def connectDB():
    client = pymongo.MongoClient('mongodb+srv://shriyabangaru:NAGXkC053TXkWTZk@cluster0.enyjvhm.mongodb.net/?retryWrites=true&w=majority')
    userDB = client.get_database('Users')
    users = userDB.get_collection('Users')
    projectDB = client.get_database('Projects')
    projects = projectDB.get_collection('Project')
    #document = {
    #    "name": "John"
    #}
    #users.insert_one(document)

def checkUser(username, password):
    for document in users.find():
        name = document.getString("username")
        passwrd = document.getString("pass")
        if username == name and password == passwrd:
            return 1
        elif username == name:
            #should send a message to the frontend to indicate wrong password was entered but user exists
            print("Wrong password")
            return 0
        else:
            #should send a message to the frontend that user doesn't exist & to create new account
            return 0
        
def addUser(username, password):
    document = {
        "username": username,
        "pass": password,
        "projects": []
    }
    users.insert_one(document)

