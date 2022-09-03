total_matches = 34

def calculate_availability(avialable_for_matches):
    return avialable_for_matches/total_matches


def performance_after_partial_availbility(player,availability):
    availability = calculate_availability(availability)
    player['batting_avg'] = player['batting_avg'] * (availability/total_matches)
    player["batting_sr"] = player["batting_sr"] * (availability/total_matches)

    player["bowling_average"] = player["bowling_average"] * (availability/total_matches)
    player["bowling_sr"] = player["bowling_sr"] * (availability/total_matches)

    return player