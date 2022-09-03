def categories_calculator(players):
    platinium = 0
    daimond = 0
    gold = 0
    silver = 0

    for player in players:
        if player['category'] == "Platinium":
            platinium += 1
        elif player['category'] == "Diamond":
            daimond += 1
        elif player['category'] == "Gold":
            gold += 1
        elif player['category'] == "Silver":
            silver += 1
    
    return platinium, daimond, gold, silver


def catories_in_limits(platinium, daimond, gold, silver):
    if platinium<=3 and daimond<=3 and gold<=3 and silver<=5:
        return True
    return False


def categories_completed(platinium, daimond, gold, silver):
    if platinium==3 and daimond==3 and gold==3 and (silver<=5 and silver>=3):
        return True
    return False


def foreign_local_calculator(players):
    foreigners = 0
    locals = 0

    for player in players:
        if player["p_type"] == "Local":
            locals += 1
        else:
            foreigners += 1
    
    return locals, foreigners


def foreign_local_ratio(locals,foreignors):
    if foreignors == 5 and (locals<=11 and locals>=9):
        return True
    return False


def special_contraints(players):
    plt_n_forgner = False
    dmd_n_forgner = False
    gold_n_forgner = False

    for player in players:
        if player["category"] == "Platinium" and player['p_type'] == "Foreigner":
            plt_n_forgner = True
        elif player["category"] == "Diamond" and player['p_type'] == "Foreigner":
            dmd_n_forgner = True
        elif player["category"] == "Gold" and player['p_type'] == "Foreigner":
            gold_n_forgner = True
        
        if plt_n_forgner and dmd_n_forgner and gold_n_forgner:
            return True

            
    return False