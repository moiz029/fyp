import flask_pymongo
import json
from bson import json_util
import extract_player_stats
import pre_processing

#Connection with Database
try:
    mongo = flask_pymongo.MongoClient("mongodb://localhost:27017/")
    db = mongo.my_team
    

    #mongo = flask_pymongo.MongoClient("mongodb://my_team:X3Njg1cRrj9QT5Ks@ac-ga3haug-shard-00-00.59spobs.mongodb.net:27017,ac-ga3haug-shard-00-01.59spobs.mongodb.net:27017,ac-ga3haug-shard-00-02.59spobs.mongodb.net:27017/?ssl=true&replicaSet=atlas-ugvkvk-shard-0&authSource=admin&retryWrites=true&w=majority")
    #db = mongo.my_team
    mongo.server_info()
except:
    print("Error cannot connect to db")


#Getting all players basic infor from DataBase
def all_players():
    data = db.players_info.find({})
    return parse_json(data)


#Getting players complete info from database if not available then extract it from web
def player_details(id):
    data = db.players_stats.find({"playerid":id})
    try:
        if is_data_upto_date(id,data[0].get('stats')):
            return parse_json(data[0])
        else:
            updated_record = extract_player_stats.update_records(data[0].get('stats'),id)
            positional_stats = extract_player_stats.combining_position_stats(extract_player_stats.league_postion_stats(id), extract_player_stats.international_postion_stats(id),data[0].get('role'))
            db.players_stats.find_one_and_update({'playerid': id},{'$set':{'stats': updated_record, 'position_stats': positional_stats}})
            data = db.players_stats.find({"playerid":id})
            return parse_json(data[0])
    except IndexError:
        player = extract_player_stats.player_details(id)
        db.players_stats.insert_one(player)
        return parse_json(player)



def player_profile(player_id):
    data = db.players_info.find({'cricmetric':player_id})
    return parse_json(data[0])


def get_player_stats(id):
    data = db.players_stats.find({"playerid":id})
    return parse_json(data[0])


def parse_json(data):
    return json.loads(json_util.dumps(data))


def is_data_upto_date(id,stored_stats):
    number_of_matches = extract_player_stats.number_of_matches(id)
    if number_of_matches and len(number_of_matches) == 2:
        if len(stored_stats) == 2:
            if len(number_of_matches[0]) == len(stored_stats[0]) and len(number_of_matches[1]) == len(stored_stats[1]):
                return True
            else:
                return False
        else:
            return False
    elif number_of_matches and len(number_of_matches) == 1:
        if len(number_of_matches[0]) == len(stored_stats[0]):
            return True
        else:
            return False

    return False


def add_new_player_info(data):
    player = db.players_info.find({"cricmetric":data['cricmetric']})
    try:
        return parse_json(player[0])
    except IndexError:
        db.players_info.insert_one(data)
        return {"message":"Player added successfully"}


def fetch_drafting_list(draft_id):
    draft = db.drafts.find({"draft_id":draft_id})
    try:
        return parse_json(draft[0])
    except IndexError:
        return False


def draft_details(draft_id):
    players_list = fetch_drafting_list(draft_id)
    if players_list:
        players = []
        for player in players_list['players']:
            players.append(player['players_id'])
        
        players_details = []
        for player_id in players:
            details = db.players_stats.find({"playerid":player_id})
            players_details.append(details[0])
        
        summerize_data = pre_processing.summerize_players(players_details)
        summerize_data = pre_processing.add_draft_details_to_players(summerize_data,players_list)
        return summerize_data
        
    else:
        return False