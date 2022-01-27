import axios from 'axios';
import { decode } from 'base64-arraybuffer';

import { API_URL, get_url_api } from '../utils/constants';
import { addUserDetails } from '../actions';
import axiosInstance from '../utils/api';

const Buffer = require('buffer').Buffer;

/**
 * function used to register a new user to server
 * @object {*} userObj
 * @function {*} dispatch
 */
export const registerUserToServer = async (userObj, dispatch) => {
  try {
    userObj.phone = userObj.phoneno;
    delete userObj.phoneno;
    delete userObj.confirmPassword;
    let results = await axios.post(`${API_URL}/users/`, { userObj });
    if (results.data.data) {
      dispatch(addUserDetails(results.data.data))
    }
  }
  catch (err) {
    console.log('err', err);
  }
}

/**
 * used to login a user to app
 * @string {*} phone 
 * @string {*} password 
 * @function {*} dispatch 
 */
export const loginUser = async (phone, password, dispatch) => {
  try {
    let results = await axios.post(`${API_URL}/users/api/login`, { phone, password });
    if (results.data.data) {
      dispatch(addUserDetails(results.data.data))
    }
  }
  catch (err) {
    console.log('err', err);
  }
}


/**
 *  to insert a successful azure url into database
 * 
 * @string {*} imgUrl 
 * @function {*} setLoader 
 * @array {*} selectedFriendsList 
 * @string {*} authToken 
 * @function {*} navigation 
 * @object {*} route 
 */
export const updateURLToServerHelper = async (imgUrl, setLoader, selectedFriendsList, authToken, navigation, route) => {
  try {
    const body = {
      getUrl: imgUrl,
      friendsList: JSON.stringify(selectedFriendsList),
    }
    let results = await axios.post(`${API_URL}/azure/image/upload`, { body }, {
      headers: {
        authorization: `Bearer ${authToken}`
      }
    });
    setLoader(false);
    if (results.data) {
      route.params.onUpload();
      navigation.goBack();
    }
  }
  catch (err) {
    console.log("error", err);
  }
}

/**
 * upload image to azure blob storage
 * 
 * @object {*} imagePathDetails 
 * @string {*} img64 
 * @function {*} setLoader 
 * @array {*} selectedFriendsList 
 * @string {*} authToken 
 * @function {*} navigation 
 * @function {*} route 
 */
export const uploadImageToAzure = (imagePathDetails, img64, setLoader, selectedFriendsList, authToken, navigation, route) => {
  let imageLength = 0;
  imageLength = decode(img64).byteLength;
  const buffer = Buffer.from(img64, 'base64');
  const contentType = 'image/jpeg; charset=UTF-8';

  const headers = {
    Authorization: imagePathDetails.headerkey,
    'x-ms-version': imagePathDetails.version,
    'x-ms-date': imagePathDetails.date,
    'x-ms-blob-type': 'BlockBlob',
    'Content-Type': contentType,
    'Content-Length': imageLength, // `${imageBinary.byteLength}`,
  };

  const imageUploadFromAzureResponse = axios({
    method: 'PUT',
    url: imagePathDetails.putUrl,
    headers,
    data: buffer,
    config: {
      onUploadProgress: (event) => console.log('⛑ onUploadProgress', event),
    },
  })
    .then((response) => {
      console.log({
        '🎩 scanReceiptDocumentUpload THEN': '-',
        response,
      });

      if (response.status === 201) {
        updateURLToServerHelper(imagePathDetails.putUrl, setLoader, selectedFriendsList, authToken, navigation, route);
      } else {
        alert('Upload Failure!');
      }
    })
    .catch((error) => {
      console.log({
        '🌸 scanReceiptDocumentUpload :: ERRRO CAUGHT': '-',
        error,
      });
      updateURLToServerHelper(imagePathDetails.putUrl, setLoader, selectedFriendsList, authToken, navigation, route);
    });
}

/**
 * get azure url to upload image
 * 
 * @param {string} img64 
 * @param {function} setLoader 
 * @param {array} selectedFriendsList 
 * @param {string} authToken 
 * @param {function} navigation 
 * @param {object} route 
 */
export const getUploadUrl = async (img64, setLoader, selectedFriendsList, authToken, navigation, route) => {
  try {
    const body = {
      "signatureData": [
        {
          "customer": "9d86a5ad-cd58-48da-88d9-34932a356036",
          "bloblength": decode(img64).byteLength,
          "deviceId": "msm2123",
          "blobtype": "jpg",
          "requestFor": "receipt"
        }
      ]
    }
    const result = await axiosInstance.post(get_url_api, { body });
    uploadImageToAzure(result.data.sas[0], img64, setLoader, selectedFriendsList, authToken, navigation, route);
  }
  catch (err) {
    console.log("error", err);
  }
}

/**
 * get friends to tag
 * 
 * @param {function} setFriendsList 
 * @param {string} authToken 
 */
export const fetchFriendsList = async (setFriendsList, authToken) => {
  try {
    let results = await axios.get(`${API_URL}/users/`, {
      headers: {
        authorization: `Bearer ${authToken}`
      }
    });
    setFriendsList(results.data.data);
  }
  catch (err) {
    console.log("error", err);
  }
}

/**
 * get user uploaded images list
 * 
 * @param {function} setImgArray 
 * @param {string} authToken 
 */
export const fetchImagesList = async (setImgArray, authToken) => {
  try {
    let results = await axios.get(`${API_URL}/azure/images`, {
      headers: {
        authorization: `Bearer ${authToken}`
      }
    });
    setImgArray(results.data.data);
  }
  catch (err) {
    console.log("error", err);
  }
}

/**
 * to make a new array with only url field
 * @param {array} data 
 * @returns 
 */
const getTaggedUrlArray = async (data) => {
  let finalArray = [];
  data.map((obj) => {
    finalArray.push(obj.getUrl);
  })
  return finalArray;
}

/**
 * get images list tagged by friends 
 * @param {function} setTaggedImgArray 
 * @param {string} authToken 
 */
export const fetchTaggedImagesList = async (setTaggedImgArray, authToken) => {
  try {
    let results = await axios.get(`${API_URL}/azure/tagged/images`, {
      headers: {
        authorization: `Bearer ${authToken}`
      }
    });
    let urlArray = await getTaggedUrlArray(results.data.data)
    setTaggedImgArray(urlArray);
  }
  catch (err) {
    console.log("error", err);
  }
}

