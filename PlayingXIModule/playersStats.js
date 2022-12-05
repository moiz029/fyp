import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, FlatList, Image } from 'react-native';
import { useState, useEffect } from "react"

export default function PlayerStats({ route, navigation }) {

  var player = route.params.item
  // var stats = {}

  const [check, setCheck] = useState(false)
  var [stats, setStats] = useState()

  const getPlayer = async () => {

    fetch('http://192.168.18.53:5000/get_player_summary/' + player.cricmetric)
      .then((res) => {
        console.log('PlayerStats api called');
        return res.json()
      })
      .then((res) => {
        console.log('Player stats recieved');
        // stats = res
        setStats(res)
        setCheck(true)

      })
      .catch((err) => {
        console.log('Error: ', err);
        console.error(err);
      })
  }

  // useEffect(() => {
  //   getPlayer();
  // }, []);
  if (!check) {
    getPlayer();
  }



  if (!check) {
    return (
      <View style={{ flex: 1, backgroundColor: "black" }}>
        <Text style={{ flex: 1, color: "white" }}>Loading</Text>
      </View>
    )
  } else if (stats.Batsman == true) {
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../assets/stadium.jpg')} resizeMode="cover" style={styles.image}>

          <View style={{ flex: 2 }}>
            <TouchableOpacity
              style={styles.tile2}
            >
              <Image source={{ uri: stats.picture }} style={styles.thumbnail} />
              <Text style={styles.text3}>{stats.name}</Text>

            </TouchableOpacity>

          </View>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: "space-around", }}>

            <View style={{ backgroundColor: '#000000c0', padding: 20, alignItem: "space-between", borderRadius: 15, maxHeight: 200 }}>
              <Text style={styles.text2}>Runs: {stats.batting_runs}</Text>
              <Text style={styles.text2}>Innings: {stats.batting_innings}</Text>
              <Text style={styles.text2}>Average: {(stats.batting_avg).toFixed(1)}</Text>
              <Text style={styles.text2}>StrikeRate: {(stats.batting_sr.toFixed(1))}</Text>
            </View>

            <View style={{ backgroundColor: '#000000c0', padding: 20, maxHeight: 200, borderRadius: 15 }}>
              <Text style={styles.text2}>BallPlayed: {stats.batting_balls}</Text>
              <Text style={styles.text2}>Dots: {(stats.batting_dots).toFixed(0)}%</Text>
              <Text style={styles.text2}>4's: {stats.batting_4s}</Text>
              <Text style={styles.text2}>6's: {stats.batting_6s}</Text>
            </View>

          </View>
        </ImageBackground>
      </View>
    )
  }
  else if (stats.Bowler == true) {
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../assets/stadium.jpg')} resizeMode="cover" style={styles.image}>

          <View style={{ flex: 2 }}>
            <TouchableOpacity
              style={styles.tile2}
            >
              <Image source={{ uri: stats.picture }} style={styles.thumbnail} />
              <Text style={styles.text3}>{stats.name}</Text>

            </TouchableOpacity>

          </View>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: "space-around", }}>

            <View style={{ backgroundColor: '#000000c0', padding: 20, alignItem: "space-between", borderRadius: 15, maxHeight: 200 }}>
              <Text style={styles.text2}>Matches: {stats.bowling_innings}</Text>
              <Text style={styles.text2}>Average: {stats.bowling_average.toFixed(1)}</Text>
              <Text style={styles.text2}>Economy: {(stats.bowling_economy).toFixed(1)}</Text>
              <Text style={styles.text2}>StrikeRate: {(stats.bowling_sr.toFixed(1))}</Text>
            </View>

            <View style={{ backgroundColor: '#000000c0', padding: 20, maxHeight: 200, borderRadius: 15 }}>
              <Text style={styles.text2}>Overs: {stats.bowling_overs}</Text>
              <Text style={styles.text2}>Runs: {(stats.bowling_runs)}</Text>
              <Text style={styles.text2}>Wickets: {stats.bowling_wickets}</Text>
              <Text style={styles.text2}>Dots: {stats.bowling_dots.toFixed(1)}</Text>
            </View>

          </View>
        </ImageBackground>
      </View>
    )
  }
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
    //textAlign: "center",
    fontStyle: 'italic'
  },
  text3: {
    color: "white",
    fontSize: 22,
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
    width: 400,
    borderRadius: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  thumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
    width: 300,
    borderRadius: 10
  },


});