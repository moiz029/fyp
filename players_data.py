from flask import jsonify
import flask_pymongo
import json
from bson import json_util


try:
    mongo = flask_pymongo.MongoClient("mongodb://localhost:27017/")
    db = mongo.my_team
    mongo.server_info()
except:
    print("Error cannot connect to db")


def all_players():
    data = db.players_info.find({})
    return jsonify(parse_json(data))


def player_details(id):
    data = db.players_info.find({"cricinfo_id":id})
    return jsonify(parse_json(data[0]))


def parse_json(data):
    return json.loads(json_util.dumps(data))