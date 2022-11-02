import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, FlatList, Image} from 'react-native';
import InfiniteScroll from "react-infinite-scroller";
import {useState, useEffect} from 'react';
import {data, addData} from '../DataBase/api';



export default function allPlayers({ route, navigation }) {

  const players = data()

      

    return(
        <View style={styles.container}>
            <ImageBackground source={require('../assets/stadium.jpg')} resizeMode="cover" style={styles.image}>
 

            <View style = {{flex:1}}>
                <FlatList
                    numColumns={2}
                    style = {{}}
                    data = {players}
                    keyExtractor={item => item.name}
                    renderItem={({item}) => (
                        <View>
                            <TouchableOpacity 
                                style = {styles.tile}
                                onPress =  {()=>{
                                        navigation.navigate('PlayerStats', {item})
                                }
                                 
                                }
                            >
                                <Image source= {{uri: item.picture}} style = {styles.thumbnail} />
                                <Text style = {styles.text}>{item.name}</Text>
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