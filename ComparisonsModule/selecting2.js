import React from 'react';
import { StyleSheet, Text, View, ImageBackground} from 'react-native';
import {useState} from 'react';
import { Picker } from '@react-native-picker/picker';


export default function Selection({ route, navigation }) {

  const [names, setName] = useState([
    'Name', 'toba', 'ahmed', 'shafiq', 'haseeb', 'qaiser']);
  const [country, setCountry] = useState([
    'Country', 'Pakistan', 'India', 'England', 'Sri Lanka', 'Afghanistan']);
  const [type, setType] = useState([
    'Type', 'Batsman', 'Bowler', 'WicketKeeper', 'All-Rounder']);
  const [selected, setSelected] = useState()
  
  
  return (
    <View style={styles.container}>
      
      <ImageBackground source={require('../assets/stadium.jpg')} resizeMode="cover" style={styles.image}>
        <Text style = {styles.text}>Player 1</Text>
        <View style = {{flexDirection: 'row', marginBottom: 90}}>
          <View style= {{justifyContent: 'center', alignSelf: 'center',marginHorizontal:5,marginVertical: 20,flex: 1}}>
            <Picker
              style={{ height: 30, justifyContent: 'center', backgroundColor: '#ff8182c0'}}
              onValueChange={(select) => {setSelected(select)
                console.log(country[selected]
                )}}
            >
              {country.map((item, index) => {
                
                return(
                  <Picker.Item label={item} value={index} key={index}/>
                )})
              }
              
            </Picker>
          </View>
          <View style= {{justifyContent: 'center', alignSelf: 'center',flex: 1}}>
            <Picker
              style={{ height: 30, justifyContent: 'center', backgroundColor: '#ff8182c0'}}
              onValueChange={(select) => {setSelected(select)
                console.log(type[selected]
                )}}
            >
              {type.map((item, index) => {
                  
                return(
                  <Picker.Item label={item} value={index} key={index}/>
                )})
              }
                
            </Picker>
          </View>
        </View>
        <View  style= {{justifyContent: 'center', alignSelf: 'center', marginBottom: 60,flex: 1}}>
          <Picker
            style={{ height: 40,width: 250, justifyContent: 'center', backgroundColor: '#ff8182c0'}}
            onValueChange={(select) => {setSelected(select)
              console.log(names[selected]
              )}}
          >
            {names.map((item, index) => {
              
              return(
                <Picker.Item label={item} value={index} key={index}/>
              )})
            }
              
          </Picker>
        </View>
        <Text style = {styles.text2}>Player 2</Text>
        <View style = {{flexDirection: 'row', marginBottom: 100}}>
          <View style= {{justifyContent: 'center', alignSelf: 'center',marginHorizontal:10,marginVertical: 20,flex:1}}>
            <Picker
              style={{ height: 30, justifyContent: 'center', backgroundColor: '#5bcffac0'}}
              onValueChange={(select) => {setSelected(select)
                console.log(country[selected]
                )}}
            >
              {country.map((item, index) => {
                
                return(
                  <Picker.Item label={item} value={index} key={index}/>
                )})
              }
              
            </Picker>
          </View>
          <View style= {{justifyContent: 'center', alignSelf: 'center',flex:1}}>
            <Picker
              style={{ height: 30, justifyContent: 'center', backgroundColor: '#5bcffac0'}}
              onValueChange={(select) => {setSelected(select)
                console.log(type[selected]
                )}}
            >
              {type.map((item, index) => {
                  
                return(
                  <Picker.Item label={item} value={index} key={index}/>
                )})
              }
                
            </Picker>
          </View>
        </View>
        <View  style= {{justifyContent: 'center', alignSelf: 'center', marginBottom: 30}}>
          <Picker
            style={{ height: 40,width: 250, justifyContent: 'center', backgroundColor: '#5bcffac0'}}
            onValueChange={(select) => {setSelected(select)
              console.log(names[selected]
              )}}
          >
            {names.map((item, index) => {
              
              return(
                <Picker.Item label={item} value={index} key={index}/>
              )})
            }
              
          </Picker>
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