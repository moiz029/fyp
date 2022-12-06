import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  Image,
} from "react-native";
import { useState, useEffect, useContext } from "react";
import { color } from "react-native-reanimated";
import {
  TextInput,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { Session } from "../Context/SessionContext";
import { Alert } from "react-native-web";

export default function Login({ route, navigation }) {
  var [email, setEmail] = useState("M@gmail.com");
  var [password, setPassword] = useState("abc");
  const { session, setSession,setDraft } = useContext(Session)

  const loginAccount = () => {
    var accDetails = {
      method: "POST",
      body: JSON.stringify({
        franchise_id: email,
        password: password,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    };
    fetch("http://192.168.18.53:5000/franchiseLogin", accDetails)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setSession(result.session_id)
        setDraft(result.draft)
        //console.log(session)
        if (result.message !== "Error in signing up franchise") {
          navigation.navigate("FranchiseScreens");
        } else {
          alert("Error signing in")
        }
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
          <Text style={styles.header}>Login</Text>

          <TextInput
            style={styles.input1}
            placeholder="Your E-mail"
            onChangeText={(text) => setEmail(text)}
            placeholderTextColor={"white"}
          />
          <TextInput
            style={styles.input1}
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
            placeholderTextColor={"white"}
          />
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                console.log("Account Request sent");
                loginAccount();
              }}
            >
              <Text style={styles.text}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                navigation.navigate("SignUp");
              }}
            >
              <Text style={styles.text}>Signup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems:'centers',
  },
  input1: {
    borderBottomWidth: 1,
    borderColor: "white",
    color: "white",
    paddingBottom: 5,
    marginBottom: 20,
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
  header: {
    color: "#fff",
    fontSize: 24,
    padding: 20,
    textAlign: "center",
    justifyContent: "center",
    borderBottomColor: "white",
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
