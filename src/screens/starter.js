import React, { useEffect } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, Pressable } from 'react-native'


const starter = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => { navigation.navigate("Signin") }, 500)
  }, [])

  const goToLogin = () => {
    navigation.navigate("Signin")
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={() => goToLogin()}>
        <Text style={styles.logo}>OJ</Text>
      </Pressable>
      <Pressable onPress={() => goToLogin()}>
        <Text style={styles.logo}>GALLERY</Text>
      </Pressable>
      <Pressable onPress={() => goToLogin()}>
        <ActivityIndicator size="large" />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003f5c",
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
    bottom: 80
  }
})

export default starter;