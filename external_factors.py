from datetime import date
from datetime import datetime
import pre_processing
import user_management
import players_data


#Performance according to venue
def performance_according_to_venue(player_stats,venues):
    venue_matches = matches_in_venues(player_stats,venues)
    return pre_processing.summerize_stats(venue_matches)


#Function below will get stats only from the given venue of specific player
def matches_in_venues(player_stats,venues):
    venue_stats = []
    for stats in player_stats:
        role_stats = []
        for match in stats:
            if match[-1] in venues:
                role_stats.append(match)
        if len(role_stats)>0:
            role_stats.insert(0,stats[0])
        venue_stats.append(role_stats)
    
    return venue_stats


#provide stats of player to summerize recent form of that player
def recent_form_of_player(player_stats):
    recent_stats = get_recent_games(player_stats)
    return pre_processing.summerize_stats(recent_stats)


#Recent matches for players are returned
def recent_matches_factor(players):
    total_stats = []
    for player in players:
        current_stats = players_data.get_player_stats(player['playerid'])
        total_stats.append(recent_stats_impact(current_stats,recent_form_of_player(current_stats['stats'])))
    
    return total_stats
#Given function will only seperate recent matches from stats
def get_recent_games(player_stats):
    today = date.today()
    today = today.strftime("%b %d, %Y")
    today = datetime.strptime(today,"%b %d, %Y")
    recent_stats = []
    for role in player_stats:
        role_stats = []
        for match in role[1:]:
            delta = datetime.strptime(match[-2],"%b %d, %Y") - today
            if abs(delta.days)<180:
                role_stats.append(match)
        if len(role_stats)>0:
            role_stats.insert(0,role[0])
        recent_stats.append(role_stats)
    return recent_stats



def recent_stats_impact(regular_stats,venues_stats):
    impacted_stats = []
    for index,player in enumerate(regular_stats):
        
        if player["batting_innings"]!=0:
            player['batting_4s'] += venues_stats[index]["batting_4s"]
            player['batting_6s'] += venues_stats[index]["batting_6s"]
            player['batting_avg'] = ((player['batting_avg']*player["batting_innings"])+(venues_stats[index]["batting_avg"]*venues_stats[index]["batting_innings"]))/(player["batting_innings"]+venues_stats[index]["batting_innings"])
            player['batting_balls'] += venues_stats[index]["batting_balls"]
            player['batting_dots'] = ((player['batting_dots']*player["batting_innings"])+(venues_stats[index]["batting_dots"]*venues_stats[index]["batting_innings"]))/(player["batting_innings"]+venues_stats[index]["batting_innings"])
            player['batting_innings'] += venues_stats[index]["batting_innings"]
            player['batting_runs'] += venues_stats[index]["batting_runs"]
            player['batting_sr'] = (player['batting_runs']/player['batting_balls'])*100


        if player["bowling_innings"]!=0:
            player['bowling_4s'] += venues_stats[index]["bowling_4s"]
            player['bowling_6s'] += venues_stats[index]["bowling_6s"]
            player['bowling_average'] = ((player['bowling_average']*player["bowling_innings"])+(venues_stats[index]["bowling_average"]*venues_stats[index]["bowling_innings"]))/(player["bowling_innings"]+venues_stats[index]["bowling_innings"])
            player['bowling_dots'] = ((player['bowling_dots']*player["bowling_innings"])+(venues_stats[index]["bowling_dots"]*venues_stats[index]["bowling_innings"]))/(player["bowling_innings"]+venues_stats[index]["bowling_innings"])
            player['bowling_economy'] = ((player['bowling_economy']*player["bowling_innings"])+(venues_stats[index]["bowling_economy"]*venues_stats[index]["bowling_innings"]))/(player["bowling_innings"]+venues_stats[index]["bowling_innings"])
            player['bowling_innings'] += venues_stats[index]["bowling_innings"]
            player['bowling_overs'] += venues_stats[index]["bowling_overs"]
            player['bowling_runs'] += venues_stats[index]["bowling_runs"]
            player['bowling_wickets'] += venues_stats[index]["bowling_wickets"]
            player['bowling_sr'] = (player['bowling_runs']/(player['bowling_overs']*6))*100
            
        impacted_stats.append(player)
    
    return impacted_stats


def venue_filtering(players,venues):
    if venues=="Any":
        return players
    else:
        venues_details = user_management.get_venues()
        venues = []
        for i in venues_details:
            venues.append(i["name"])
        player_ids = [player['playerid'] for player in players]
        players_stats = [players_data.get_player_stats(player_id) for player_id in player_ids]
        venue_stats = [matches_in_venues(player["stats"],venues) for player in players_stats]
        for player,stats in enumerate(venue_stats):
            players_stats[player]['stats'] = stats
        venue_stats = pre_processing.summerize_players(players_stats)
        return venue_stats



