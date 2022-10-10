from select import select
from unicodedata import category
import players_comparison
import league_constraints
import players_data
from sklearn.cluster import KMeans
from sklearn import preprocessing


def suggest_players_from_scratch(players):
    platinum_players = platimun_players_selector(players)
    diamond_players = diamond_players_selector(players)
    gold_players = gold_players_selector(players)
    silver_players = silver_players_selector(players)
    suggested = suggest_platinum_players(platinum_players)
    suggested.extend(suggest_diamond_players(diamond_players))
    suggested.extend(suggest_gold_players(gold_players))
    suggested.extend(suggest_silver_players(suggested,silver_players))

    for player in players:
        if player in suggested:
            players.remove(player)

    if league_constraints.categories_completed(*league_constraints.categories_calculator(suggested)) and league_constraints.special_contraints(suggested):
        return {"suggested":suggested, 'draft':players}
    
    return {'message': "Team can not be suggested from above draft"}



def suggest_alternative_player(draft,required_alt_player,suggestions):
    #First we need to filter suggested from draft
    for suggested_player in suggestions:
        if suggested_player in draft:
            draft.remove(suggested_player)
    
    if required_alt_player['p_type']=="Local":
        draft = local_players_selector(draft)
    else:
        draft = foreigner_players_selector(draft)

    for player in draft:
        if players_comparison.alternative_player(player['playerid'],required_alt_player['playerid'])['message'] == "Players are alternatives to each other":
            player['category'] = required_alt_player['category']
            return player

    return None


def suggest_alternates(draft,required_alt_player,suggestions,squad_selected):
    if suggest_alternative_player(draft,required_alt_player,suggestions):
        return suggest_alternative_player(draft,required_alt_player,suggestions)


    if required_alt_player in draft:
        draft.remove(required_alt_player)
    

    if required_alt_player['category'] == "Platinium":
        suggested = suggest_platinum_players_with_changes(platimun_players_selector(draft),platimun_players_selector(squad_selected))
        suggested.extend(suggest_diamond_players(diamond_players_selector(draft)))
        suggested.extend(suggest_gold_players(gold_players_selector(draft)))
        suggested.extend(suggest_silver_players(suggested,silver_players_selector(draft)))
        return suggested
        
    
    if required_alt_player['category'] == "Diamond":
        suggested = suggest_diamond_players_with_changes(diamond_players_selector(draft),diamond_players_selector(squad_selected))
        suggested.extend(suggest_gold_players(gold_players_selector(draft)))
        suggested.extend(suggest_silver_players(suggested,silver_players_selector(draft)))
        return suggested
    

    if required_alt_player['category'] == "Gold":
        suggested = suggest_gold_palyers_with_changes(gold_players_selector(draft),gold_players_selector(squad_selected))
        suggested.extend(suggest_silver_players(suggested,silver_players_selector(draft)))
        return suggested
    
    if required_alt_player['category'] == "Silver":
        suggested = suggest_silver_players_with_changes(suggestions,silver_players_selector(draft),squad_selected)
        return suggested



def suggest_platinum_players(players):
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


def suggest_platinum_players_with_changes(players,selected):
    suggested_players = selected
    if len(selected) == 1 and selected[0]['Bowler']:
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
        
    elif len(selected) ==1:
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
    
    if len(selected)==2 and (select[0]["Bowler"] or selected[1]["Bowler"]):
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
    elif len(selected)==2:
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


def suggest_diamond_players_with_changes(players,selected):
    suggested_players = selected
    if len(selected) == 1 and selected[0]['Bowler']:
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
        
    elif len(selected) ==1:
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
    
    if len(selected)==2 and (select[0]["Bowler"] or selected[1]["Bowler"]):
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
    elif len(selected)==2:
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


