from site import venv
from bs4 import BeautifulSoup
import requests
from datetime import datetime
def player_details(id):
    
    player_stats = stats_management(leagues_stats(id),international_stats(id))
    return {
        "playername":"Stats",
        "playerid": id,
        "stats": player_stats
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
            temp_record.append(row_data)
        player_stats.append(temp_record)
    return player_stats


def international_stats(id):
    webpage = requests.get("http://www.cricmetric.com/playerstats.py?player="+id+"&role=all&format=T20I&groupby=match")
    soup = BeautifulSoup(webpage.content, 'html.parser')
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
            temp_record.append(row_data)
        player_stats.append(temp_record)
    return player_stats

def date_and_venue(link="http://www.cricmetric.com/match/2018_T20_04"):
    webpage = requests.get(link)
    soup = BeautifulSoup(webpage.content, 'html.parser')
    details = soup.find('div',{'class':'panel-heading'}).text.strip().split('|')
    venue = details[1][1:]
    date = details[0][-13:-1]
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
    
    

        