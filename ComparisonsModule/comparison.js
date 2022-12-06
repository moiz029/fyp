import { StyleSheet, Text, View, TouchableOpacity, Picker, ImageBackground, FlatList, Image } from 'react-native';
import { useState, useEffect } from "react"

var p1Stats = []
var p2Stats = []
export default function Compare({ route, navigation }) {


    var player1 = route.params.player1
    var player2 = route.params.player2
    // var p1Stats = route.params.p1Stats
    // var p2Stats = route.params.p2Stats

    const [p1Stats, setp1Stats] = useState();
    const [p2Stats, setp2Stats] = useState();
    const [compStats, setcompStats] = useState([]);
    const [check, setCheck] = useState(false);
    const [check2, setCheck2] = useState(false);

    const getComparison = async () => {

        fetch('http://192.168.18.53:5000/summarized_player_comparison/' + player1.cricmetric + '/' + player2.cricmetric)
            .then((res) => {
                console.log('Comparison api called');
                return res.json()
            })
            .then((res) => {
                console.log('p1 part1');
                setcompStats(res)
                console.log('comppppppppp' + res)

                setCheck(true)
            })
            .catch((err) => {
                console.log('Error: ', err);
                console.error(err);
            })
    }
    const getHeadtoHead = async () => {
        if(player1.role == "Bowler"){
            var temp = player1
            player1 = player2
            player2 = temp
        }
        fetch('http://192.168.18.53:5000/summarized-head-to-head/' + player1.cricmetric + '/' + player2.cricmetric)
            .then((res) => {
                console.log('head to head api called');
                return res.json()
            })
            .then((res) => {
                console.log('p2 part2');
                setcompStats(res)
                console.log('compaaaaaaaa' + res["Avg"])

                setCheck(true)
            })
            .catch((err) => {
                console.log('Error: ', err);
                console.error(err);
            })
    }





    if (check == false) {
        if (player1.role == player2.role) {
            getComparison()
        }
        else {
            getHeadtoHead()
        }
    }


    if (!check) {
        return (
            <View style={{ flex: 1, backgroundColor: "black" }}>
                <Text style={{ flex: 1, backgroundColor: "white" }}>Loading</Text>
            </View>
        )
    } else if (player1.role == player2.role) {
        return (
            <View style={styles.container}>
                <ImageBackground source={require('../assets/stadium.jpg')} resizeMode="cover" style={styles.image}>


                    <View style={{ flexDirection: 'row', margin: 10 }}>

                        <TouchableOpacity style={styles.tile3} disabled>
                            <Image source={{ uri: player1.picture }} style={styles.thumbnail} />
                            <Text style={styles.text3}>{player1.name}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.tile3} disabled>
                            <Image source={{ uri: player2.picture }} style={styles.thumbnail} />
                            <Text style={styles.text3}>{player2.name}</Text>
                        </TouchableOpacity>

                    </View>


                    <View>
                        <FlatList
                            style={{}}
                            data={compStats}
                            renderItem={({ item }) => (
                                <View style={{ flexDirection: 'row' }}>

                                    <TouchableOpacity style={styles.tilep1}>
                                        <Text style={styles.text2}>{item[1].toFixed(0)}</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.tile}>
                                        <Text style={styles.text2}>{item[0]}</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.tilep2}>
                                        <Text style={styles.text2}>{item[2].toFixed(0)}</Text>
                                    </TouchableOpacity>

                                </View>
                            )}
                        />

                    </View>

                </ImageBackground>

            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                <ImageBackground source={require('../assets/stadium.jpg')} resizeMode="cover" style={styles.image}>


                    <View style={{ flexDirection: 'row', margin: 10 }}>

                        <TouchableOpacity style={styles.tile3} disabled>
                            <Image source={{ uri: player1.picture }} style={styles.thumbnail} />
                            <Text style={styles.text3}>{player1.name}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.tile3} disabled>
                            <Image source={{ uri: player2.picture }} style={styles.thumbnail} />
                            <Text style={styles.text3}>{player2.name}</Text>
                        </TouchableOpacity>

                    </View>


                    <View>
                        <View style={{ flexDirection: 'row' }}>

                            <TouchableOpacity style={styles.tile}>
                                <Text style={styles.text2}>Total Matches</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.tilep1}>
                                <Text style={styles.text2}>{compStats["total_matches"]}</Text>
                            </TouchableOpacity>

                        </View>
                        <View style={{ flexDirection: 'row' }}>

                            <TouchableOpacity style={styles.tile}>
                                <Text style={styles.text2}>Balls</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.tilep1}>
                                <Text style={styles.text2}>{compStats["Balls"]}</Text>
                            </TouchableOpacity>

                        </View>
                        <View style={{ flexDirection: 'row' }}>

                            <TouchableOpacity style={styles.tile}>
                                <Text style={styles.text2}>Runs</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.tilep1}>
                                <Text style={styles.text2}>{compStats["Runs"]}</Text>
                            </TouchableOpacity>

                        </View>
                        <View style={{ flexDirection: 'row' }}>

                            <TouchableOpacity style={styles.tile}>
                                <Text style={styles.text2}>Dismissals</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.tilep1}>
                                <Text style={styles.text2}>{compStats["Outs"]}</Text>
                            </TouchableOpacity>

                        </View>
                        <View style={{ flexDirection: 'row' }}>

                            <TouchableOpacity style={styles.tile}>
                                <Text style={styles.text2}>Average</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.tilep1}>
                                <Text style={styles.text2}>{compStats["Avg"]}</Text>
                            </TouchableOpacity>

                        </View>
                        <View style={{ flexDirection: 'row' }}>

                            <TouchableOpacity style={styles.tile}>
                                <Text style={styles.text2}>Strike Rate</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.tilep1}>
                                <Text style={styles.text2}>{compStats["SR"]}</Text>
                            </TouchableOpacity>

                        </View>
                        <View style={{ flexDirection: 'row' }}>

                            <TouchableOpacity style={styles.tile}>
                                <Text style={styles.text2}>4's</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.tilep1}>
                                <Text style={styles.text2}>{compStats["4s"]}</Text>
                            </TouchableOpacity>

                        </View>
                        <View style={{ flexDirection: 'row' }}>

                            <TouchableOpacity style={styles.tile}>
                                <Text style={styles.text2}>6's</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.tilep1}>
                                <Text style={styles.text2}>{compStats["6s"]}</Text>
                            </TouchableOpacity>

                        </View>
                        <View style={{ flexDirection: 'row' }}>

                            <TouchableOpacity style={styles.tile}>
                                <Text style={styles.text2}>Dots</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.tilep1}>
                                <Text style={styles.text2}>{compStats["Dots"]}</Text>
                            </TouchableOpacity>

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
        textAlign: "center"
    },
    text3: {
        color: "white",
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center"
    },
    tile: {
        backgroundColor: "#006050c0",

        alignItems: 'center',
        margin: 2,
        height: 40,
        borderRadius: 20,
        flex: 3
    },
    tilep1: {
        backgroundColor: '#000000c0',
        alignItems: 'center',
        margin: 2,
        height: 40,
        borderRadius: 20,
        flex: 1
    },
    tilep2: {
        backgroundColor: '#000000c0',

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
    tile3: {
        backgroundColor: "#006050c0",
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