def suggest_gold_palyers_with_changes(players,selected):
    suggested_players = selected
    if len(selected) == 1 and selected[0]['Batsman']:
        top_bowler = select_top_bowler(players)
        if top_bowler:
            suggested_players.append(top_bowler)
            players.remove(top_bowler)
        else:
            top_batsman = select_top_batsman(players)
            suggested_players.append(top_batsman)
            players.remove(top_batsman)
        
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
        
    elif len(selected) ==1:
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
    
    if len(selected)==2 and (select[0]["Batsman"] or selected[1]["Batsman"]):
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
    elif len(selected)==2:
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




def suggest_silver_players_with_changes(suggested,players,selected):
    suggested.extend(selected)
    suggested_players = []
    
    current_keepers = keeper_counter(suggested)

    silver_selected = silver_players_selector(selected)
    locals , foreigners = league_constraints.foreign_local_calculator(suggested)
    required_locals = 5-(6-foreigners)-silver_selected
    locals = local_players_selector(players)

    silver_selected = silver_players_selector(selected)

    selected = len(silver_selected)
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
    
    suggested_players = silver_players_selector(suggested_players)

    
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

def category_selection(category,players):
    if category=="Platinium":
        return players
    elif category=="Diamond":
        selected_players = diamond_players_selector(players)
        selected_players.extend(gold_players_selector(players))
        selected_players.extend(silver_players_selector(players))
        return selected_players
    elif category=="Gold":
        selected_players = gold_players_selector(players)
        selected_players.extend(silver_players_selector(players))
        return selected_players
    else:
        return silver_players_selector(players)

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
            if player["Bolwer"]:
                selected_players.append(player)
    elif role=="Wicket-Keeper":
        for player in players:
            if player["Wicket-Keeper"]:
                selected_players.append(player)
    elif role=="All-Rounder":
        for player in players:
            if player["Batsman"] and player["Bowler"]:
                selected_players.append(player)


def speciality_based_selection(role,speciality, players):
    organized_data = []
    if role!="Bowler" and speciality=="Consistency":
        organized_data.append([43])
        for i in players:
            single_player.append(i["batting_avg"])
            organized_data.append(single_player)

        return clustering(players)
    elif role!="Bowler" and speciality=="Power-Hitting":
        organized_data.append([140,3])
        for i in players:
            single_player = []
            
            single_player.append(i["batting_sr"])
            single_player.append((i["batting_4s"]+i["batting_6s"])/i["batting_innings"])
            organized_data.append(single_player)

        return clustering(players)
    
    elif (role=="Bolwer" or role=="All-Rounder") and speciality=="Economical":
        organized_data.append([80,3])
        for i in players:
            single_player = []
            
            single_player.append(i["bowling_dots"])
            single_player.append(i["bowling_economy"])
            organized_data.append(single_player)

        return clustering(players)

    elif (role=="Bolwer" or role=="All-Rounder") and speciality=="Wicket-Taking":
        organized_data.append([3,15])
        for i in players:
            single_player = []
            
            single_player.append(i["bowling_wickets"]/i["bowling_innings"])
            single_player.append(i["bowling_average"])
            organized_data.append(single_player)

        return clustering(players)
    else:
        {'message':"Invalid role and speciality"}

def suggest_players(data):
    draft_players = data["draft"]
    category = data["category"]
    p_type = data["p_type"]
    role = data["role"]
    player_speciality = data["speciality"]

    valid_players = category_selection(category,draft_players)
    valid_players = player_type_selection(p_type,valid_players)
    valid_players = role_filtering(role,valid_players)
    specialized_list = speciality_based_selection(role,player_speciality,valid_players)
    suggest_players = []
    if type(specialized_list)==dict:
        return specialized_list
    
    for count in range(1,len(specialized_list)):
        if specialized_list[count]==specialized_list[0]:
            suggest_players.append(valid_players[count])
    
    if len(suggest_players)==0:
        return {'message':"No such player available in draft"}
    
    return suggest_players
    


def clustering(players):
    km = KMeans(n_clusters=2)
    organized_data = preprocessing.normalize(players,norm='l2')
    clusters = km.fit_predict(X=organized_data)

    return clusters
