import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { data, addData } from '../DataBase/api';
//import {data, addData} from '../DataBase/data'
import { set } from 'react-native-reanimated';


export default function Draft({ route, navigation }) {
    const players = data()

    var player1 = {}
    var player2 = {}
    var [selectedCategory, setSelectedCategory] = useState('Category')
    var [selectedRole, setSelectedRole] = useState('Role')
    var [selectedSpeciality, setSelectedSpeciality] = useState('Speciality')
    var [selectedType, setSelectedType] = useState('Type')
    var [selectedVenue, setSelectedVenue] = useState('Venue')
    var [selectedPositon, setSelectedPosition] = useState('Position')

    var [selectedPlayer1, setSelectedPlayer1] = useState()
    var [selectedPlayer2, setSelectedPlayer2] = useState()

    var categories = ['Category']
    var roles = ['Role']
    var specialties = ['Speciality']
    var types = ['Type']
    var venues = ['Venue']
    var positions = ['Position']

    // players.map((player) => {
    //     if (!types.includes(player.role))
    //         types.push(player.role)
    // })

    // var countries = ['Country']
    // players.map((player) => {
    //     if (!countries.includes(player.country))
    //         countries.push(player.country)
    // })


    return (
        <View style={styles.container}>

            <ImageBackground source={require('../assets/stadium.jpg')} resizeMode="cover" style={styles.image}>



                <View style={{ flexDirection: 'row', marginBottom: 90, flex: 1 }}>
                    <View style={{ justifyContent: 'center', marginHorizontal: 5, flex: 1 }}>
                        <Picker
                            style={{ height: 30, justifyContent: 'center', backgroundColor: '#5bcffac0' }}
                            selectedValue={selectedCategory}
                            onValueChange={(selected) => { setSelectedCategory(selected) }}
                        >
                            {categories.map((item, index) => {

                                return (
                                    <Picker.Item label={item} value={item} key={index} />
                                )
                            })
                            }

                        </Picker>

                    </View>
                    <View style={{ justifyContent: 'center', alignSelf: 'center', flex: 1 }}>
                        <Picker
                            style={{ height: 30, justifyContent: 'center', backgroundColor: '#5bcffac0' }}
                            selectedValue={selectedType}
                            onValueChange={(selected) => { setSelectedType(selected) }}

                        >
                            {types.map((item, index) => {

                                return (
                                    <Picker.Item label={item} value={item} key={index} />
                                )
                            })
                            }

                        </Picker>
                    </View>
                </View>




                <View style={{ justifyContent: 'center', alignSelf: 'center', marginBottom: 30, flex: 2 }}>
                    <Picker
                        style={{ height: 40, width: 250, justifyContent: 'center', backgroundColor: '#ff8182c0' }}
                        selectedValue={selectedRole}
                        onValueChange={(selected) => { setSelectedRole(selected) }}

                    >
                        {roles.map((item, index) => {

                            return (
                                <Picker.Item label={item} value={item} key={index} />
                            )
                        })
                        }

                    </Picker>
                </View>




                <View style={{ justifyContent: 'center', alignSelf: 'center', flex: 2 }}>
                    <Picker
                        style={{ height: 40, width: 250, justifyContent: 'center', backgroundColor: '#ff8182c0' }}
                        selectedValue={selectedSpeciality}
                        onValueChange={(selected) => { setSelectedSpeciality(selected) }}

                    >
                        {specialties.map((item, index) => {

                            return (
                                <Picker.Item label={item} value={item} key={index} />
                            )
                        })
                        }

                    </Picker>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 90, flex: 1 }}>
                    <View style={{ justifyContent: 'center', marginHorizontal: 5, flex: 1 }}>
                        <Picker
                            style={{ height: 30, justifyContent: 'center', backgroundColor: '#5bcffac0' }}
                            selectedValue={selectedVenue}
                            onValueChange={(selected) => { setSelectedVenue(selected) }}
                        >
                            {venues.map((item, index) => {

                                return (
                                    <Picker.Item label={item} value={item} key={index} />
                                )
                            })
                            }

                        </Picker>

                    </View>
                    <View style={{ justifyContent: 'center', alignSelf: 'center', flex: 1 }}>
                        <Picker
                            style={{ height: 40, justifyContent: 'center', backgroundColor: '#5bcffac0' }}
                            selectedValue={selectedPositon}
                            onValueChange={(selected) => { setSelectedPosition(selected) }}

                        >
                            {positions.map((item, index) => {

                                return (
                                    <Picker.Item label={item} value={item} key={index} />
                                )
                            })
                            }

                        </Picker>
                    </View>
                </View>
                <View style={{ marginBottom: 10 }}>
                    <TouchableOpacity
                        onPress={() => {
                            console.log(player1)
                            navigation.navigate('Compare', { player1, player2 })
                        }}
                    >
                        <Text style={styles.text}>Compare</Text>
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
        color: "#ff8182c0",
        fontSize: 21,
        lineHeight: 42,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "#000000c0"
    },
    text2: {
        color: "#5bcffac0",
        fontSize: 21,
        lineHeight: 42,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "#000000c0"
    }
});