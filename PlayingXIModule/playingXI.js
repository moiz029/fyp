import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, FlatList, Image} from 'react-native';
import {useState, useEffect} from 'react';


export default function playingXI({ route, navigation }) {

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
      ])

      useEffect(()=>{
          if (route.params?.selectedPlayers){
              console.log('sent succesfully.')
          }
      }, [route.params?.selectedPlayers])

      var batsmen = []
      var bowlers = []
      var allRounders = []

      var selectedPlayers = route.params?.selectedPlayers
      selectedPlayers = (selectedPlayers == undefined)? []: (route.params?.selectedPlayers)

      console.log('started')
      batsmen = players.filter((player)=>{return (player.type == 'Batsman')})
      console.log(batsmen)
      bowlers = players.filter((player)=>{return(player.type == 'Bowler')})
      console.log(bowlers)
      allRounders = players.filter((player)=>{player.type == 'AllRounder'})
      console.log(allRounders)

    return(
        <View style={styles.container}>
            <ImageBackground source={require('../assets/stadium.jpg')} resizeMode="cover" style={styles.image}>
 
            <View style = {{flex: 1, flexDirection:'row'}}>
                <TouchableOpacity style = {styles.tile2}
                    onPress={()=>{navigation.navigate('Batsmen', {batsmen, selectedPlayers} )}}
                >
                    <Image source= {require('../assets/batsman.png')} style = {styles.thumbnail2} />
                </TouchableOpacity>
                
                <TouchableOpacity style = {styles.tile2}
                    onPress={()=>{navigation.navigate('AllRounder',{allRounders, selectedPlayers})}}
                >
                    <Image source= {require('../assets/allRounder.png')} style = {styles.thumbnail2} />
                </TouchableOpacity>

                <TouchableOpacity style = {styles.tile2}
                    onPress={()=>{navigation.navigate('Bowler',{bowlers, selectedPlayers})}}
                >
                    <Image source= {require('../assets/bowler.png')} style = {styles.thumbnail2} />
                </TouchableOpacity>
                
                
            </View>

            <View style = {{flex:6}}>
                <FlatList
                    numColumns={2}
                    style = {{}}
                    data = {selectedPlayers}
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