from os import stat
from site import venv
from turtle import position
from bs4 import BeautifulSoup
import requests

def head_to_head(batsman,bowler):
    webpage = requests.get("http://www.cricmetric.com/matchup.py?batsman="+batsman+"&bowler="+bowler+"&groupby=match")
    webpage = str(webpage.content).replace("</td><tr>","</td></tr><tr>").replace("</td><tfoot>","</td></tr><tfoot>")
    soup = BeautifulSoup(webpage, 'html.parser')
    tables = soup.find_all('div',{'class':'panel panel-default'})
    required_tables = []
    for table in tables:
        if table.find('div',{'class':'panel-heading'}).text.strip() == "TWENTY20" or table.find('div',{'class':'panel-heading'}).text.strip() == "T20I":
            required_tables.append(table)
    headers = []
    for table in required_tables:
        header = []
        for heading in table.find_all('th'):
            title = heading.text.strip()
            header.append(title)
        headers.append(header)
    head_to_head_stats = []
    for index,value in enumerate(required_tables):
        temp_record = [headers[index]]
        for row in value.find_all('tr')[1:-1]:
            data = row.find_all('td')
            row_data = [td.text.strip() for td in data]
            temp_record.append(row_data)
        head_to_head_stats.append(temp_record)
    return stats_management(head_to_head_stats)

def stats_management(stats):
    if len(stats)>1:
        updated_stats = stats[0][0:]+stats[1][1:]
        return updated_stats
    return stats