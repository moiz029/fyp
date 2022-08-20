import numpy as np

#Below function sumerize players stats into single small dictionary
def summerize_players(players):
    summerized_players = []
    for player in players:
        current_player = {}
        current_player['playerid'] = player['playerid']
        #here one hot coding is required for role
        batting_stats = player['stats'][0][1:]
        current_player = {**current_player, **batting_summary(batting_stats)}
        if len(player['stats']) == 2:
            bowling_stats = player['stats'][1][1:]
            current_player = {**current_player, **bowling_summary(bowling_stats)}
        else:
            current_player = {**current_player, **bowling_summary()}
        current_player = {**current_player, **role_specifier(player['role'])}
        summerized_players.append(current_player)
    return summerized_players


def add_prices_to_players(players,draft_list):
    priced_players = []
    for player in players:
        player['category'],player['price'] = get_player_price(player['playerid'],draft_list)
        priced_players.append(player)
    
    return priced_players
    

#Given function is supportive to above summerized function
def batting_summary(batting_stats):
    summary = {}
    if batting_stats:
        summary['batting_runs'] = int(np.array([float(runs[2]) for runs in batting_stats],dtype=int).sum())
        summary['batting_balls'] = int(np.array([float(balls[3]) for balls in batting_stats],dtype=int).sum())
        outs = int(np.array([outs[4] for outs in batting_stats],dtype=int).sum())
        if outs == 0:
            summary['batting_avg'] = 0
        else:
            summary['batting_avg'] = summary['batting_runs']/outs
        summary['batting_sr'] = float(summary['batting_runs']/summary['batting_balls'])*100
        summary['batting_4s'] = int(np.array([f4s[10] for f4s in batting_stats],dtype=int).sum())
        summary['batting_6s'] = int(np.array([s6s[11] for s6s in batting_stats],dtype=int).sum())
        try:
            summary['batting_dots'] = float(np.array([dots[12] for dots in batting_stats],dtype=float).mean())
        except:
            handled_data = handle_missing_values([dots[12] for dots in batting_stats])
            summary['batting_dots'] = float(np.array(handled_data,dtype=float).mean())
    else:
        summary['batting_runs']=0
        summary['batting_balls']=0
        summary['batting_avg'] = 0
        summary['batting_sr'] = 0
        summary['batting_4s'] = 0
        summary['batting_6s'] = 0
        summary['batting_dots'] = 0

    return summary


#Given function is supportive to above summerized function
def bowling_summary(bowling_stats=[]):
    summary = {}
    if bowling_stats:
        balls = int(np.array([overs_to_balls(balls[2]) for balls in bowling_stats],dtype=int).sum())
        summary['bowling_overs'] = balls_to_overs(balls)
        summary['bowling_runs'] = int(np.array([runs[3] for runs in bowling_stats],dtype=int).sum())
        summary['bowling_wickets'] = int(np.array([runs[4] for runs in bowling_stats],dtype=int).sum())
        summary['bowling_economy'] = (summary['bowling_runs']/balls)*6
        if summary['bowling_wickets'] == 0:
            summary['bowling_average'] = 0
        else:
            summary['bowling_average'] = summary['bowling_runs']/summary['bowling_wickets']
        summary['bowling_sr'] = (summary['bowling_runs']/balls)*100
        summary['bowling_4s'] = int(np.array([f4s[10] for f4s in bowling_stats],dtype=int).sum())
        summary['bowling_6s'] = int(np.array([s6s[11] for s6s in bowling_stats],dtype=int).sum())
        try:
            summary['bowling_dots'] = float(np.array([dots[12] for dots in bowling_stats],dtype=float).mean())
        except:
            handled_data = handle_missing_values([dots[12] for dots in bowling_stats])
            summary['bowling_dots'] = float(np.array(handled_data,dtype=float).mean())

    else:
        summary['bowling_overs'] = 0
        summary['bowling_runs'] = 0
        summary['bowling_wickets'] = 0
        summary['bowling_economy'] = 0
        summary['bowling_average'] = 0
        summary['bowling_sr'] = 0
        summary['bowling_4s'] = 0
        summary['bowling_6s'] = 0
        summary['bowling_dots'] = 0

    return summary


#Given function is supportive to above bowling_summary function    
def overs_to_balls(overs):
    overs = float(overs)
    complete_overs = int(overs)
    balls = (overs-complete_overs)*10
    return balls+(complete_overs*6)


#Given function is supportive to above bowling_summary function 
def balls_to_overs(balls):
    balls = int(balls)
    overs = int(balls/6)
    return float(overs + (int(balls%6)/10))


#Onehot coding is done in below function for role
def role_specifier(role):
    specific_role = {"Batsman": False, "Bowler": False, "Wicket-Keeper":False}
    if role == "Batsman":
        specific_role['Batsman']= True
    elif role == "Bowler":
        specific_role['Bowler'] = True
    elif role == "All-Rounder":
        specific_role['Batsman']= True
        specific_role['Bowler'] = True
    else:
        specific_role['Batsman']= True
        specific_role['Wicket-Keeper']= True
    
    return specific_role


def handle_missing_values(values_list):
    return list(map(lambda x: x.replace('-', '0'), values_list))


def get_player_price(playerid,draft):
    players = draft['players']
    for player in players:
        if player['players_id'] == playerid:
            return player['category'],player['price']