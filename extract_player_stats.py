from site import venv
from turtle import position
from bs4 import BeautifulSoup
import requests
from datetime import datetime
import players_data
def player_details(id):
    player_stats = stats_management(leagues_stats(id),international_stats(id))
    postion_records = combining_position_stats(league_postion_stats(id), international_postion_stats(id))
    profile = players_data.player_profile(id)
    return {
        "playername":profile["name"],
        "playerid": profile["cricmetric"],
        "picture":profile["picture"],
        "country":profile["country"],
        "role":profile["role"],
        "bowling_style": profile["bowling_style"],
        "stats": player_stats,
        "position_stats": postion_records
    }

def leagues_stats(id):
    webpage = requests.get("http://www.cricmetric.com/playerstats.py?player="+id+"&role=all&format=TWENTY20&groupby=match")
    webpage = str(webpage.content).replace("</td><tr>","</td></tr><tr>").replace("</td><tfoot>","</td></tr><tfoot>")
    soup = BeautifulSoup(webpage, 'html.parser')
    tables = soup.find_all('table',{'class':'table scoretable'})
    headers = []
    for table in tables:
        header = []
        for heading in table.find_all('th'):
            title = heading.text.strip()
            header.append(title)
        header.append("Date")
        header.append("Venue")
        headers.append(header)
    
    player_stats = []
    for index,value in enumerate(tables):
        temp_record = [headers[index]]
        for row in value.find_all('tr')[1:-1]:
            link = "http://www.cricmetric.com"+row.find("a",{'href':True}).get("href")
            date,venue = date_and_venue(link)
            data = row.find_all('td')
            row_data = [td.text.strip() for td in data]
            row_data.append(date)
            row_data.append(venue)
            if(row_data[-2]!="-"):
                temp_record.append(row_data)
        player_stats.append(temp_record)
    return player_stats


def international_stats(id):
    webpage = requests.get("http://www.cricmetric.com/playerstats.py?player="+id+"&role=all&format=T20I&groupby=match")
    webpage = str(webpage.content).replace("</td><tr>","</td></tr><tr>").replace("</td><tfoot>","</td></tr><tfoot>")
    soup = BeautifulSoup(webpage, 'html.parser')
    tables = soup.find_all('table',{'class':'table scoretable'})
    headers = []
    for table in tables:
        header = []
        for heading in table.find_all('th'):
            title = heading.text.strip()
            header.append(title)
        header.append("Date")
        header.append("Venue")
        headers.append(header)
    
    player_stats = []
    for index,value in enumerate(tables):
        temp_record = [headers[index]]
        for row in value.find_all('tr')[1:-1]:
            link = "http://www.cricmetric.com"+row.find("a",{'href':True}).get("href")
            date,venue = date_and_venue(link)
            data = row.find_all('td')
            row_data = [td.text.strip() for td in data]
            row_data.append(date)
            row_data.append(venue)
            if(row_data[-2]!="-"):
                temp_record.append(row_data)
        player_stats.append(temp_record)
    return player_stats

def date_and_venue(link):
    webpage = requests.get(link)
    soup = BeautifulSoup(webpage.content, 'html.parser')
    try:
        details = soup.find('div',{'class':'panel-heading'}).text.strip().split('|')
        venue = details[1][1:]
        date = details[0][-13:-1]
    except:
        venue = "None"
        date = "-"
    return date,venue

