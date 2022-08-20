from glob import escape
from flask import Flask,jsonify
from flask import request
import players_data
import head_to_head
import user_management
from flask_cors import CORS


app = Flask(__name__)
CORS(app)


'''
BELOW ROUTES ARE JUST FOR FANS
'''
@app.route("/allplayers")
def allplayers():
    return jsonify(players_data.all_players())


@app.route("/getPlayer/<string:playerid>")
def players_details(playerid):
    return jsonify(players_data.player_details(playerid))


@app.route("/head-to-head/<string:batsman>/<string:bowler>")
def comparison(batsman,bowler):
    return jsonify(head_to_head.head_to_head(batsman,bowler))




'''
BELOW ROUTES ARE FOR FRANCHISE
'''
@app.route("/franchiseSignUp", methods = ['POST'])
def signUp():
    franchise_details = request.get_json()
    if user_management.signup_new_franchise(franchise_details):
        return jsonify({"message":"User Signed UP successfully"})
    return jsonify({"message":"Error in signing up franchise"})


@app.route("/franchiseLogin", methods = ['POST'])
def login():
    login_credentials = request.get_json()
    login,session_id = user_management.login_franchise(login_credentials)
    if login:
        return jsonify(login),{'session_id':session_id}
    return jsonify({"message":"Error in signing up franchise"})


@app.route("/draft_players/<string:draft_id>")
def draft_players(draft_id):
    players_list = players_data.fetch_drafting_list(draft_id)
    try:
        session = request.headers['session']
        if user_management.verify_franchise_session(session) or user_management.verify_admin_session(session):
            if players_list:
                return jsonify(players_list)
        else:
            return jsonify({"message":"User not authorized for this request"})
    except:
        return jsonify({"message":"User not authorized for this request"})
    
    return jsonify({"message":"No such draft exists"})



'''
BELOW ROUTES ARE FOR ADMIN
'''
@app.route("/add_new_player", methods = ['POST'])
def new_player_info():
    try:
        session = request.headers['session']
        if user_management.verify_admin_session(session):
            data = request.get_json()
            return players_data.add_new_player_info(data)
        return jsonify({"message":"User not authorized for this request"})
    except:
        return jsonify({"message":"User not authorized for this request"})


#Below route is just for testing purpose and should be eliminated at time of deploy
@app.route("/check/<string:draft_id>")
def checkdraft(draft_id):
    draft_list = players_data.draft_details(draft_id)
    if draft_list:
        return jsonify(draft_list)
    return jsonify({"message":"No such draft exists"})


if __name__ == "__main__":
    app.run(debug=True)