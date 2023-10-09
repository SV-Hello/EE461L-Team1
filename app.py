import os
import pymongo

from flask import Flask, jsonify
from flask_cors import cross_origin, CORS

app = Flask(__name__, static_folder='./build', static_url_path='/')
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

def connectDB():
    client = pymongo.MongoClient('mongodb+srv://shriyabangaru:NAGXkC053TXkWTZk@cluster0.enyjvhm.mongodb.net/?retryWrites=true&w=majority')
    userDB = client.get_database('Users')
    users = userDB.get_collection('Users')
    document = {
        "name": "John"
    }
    users.insert_one(document)

