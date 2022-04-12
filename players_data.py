from flask import jsonify
import flask_pymongo
import json
from bson import json_util

def db_connection():
    try:
        mongo = flask_pymongo.MongoClient("mongodb://localhost:27017/")
        db = mongo.my_team
        mongo.server_info()
    except:
        print("Error cannot connect to db")

    data = list(db.players_info.find({}))
    return jsonify(parse_json(data))


def parse_json(data):
    return json.loads(json_util.dumps(data))