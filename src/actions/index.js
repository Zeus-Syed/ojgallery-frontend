export const ADD_AUTH_TOKEN  = 'ADD_AUTH_TOKEN';


export const REMOVE_AUTH_TOKEN = 'REMOVE_AUTH_TOKEN';


export const addUserDetails = (body) => ({
    type: ADD_AUTH_TOKEN,
    body
})

export const removeUserDetails = () => ({
    type: REMOVE_AUTH_TOKEN
})