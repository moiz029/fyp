import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { data, addData } from "../DataBase/api";
//import {data, addData} from '../DataBase/data'
import { set } from "react-native-reanimated";

export default function Selection({ route, navigation }) {
  const players = data();

  var player1 = {};
  var player2 = {};
  var [selectedCountry, setSelectedCountry] = useState("Country");
  var [selectedType, setSelectedType] = useState("Type");
  var [selectedPlayer1, setSelectedPlayer1] = useState({});
  var [selectedPlayer2, setSelectedPlayer2] = useState({});

  var types = ["Type"];
  players.map((player) => {
    if (!types.includes(player.role)) types.push(player.role);
  });

  var countries = ["Country"];
  players.map((player) => {
    if (!countries.includes(player.country)) countries.push(player.country);
  });

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/stadium.jpg")}
        resizeMode="cover"
        style={styles.image}
      >

        <View style={{ flexDirection: "row" }}>
          <View style={{ flexDirection: "column", flex: 1 }}>
            <Text style={styles.text1}>Player 1</Text>
            
            <View
          >
            <Picker
              style={styles.picker}
              selectedValue={selectedCountry}
              onValueChange={(selected) => {
                setSelectedCountry(selected);
              }}
              dropdownIconColor={"white"}
            >
              {countries.map((item, index) => {
                return <Picker.Item label={item} value={item} key={index} />;
              })}
            </Picker>
          </View>
          <View
          >
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

            <View>
              <Picker
                style={styles.picker}
                selectedValue={selectedPlayer1}
                onValueChange={(selected) => {
                  player1 = selected;
                  //setSelectedPlayer1(selected)
                }}
                dropdownIconColor={"white"}
              >
                {players.map((item, index) => {
                  if (selectedCountry == "Country" && selectedType == "Type") {
                    return (
                      <Picker.Item label={item.name} value={item} key={index} />
                    );
                  } else if (
                    selectedCountry == "Country" &&
                    item.role == selectedType
                  ) {
                    return (
                      <Picker.Item label={item.name} value={item} key={index} />
                    );
                  } else if (
                    item.country == selectedCountry &&
                    selectedType == "Type"
                  ) {
                    return (
                      <Picker.Item label={item.name} value={item} key={index} />
                    );
                  } else if (
                    item.country == selectedCountry &&
                    item.role == selectedType
                  ) {
                    return (
                      <Picker.Item label={item.name} value={item} key={index} />
                    );
                  }
                })}
              </Picker>
            </View>
          </View>
          <View style={{ flexDirection: "column", flex: 1 }}>

            <Text style={styles.text1}>Player 2</Text>
            <View
          >
            <Picker
              style={styles.picker}
              selectedValue={selectedCountry}
              onValueChange={(selected) => {
                setSelectedCountry(selected);
              }}
              dropdownIconColor={"white"}
            >
              {countries.map((item, index) => {
                return <Picker.Item label={item} value={item} key={index} />;
              })}
            </Picker>
          </View>

          <View
          >
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
            <View>
              <Picker
                style={styles.picker}
                selectedValue={selectedPlayer2}
                onValueChange={(selected) => {
                  //setSelectedPlayer2(selected)
                  player2 = selected;
                }}
                dropdownIconColor={"white"}
              >
                {players.map((item, index) => {
                  if (selectedCountry == "Country" && selectedType == "Type") {
                    return (
                      <Picker.Item label={item.name} value={item} key={index} />
                    );
                  } else if (
                    selectedCountry == "Country" &&
                    item.role == selectedType
                  ) {
                    return (
                      <Picker.Item label={item.name} value={item} key={index} />
                    );
                  } else if (
                    item.country == selectedCountry &&
                    selectedType == "Type"
                  ) {
                    return (
                      <Picker.Item label={item.name} value={item} key={index} />
                    );
                  } else if (
                    item.country == selectedCountry &&
                    item.role == selectedType
                  ) {
                    return (
                      <Picker.Item label={item.name} value={item} key={index} />
                    );
                  }
                })}
              </Picker>
            </View>
          </View>
        </View>

        <View style={{ marginBottom: 10, marginTop: 30 }}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              console.log(player1);
              navigation.navigate("Compare", { player1, player2 });
            }}
          >
            <Text style={styles.text}>Compare</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  image: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 15,
    textAlign: "center",
  },

  text1: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    marginBottom:10,
    fontWeight:"bold"
  },

  picker: {
    backgroundColor: "#006050c0",
    justifyContent: "center",
    color: "#fff",
    marginBottom: 10,
    marginHorizontal: 10,
  },
});
