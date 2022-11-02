import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, FlatList, Image } from 'react-native';
import { useState, useEffect } from 'react';

export default function home({ route, navigation }) {


  return (

    <View style={styles.container}>
      <ImageBackground source={require('./assets/stadium.jpg')} resizeMode="cover" style={styles.image}>
        <View>
          <Text style={styles.heading}>My Team</Text>
          <Text style={styles.text}>Cricket made Easy!</Text>
        </View>
      </ImageBackground>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  heading: {
    color: "white",
    fontSize: 50,
    fontWeight: "bold",
    textAlign: "center",
    fontStyle: 'italic'
  },

  image: {
    flex: 1,
    justifyContent: "center"
  },
  text: {
    color: "white",
    fontSize: 21,
    lineHeight: 42,
    fontWeight: "bold",
    textAlign: "center"
  },
  tile: {
    backgroundColor: '#000000c0',
    margin: 10,
    height: 240,
    width: 168,
    borderRadius: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tile2: {
    margin: 10,
    height: 80,
    borderRadius: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  thumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 140,
    width: 140,
    borderRadius: 10
  },
  thumbnail2: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    width: 70,
    borderRadius: 10
  },


});