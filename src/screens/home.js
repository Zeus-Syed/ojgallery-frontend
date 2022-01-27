import React, { useEffect, useState, useRef } from 'react'
import { View, Text, StyleSheet, Pressable, Image, FlatList } from 'react-native'
import Ionicons from 'react-native-vector-icons/AntDesign';
import { useSelector } from 'react-redux';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import { height, width } from '../utils/device';
import { fetchImagesList } from './helper';

const home = ({ navigation, route }) => {
  const carouselRef = useRef();
  const [imgArray, setImgArray] = useState([]);
  const [indexSelected, setIndexSelected] = useState(0);
  const { authToken } = useSelector(state => state.authenticationReducer)

  useEffect(() => {
    fetchImagesList(setImgArray, authToken)
  }, [])

  const initiateUpload = () => {
    navigation.navigate("Upload", { onUpload: () => fetchImagesList(setImgArray, authToken) });
  }

  const onSelect = indexSelected => {
    setIndexSelected(indexSelected);
  };

  const onTouchThumbnail = touched => {
    if (touched === indexSelected) return;

    carouselRef?.current?.snapToItem(touched);
  };

  return (
    <View style={styles.container}>
      <View style={{ alignSelf: 'center' }}>
        <Pressable onPress={initiateUpload} style={styles.button}>
          <Ionicons name={'pluscircleo'} size={20} color={'white'} style={{ right: 10 }} />
          <Text style={styles.buttonText}>Upload Image</Text>
        </Pressable>
      </View>
      { imgArray && imgArray.length > 0 ?
        <>
          <View style={{ height: height / 2, marginTop: 20 }}>
            <Carousel
              ref={carouselRef}
              layout='default'
              data={imgArray}
              sliderWidth={width}
              itemWidth={width}
              renderItem={({ item, index }) => (
                <Image
                  key={index}
                  style={{ width: '100%', height: '100%' }}
                  resizeMode='contain'
                  source={{ uri: item.getUrl }}
                />
              )}
              onSnapToItem={index => onSelect(index)}
            />
            <Pagination
              inactiveDotColor='gray'
              dotColor={'orange'}
              activeDotIndex={indexSelected}
              dotsLength={imgArray.length}
              animatedDuration={150}
              inactiveDotScale={1}
            />
            <View
              style={{
                marginTop: 0,
                paddingHorizontal: 32,
                alignSelf: 'flex-end'
              }}
            >
              <Text
                style={{
                  color: '#003f5c',
                  fontSize: 15
                }}
              >
                {indexSelected + 1}/{imgArray.length}
              </Text>
            </View>
          </View>
          <FlatList
            horizontal={true}
            data={imgArray}
            style={{ position: 'absolute', bottom: 50 }}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 20
            }}
            keyExtractor={item => item.id}
            renderItem={({ item, index }) => (
              <Pressable activeOpacity={0.9} onPress={() => onTouchThumbnail(index)} key={`img-${index}`}>
                <Image
                  style={{
                    width: 80,
                    height: 80,
                    marginRight: 20,
                    borderRadius: 16,
                    borderWidth: index === indexSelected ? 4 : 0.75,
                    borderColor: index === indexSelected ? 'orange' : 'white'
                  }}
                  source={{ uri: item.getUrl }}
                />
              </Pressable>
            )}
          />
        </>
        :
        <Text style={styles.uploadText}>Start uploading images!</Text>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
    bottom: 80
  },
  button: {
    width: 200,
    height: 50,
    backgroundColor: '#3740ff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    marginTop: 12,
    flexDirection: 'row'
  },
  buttonText: {
    fontSize: 15,
    color: '#fff'
  },
  uploadText: { fontSize: 18, color: 'black', fontWeight: 'bold', alignSelf: 'center', top: 50 }
})

export default home;