def stats_management(league_stats,international_stats):
    stats = []
    if league_stats and international_stats:
        if (len(league_stats)==len(international_stats)):
            for i in range(len(league_stats)):
                stats.append(league_stats[i]+international_stats[i][1:])
                stats[i][1:] = sorted(stats[i][1:], key=lambda x:datetime.strptime(x[13],"%b %d, %Y"))
        elif(len(league_stats)>len(international_stats)):
            stats.append(league_stats[0]+international_stats[0][1:])
            stats.append(league_stats[1])
            stats[0][1:] = sorted(stats[0][1:], key=lambda x:datetime.strptime(x[13],"%b %d, %Y"))
            stats[1][1:] = sorted(stats[1][1:], key=lambda x:datetime.strptime(x[13],"%b %d, %Y"))
        else:
            stats.append(league_stats[0]+international_stats[0][1:])
            stats.append(international_stats[1])
            stats[0][1:] = sorted(stats[0][1:], key=lambda x:datetime.strptime(x[13],"%b %d, %Y"))
            stats[1][1:] = sorted(stats[1][1:], key=lambda x:datetime.strptime(x[13],"%b %d, %Y"))
    elif not league_stats:
        for i in range(len(international_stats)):
                stats.append(international_stats[i])
                stats[i][1:] = sorted(stats[i][1:], key=lambda x:datetime.strptime(x[13],"%b %d, %Y"))
    elif not international_stats:
        for i in range(len(league_stats)):
                stats.append(league_stats[i])
                stats[i][1:] = sorted(stats[i][1:], key=lambda x:datetime.strptime(x[13],"%b %d, %Y"))
    
    return stats
    
    
def international_postion_stats(id):
    webpage = requests.get("http://www.cricmetric.com/playerstats.py?player="+id+"&role=all&format=T20I&groupby=batpos")
    webpage = str(webpage.content).replace("</td><tr>","</td></tr><tr>").replace("</td><tfoot>","</td></tr><tfoot>")
    soup = BeautifulSoup(webpage, 'html.parser')
    tables = soup.find_all('table',{'class':'table scoretable'})
    headers = []
    for table in tables:
        header = []
        for heading in table.find_all('th'):
            title = heading.text.strip()
            header.append(title)
        headers.append(header)

    position_stats = []
    for index,value in enumerate(tables):
        temp_record = [headers[index]]
        for row in value.find_all('tr')[1:-1]:
            data = row.find_all('td')
            row_data = [td.text.strip() for td in data]
            temp_record.append(row_data)
        position_stats.append(temp_record)
    return position_stats

def league_postion_stats(id):
    webpage = requests.get("http://www.cricmetric.com/playerstats.py?player="+id+"&role=all&format=TWENTY20&groupby=batpos")
    webpage = str(webpage.content).replace("</td><tr>","</td></tr><tr>").replace("</td><tfoot>","</td></tr><tfoot>")
    soup = BeautifulSoup(webpage, 'html.parser')
    tables = soup.find_all('table',{'class':'table scoretable'})
    headers = []
    for table in tables:
        header = []
        for heading in table.find_all('th'):
            title = heading.text.strip()
            header.append(title)
        headers.append(header)

    position_stats = []
    for index,value in enumerate(tables):
        temp_record = [headers[index]]
        for row in value.find_all('tr')[1:-1]:
            data = row.find_all('td')
            row_data = [td.text.strip() for td in data]
            temp_record.append(row_data)
        position_stats.append(temp_record)
    return position_stats

