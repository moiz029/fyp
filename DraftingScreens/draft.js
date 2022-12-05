import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
//import {data, addData} from '../DataBase/data'
import { set } from "react-native-reanimated";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { data, addData } from "../DataBase/data";

export default function Draft({ route, navigation }) {
  const players = data();

  var player1 = {};
  var player2 = {};
  var [selectedCategory, setSelectedCategory] = useState("Category");
  var [selectedRole, setSelectedRole] = useState("Role");
  var [selectedSpeciality, setSelectedSpeciality] = useState("Speciality");
  var [selectedType, setSelectedType] = useState("Type");
  var [selectedVenue, setSelectedVenue] = useState("Venue");
  var [selectedPositon, setSelectedPosition] = useState("Position");

  var [selectedPlayer1, setSelectedPlayer1] = useState();
  var [selectedPlayer2, setSelectedPlayer2] = useState();

  var categories = ["Category"];
  var roles = ["Role"];
  var specialties = ["Speciality"];
  var types = ["Type"];
  var venues = ["Venue"];
  var positions = ["Position"];

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/stadium.jpg")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={{ flexDirection: "row", marginTop: 50 }}>
          <View style={{ flex: 1 }}>
            <Picker
              style={styles.picker}
              selectedValue={selectedCategory}
              onValueChange={(selected) => {
                setSelectedCategory(selected);
              }}
              dropdownIconColor={"white"}

            >
              {categories.map((item, index) => {
                return <Picker.Item label={item} value={item} key={index} />;
              })}
            </Picker>
          </View>

          <View style={{ flex: 1 }}>
            <Picker
              style={styles.picker}
              selectedValue={selectedType}
              onValueChange={(selected) => {
                setSelectedType(selected);
              }}
              dropdownIconColor={"white"}

            >
              {types.map((item, index) => {
                return <Picker.Item label={item} value={item} key={index} />;
              })}
            </Picker>
          </View>
        </View>

        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Picker
              style={styles.picker}
              selectedValue={selectedRole}
              onValueChange={(selected) => {
                setSelectedRole(selected);
              }}
              dropdownIconColor={"white"}

            >
              {roles.map((item, index) => {
                return <Picker.Item label={item} value={item} key={index} />;
              })}
            </Picker>
          </View>
          <View style={{ flex: 1 }}>
            <Picker
              style={styles.picker}
              selectedValue={selectedSpeciality}
              onValueChange={(selected) => {
                setSelectedSpeciality(selected);
              }}
              dropdownIconColor={"white"}

            >
              {specialties.map((item, index) => {
                return <Picker.Item label={item} value={item} key={index} />;
              })}
            </Picker>
          </View>
        </View>

        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Picker
              style={styles.picker}
              selectedValue={selectedVenue}
              onValueChange={(selected) => {
                setSelectedVenue(selected);
              }}
              dropdownIconColor={"white"}

            >
              {venues.map((item, index) => {
                return <Picker.Item label={item} value={item} key={index} />;
              })}
            </Picker>
          </View>

          <View style={{ flex: 1 }}>
            <Picker
              style={styles.picker}
              selectedValue={selectedPositon}
              onValueChange={(selected) => {
                setSelectedPosition(selected);
              }}
              dropdownIconColor={"white"}

            >
              {positions.map((item, index) => {
                return <Picker.Item label={item} value={item} key={index} />;
              })}
            </Picker>
          </View>
        </View>

        <View>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              console.log(player1);
              navigation.navigate("Compare", { player1, player2 });
            }}
          >
            <Text style={styles.text}>Find Player</Text>
          </TouchableOpacity>
        </View>

        <View>
          <Text style={[styles.text2, { marginTop: 30, alignSelf: "center" }]}>
            Recommended Players
          </Text>
          <FlatList
            horizontal={true}
            data={players}
            renderItem={({ item }) => (
              <View>
                <TouchableOpacity style={styles.tile}>
                  <Image
                    source={{ uri: item.picture }}
                    style={styles.thumbnail}
                  />
                  <Text style={styles.text}>{item.name}</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  image: {
    flex: 1,
  },
  tile: {
    backgroundColor: "#006050c0",
    margin: 10,
    height: 240,
    width: 168,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 15,
    textAlign: "center",
  },
  text2: {
    color: "#fff",
    fontSize: 21,
    lineHeight: 42,
    fontWeight: "bold",
    width: "90%",
    textAlign: "center",
    marginBottom: 10,
  },
  btn: {
    marginLeft: 10,
    backgroundColor: "#000",
    padding: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 25,
    width: "50%",
    alignSelf: "center",
  },
  thumbnail: {
    justifyContent: "center",
    alignItems: "center",
    height: 140,
    width: 140,
    borderRadius: 10,
  },
  picker: {
    backgroundColor: "#006050c0",
    justifyContent: "center",
    color: "#fff",
    marginBottom: 10,
    marginHorizontal: 10,
  },
});
