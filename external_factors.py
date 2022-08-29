from datetime import date
from datetime import datetime
import pre_processing


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