def combining_position_stats(league_positions, international_positions):
    stats = []
    batting = []
    bowling = []
    if league_positions and international_positions:
        batting.append(league_positions[0][0])
        for i in range(1,12):
            league_selected = 0
            international_selected = 0
            for j in league_positions[0][1:]:
                if j[0]=="None":
                    continue
                if int(j[0]) == i:
                    league_selected = j
                    break
            for j in international_positions[0][1:]:
                if j[0]=="None":
                    continue
                if int(j[0]) == i:
                    international_selected = j
                    break
            if league_selected != 0 and international_selected != 0:
                batting.append(combining_batting(league_selected, international_selected))
            elif league_selected != 0 and international_selected == 0:
                batting.append(league_selected)
            elif league_selected != 0 and international_selected == 0:
                batting.append(international_selected)
        
        if len(league_positions)==len(international_positions) and len(league_positions)==2:
            bowlingheader = league_positions[1][0]
            bowlingheader.remove('BBI')
            bowling.append(bowlingheader)
            for i in range(1,12):
                league_selected = 0
                international_selected = 0
                for j in league_positions[1][1:]:
                    if j[0]=="None":
                        continue
                    if int(j[0]) == i:
                        league_selected = j
                        break
                for j in international_positions[1][1:]:
                    if j[0]=="None":
                        continue
                    if int(j[0]) == i:
                        international_selected = j
                        break
                if league_selected != 0 and international_selected != 0:
                    bowling.append(combining_bowling(league_selected, international_selected))
                elif league_selected != 0 and international_selected == 0:
                    bowling.append(league_selected)
                elif league_selected != 0 and international_selected == 0:
                    bowling.append(international_selected)
        elif len(league_positions) == 2:
            bowling = league_positions[1]
        elif len(international_positions) == 2:
            bowling = international_positions[1]
    elif league_positions:
        batting = league_positions[0]
        if len(league_positions) == 2:
            bowling = league_positions[1]
    elif international_positions:
        batting = international_positions[0]
        if len(international_positions) == 2:
            bowling = international_positions[1]

    stats.append(batting)
    if bowling:
        stats.append(bowling)
                        
    return stats



def combining_batting(league, international):
    stats = [league[0]]
    stats.append(float(league[1])+float(international[1]))
    stats.append(float(league[2])+float(international[2]))
    stats.append(float(league[3])+float(international[3]))
    stats.append(float(league[4])+float(international[4]))
    if float(stats[4])==0:
        stats.append('-')
    else:
        stats.append(stats[2]/stats[4])
    stats.append((stats[2]/stats[3])*100)
    if float(league[7])>float(international[7]):
        stats.append(float(league[7]))
    else:
        stats.append(float(international[7]))
    stats.append(float(league[8])+float(international[8]))
    stats.append(float(league[9])+float(international[9]))
    stats.append(float(league[10])+float(international[10]))
    stats.append(float(league[11])+float(international[11]))
    stats.append(((float(league[12])*float(league[3]))+(float(international[12])*float(international[3])))/(float(league[3])+float(international[3])))

    return stats

def combining_bowling(league,international):
    stats = [league[0]]
    stats.append(float(league[1])+float(international[1]))
    balls = (float(league[2])*6)+(float(international[2])*6)
    stats.append(float(int(balls/6) + .1*(balls%6)))
    stats.append(float(league[3])+float(international[3]))
    stats.append(float(league[4])+float(international[4]))
    stats.append(float(stats[3]/balls))
    if stats[4] == 0:
        stats.append("-")
    else:
        stats.append(float(stats[3]/stats[4]))
    if stats[4] == 0:
        stats.append("-")
    else:
        stats.append(float(stats[3]/balls))
    stats.append(float(league[8])+float(international[8]))
    stats.append(float(league[10])+float(international[10]))
    stats.append(float(league[11])+float(international[11]))
    stats.append((((float(league[-1])*float(league[2]))+(float(international[-1])*float(international[2]))))/(float(league[2])+float(international[2])))

    return stats


