from glob import escape
from flask import Flask,jsonify
import extract_player_stats
import players_data

app = Flask(__name__)

@app.route("/allplayers")
def hello_world():
    return players_data.db_connection()

@app.route("/getPlayer/<string:playerid>")
def checking(playerid):
    return jsonify(extract_player_stats.player_details(playerid))


if __name__ == "__main__":
    app.run(debug=True)