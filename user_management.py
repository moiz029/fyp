from flask import jsonify
import flask_pymongo
import json
from bson import json_util

#Connection with Database
try:
    mongo = flask_pymongo.MongoClient("mongodb://localhost:27017/")
    db = mongo.my_team
    mongo.server_info()
except:
    print("Error cannot connect to db")


def signup_new_franchise(franchise_details):
    db.franchises.insert_one(franchise_details)
    return True