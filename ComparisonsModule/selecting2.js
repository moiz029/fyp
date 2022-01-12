import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity} from 'react-native';
import {useState} from 'react';
import { Picker } from '@react-native-picker/picker';


export default function Selection({ route, navigation }) {

  const [players, setPlayers] = useState([
    {
      name: 'BABAR AZAM',
      picSource: require('../assets/babarAzam.jpg'),
      type: 'Batsman',
      country: 'Pakistan',
      innings: 80,
      iccRanking: 1,
      runs: 3300,
      avg: 48.5,
      strikeRate: 100.5,
      hundreds: 5,
      fifties: 12,
      highest: 125,
    },
    {
      name: 'BEN STOKES',
      picSource: require('../assets/benStokes.jpg'),
      type: 'Batsman',
      country: 'England',
      innings: 80,
      iccRanking: 1,
      runs: 3300,
      avg: 48.5,
      strikeRate: 100.5,
      hundreds: 5,
      fifties: 12,
      highest: 125,
    },
    {
      name: 'GLENN MAXWELL',
      picSource: require('../assets/glennMaxwell.jpg'),
      type: 'Batsman',
      country: 'Pakistan',
      innings: 80,
      iccRanking: 1,
      runs: 3300,
      avg: 48.5,
      strikeRate: 100.5,
      hundreds: 5,
      fifties: 12,
      highest: 125,
    },
    {
      name: 'GLENN PHILLIPS',
      picSource: require('../assets/glennPhillips.jpg'),
      type: 'Batsman',
      country: 'Pakistan',
      innings: 80,
      iccRanking: 1,
      runs: 3300,
      avg: 48.5,
      strikeRate: 100.5,
      hundreds: 5,
      fifties: 12,
      highest: 125,
    },
    {
      name: 'HARSHAL PATEL',
      picSource: require('../assets/harshalPatel.jpg'),
      type: 'Batsman',
      country: 'Pakistan',
      innings: 80,
      iccRanking: 1,
      runs: 3300,
      avg: 48.5,
      strikeRate: 100.5,
      hundreds: 5,
      fifties: 12,
      highest: 125,
    },
    {
      name: 'LIAM LIVINGSTONE',
      picSource: require('../assets/liamLivingstone.jpg'),
      type: 'Batsman',
      country: 'Pakistan',
      innings: 80,
      iccRanking: 1,
      runs: 3300,
      avg: 48.5,
      strikeRate: 100.5,
      hundreds: 5,
      fifties: 12,
      highest: 125,
    },
    {
      name: 'MUHAMMAD RIZWAN',
      picSource: require('../assets/m.rizwan.jpg'),
      type: 'Batsman',
      country: 'Pakistan',
      innings: 80,
      iccRanking: 1,
      runs: 3300,
      avg: 48.5,
      strikeRate: 100.5,
      hundreds: 5,
      fifties: 12,
      highest: 125,
    },
    {
      name: 'MOEEN ALI',
      picSource: require('../assets/moeenAli.jpg'),
      type: 'Batsman',
      country: 'Pakistan',
      innings: 80,
      iccRanking: 1,
      runs: 3300,
      avg: 48.5,
      strikeRate: 100.5,
      hundreds: 5,
      fifties: 12,
      highest: 125,
    },
    {
      name: 'MUSTAFIZUR RAHMAN',
      picSource: require('../assets/mustafizurRahman.jpg'),
      type: 'Batsman',
      country: 'Pakistan',
      innings: 80,
      iccRanking: 1,
      runs: 3300,
      avg: 48.5,
      strikeRate: 100.5,
      hundreds: 5,
      fifties: 12,
      highest: 125,
    },
    {
      name: 'RASHID KHAN',
      picSource: require('../assets/rashidKhan.jpg'),
      type: 'Batsman',
      country: 'Pakistan',
      innings: 80,
      iccRanking: 1,
      runs: 3300,
      avg: 48.5,
      strikeRate: 100.5,
      hundreds: 5,
      fifties: 12,
      highest: 125,
    },
    {
      name: 'SHAHEEN AFRIDI',
      picSource: require('../assets/shaheenAfridi.jpg'),
      type: 'Batsman',
      country: 'Pakistan',
      innings: 80,
      iccRanking: 1,
      runs: 3300,
      avg: 48.5,
      strikeRate: 100.5,
      hundreds: 5,
      fifties: 12,
      highest: 125,
    },
    {
      name: 'WAINDU HASARANGA',
      picSource: require('../assets/waninduHasaranga.jpg'),
      type: 'Bowler',
      country: 'SriLanka',
      innings: 80,
      iccRanking: 1,
      runs: 3300,
      avg: 48.5,
      strikeRate: 100.5,
      hundreds: 5,
      fifties: 12,
      highest: 125,
    },
  ])

  var player1 = {}
  var player2 = {}
  var [selectedCountry, setSelectedCountry] = useState('Country')
  var [selectedType, setSelectedType] = useState('Type')
  var [selectedPlayer1, setSelectedPlayer1] = useState('BABAR AZAM')
  var [selectedPlayer2, setSelectedPlayer2] = useState('BABAR AZAM')

  var types = ['Type']
  players.map((player)=>{
    if(!types.includes(player.type))
      types.push(player.type)
  })
 
  var countries = ['Country']
  players.map((player)=>{
    if(!countries.includes(player.country))
      countries.push(player.country)
  })

  
  return (
    <View style={styles.container}>
      
      <ImageBackground source={require('../assets/stadium.jpg')} resizeMode="cover" style={styles.image}>
        
        

        <View style = {{flexDirection: 'row', marginBottom: 90, flex: 1}}>
          <View style= {{justifyContent: 'center', alignSelf: 'center',marginHorizontal:5,flex: 1}}>
            <Picker
              style={{ height: 30, justifyContent: 'center', backgroundColor: '#ff8182c0'}}
              selectedValue={selectedCountry}
              onValueChange={(selected) => {setSelectedCountry(selected)}}
            >
              {countries.map((item, index) => {
                
                return(
                  <Picker.Item label={item} value={item} key={index}/>
                )})
              }
              
            </Picker>
            
          </View>
          <View style= {{justifyContent: 'center', alignSelf: 'center',flex: 1}}>
            <Picker
              style={{ height: 30, justifyContent: 'center', backgroundColor: '#ff8182c0'}}
              selectedValue={selectedType}
              onValueChange={(selected) => {setSelectedType(selected)}}
              
            >
              {types.map((item, index) => {
                  
                return(
                  <Picker.Item label={item} value={item} key={index}/>
                )})
              }
                
            </Picker>
          </View>
        </View>

        <Text style = {styles.text}>Player 1</Text>


        <View  style= {{justifyContent: 'center', alignSelf: 'center', marginBottom: 30,flex: 2}}>
          <Picker
            style={{ height: 40,width: 250, justifyContent: 'center', backgroundColor: '#ff8182c0'}}
            // selectedValue={selectedPlayer1}
            onValueChange={(selected) => { player1 = selected
            // setSelectedPlayer1(selected.name)
            }}
            
          >
            {players.map((item, index) => {
              if(selectedCountry == 'Country' && selectedType == 'Type'){
                return(
                  <Picker.Item label={item.name} value={item} key={index}/>
                )
              }
              else if(selectedCountry == 'Country' && item.type == selectedType){
                return(
                  <Picker.Item label={item.name} value={item} key={index}/>
                )
              }
              else if(item.country == selectedCountry && selectedType == 'Type'){
                return(
                  <Picker.Item label={item.name} value={item} key={index}/>
                )
              }
              else if(item.country == selectedCountry && item.type == selectedType){
                return(
                  <Picker.Item label={item.name} value={item} key={index}/>
                )
              }
            })}
              
          </Picker>
        </View>

        <Text style = {styles.text2}>Player 2</Text>
        
        
        <View  style= {{justifyContent: 'center', alignSelf: 'center', flex:2}}>
          <Picker
            style={{ height: 40,width: 250, justifyContent: 'center', backgroundColor: '#5bcffac0'}}
            // selectedValue={selectedPlayer2.name}
            onValueChange={(selected) => { 
              // setSelectedPlayer2(selected)
              player2 = selected
            }}
            
          >
            {players.map((item, index) => {
              if(selectedCountry == 'Country' && selectedType == 'Type'){
                return(
                  <Picker.Item label={item.name} value={item} key={index}/>
                )
              }
              else if(selectedCountry == 'Country' && item.type == selectedType){
                return(
                  <Picker.Item label={item.name} value={item} key={index}/>
                )
              }
              else if(item.country == selectedCountry && selectedType == 'Type'){
                return(
                  <Picker.Item label={item.name} value={item} key={index}/>
                )
              }
              else if(item.country == selectedCountry && item.type == selectedType){
                return(
                  <Picker.Item label={item.name} value={item} key={index}/>
                )
              }
            })}
              
          </Picker>
        </View>
        <View>
          <TouchableOpacity
            onPress={()=>{
              navigation.navigate('Compare', {player1, player2})
            }}
          >
            <Text style = {styles.text}>Compare</Text>
          </TouchableOpacity>
        </View>

      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  
  image: {
    flex: 1,
    justifyContent: "center"
  },
  text: {
    color: "#ff8182c0",
    fontSize: 21,
    lineHeight: 42,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0"
  },
  text2: {
    color: "#5bcffac0",
    fontSize: 21,
    lineHeight: 42,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0"
  }
});