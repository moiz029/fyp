import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, FlatList, Image} from 'react-native';
import {useState} from 'react';



export default function playingXI({ route, navigation }) {

    //const [players,setPlayers] = useState(['BABAR AZAM', 'BEN STOKES', 'GLENN MAXWELL', 'GLENN PHILLIPS', 'HARSHAL PATEL', 'LIAM LIVINGSTONE', 'MUHAMMAD RIZWAN', 'MOEEN ALI', 'MUSTAFIZUR RAHMAN', 'RASHID KHAN', 'SHAHEEN AFRIDI', 'WAINDU HASARANGA'])

    const [players, setPlayers] = useState([
        { name: 'BABAR AZAM', picSource: require('../assets/babarAzam.jpg') },
        { name: 'BEN STOKES', picSource: require('../assets/benStokes.jpg') },
        { name: 'GLENN MAXWELL', picSource: require('../assets/glennMaxwell.jpg') },
        { name: 'GLENN PHILLIPS', picSource: require('../assets/glennPhillips.jpg') },
        { name: 'HARSHAL PATEL', picSource: require('../assets/harshalPatel.jpg') },
        { name: 'LIAM LIVINGSTONE', picSource: require('../assets/liamLivingstone.jpg') },
        { name: 'MUHAMMAD RIZWAN', picSource: require('../assets/m.rizwan.jpg') },
        { name: 'MOEEN ALI', picSource: require('../assets/moeenAli.jpg') },
        { name: 'MUSTAFIZUR RAHMAN', picSource: require('../assets/mustafizurRahman.jpg')},
        { name: 'RASHID KHAN', picSource: require('../assets/rashidKhan.jpg') },
        { name: 'SHAHEEN AFRIDI', picSource: require('../assets/shaheenAfridi.jpg') },
        { name: 'WAINDU HASARANGA', picSource: require('../assets/waninduHasaranga.jpg') },
      ]);

    return(
        <View style={styles.container}>
            <ImageBackground source={require('../assets/stadium.jpg')} resizeMode="cover" style={styles.image}>
            
            <View style = {{flex: 1, flexDirection:'row'}}>
                <TouchableOpacity style = {styles.tile2}
                >
                    <Image source= {require('../assets/batsman.png')} style = {styles.thumbnail2} />
                </TouchableOpacity>
                
                <TouchableOpacity style = {styles.tile2}>
                    <Image source= {require('../assets/allRounder.png')} style = {styles.thumbnail2} />
                </TouchableOpacity>

                <TouchableOpacity style = {styles.tile2}>
                    <Image source= {require('../assets/bowler.png')} style = {styles.thumbnail2} />
                </TouchableOpacity>
                
                
            </View>

            <View style = {{flex:6}}>
                <FlatList
                    numColumns={2}
                    style = {{}}
                    data = {players}
                    renderItem={({item}) => (
                        <View>
                            <TouchableOpacity style = {styles.tile}>
                                <Image source= {item.picSource} style = {styles.thumbnail} />
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