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


def login_franchise(login_credentionals):
    franchise = db.franchises.find({"franchise_id":login_credentionals['franchise_id'],'password':login_credentionals['password']})
    try:
        franchise = parse_json(franchise[0])
        session = dict(franchise['_id'])['$oid']
        db.sessions.insert_one({'session_id':session,'user_previliges':'franchise',"user_id": franchise["franchise_id"]})
        return franchise,session
    except IndexError:
        return False,False



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


def parse_json(data):
    return json.loads(json_util.dumps(data))