from bs4 import BeautifulSoup
import requests
import players_data,pre_processing,players_data

def head_to_head(batsman,bowler):
    webpage = requests.get("http://www.cricmetric.com/matchup.py?batsman="+batsman+"&bowler="+bowler+"&groupby=match")
    webpage = str(webpage.content).replace("</td><tr>","</td></tr><tr>").replace("</td><tfoot>","</td></tr><tfoot>")
    soup = BeautifulSoup(webpage, 'html.parser')
    tables = soup.find_all('div',{'class':'panel panel-default'})
    required_tables = []
    for table in tables:
        if table.find('div',{'class':'panel-heading'}).text.strip() == "TWENTY20" or table.find('div',{'class':'panel-heading'}).text.strip() == "T20I":
            required_tables.append(table)
    headers = []
    for table in required_tables:
        header = []
        for heading in table.find_all('th'):
            title = heading.text.strip()
            header.append(title)
        headers.append(header)
    head_to_head_stats = []
    for index,value in enumerate(required_tables):
        temp_record = [headers[index]]
        for row in value.find_all('tr')[1:-1]:
            data = row.find_all('td')
            row_data = [td.text.strip() for td in data]
            temp_record.append(row_data)
        head_to_head_stats.append(temp_record)
    return head_to_head_stats_management(head_to_head_stats)


def head_to_head_stats_management(stats):
    if len(stats)>1:
        updated_stats = stats[0][0:]+stats[1][1:]
        return updated_stats
    return stats


def compare_two_players(player1,player2):
    p1_to_p2 = head_to_head(player2,player1)
    p2_to_p1 = head_to_head(player1,player2)
    player1 = players_data.player_details(player1)
    p1_positional = player1['position_stats']
    player2 = players_data.player_details(player2)
    p2_positional = player2['position_stats']
    player1 = pre_processing.summerize_players([player1])[0]
    player2 = pre_processing.summerize_players([player2])[0]

    details = {'player1':player1,'player2':player2,'p1_to_p2':p1_to_p2,'p2_to_p1':p2_to_p1,'p1_positional':p1_positional,'p2_positional':p2_positional}
    return details


def alternative_player(player1,player2):
    player1 = players_data.get_player_stats(player1)
    p1_role = player1['role']
    player2 = players_data.get_player_stats(player2)
    p2_role = player2['role']
    player1 = pre_processing.summerize_players([player1])[0]
    player2 = pre_processing.summerize_players([player2])[0]
    alternatives = {"batting_alternative":False,"bowling_alternative":False,"keeping_alternative":False,"message":"Players are not alternatives to each other"}

    if p1_role==p2_role and p1_role=="Batsman":
        alternates = alternative_stats(player1['batting_avg'],player1['batting_sr'],player2['batting_avg'],player2['batting_sr'])
        if alternates:
            alternatives = {"batting_alternative":True,"bowling_alternative":False,"keeping_alternative":False,"message":"Players are alternatives to each other"}
    elif (p1_role=="Wicket-Keeper Batsman" and p2_role=="Batsman") or (p2_role=="Wicket-Keeper Batsman" and p1_role=="Batsman"):
        alternates = alternative_stats(player1['batting_avg'],player1['batting_sr'],player2['batting_avg'],player2['batting_sr'])
        if alternates:
            alternatives = {"batting_alternative":True,"bowling_alternative":False,"keeping_alternative":False,"message":"Players are alternatives to each other only in batting"}
    elif p1_role==p2_role and p1_role=="Wikcet-Keeper Batsman":
        alternates = alternative_stats(player1['batting_avg'],player1['batting_sr'],player2['batting_avg'],player2['batting_sr'])
        if alternates:
            alternatives = {"batting_alternative":True,"bowling_alternative":False,"keeping_alternative":True,"message":"Players are alternatives to each other"}
    elif p1_role==p2_role and p1_role=="Bowler":
        alternates = alternative_stats(player1['bowling_average'],player1['bowling_sr'],player2['bowling_average'],player2['bowling_sr'])
        if alternates:
            alternatives = {"batting_alternative":False,"bowling_alternative":True,"keeping_alternative":False,"message":"Players are alternatives to each other"}
    elif p1_role == "All-Rounder" or p2_role=="All-Rounder":
        batting_alternates = alternative_stats(player1['batting_avg'],player1['batting_sr'],player2['batting_avg'],player2['batting_sr'])
        bowling_alternates = alternative_stats(player1['bowling_average'],player1['bowling_sr'],player2['bowling_average'],player2['bowling_sr'])
        if batting_alternates and bowling_alternates:
            alternatives = {"batting_alternative":True,"bowling_alternative":True,"keeping_alternative":False,"message":"Players are alternatives to each other"}
        elif batting_alternates:
            alternatives = {"batting_alternative":True,"bowling_alternative":False,"keeping_alternative":False,"message":"Players are alternatives to each other only in Batting"}
        elif bowling_alternates:
            alternatives = {"batting_alternative":False,"bowling_alternative":True,"keeping_alternative":False,"message":"Players are alternatives to each other only in bowling"}
    return alternatives



def alternative_stats(p1_avg,p1_sr,p2_avg,p2_sr):
    p1_score = player_score(p1_avg,p1_sr)
    p2_score = player_score(p2_avg,p2_sr)

    difference = abs(p1_score-p2_score)/(p1_score+p2_score)

    if difference>.1:
        return False
    
    return True


def player_score(avg,sr):
    return avg*sr
