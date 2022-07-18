from glob import escape
from flask import Flask,jsonify
from flask import request
import players_data
import head_to_head
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

@app.route("/allplayers")
def allplayers():
    return jsonify(players_data.all_players())


@app.route("/getPlayer/<string:playerid>")
def players_deatails(playerid):
    return jsonify(players_data.player_details(playerid))


@app.route("/head-to-head/<string:batsman>/<string:bowler>")
def comparison(batsman,bowler):
    return jsonify(head_to_head.head_to_head(batsman,bowler))


@app.route("/userSignUp", methods = ['POST'])
def signUp():
    if request.method == 'POST':
        print(request.get_json()['quiz'])
        return "request.da"
    else:
        return "Not post method"


@app.route("/add_new_player", methods = ['POST'])
def new_player_info():
    data = request.get_json()
    return players_data.add_new_player_info(data)


#Below route is just for testing purpose and should be eliminated at time of deploy
@app.route("/check/<string:playerid>")
def checkplayer(playerid):
    return players_data.player_profile(playerid)["name"]


if __name__ == "__main__":
    app.run(debug=True)