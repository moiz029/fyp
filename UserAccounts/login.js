import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, FlatList, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { color } from 'react-native-reanimated';
import { TextInput, TouchableWithoutFeedback } from 'react-native-gesture-handler';


export default function Login({ route, navigation }) {
  var [email, setEmail] = useState('');
  var [password, setPassword] = useState('');

  const loginAccount = () => {
    var accDetails = {
      method: "POST",
      body: JSON.stringify({
        franchise_id: email,
        password: password
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    };
    fetch('http://192.168.18.53:5000/franchiseLogin', accDetails)
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        if (result.message != "Error in signing in franchise") {
          navigation.navigate('FranchiseScreens')
        }
        else {

        }
      })
      .catch((error) => console.log('error', error));
  };

  return (

    <View style={styles.container}>
      <ImageBackground source={require('../assets/stadium.jpg')} resizeMode="cover" style={styles.image}>
        <View style={styles.form}>
          <Text style={styles.header}>Login</Text>

          <TextInput style={styles.input1} placeholder='Your E-mail' onChangeText={text => setEmail(text)}
            placeholderTextColor={"white"}
          />
          <TextInput style={styles.input1} placeholder='Password' onChangeText={text => setPassword(text)}
            secureTextEntry={true}
            placeholderTextColor={"white"}

          />
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              console.log('Account Request sent')
              loginAccount()
            }}
          >
            <Text style={styles.text}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btn2}
            onPress={() => {
              navigation.navigate('SignUp')
            }}
          >
            <Text style={styles.text}>Signup</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems:'centers',
  },
  input1: {
    borderBottomWidth: 1,
    borderColor: 'white',
    color: "white",
    paddingBottom: 5,
    marginBottom: 20
  },
  btn: {
    left: 65,
    marginBottom: 15,
    padding: 0,
  },
  btn2: {
    left: 65,
    marginBottom: 15,
    marginTop: 20,
    padding: 0,
  },
  form: {
    //flex: 1,
    justifyContent: "center",
    textAlign: 'center',
    paddingHorizontal: 50,
    backgroundColor: "#006050c0",
    alignSelf: 'stretch',
    maxWidth: 350,
    left: 30
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
  header: {
    color: "#fff",
    fontSize: 24,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: "white"
  },
  text: {
    maxWidth: 100,
    color: "white",
    borderWidth: 2,
    borderRadius: 20,
    fontSize: 21,
    // lineHeight: 42,s
    padding: 0,
    fontWeight: "bold",
    textAlign: "center"
  },
  tile: {
    backgroundColor: '#000000c0',
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


});