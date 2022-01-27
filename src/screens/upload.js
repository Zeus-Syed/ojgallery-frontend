import React, { useEffect, useState, useRef } from 'react'
import { View, Text, Pressable, SafeAreaView, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useSelector } from 'react-redux';
import MultiSelect from 'react-native-multiple-select';

const RNFS = require('react-native-fs');

import { getUploadUrl, fetchFriendsList } from './helper';

const Upload = ({ navigation, route }) => {
    const multiRef = useRef();
    const [resourcePath, setResourcePath] = useState({});
    const [imgBase64, setImgBase64] = useState(null);
    const [friendsList, setFriendsList] = useState([]);
    const [selectedFriendsList, setSelectedFriendsList] = useState([]);
    const [loader, setLoader] = useState(false);

    const { authToken } = useSelector(state => state.authenticationReducer)

    useEffect(() => {
        fetchFriendsList(setFriendsList, authToken);
    }, [])

    const launchDeviceCamera = async () => {

        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        const result = await launchCamera(options);
        let assetsArray = result.assets;
        const base64Img = await RNFS.readFile(assetsArray[0].uri, 'base64');
        setImgBase64(base64Img);
        setResourcePath(assetsArray[0]);
    }

    const launchDeviceGallery = async () => {
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        const result = await launchImageLibrary(options);
        let assetsArray = result.assets;
        const base64Img = await RNFS.readFile(assetsArray[0].uri, 'base64');
        setImgBase64(base64Img);
        setResourcePath(assetsArray[0]);
    }

    const submit = () => {
        setLoader(true);
        getUploadUrl(imgBase64, setLoader, selectedFriendsList, authToken, navigation, route);

    }

    const onSelectedItemsChange = (selectedItems) => {
        setSelectedFriendsList(selectedItems);
    };

    const getSelectedList = () => {
        if (multiRef.current) {
            return multiRef.current.getSelectedItemsExt(selectedFriendsList)
        }
    }

    return (

        <View style={styles.container}>
            <Image
                source={{ uri: resourcePath.uri }}
                style={{ width: 200, height: 200 }}
            />
            {imgBase64 == null ?
                <View>
                    <Text style={{ alignItems: 'center' }}>

                        {resourcePath.uri}

                    </Text>

                    <Pressable onPress={launchDeviceGallery} style={styles.button}>

                        <Text style={styles.buttonText}>Select File</Text>

                    </Pressable>

                    <Pressable onPress={launchDeviceCamera} style={styles.button}>

                        <Text style={styles.buttonText}>Take Photo</Text>

                    </Pressable>
                </View>
                :
                <>
                    <View style={{ width: 250 }}>
                        <Text style={{ bottom: 10, fontWeight: 'bold', fontSize: 16, color: 'white' }}>Friends to tag!</Text>
                        <MultiSelect
                            hideTags
                            items={friendsList}
                            uniqueKey="_id"
                            ref={multiRef}
                            onSelectedItemsChange={onSelectedItemsChange}
                            selectedItems={selectedFriendsList}
                            selectText="Pick Items"
                            searchInputPlaceholderText="Search Items..."
                            onChangeInput={(text) => console.log(text)}
                            altFontFamily="ProximaNova-Light"
                            tagRemoveIconColor="#CCC"
                            tagBorderColor="#CCC"
                            tagTextColor="#CCC"
                            selectedItemTextColor="#CCC"
                            selectedItemIconColor="#CCC"
                            itemTextColor="#000"
                            displayKey="name"
                            searchInputStyle={{ color: '#CCC' }}
                            submitButtonColor="#CCC"
                            submitButtonText="Submit"
                        />
                        <View>
                            {getSelectedList()}

                        </View>
                    </View>
                    <View>
                        <Pressable onPress={submit} style={styles.button}>
                            {!loader ?
                                <Text style={styles.buttonText}>Submit</Text>
                                :
                                <ActivityIndicator size="large" style={styles.buttonText} />
                            }
                        </Pressable>
                    </View>
                </>
            }
        </View>



    );


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#003f5c'
    },
    button: {
        width: 250,
        height: 60,
        backgroundColor: '#3740ff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        marginBottom: 12
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 15,
        color: '#fff'
    }
});

export default Upload;