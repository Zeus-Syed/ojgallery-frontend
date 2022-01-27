import React from 'react'
import { View, Text, Pressable, SafeAreaView, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';

import { removeUserDetails } from '../actions'

const Settings = ({ navigation }) => {
    const dispatch = useDispatch();

    const signOut = () => {
        dispatch(removeUserDetails());
    }

    return (
        <SafeAreaView>
            <View style={styles.container}>

                <Pressable onPress={() => signOut()} style={styles.button}>
                    <Text style={styles.logoutView}>Logout</Text>
                </Pressable>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1,
        alignItems: 'center',
    },
    logoutView: {
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    button: {
        width: 250,
        height: 40,
        backgroundColor: '#3740ff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        marginTop: 50
    },
})

export default Settings;