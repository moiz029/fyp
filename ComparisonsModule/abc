import { StyleSheet, Text, View, TouchableOpacity, Picker, ImageBackground, FlatList, Image } from 'react-native';
import { useState, useEffect } from "react"

//var CalStats = []
var p1Stats = []
var p2Stats = []
export default function Compare({ route, navigation }) {

    var player1 = route.params.player1
    var player2 = route.params.player2
    // var p1Stats = route.params.p1Stats
    // var p2Stats = route.params.p2Stats

    //const [p1Stats, setp1Stats] = useState([]);
    //const [p2Stats, setp2Stats] = useState([]);

    const [check, setCheck] = useState(false);
    const [CalStats, setCalStats] = useState([[], []]);

    console.log('CalStats: ', CalStats)


    const calculateStats = (object) => {
        var innings = 0
        var runs = 0
        var balls = 0
        var dismissals = 0
        var fifties = 0
        var centuries = 0
        var sixes = 0
        var fours = 0
        var highest = -999
        var lowest = 999

        for (let i = 1; i < object.stats[0].length; i++) {
            innings += parseInt(object.stats[0][i][1])
            runs += parseInt(object.stats[0][i][2])
            balls += parseInt(object.stats[0][i][3])
            dismissals += parseInt(object.stats[0][i][4])
            fifties += parseInt(object.stats[0][i][8])
            centuries += parseInt(object.stats[0][i][9])
            fours += parseInt(object.stats[0][i][10])
            sixes += parseInt(object.stats[0][i][11])

            if ((parseInt(object.stats[0][i][2])) > highest)
                highest = parseInt(object.stats[0][i][2])
            if (parseInt((object.stats[0][i][2])) < lowest)
                lowest = parseInt(object.stats[0][i][2])
        }
        var avg = (runs / dismissals).toFixed(1)
        var sr = ((runs / balls) * 100).toFixed(1)

        return ([innings, runs, balls, dismissals, fifties, centuries, fours, sixes, highest, lowest, avg, sr])

    }
    const getPlayer2 = async () => {

        fetch('http://192.168.18.53:5000/getPlayer/' + player2.cricmetric)
            .then((res) => {
                console.log('Player2 api called');
                return res.json()
            })
            .then((res) => {
                console.log('p2 part2');
                // setp2Stats(res);
                p2Stats = res
                var arr = CalStats
                arr[1] = calculateStats(p2Stats)
                setCalStats(arr)
                console.log('CalStats_player2: ', CalStats)
                console.log("player2................" + res.role);
                setCheck(true)
            })
            .catch((err) => {
                console.log('Error: ', err);
                console.error(err);
            })
    }


    const getPlayer1 = async () => {
        console.log('player1.crickmetric', player1.cricmetric);
        fetch('http://192.168.18.53:5000/getPlayer/' + player1.cricmetric)
            .then((res) => {
                console.log('Player1 api called');
                return res.json()
            })
            .then((res) => {
                console.log('p1 part2');
                // setp1Stats(res);
                p1Stats = res
                var arr = CalStats
                arr[0] = calculateStats(p1Stats)
                //console.log(arr[0])
                setCalStats(arr)
                console.log(arr[0])
                console.log('CalStats_player1: ', CalStats)
                console.log("player1................" + res.role);
                getPlayer2()
            })
            .catch((err) => {
                console.log('Error: ', err);
                console.error(err);
            })
    }


    if (check == false) {
        getPlayer1()

        //getPlayer2();
        // while(true){

        //if (p1Stats != [] && p2Stats != [])
        //setCheck(true)
        // }
    }


    //console.log("here................" + p2Stats.stats[0][2][0])
    //const [CalStats, setCalStats] = useState([]);


    // console.log("this............"+p1Stats)



    // console.log(CalStats[0])




    if (!check) {
        return (
            <View style={{ flex: 1, backgroundColor: "black" }}>
                <Text style={{ flex: 1, backgroundColor: "white" }}>Loading</Text>
            </View>
        )
    } else {
        console.log("cal stats......." + CalStats)
        return (
            <View style={styles.container}>
                <ImageBackground source={require('../assets/stadium.jpg')} resizeMode="cover" style={styles.image}>


                    <View style={{ flexDirection: 'row', margin: 10 }}>

                        <TouchableOpacity style={styles.tile2}>
                            <Image source={{ uri: player1.picture }} style={styles.thumbnail} />
                            <Text style={styles.text3}>{player1.name}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.tile2}>
                            <Image source={{ uri: player2.picture }} style={styles.thumbnail} />
                            <Text style={styles.text3}>{player2.name}</Text>
                        </TouchableOpacity>

                    </View>

                    <View style={{ flexDirection: 'row' }}>

                        <TouchableOpacity style={styles.tilep1}>
                            <Text style={styles.text2}>{CalStats[0][0]}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.tile}>
                            <Text style={styles.text2}>INNINGS</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.tilep2}>
                            <Text style={styles.text2}>{CalStats[1][0]}</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={{ flexDirection: 'row' }}>

                        <TouchableOpacity style={styles.tilep1}>
                            <Text style={styles.text2}>{CalStats[0][0]}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.tile}>
                            <Text style={styles.text2}>ICC RANKING</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.tilep2}>
                            <Text style={styles.text2}>{CalStats[1][0]}</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={{ flexDirection: 'row' }}>

                        <TouchableOpacity style={styles.tilep1}>
                            <Text style={styles.text2}>{CalStats[0][0]}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.tile}>
                            <Text style={styles.text2}>ICC RUNS</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.tilep2}>
                            <Text style={styles.text2}>{CalStats[1][0]}</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={{ flexDirection: 'row' }}>

                        <TouchableOpacity style={styles.tilep1}>
                            <Text style={styles.text2}>{CalStats[0][10]}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.tile}>
                            <Text style={styles.text2}>AVERAGE</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.tilep2}>
                            <Text style={styles.text2}>{CalStats[1][10]}</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={{ flexDirection: 'row' }}>

                        <TouchableOpacity style={styles.tilep1}>
                            <Text style={styles.text2}>{CalStats[0][11]}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.tile}>
                            <Text style={styles.text2}>STRIKE RATE</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.tilep2}>
                            <Text style={styles.text2}>{CalStats[1][11]}</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={{ flexDirection: 'row' }}>

                        <TouchableOpacity style={styles.tilep1}>
                            <Text style={styles.text2}>{CalStats[0][4]}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.tile}>
                            <Text style={styles.text2}>FIFTIES</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.tilep2}>
                            <Text style={styles.text2}>{CalStats[1][4]}</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={{ flexDirection: 'row' }}>

                        <TouchableOpacity style={styles.tilep1}>
                            <Text style={styles.text2}>{CalStats[0][5]}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.tile}>
                            <Text style={styles.text2}>HUNDREDS</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.tilep2}>
                            <Text style={styles.text2}>{CalStats[1][5]}</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={{ flexDirection: 'row' }}>

                        <TouchableOpacity style={styles.tilep1}>
                            <Text style={styles.text2}>{CalStats[0][8]}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.tile}>
                            <Text style={styles.text2}>HIGHEST</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.tilep2}>
                            <Text style={styles.text2}>{CalStats[1][8]}</Text>
                        </TouchableOpacity>

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
        textAlign: "center"
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