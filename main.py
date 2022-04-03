from glob import escape
from flask import Flask,jsonify
import extract_player_stats

app = Flask(__name__)

@app.route("/allplayers")
def hello_world():
    return jsonify({'players':"Players stats"})

@app.route("/getPlayer/<string:playerid>")
def checking(playerid):
    return jsonify(extract_player_stats.player_details(playerid))


if __name__ == "__main__":
    app.run(debug=True)