def venue_stats_impact(regular_stats,venues_stats):
    impacted_stats = []
    for index,player in enumerate(regular_stats):
        
        if player["batting_innings"]!=0:
            player['batting_4s'] += venues_stats[index]["batting_4s"]
            player['batting_6s'] += venues_stats[index]["batting_6s"]
            player['batting_avg'] = ((player['batting_avg']*player["batting_innings"])+(venues_stats[index]["batting_avg"]*venues_stats[index]["batting_innings"]))/(player["batting_innings"]+venues_stats[index]["batting_innings"])
            player['batting_balls'] += venues_stats[index]["batting_balls"]
            player['batting_dots'] = ((player['batting_dots']*player["batting_innings"])+(venues_stats[index]["batting_dots"]*venues_stats[index]["batting_innings"]))/(player["batting_innings"]+venues_stats[index]["batting_innings"])
            player['batting_innings'] += venues_stats[index]["batting_innings"]
            player['batting_runs'] += venues_stats[index]["batting_runs"]
            player['batting_sr'] = (player['batting_runs']/player['batting_balls'])*100


        if player["bowling_innings"]!=0:
            player['bowling_4s'] += venues_stats[index]["bowling_4s"]
            player['bowling_6s'] += venues_stats[index]["bowling_6s"]
            player['bowling_average'] = ((player['bowling_average']*player["bowling_innings"])+(venues_stats[index]["bowling_average"]*venues_stats[index]["bowling_innings"]))/(player["bowling_innings"]+venues_stats[index]["bowling_innings"])
            player['bowling_dots'] = ((player['bowling_dots']*player["bowling_innings"])+(venues_stats[index]["bowling_dots"]*venues_stats[index]["bowling_innings"]))/(player["bowling_innings"]+venues_stats[index]["bowling_innings"])
            player['bowling_economy'] = ((player['bowling_economy']*player["bowling_innings"])+(venues_stats[index]["bowling_economy"]*venues_stats[index]["bowling_innings"]))/(player["bowling_innings"]+venues_stats[index]["bowling_innings"])
            player['bowling_innings'] += venues_stats[index]["bowling_innings"]
            player['bowling_overs'] += venues_stats[index]["bowling_overs"]
            player['bowling_runs'] += venues_stats[index]["bowling_runs"]
            player['bowling_wickets'] += venues_stats[index]["bowling_wickets"]
            player['bowling_sr'] = (player['bowling_runs']/(player['bowling_overs']*6))*100
            
        impacted_stats.append(player)
    
    return impacted_stats


def positional_factor_adding(players,position):
    positional_stats_included = []
    for player in players:
        positional_stats = players_data.get_player_stats(player['playerid'])["position_stats"]
        positional_stats_included.append(position_impacted_scores(player,position,positional_stats))
    
    
    return positional_stats_included
        



def position_impacted_scores(player,position,positional_stats):
    for i in range(1,len(positional_stats[0])):
        if positional_stats[0][i][0] == 'None':
                continue
        if str(position)==str(positional_stats[0][i][0]):
            player['batting_4s'] += float(str(positional_stats[0][i][10]).replace(",",""))
            player['batting_6s'] += float(str(positional_stats[0][i][11]).replace(",",""))
            player['batting_balls'] += float(str(positional_stats[0][i][3]).replace(",",""))
            player['batting_innings'] += float(str(positional_stats[0][i][1]).replace(",",""))
            player['batting_runs'] += float(str(positional_stats[0][i][2]).replace(",",""))
            player['batting_sr'] = (player['batting_runs']/player['batting_balls'])*100
            if player['batting_avg']!='-' and str(positional_stats[0][i][5])!='-':
                player['batting_avg'] = ((player['batting_avg']*player["batting_innings"])+(float(str(positional_stats[0][i][5]).replace(",",""))*float(str(positional_stats[0][i][1]).replace(",",""))))/(player["batting_innings"]+float(str(positional_stats[0][i][1]).replace(",","")))
            player['batting_dots'] = ((player['batting_dots']*player["batting_innings"])+(float(str(positional_stats[0][i][12]).replace(",",""))*float(str(positional_stats[0][i][1]).replace(",",""))))/(player["batting_innings"]+float(str(positional_stats[0][i][1]).replace(",","")))
            break


    if len(positional_stats)>1:
        for i in range(1,len(positional_stats[1])):
            if positional_stats[1][i][0] == 'None':
                continue
            if int(positional_stats[1][i][0])==position:
                player['bowling_4s'] += float(positional_stats[1][i][9].replace(",",""))
                player['bowling_6s'] += float(positional_stats[1][i][10].replace(",",""))
                player['bowling_innings'] += float(positional_stats[1][i][1].replace(",",""))
                player['bowling_overs'] += float(positional_stats[1][i][2].replace(",",""))
                player['bowling_runs'] += float(positional_stats[1][i][3].replace(",",""))
                player['bowling_wickets'] += float(positional_stats[1][i][4].replace(",",""))
                player['bowling_sr'] = (player['bowling_runs']/(player['bowling_overs']*6))*100
                if player['bowling_average']!='-' and str(positional_stats[1][i][6])!='-':
                    player['bowling_average'] = ((player['bowling_average']*player["bowling_innings"])+(float(positional_stats[1][i][6].replace(",",""))*float(positional_stats[1][i][1].replace(",",""))))/(player["bowling_innings"]+float(positional_stats[1][i][1].replace(",","")))
                player['bowling_dots'] = ((player['bowling_dots']*player["bowling_innings"])+(float(positional_stats[1][i][11].replace(",",""))*float(positional_stats[1][i][1].replace(",",""))))/(player["bowling_innings"]+float(positional_stats[1][i][1].replace(",","")))
                player['bowling_economy'] = ((player['bowling_economy']*player["bowling_innings"])+(float(positional_stats[1][i][5].replace(",",""))*float(positional_stats[1][i][1].replace(",",""))))/(player["bowling_innings"]+float(positional_stats[1][i][1].replace(",","")))
                break


    return player




        
        
