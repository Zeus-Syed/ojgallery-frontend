import React, { useState } from "react";
import { Pressable, TextInput, View, Text, StyleSheet, ActivityIndicator, Button } from "react-native";
import { useDispatch } from "react-redux";

import { registerUserToServer } from './helper';

const register = ({ navigation }) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    name: "",
    phoneno: "",
    password: "",
    confirmPassword: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errorPhone, setErrorPhone] = useState(false)
  const [errorName, setErrorName] = useState(false)
  const [errorPassword, setErrorPassword] = useState(false)
  const [errorConfirmPassword, setErrorConfirmPassword] = useState(false)
  const [passwordMatch, setPasswordMatch] = useState(false)


  const registerUser = () => {

    if (!user.name) {
      setErrorName(true)
      return;
    }
    else {
      setErrorName(false)
    }
    if (!user.phoneno) {
      setErrorPhone(true)
      return;
    }
    else {
      setErrorPhone(false)
    }
    if (!user.password) {
      setErrorPassword(true)
      return;
    }
    else {
      setErrorPassword(false)
    }
    if (!user.confirmPassword) {
      setErrorConfirmPassword(true)
      return;
    }
    else {
      setErrorConfirmPassword(false)
    }

    if (user.password !== user.confirmPassword) {
      setPasswordMatch(true);
      return;
    }
    else {
      setPasswordMatch(false)
    }
    setIsLoading(true);
    registerUserToServer(user, dispatch);
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputView} >
        <Text style={styles.namePrepend}>{'MASTER'}</Text>
        <TextInput
          style={styles.nameInputText}
          placeholder="Name"
          placeholderTextColor="white"
          onChangeText={text => setUser({ ...user, name: text })} />
        <Text style={styles.error} >{errorName ? 'Name is required' : ""}</Text>
      </View>

      <View style={styles.inputView} >
        <Text style={styles.phoneprepend}>{'+971 '}</Text>
        <TextInput
          style={styles.phoneInputText}
          placeholder="Phone Number"
          placeholderTextColor="white"
          maxLength={9}
          onChangeText={text => setUser({ ...user, phoneno: text })} />
        <Text style={styles.error} >{errorPhone ? 'Phone is required' : ""}</Text>
      </View>
      <View style={styles.inputView} >
        <TextInput
          style={styles.inputText}
          placeholder="Password"
          placeholderTextColor="white"
          secureTextEntry={true}
          onChangeText={text => setUser({ ...user, password: text })} />
        <Text style={styles.error} >{errorPassword ? 'Password is required' : ""}</Text>
      </View>
      <View style={styles.inputView} >
        <TextInput
          style={styles.inputText}
          placeholder="Confirm Password"
          placeholderTextColor="white"
          secureTextEntry={true}
          onChangeText={text => setUser({ ...user, confirmPassword: text })} />
        {
          user.confirmPassword && user.password ?
            <Text style={styles.error} >{passwordMatch ? 'Password and Confirm Password should be same' : ""}</Text> :
            <Text style={styles.error} >{errorConfirmPassword ? 'Confirm Password is required' : ""}</Text>
        }
      </View>
      <Pressable style={styles.loginBtn} onPress={() => registerUser()}>
        <Text style={styles.loginText}>
          {isLoading ? <ActivityIndicator color="white" /> : "Register"}
        </Text>
      </Pressable>
    </View>
  )

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003f5c",
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputView: {
    width: "80%",
    backgroundColor: "#465881",
    borderRadius: 25,
    height: 50,
    marginBottom: 25,
    justifyContent: "center",
    padding: 20
  },
  inputText: {
    height: 50,
    color: "white"
  },
  phoneInputText: {
    height: 50,
    color: "white",
    left: 35
  },
  phoneprepend: {
    position: "absolute",
    color: "white",
    left: 18
  },
  namePrepend: {
    position: "absolute",
    color: "white",
    left: 19,
    fontSize: 12
  },
  nameInputText: {
    height: 50,
    color: "white",
    left: 55
  },
  forgot: {
    color: "white",
    fontSize: 16,
    marginBottom: 10
  },
  signup: {
    color: "white",
    fontSize: 20
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a"
  },
  logo1: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
    marginBottom: 40
  },
  error: {
    fontSize: 10,
    //fontFamily: "Ariel",
    position: 'absolute',
    fontWeight: "bold",
    color: "white",
    top: 52,
    right: 50,
    alignSelf: "flex-end"
  },
  checkReferrerIcon: {
    position: 'absolute',
    color: "white",
    top: 10,
    right: 20
  },
  hide: {
    display: 'none'
  },
  show: {
    display: 'flex'
  }
});


export default register;