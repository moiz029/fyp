import flask_pymongo
import json
from bson import json_util
import uuid

#Connection with Database
try:
    #mongo = flask_pymongo.MongoClient("mongodb://localhost:27017/")
    #db = mongo.my_team
    

    mongo = flask_pymongo.MongoClient("mongodb://my_team:X3Njg1cRrj9QT5Ks@ac-ga3haug-shard-00-00.59spobs.mongodb.net:27017,ac-ga3haug-shard-00-01.59spobs.mongodb.net:27017,ac-ga3haug-shard-00-02.59spobs.mongodb.net:27017/?ssl=true&replicaSet=atlas-ugvkvk-shard-0&authSource=admin&retryWrites=true&w=majority")
    db = mongo.my_team
    mongo.server_info()
except:
    print("Error cannot connect to db")


def signup_new_franchise(franchise_details):
    db.franchises.insert_one(franchise_details)
    return True


def login_franchise(login_credentionals):
    franchise = db.franchises.find({"franchise_id":login_credentionals['franchise_id'],'password':login_credentionals['password']})
    session_frechise = db.sessions.find({'user_id':login_credentionals['franchise_id']})
    try:
        franchise = parse_json(franchise[0])
        session = dict(franchise['_id'])['$oid']+str(len(parse_json(session_frechise)))+str(uuid.uuid4())
        db.sessions.insert_one({'session_id':session,'user_previliges':'franchise',"user_id": franchise["franchise_id"]})
        return franchise,session
    except IndexError:
        return False,False



def logout(session_id):
    db.sessions.delete_many({'session_id':session_id})
    return True



def verify_franchise_session(session_id):
    sessions = db.sessions.find({'session_id':session_id})
    try:
        session = parse_json(sessions[0])
        if session['user_previliges'] == 'franchise':
            return True
        return False

    except IndexError:
        return False


def verify_admin_session(session_id):
    sessions = db.sessions.find({'session_id':session_id})
    try:
        session = parse_json(sessions[0])
        if session['user_previliges'] == 'admin':
            return True
        return False

    except IndexError:
        return False


def get_venues():
    return parse_json(db.venues.find({}))



def parse_json(data):
    return json.loads(json_util.dumps(data))


def add_new_venue(data):
    venues = db.venues.find({"name":data['name']})
    try:
        return parse_json(venues[0])
    except IndexError:
        db.venues.insert_one(data)
        return {"message":"Player added successfully"}