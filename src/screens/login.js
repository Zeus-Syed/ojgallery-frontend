import React, { useState } from "react";
import { Pressable, TextInput, View, Text, SafeAreaView, StyleSheet, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { loginUser } from './helper';

const login = ({ navigation }) => {
  const dispatch = useDispatch();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errorPhone, setErrorPhone] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);



  const login = () => {
    if (!phone) {
      setErrorPhone(true);
      return;
    }
    else {
      setErrorPhone(false);
    }
    if (!password) {
      setErrorPassword(true);
      return;
    }
    else {
      setErrorPassword(false);
    }
    setIsLoading(true);
    loginUser(phone, password, dispatch);

  }

  return (

    <View style={styles.container}>
      <Text style={styles.logo}>OJ</Text>
      <Text style={styles.logo1}>GALLERY</Text>
      <View style={styles.inputView} >
        <Text style={styles.phoneprepend}>{'+971 '}</Text>
        <TextInput
          style={styles.passwordInputText}
          placeholder="Phone No"
          placeholderTextColor="white"
          maxLength={9}
          keyboardType={'numeric'}
          onChangeText={text => setPhone(text)} />
        <Text style={styles.error} >{errorPhone ? 'Invalid Phone' : ""}</Text>
      </View>
      <View style={styles.inputView} >
        <TextInput
          style={styles.inputText}
          placeholder="Password"
          placeholderTextColor="white"
          secureTextEntry={true}
          onChangeText={text => setPassword(text)} />
        <Text style={styles.error} >{errorPassword ? 'Invalid Password' : ""}</Text>
      </View>
      <Pressable>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </Pressable>
      <Pressable onPress={() => login()} style={styles.loginBtn}>
        <Text style={styles.loginText}>
          {isLoading ? <ActivityIndicator color="white" /> : "Submit"}
        </Text>
      </Pressable>

      <Pressable onPress={() => navigation.navigate("Register")}>
        <Text style={styles.signup}>{'Register'}</Text>
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
  passwordInputText: {
    height: 50,
    color: "white",
    left: 40
  },
  forgot: {
    color: "white",
    fontSize: 16,
    marginTop: 10
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
    position: 'absolute',
    fontWeight: "bold",
    color: "white",
    top: 52,
    right: 50,
    alignSelf: "flex-end"
  },
  phoneprepend: {
    position: "absolute",
    color: "white",
    left: 18
  }
});


export default login;