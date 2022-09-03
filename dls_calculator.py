resources_table = [
    [100,96.8,92.6,86.7,78.8,68.3,54.4,37.5,21.3,8.3],
    [96.1,93.3,89.2,83.9,76.7,66.6,53.5,37.3,21,8.3],
    [92.2,89.6,85.9,81.1,74.2,65,52.7,36.9,21,8.3],
    [88.2,85.7,82.5,77.9,71.7,63.3,51.6,36.6,21.0,8.3],
    [84.1,81.8,79.0,74.7,69.1,61.3,50.4,36.2,20.8,8.3],
    [79.9,77.9,75.3,71.6,66.4,59.2,49.1,35.7,20.8,8.3],
    [75.4,73.7,71.4,68.0,63.4,56.9,47.7,35.2,20.8,8.3],
    [71.0,69.4,67.3,64.5,60.4,54.4,46.1,34.5,20.7,8.3],
    [66.4,65.0,63.3,60.6,57.1,51.9,44.3,33.6,20.5,8.3],
    [61.7,60.4,59.0,56.7,53.7,49.1,42.4,32.7,20.3,8.3],
    [56.7,55.8,54.4,52.7,50.0,46.1,40.3,31.6,20.1,8.3],
    [51.8,51.1,49.8,48.4,46.1,42.8,37.8,30.2,19.8,8.3],
    [46.6,45.9,45.1,43.8,42.0,39.4,35.2,28.6,19.3,8.3],
    [41.3,40.8,40.1,39.2,37.8,35.5,32.2,26.9,18.6,8.3],
    [35.9,35.5,35.0,34.3,33.2,31.4,29.0,24.6,17.8,8.1],
    [30.4,30.0,29.7,29.2,28.4,27.2,25.3,22.1,16.6,8.1],
    [24.6,24.4,24.2,23.9,23.3,22.4,21.2,18.9,14.8,8.0],
    [18.7,18.6,18.4,18.2,18.0,17.5,16.8,15.4,12.7,7.4],
    [12.7,12.5,12.5,12.4,12.4,12.0,11.7,11.0,9.7,6.5],
    [6.4,6.4,6.4,6.4,6.4,6.2,6.2,6.0,5.7,4.4]
]


def required_score(team1_score,overs_remaining,wickets_in_hand):
    overs_remaining = -1* round(overs_remaining)
    available_resources = resources_table[overs_remaining][-1*(wickets_in_hand)]
    par_score = round(team1_score*(.01*(100-available_resources)) + 1)

    return par_score