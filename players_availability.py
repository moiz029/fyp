def calculate_availability(avialable_for_matches,previous_availability):
    return avialable_for_matches/previous_availability


def performance_after_partial_availbility(player,availability,previous_availability):
    player['batting_4s'] = player['batting_4s'] * (availability/previous_availability)
    player['batting_6s'] = player['batting_6s'] * (availability/previous_availability)
    player['batting_avg'] = player['batting_avg'] * (availability/previous_availability)
    player['batting_balls'] = player['batting_balls'] * (availability/previous_availability)
    player['batting_dots'] = player['batting_dots'] * (previous_availability/availability)
    player['batting_innings'] = player['batting_innings'] * (availability/previous_availability)
    player["batting_sr"] = player["batting_sr"] * (availability/previous_availability)

    player["bowling_4s"] = player["bowling_4s"] * (previous_availability/availability)
    player["bowling_6s"] = player["bowling_6s"] * (previous_availability/availability)
    player["bowling_average"] = player["bowling_average"] * (previous_availability/availability)
    player["bowling_dots"] = player["bowling_dots"] * (availability/previous_availability)
    player["bowling_economy"] = player["bowling_economy"] * (previous_availability/availability)
    player["bowling_economy"] = player["bowling_economy"] * (previous_availability/availability)
    player["bowling_innings"] = player["bowling_innings"] * (previous_availability/availability)
    player["bowling_runs"] = player["bowling_runs"] * (previous_availability/availability)
    player["bowling_wickets"] = player["bowling_wickets"] * (availability/previous_availability)
    player["bowling_sr"] = player["bowling_sr"] * (previous_availability/availability)

    return player