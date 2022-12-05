import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, FlatList, Image } from 'react-native';

export default function AllRounder({ route, navigation }) {

    var players = route.params.allRounders
    var squad = route.params.selectedPlayers

    const countAllRounders = () => {
        var count = 0
        squad.forEach(player => {
            if (player.type == 'AllRounder')
                count += 1
        })
        return (count)
    }

    const addToSquad = (index) => {
        var noAllRounders = countAllRounders()
        if (squad.includes(players[index])) {
            alert('Player Already in PlayingIX')
        } else if (noAllRounders == 2) {
            alert('Squad Already has 2 AllRounders')
        } else {
            var temp = squad
            temp.push(players[index])
            squad = temp
            alert('Player Added to PlayingIX')
            console.log(squad)
        }
    }

    const removeFromSquad = (index) => {
        if (squad.includes(players[index])) {
            squad.splice(squad.indexOf(players[index]), 1)
            alert('Player Removed from PlayingIX')
        } else {
            alert('Player Not in PlayingIX')
        }
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/stadium.jpg')} resizeMode="cover" style={styles.image}>

                <TouchableOpacity
                    style={{ flex: 1 }}
                    onPress={() => {
                        navigation.navigate({ name: 'playingIX', params: { selectedPlayers: squad } })
                    }}
                >
                    <Text style={styles.text}>Confirm Changes</Text>
                </TouchableOpacity>

                <View style={{ flex: 10 }}>

                    <FlatList
                        style={{}}
                        data={players}
                        renderItem={({ item }) => (
                            <View>
                                <TouchableOpacity style={styles.tile}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                            <Image source={{ uri: item.picture }} style={styles.thumbnail} />
                                            <Text style={styles.text}>{item.name}</Text>
                                        </View>
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                            <TouchableOpacity
                                                onPress={() => { addToSquad(players.indexOf(item)) }}
                                            >
                                                <Text style={styles.text}>ADD</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() => { removeFromSquad(players.indexOf(item)) }}
                                            >
                                                <Text style={styles.text}>Remove</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
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
        height: 250,
        borderRadius: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    thumbnail: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 150,
        width: 150,
        borderRadius: 10
    }
});