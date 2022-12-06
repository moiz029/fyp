import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, FlatList, Image, TextInput } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import { Session } from '../Context/SessionContext';


export default function Roster({ route, navigation }) {
    var result = []
    var [search, setSearch] = useState('');
    const [players, setPlayers] = useState([])
    const { session } = useContext(Session)
    // result = players.filter((player) => { return ((player.name).includes(search)) })
    useEffect(() => {
        getRoster()
    })
    const getRoster = () => {
        fetch(`http://192.168.18.53:5000/verify_franchise/${session}`, {
            method: "GET",
        })
            .then(response => response.json())
            .then(json => {
                // console.log(json.team)
                setPlayers(json.team)
            })
            .catch(err => console.log(err))
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/stadium.jpg')} resizeMode="cover" style={styles.image}>


                <View style={{ flex: 1, alignItems: "center" }}>

                    <TextInput style={styles.input1}
                        placeholder='Search ...'
                        onChangeText={(text) => {
                            setSearch(text)
                        }}
                        placeholderTextColor={"#AEAEAE"}
                    />
                    <FlatList
                        numColumns={2}
                        data={players}
                        keyExtractor={item => item.name}
                        renderItem={({ item }) => (
                            <View>
                                <TouchableOpacity
                                    style={styles.tile}
                                    disabled
                                >
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
        backgroundColor: "#006050c0",
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
    input1: {

        color: "#000",
        marginBottom: 30,
        fontSize: 20,
        width: "90%",
        marginTop: 20,
        backgroundColor: "#f5f5f5",
        borderRadius: 4,
        padding: 10
    }


});