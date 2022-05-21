from flask import jsonify
import flask_pymongo
import json
from bson import json_util
import extract_player_stats


try:
    mongo = flask_pymongo.MongoClient("mongodb://localhost:27017/")
    db = mongo.my_team
    mongo.server_info()
except:
    print("Error cannot connect to db")


def all_players():
    data = db.players_info.find({})
    return parse_json(data)


def player_profile(id):
    data = db.players_info.find({"cricmetric":id})
    try:
        return parse_json(data[0])
    except IndexError:
        return jsonify({"message": "NOT FOUND"})


def player_details(id):
    data = db.players_stats.find({"playerid":id})
    try:
        return parse_json(data[0])
    except IndexError:
        player = extract_player_stats.player_details(id)
        db.players_stats.insert_one(player)
        return parse_json(player)


def parse_json(data):
    return json.loads(json_util.dumps(data))