def number_of_matches(id):
    webpage = requests.get("http://www.cricmetric.com/playerstats.py?player="+id+"&role=all&format=TWENTY20&groupby=match")
    webpage = str(webpage.content).replace("</td><tr>","</td></tr><tr>").replace("</td><tfoot>","</td></tr><tfoot>")
    soup = BeautifulSoup(webpage, 'html.parser')
    tables = soup.find_all('table',{'class':'table scoretable'})
    headers = []
    for table in tables:
        header = []
        for heading in table.find_all('th'):
            title = heading.text.strip()
            header.append(title)
        headers.append(header)
    league_player_stats = []
    for index,value in enumerate(tables):
        temp_record = [headers[index]]
        for row in value.find_all('tr')[1:-1]:
            
            data = row.find_all('td')
            row_data = [td.text.strip() for td in data]
            if(row_data[-2]!="-"):
                temp_record.append(row_data)
        league_player_stats.append(temp_record)

    webpage = requests.get("http://www.cricmetric.com/playerstats.py?player="+id+"&role=all&format=T20I&groupby=match")
    webpage = str(webpage.content).replace("</td><tr>","</td></tr><tr>").replace("</td><tfoot>","</td></tr><tfoot>")
    soup = BeautifulSoup(webpage, 'html.parser')
    tables = soup.find_all('table',{'class':'table scoretable'})
    headers = []
    for table in tables:
        header = []
        for heading in table.find_all('th'):
            title = heading.text.strip()
            header.append(title)
        headers.append(header)
    
    international_player_stats = []
    for index,value in enumerate(tables):
        temp_record = [headers[index]]
        for row in value.find_all('tr')[1:-1]:
            data = row.find_all('td')
            row_data = [td.text.strip() for td in data]
            if(row_data[-2]!="-"):
                temp_record.append(row_data)
        international_player_stats.append(temp_record)
    

    stats = []
    if league_player_stats and international_player_stats:
        if (len(league_player_stats)==len(international_player_stats)):
            for i in range(len(league_player_stats)):
                stats.append(league_player_stats[i]+international_player_stats[i][1:])
        elif(len(league_player_stats)>len(international_player_stats)):
            stats.append(league_player_stats[0]+international_player_stats[0][1:])
            stats.append(league_player_stats[1])
        else:
            stats.append(league_player_stats[0]+international_player_stats[0][1:])
            stats.append(international_player_stats[1])
    elif not league_player_stats:
        for i in range(len(international_player_stats)):
                stats.append(international_player_stats[i])
    elif not international_player_stats:
        for i in range(len(league_player_stats)):
                stats.append(league_player_stats[i])
    
    return stats



def update_records(stored,id):
    webpage = requests.get("http://www.cricmetric.com/playerstats.py?player="+id+"&role=all&format=TWENTY20&groupby=match")
    webpage = str(webpage.content).replace("</td><tr>","</td></tr><tr>").replace("</td><tfoot>","</td></tr><tfoot>")
    soup = BeautifulSoup(webpage, 'html.parser')
    tables = soup.find_all('table',{'class':'table scoretable'})
    
    for index,value in enumerate(tables):
        for row in value.find_all('tr')[1:-1]:
            
            data = row.find_all('td')
            row_data = [td.text.strip() for td in data]
            if not check_match(stored,row_data[0]):
                try:
                    link = "http://www.cricmetric.com"+row.find("a",{'href':True}).get("href")
                    date,venue = date_and_venue(link)
                    row_data.append(date)
                    row_data.append(venue)
                    stored[index].append(row_data)
                except:
                    pass

    webpage = requests.get("http://www.cricmetric.com/playerstats.py?player="+id+"&role=all&format=T20I&groupby=match")
    webpage = str(webpage.content).replace("</td><tr>","</td></tr><tr>").replace("</td><tfoot>","</td></tr><tfoot>")
    soup = BeautifulSoup(webpage, 'html.parser')
    tables = soup.find_all('table',{'class':'table scoretable'})
    
    for index,value in enumerate(tables):
        for row in value.find_all('tr')[1:-1]:
            
            data = row.find_all('td')
            row_data = [td.text.strip() for td in data]
            if not check_match(stored,row_data[0]):
                try:
                    link = "http://www.cricmetric.com"+row.find("a",{'href':True}).get("href")
                    date,venue = date_and_venue(link)
                    row_data.append(date)
                    row_data.append(venue)
                    stored[index].append(row_data)
                except:
                    pass
    stored[0][1:] = sorted(stored[0][1:], key=lambda x:datetime.strptime(x[13],"%b %d, %Y"))
    if len(stored) == 2:
        stored[1][1:] = sorted(stored[1][1:], key=lambda x:datetime.strptime(x[13],"%b %d, %Y"))
    
    return stored


def check_match(stored, match_id):
    for i in stored:
        for j in i:
            if j[0] == match_id:
                return True
    
    return False