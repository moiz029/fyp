import players_comparison
import league_constraints


def suggest_players_from_scratch(players):
    platinum_players = platimun_players_selector(players)
    diamond_players = diamond_players_selector(players)
    gold_players = gold_players_selector(players)
    silver_players = silver_players_selector(players)
    suggested = suggest_platnium_players(platinum_players)
    suggested.extend(suggest_diamond_players(diamond_players))
    suggested.extend(suggest_gold_players(gold_players))
    suggested.extend(suggest_silver_players(suggested,silver_players))
    
    

    return suggested



def suggest_platnium_players(players):
    suggested_players = []
    top_batsman = select_top_batsman(players)
    if top_batsman:
        suggested_players.append(top_batsman)
        players.remove(top_batsman)
    else:
        top_bowler = select_top_bowler(players)
        suggested_players.append(top_bowler)
        players.remove(top_bowler)
    top_batsman = select_top_batsman(players)
    if top_batsman:
        suggested_players.append(top_batsman)
        players.remove(top_batsman)
    else:
        top_bowler = select_top_bowler(players)
        suggested_players.append(top_bowler)
        players.remove(top_bowler)
    
    foreigner_icluded = 0
    for player in suggested_players:
        if player['p_type'] == "Foreigner":
            foreigner_icluded += 1
    
    if foreigner_icluded:
        if foreigner_icluded >=2:
            players = local_players_selector(players)
        top_bowler = select_top_bowler(players)
        if top_bowler:
            suggested_players.append(top_bowler)
        else:
            suggested_players.append(select_top_batsman(players))
    else:
        players = foreigner_players_selector(players)
        top_bowler = select_top_bowler(players)
        if top_bowler:
            suggested_players.append(top_bowler)
        else:
            suggested_players.append(select_top_batsman(players))

    
    return suggested_players



def suggest_diamond_players(players):
    suggested_players = []
    top_batsman = select_top_batsman(players)
    if top_batsman:
        suggested_players.append(top_batsman)
        players.remove(top_batsman)
    else:
        top_bowler = select_top_bowler(players)
        suggested_players.append(top_bowler)
        players.remove(top_bowler)
    top_batsman = select_top_batsman(players)
    if top_batsman:
        suggested_players.append(top_batsman)
        players.remove(top_batsman)
    else:
        top_bowler = select_top_bowler(players)
        suggested_players.append(top_bowler)
        players.remove(top_bowler)
    
    foreigner_icluded = 0
    for player in suggested_players:
        if player['p_type'] == "Foreigner":
            foreigner_icluded += 1
    
    if foreigner_icluded:
        if foreigner_icluded >=2:
            players = local_players_selector(players)
        top_bowler = select_top_bowler(players)
        if top_bowler:
            suggested_players.append(top_bowler)
        else:
            suggested_players.append(select_top_batsman(players))
    else:
        players = foreigner_players_selector(players)
        top_bowler = select_top_bowler(players)
        if top_bowler:
            suggested_players.append(top_bowler)
        else:
            suggested_players.append(select_top_batsman(players))

    
    return suggested_players



def suggest_gold_players(players):
    suggested_players = []
    top_bowler = select_top_bowler(players)
    if top_bowler:
        suggested_players.append(top_bowler)
        players.remove(top_bowler)
    else:
        top_batsman = select_top_bowler(players)
        suggested_players.append(top_batsman)
        players.remove(top_batsman)
    top_bowler = select_top_bowler(players)
    if top_bowler:
        suggested_players.append(top_bowler)
        players.remove(top_bowler)
    else:
        top_batsman = select_top_bowler(players)
        suggested_players.append(top_batsman)
        players.remove(top_batsman)
    
    foreigner_icluded = 0
    for player in suggested_players:
        if player['p_type'] == "Foreigner":
            foreigner_icluded += 1
    
    if foreigner_icluded:
        if foreigner_icluded >=2:
            players = local_players_selector(players)
        top_batsman = select_top_batsman(players)
        if top_batsman:
            suggested_players.append(top_batsman)
        else:
            suggested_players.append(select_top_bowler(players))
    else:
        players = foreigner_players_selector(players)
        top_batsman = select_top_batsman(players)
        if top_batsman:
            suggested_players.append(top_batsman)
        else:
            suggested_players.append(select_top_bowler(players))

    
    return suggested_players



