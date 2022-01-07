import { StyleSheet, Text, View, TouchableOpacity, Picker, ImageBackground, FlatList, Image} from 'react-native';
import {useState} from 'react';

export default function Compare({ route, navigation }) {
    const [player1,setPlayer1] = useState({name:'BEN STOKES', country:'ENGLAND', innings:110, iccRanking:25, runs:4500, avg:69.3, strikeRate:98, hundreds:15, fifties:6, highest:137})
    const [player2,setPlayer2] = useState({name:'BABAR AZAM', country:'Pakistan', innings:80, iccRanking:1, runs:3300, avg:48.5, strikeRate:100.5, hundreds:5, fifties:12, highest:125})
    //const [player1,setPlayer1] = useState(['BEN STOKES', 'ENGLAND', 110, 25, 4500, 69.3, 98, 15, 6, 137])
    //const [player2,setPlayer2] = useState(['BABAR AZAM', 'Pakistan', 80, 1, 48.5, 100.5, 5, 12, 125])
    //const [stats,setStats] = useState(['NAME','COUNTRY','INNINGS','ICC RANKING','RUNS','AVG','STRIKE RATE','HUNDREDS','FIFTIES','HIGHEST'])
    
    return(
        <View style={styles.container}>
            <ImageBackground source={require('../assets/stadium.jpg')} resizeMode="cover" style={styles.image}>
            
            
            <View style = {{flexDirection: 'row', margin: 10}}>
                
                <TouchableOpacity style = {styles.tile2}>
                <Image source= {require('../assets/benStokes.jpg')} style = {styles.thumbnail} />
                    <Text style = {styles.text3}>{player1.name}</Text>
                </TouchableOpacity>

                <TouchableOpacity style = {styles.tile2}>
                    <Image source= {require('../assets/babarAzam.jpg')} style = {styles.thumbnail} />
                    <Text style = {styles.text3}>{player2.name}</Text>
                </TouchableOpacity>
            
            </View>
            
            <View style = {{flexDirection: 'row'}}>
                
                <TouchableOpacity style = {styles.tilep1}>
                    <Text style = {styles.text2}>{player1.innings}</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style = {styles.tile}>
                    <Text style = {styles.text2}>INNINGS</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style = {styles.tilep2}>
                    <Text style = {styles.text2}>{player2.innings}</Text>
                </TouchableOpacity>

            </View>
            <View style = {{flexDirection: 'row'}}>
                
                <TouchableOpacity style = {styles.tilep1}>
                    <Text style = {styles.text2}>{player1.iccRanking}</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style = {styles.tile}>
                    <Text style = {styles.text2}>ICC RANKING</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style = {styles.tilep2}>
                    <Text style = {styles.text2}>{player2.iccRanking}</Text>
                </TouchableOpacity>

            </View>
            <View style = {{flexDirection: 'row'}}>
                
                <TouchableOpacity style = {styles.tilep1}>
                    <Text style = {styles.text2}>{player1.runs}</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style = {styles.tile}>
                    <Text style = {styles.text2}>ICC RUNS</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style = {styles.tilep2}>
                    <Text style = {styles.text2}>{player2.runs}</Text>
                </TouchableOpacity>

            </View>
            <View style = {{flexDirection: 'row'}}>
                
                <TouchableOpacity style = {styles.tilep1}>
                    <Text style = {styles.text2}>{player1.avg}</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style = {styles.tile}>
                    <Text style = {styles.text2}>AVERAGE</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style = {styles.tilep2}>
                    <Text style = {styles.text2}>{player2.avg}</Text>
                </TouchableOpacity>

            </View>
            <View style = {{flexDirection: 'row'}}>
                
                <TouchableOpacity style = {styles.tilep1}>
                    <Text style = {styles.text2}>{player1.strikeRate}</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style = {styles.tile}>
                    <Text style = {styles.text2}>STRIKE RATE</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style = {styles.tilep2}>
                    <Text style = {styles.text2}>{player2.strikeRate}</Text>
                </TouchableOpacity>

            </View>
            <View style = {{flexDirection: 'row'}}>
                
                <TouchableOpacity style = {styles.tilep1}>
                    <Text style = {styles.text2}>{player1.fifties}</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style = {styles.tile}>
                    <Text style = {styles.text2}>FIFTIES</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style = {styles.tilep2}>
                    <Text style = {styles.text2}>{player2.fifties}</Text>
                </TouchableOpacity>

            </View>
            <View style = {{flexDirection: 'row'}}>
                
                <TouchableOpacity style = {styles.tilep1}>
                    <Text style = {styles.text2}>{player1.hundreds}</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style = {styles.tile}>
                    <Text style = {styles.text2}>HUNDREDS</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style = {styles.tilep2}>
                    <Text style = {styles.text2}>{player2.hundreds}</Text>
                </TouchableOpacity>

            </View>
            <View style = {{flexDirection: 'row'}}>
                
                <TouchableOpacity style = {styles.tilep1}>
                    <Text style = {styles.text2}>{player1.highest}</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style = {styles.tile}>
                    <Text style = {styles.text2}>HIGHEST</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style = {styles.tilep2}>
                    <Text style = {styles.text2}>{player2.highest}</Text>
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
      color: "#ff6363c0",
      fontSize: 21,
      lineHeight: 42,
      fontWeight: "bold",
      textAlign: "center",
      backgroundColor: "#000000c0"
    },
    text2: {
      color: "white",
      fontSize: 21,
      lineHeight: 42,
      fontWeight: "bold",
      textAlign: "center"
    },
    text3: {
        color: "white",
        fontSize: 22,
        lineHeight: 42,
        fontWeight: "bold",
        textAlign: "center"
      },
    tile: {
        backgroundColor: '#d9ed92c0',
        alignItems: 'center',
        margin: 2,
        height: 40,
        borderRadius: 20,
        flex: 3
    },
    tilep1: {
        backgroundColor: '#ff8182c0',
        alignItems: 'center',
        margin: 2,
        height: 40,
        borderRadius: 20,
        flex: 1
    },
    tilep2: {
        backgroundColor: '#5bcffac0',
        alignItems: 'center',
        margin: 2,
        height: 40, 
        borderRadius: 20,
        flex: 1
    },
    tile2: {
        backgroundColor: '#000000c0',
        margin: 10,
        height: 200,
        width: 250, 
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


  });