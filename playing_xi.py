import numpy as np
import external_factors

def suggest_player(data):
    team_players = data["team"]
    p_type = data["p_type"]
    role = data["role"]
    position = data["position"]
    playing_xi = data['playing_xi']
    player_speciality = data["speciality"]
    
    team_players = playing_xi_filter(team_players,playing_xi)
    team_players = player_type_selection(p_type,team_players)
    team_players = role_filtering(role,team_players)

    try:
        team_players = external_factors.recent_matches_factor(team_players)
    except:
        pass

    if len(team_players)<1:
        return {'message':"No such players exists"}

    if position!="Any":
        team_players = external_factors.positional_factor_adding(team_players,position)
    
    return get_required_player(team_players,player_speciality)

    
def suggest_alternate(data):
    team_players = data["team"]
    p_type = data["p_type"]
    role = data["role"]
    position = data["position"]
    player = data['alternate']
    playing_xi = data['playing_xi']
    playing_xi.append(player)
    player_speciality = data["speciality"]

    
    team_players = player_type_selection(p_type,team_players)
    team_players = playing_xi_filter(team_players,playing_xi)
    team_players = role_filtering(role,team_players)

    if len(team_players)<1:
        return {'message':"No alternate can be provided"}

    if position!="Any":
        team_players = external_factors.positional_factor_adding(team_players,position)

    
    try:
        team_players = external_factors.recent_matches_factor(team_players)
    except:
        pass
    
    return get_required_player(team_players,player_speciality)


def get_required_player(players,speciality):
    organized_data = []
    ideal = (0,0)
    if speciality=="Power-Hitting":
        ideal = np.array((147,3))
        for i in players:
            organized_data.append((i["batting_sr"],(i["batting_4s"]+i["batting_6s"])/i["batting_innings"]))
        
        
    elif speciality=="Consistency":
        ideal = np.array((40))
        for i in players:
            organized_data.append(i["batting_avg"])

    elif speciality=="Economical":
        ideal = np.array((50,4,90))
        for i in players:
            organized_data.append((i["bowling_dots"],i["bowling_economy"],i["bowling_sr"]))
        
            
    elif speciality=="Wicket-Taking":
        ideal = np.array((2,15))
        for i in players:
            organized_data.append((i["bowling_wickets"]/i["bowling_innings"],i["bowling_average"]))
    
    organized_data = np.array(organized_data)
    return players[recommed_player(organized_data,ideal)]
    




def recommed_player(players,ideal):
    distances = []
    for player in players:
        distances.append(np.linalg.norm(player-ideal))
    
    lowest = min(distances)
    index = distances.index(lowest)
    return index



def player_type_selection(p_type,players):
    selected_players = []
    for player in players:
        if player["p_type"]==p_type:
            selected_players.append(player)
    
    return selected_players

def role_filtering(role,players):
    selected_players = []
    if role=="Batsman":
        for player in players:
            if player["Batsman"]:
                selected_players.append(player)
    elif role=="Bowler":
        for player in players:
            if player["Bowler"]:
                selected_players.append(player)
    elif role=="Wicket-Keeper":
        for player in players:
            if player["Wicket-Keeper"]:
                selected_players.append(player)
    elif role=="All-Rounder":
        for player in players:
            if player["Batsman"] and player["Bowler"]:
                selected_players.append(player)
    return selected_players


def playing_xi_filter(all_players,playing_xi):
    available_players = []
    for player in all_players:
        if player not in playing_xi:
            available_players.append(player)
    return available_players