import { StyleSheet, Text, View, TouchableOpacity, Picker, ImageBackground, FlatList, Image } from 'react-native';
import { useState, useEffect } from "react"

var p1Stats = []
var p2Stats = []
export default function Compare({ route, navigation }) {

    const test = [
        [
            "Batting 4s",
            359,
            986
        ],
        [
            "Batting 6s",
            107,
            369
        ],
        [
            "Batting Average",
            47.31395348837209,
            39.14509803921569
        ],
        [
            "Batting Balls",
            3193,
            7074
        ],
        [
            "Batting Dots",
            41.2405172413793,
            45.69152542372881
        ],
        [
            "Batting Innings",
            116,
            295
        ],
        [
            "Batting SR",
            127.43501409332916,
            141.10828385637546
        ],
        [
            "Country",
            "Pakistan",
            "Australia"
        ],
        [
            "Name",
            "Muhammad Rizwan",
            "David Warner"
        ]
    ]
    var player1 = route.params.player1
    var player2 = route.params.player2
    // var p1Stats = route.params.p1Stats
    // var p2Stats = route.params.p2Stats

    const [p1Stats, setp1Stats] = useState();
    const [p2Stats, setp2Stats] = useState();

    const [check, setCheck] = useState(true);
    
    const getPlayer2 = async () => {

        fetch('http://192.168.18.53:5000/get_player_summary/' + player2.cricmetric)
            .then((res) => {
                console.log('Player2 api called');
                return res.json()
            })
            .then((res) => {
                console.log('p2 part2');
                setp1Stats(res)
                
                setCheck(true)
            })
            .catch((err) => {
                console.log('Error: ', err);
                console.error(err);
            })
    }


    const getPlayer1 = async () => {
        console.log('player1.crickmetric', player1.cricmetric);
        fetch('http://192.168.18.53:5000/get_player_summary/' + player1.cricmetric)
            .then((res) => {
                console.log('Player1 api called');
                return res.json()
            })
            .then((res) => {
                console.log('p1 part2');
                setp2Stats(res)
                
                getPlayer2()
            })
            .catch((err) => {
                console.log('Error: ', err);
                console.error(err);
            })
    }


    if (check == false) {
        getPlayer1()
    }


    if (!check) {
        return (
            <View style={{ flex: 1, backgroundColor: "black" }}>
                <Text style={{ flex: 1, backgroundColor: "white" }}>Loading</Text>
            </View>
        )
    } else {
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


                    <View>
                        <FlatList
                            style={{}}
                            data={test}
                            renderItem={({ item }) => (
                                <View style={{ flexDirection: 'row' }}>

                                    <TouchableOpacity style={styles.tilep1}>
                                        <Text style={styles.text2}>{item[1]}</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.tile}>
                                        <Text style={styles.text2}>{item[0]}</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.tilep2}>
                                        <Text style={styles.text2}>{item[2]}</Text>
                                    </TouchableOpacity>

                                </View>
                            )}
                        />

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