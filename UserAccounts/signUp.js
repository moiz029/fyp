import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  Image,
} from "react-native";
import { useState, useEffect } from "react";
import { color } from "react-native-reanimated";
import { TextInput } from "react-native-gesture-handler";

export default function Signup({ route, navigation }) {
  var [name, setName] = useState("");
  var [email, setEmail] = useState("");
  var [password, setPassword] = useState("");
  var [budget, setbudget] = useState("");

  const createAccount = () => {
    var accDetails = {
      method: "POST",
      body: JSON.stringify({
        franchise_name: name,
        franchise_id: email,
        password: password,
        budget: budget,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    };
    fetch("http://192.168.18.53:5000/franchiseSignUp", accDetails)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        navigation.navigate("Login");
      })

      .catch((error) => console.log("error", error));
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/stadium.jpg")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.form}>
          <Text style={styles.header}>SignUp</Text>
          <TextInput
            style={styles.input1}
            placeholder="Your Name"
            onChangeText={(text) => setName(text)}
            placeholderTextColor={"white"}
          />
          <TextInput
            style={styles.input1}
            placeholder="Your E-mail"
            onChangeText={(text) => setEmail(text)}
            placeholderTextColor={"white"}
          />
          <TextInput
            style={styles.input1}
            placeholder="Budget"
            onChangeText={(text) => setbudget(text)}
            placeholderTextColor={"white"}
          />
          <TextInput
            style={styles.input1}
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
            placeholderTextColor={"white"}
          />
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              console.log("Account Request sent");
              createAccount();
            }}
          >
            <Text style={styles.text}>Create</Text>
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
  input1: {
    borderBottomWidth: 1,
    borderColor: "white",
    color: "white",

    paddingBottom: 5,
    marginBottom: 20,
  },
  header: {
    color: "#fff",
    fontSize: 24,
    padding: 20,
    textAlign: "center",
    justifyContent: "center",
    borderBottomColor: "white",
  },
  form: {
    //flex: 1,
    justifyContent: "center",
    textAlign: "center",
    paddingHorizontal: 50,
    backgroundColor: "#006050c0",
    alignSelf: "stretch",
    margin: 15,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },

  btn: {
    marginLeft: 10,
    backgroundColor: "#000",
    padding: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 25,
    marginTop: 25,
  },
  text: {
    color: "white",
    fontSize: 15,
    textAlign: "center",
  },
  tile: {
    backgroundColor: "#000000c0",
    margin: 10,
    height: 240,
    width: 168,
    borderRadius: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tile2: {
    margin: 10,
    height: 80,
    borderRadius: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  thumbnail: {
    justifyContent: "center",
    alignItems: "center",
    height: 140,
    width: 140,
    borderRadius: 10,
  },
  thumbnail2: {
    justifyContent: "center",
    alignItems: "center",
    height: 70,
    width: 70,
    borderRadius: 10,
  },
});