def suggest_silver_players(suggested,players):
    suggested_players = []
    
    current_keepers = keeper_counter(suggested)

    locals , foreigners = league_constraints.foreign_local_calculator(suggested)
    required_locals = 5-(6-foreigners)
    locals = local_players_selector(players)

    selected = 0
    if current_keepers<2:
        for i in range(2-current_keepers):
            top_keeper = select_top_keeper(locals)
            if top_keeper:
                suggested_players.append(top_keeper)
                locals.remove(top_keeper)
                selected += 1
            elif select_top_batsman(locals):
                suggested_players.append(top_batsman)
                locals.remove(top_batsman)
                selected += 1
            else:
                top_bowler = select_top_bowler(locals)
                suggested_players.append(top_bowler)
                locals.remove(top_bowler)
                selected += 1


    current_batsmans = batsman_counter(suggested)
    current_bowlers = bowler_counter(suggested)
    locals , foreigners = league_constraints.foreign_local_calculator(suggested)
    required_locals = 5-(6-foreigners)-selected
    locals = local_players_selector(players)
    if current_bowlers<6:
        for i in range(required_locals):
                top_bowler = select_top_bowler(locals)
                if top_bowler:
                    suggested_players.append(top_bowler)
                    locals.remove(top_bowler)
                else:
                    top_batsman = select_top_batsman(locals)
                    suggested_players.append(top_batsman)
                    locals.remove(top_batsman)
    elif current_batsmans<6:
        for i in range(required):
            top_batsman = select_top_batsman(locals)
            if top_batsman:
                suggested_players.append(top_batsman)
                locals.remove(top_batsman)
            else:
                top_bowler = select_top_bowler(locals)
                suggested_players.append(top_bowler)
                locals.remove(top_bowler)


    if foreigners<6:
        required = 6-foreigners
        foreigners = foreigner_players_selector(players)
        if current_batsmans<6:
            for i in range(required):
                top_batsman = select_top_batsman(foreigners)
                if top_batsman:
                    suggested_players.append(top_batsman)
                    foreigners.remove(top_batsman)
                else:
                    top_bowler = select_top_bowler(foreigners)
                    suggested_players.append(top_bowler)
                    foreigners.remove(top_bowler)
        elif current_bowlers<6:
            for i in range(required):
                top_bowler = select_top_bowler(foreigners)
                if top_bowler:
                    suggested_players.append(top_bowler)
                    foreigners.remove(top_bowler)
                else:
                    top_batsman = select_top_batsman(foreigners)
                    suggested_players.append(top_batsman)
                    foreigners.remove(top_batsman)

    
    return suggested_players


def batsman_counter(players):
    batsman = 0

    for player in players:
        if player['Batsman']:
            batsman += 1
    
    return batsman
    

def bowler_counter(players):
    bowlers = 0

    for player in players:
        if player['Bowler']:
            bowlers += 1
    
    return bowlers


def keeper_counter(players):
    keepers = 0

    for player in players:
        if player['Wicket-Keeper']:
            keepers += 1
    
    return keepers



def platimun_players_selector(players):
    platinum_players = []
    for player in players:
        if player['category'] == "Platinium":
            platinum_players.append(player)

    return platinum_players


def diamond_players_selector(players):
    diamond_players = []
    for player in players:
        if player['category'] == "Diamond":
            diamond_players.append(player)

    return diamond_players


def gold_players_selector(players):
    gold_players = []
    for player in players:
        if player['category'] == "Gold":
            gold_players.append(player)

    return gold_players



def silver_players_selector(players):
    silver_players = []
    for player in players:
        if player['category'] == "Silver":
            silver_players.append(player)

    return silver_players


def foreigner_players_selector(players):
    foreigners = []

    for player in players:
        if player['p_type'] == "Foreigner":
            foreigners.append(player)
    
    return foreigners


def local_players_selector(players):
    locals = []

    for player in players:
        if player['p_type'] == "Local":
            locals.append(player)
    
    return locals



def select_top_batsman(players):
    top_batsman = None
    top_score = 0

    for player in players:
        if player['Batsman'] and players_comparison.player_score(player['batting_avg'],player['batting_sr'])>top_score:
            top_score = players_comparison.player_score(player['batting_avg'],player['batting_sr'])
            top_batsman = player

    return top_batsman


def select_top_bowler(players):
    top_bowler = None
    top_score = 100000000000

    for player in players:
        if player['Bowler'] and players_comparison.player_score(player['bowling_average'],player['bowling_sr'])<top_score:
            top_score = players_comparison.player_score(player['bowling_average'],player['bowling_sr'])
            top_bowler = player

    return top_bowler


def select_top_keeper(players):
    top_batsman = None
    top_score = 0

    for player in players:
        if player['Wicket-Keeper'] and players_comparison.player_score(player['batting_avg'],player['batting_sr'])>top_score:
            top_score = players_comparison.player_score(player['batting_avg'],player['batting_sr'])
            top_batsman = player

    return top_batsman