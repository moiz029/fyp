import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { data, addData } from '../DataBase/api';
//import {data, addData} from '../DataBase/data'
import { set } from 'react-native-reanimated';


export default function Selection({ route, navigation }) {
  const players = data()

  var player1 = {}
  var player2 = {}
  var [selectedCountry, setSelectedCountry] = useState('Country')
  var [selectedType, setSelectedType] = useState('Type')
  var [selectedPlayer1, setSelectedPlayer1] = useState({})
  var [selectedPlayer2, setSelectedPlayer2] = useState({})

  var types = ['Type']
  players.map((player) => {
    if (!types.includes(player.role))
      types.push(player.role)
  })

  var countries = ['Country']
  players.map((player) => {
    if (!countries.includes(player.country))
      countries.push(player.country)
  })


  return (
    <View style={styles.container}>

      <ImageBackground source={require('../assets/stadium.jpg')} resizeMode="cover" style={styles.image}>



        <View style={{ flexDirection: 'row', marginBottom: 90, flex: 1 }}>
          <View style={{ justifyContent: 'center', alignSelf: 'center', marginHorizontal: 5, flex: 1 }}>
            <Picker
              style={{ height: 30, justifyContent: 'center', backgroundColor: '#ff8182c0' }}
              selectedValue={selectedCountry}
              onValueChange={(selected) => { setSelectedCountry(selected) }}
            >
              {countries.map((item, index) => {

                return (
                  <Picker.Item label={item} value={item} key={index} />
                )
              })
              }

            </Picker>

          </View>
          <View style={{ justifyContent: 'center', alignSelf: 'center', flex: 1 }}>
            <Picker
              style={{ height: 30, justifyContent: 'center', backgroundColor: '#ff8182c0' }}
              selectedValue={selectedType}
              onValueChange={(selected) => { setSelectedType(selected) }}

            >
              {types.map((item, index) => {

                return (
                  <Picker.Item label={item} value={item} key={index} />
                )
              })
              }

            </Picker>
          </View>
        </View>

        <Text style={styles.text}>Player 1</Text>


        <View style={{ justifyContent: 'center', alignSelf: 'center', marginBottom: 30, flex: 2 }}>
          <Picker
            style={{ height: 40, width: 250, justifyContent: 'center', backgroundColor: '#ff8182c0' }}
            selectedValue={selectedPlayer1}
            onValueChange={(selected) => {
              player1 = selected
              //setSelectedPlayer1(selected)
            }}

          >
            {players.map((item, index) => {
              if (selectedCountry == 'Country' && selectedType == 'Type') {
                return (
                  <Picker.Item label={item.name} value={item} key={index} />
                )
              }
              else if (selectedCountry == 'Country' && item.role == selectedType) {
                return (
                  <Picker.Item label={item.name} value={item} key={index} />
                )
              }
              else if (item.country == selectedCountry && selectedType == 'Type') {
                return (
                  <Picker.Item label={item.name} value={item} key={index} />
                )
              }
              else if (item.country == selectedCountry && item.role == selectedType) {
                return (
                  <Picker.Item label={item.name} value={item} key={index} />
                )
              }
            })}

          </Picker>
        </View>

        <Text style={styles.text2}>Player 2</Text>


        <View style={{ justifyContent: 'center', alignSelf: 'center', flex: 2 }}>
          <Picker
            style={{ height: 40, width: 250, justifyContent: 'center', backgroundColor: '#5bcffac0' }}
            selectedValue={selectedPlayer2}
            onValueChange={(selected) => {
              //setSelectedPlayer2(selected)
              player2 = selected
            }}

          >
            {players.map((item, index) => {
              if (selectedCountry == 'Country' && selectedType == 'Type') {
                return (
                  <Picker.Item label={item.name} value={item} key={index} />
                )
              }
              else if (selectedCountry == 'Country' && item.role == selectedType) {
                return (
                  <Picker.Item label={item.name} value={item} key={index} />
                )
              }
              else if (item.country == selectedCountry && selectedType == 'Type') {
                return (
                  <Picker.Item label={item.name} value={item} key={index} />
                )
              }
              else if (item.country == selectedCountry && item.role == selectedType) {
                return (
                  <Picker.Item label={item.name} value={item} key={index} />
                )
              }
            })}

          </Picker>
        </View>
        <View style={{ marginBottom: 10 }}>
          <TouchableOpacity
            onPress={() => {
              console.log(player1)
              navigation.navigate('Compare', { player1, player2 })
            }}
          >
            <Text style={styles.text}>Compare</Text>
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