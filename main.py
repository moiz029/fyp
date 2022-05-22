from glob import escape
from flask import Flask,jsonify
import players_data
import head_to_head

app = Flask(__name__)

@app.route("/allplayers")
def allplayers():
    return jsonify(players_data.all_players())


@app.route("/getPlayer/<string:playerid>")
def players_deatails(playerid):
    return jsonify(players_data.player_details(playerid))


@app.route("/head-to-head/<string:batsman>/<string:bowler>")
def checking(batsman,bowler):
    return jsonify(head_to_head.head_to_head(batsman,bowler))



@app.route("/check/<string:playerid>")
def checkplayer(playerid):
    return players_data.player_profile(playerid)["name"]


if __name__ == "__main__":
    app.run(debug=True)