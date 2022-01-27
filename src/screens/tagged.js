import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import GridImageView from 'react-native-grid-image-viewer';
import { useSelector } from 'react-redux';

import { fetchTaggedImagesList } from './helper';

const Tagged = () => {
    const [taggedImgArray, setTaggedImgArray] = useState([]);

    const { authToken } = useSelector(state => state.authenticationReducer)

    useEffect(() => {
        fetchTaggedImagesList(setTaggedImgArray, authToken)
    }, [])

    return (
        <View style={styles.background}>
            <Text style={styles.headline_text}>Tagged By Ur Friends!</Text>
            <Text style={styles.explore_text}>
                Click on an image to view in full screen mode
      </Text>
            { taggedImgArray && taggedImgArray.length > 0 ?
                <GridImageView data={taggedImgArray} /> :
                <Text style={{ color: 'white', top: 20, left: 20 }}>No Images Available!</Text>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    background: {
        backgroundColor: 'black',
        flex: 1,
    },
    headline_text: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 50,
        marginLeft: 20,
    },
    explore_text: {
        marginTop: 5,
        marginBottom: 10,
        color: 'white',
        marginLeft: 20,
        fontSize: 12,
        fontWeight: '600',
    },
});

export default Tagged;