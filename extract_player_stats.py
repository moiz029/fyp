from bs4 import BeautifulSoup
import requests
def player_id(id):
    webpage = requests.get("http://www.cricmetric.com/playerstats.py?player=Shoaib+Malik&role=all&format=TWENTY20&groupby=match")
    soup = BeautifulSoup(webpage.content)
    print(soup.findAll("tr"))
    return {
        "playername":"Stats",
        "playerid": id,
        "working": True
    }