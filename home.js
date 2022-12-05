import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, FlatList, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { data, addData } from './DataBase/api';

export default function Home({ route, navigation }) {
  const players = data()

  return (

    <View style={styles.container}>
      <ImageBackground source={require('./assets/stadium.jpg')} resizeMode="cover" style={styles.image}>
        <View style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          marginTop: 20
        }}
        >
          <TouchableOpacity style={styles.tile2}
            onPress={() => { navigation.navigate('Login') }}
          >
            <Image source={require('./assets/userIcon.png')} style={styles.thumbnail2} />
          </TouchableOpacity>
        </View>
        <View style={{
          flex: 1
        }}
        >
          <Text style={styles.heading}>My Team</Text>
          <Text style={styles.text}>Cricket made Easy!</Text>
        </View>
        <View style={{
          flex: 6
        }}
        >
          <Text style={styles.text2}>Players</Text>
          <FlatList
            horizontal={true}
            style={{}}
            data={players}
            renderItem={({ item }) => (
              <View>
                <TouchableOpacity style={styles.tile}>
                  <Image source={{ uri: item.picture }} style={styles.thumbnail} />
                  <Text style={styles.text}>{item.name}</Text>
                </TouchableOpacity>

              </View>

            )}
          />
          <Text style={styles.text2}>Teams</Text>
          <FlatList
            horizontal={true}
            style={{}}
            data={players}
            renderItem={({ item }) => (
              <View>
                <TouchableOpacity style={styles.tile}>
                  <Image source={{ uri: item.picture }} style={styles.thumbnail} />
                  <Text style={styles.text}>{item.name}</Text>
                </TouchableOpacity>

              </View>

            )}
          />
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
  text2: {
    color: "white",
    fontSize: 21,
    lineHeight: 42,
    fontWeight: "bold",
    marginHorizontal: 25
  },
  tile: {
    backgroundColor: '#000000c0',
    margin: 10,
    height: 240,
    width: 168,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tile2: {
    margin: 10,
    height: 80,
    borderRadius: 20,
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