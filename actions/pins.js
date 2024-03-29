import { db } from '../config/firebase-config'
import firebase from 'firebase'

import 'react-native-get-random-values';

import { v4 as uuidv4 } from 'uuid';

// ------------------------------------------------

export const SELECT_PIN = 'SELECT_PIN';

export const selectPin = pinId => async dispatch => {
    console.log('selectPin action with pin' , pinId)
    return dispatch({ type: SELECT_PIN, pinId });
};

// also used to update redux store during addFriend, 
export const GET_PINS_REQUEST = 'GET_PINS_REQUEST';
export const GET_PINS_SUCCESS = 'GET_PINS_SUCCESS';
export const GET_PINS_FAILURE = 'GET_PINS_FAILURE';

export const getPins = () => async dispatch => {
    dispatch({ type: GET_PINS_REQUEST });
    let pin = {};
    let pins = [];

    try {

        await firebase.firestore().collection('pins').get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    pin = {
                        id: doc.data().id,
                        description: doc.data().desc,
                        lat: doc.data().lat,
                        lng: doc.data().lng,
                        comments: doc.data().comments,
                        likes: doc.data().likes,
                    }

                    pins.push(pin)
                });
            })

        return dispatch({
            type: GET_PINS_SUCCESS,
            payload: pins,
        });

    } catch (err) {
        return dispatch({
            type: GET_PINS_FAILURE,
            payload: err,
            error: true,
        });
    }
};

export const CREATE_PINS_REQUEST = 'CREATE_PINS_REQUEST';
export const CREATE_PINS_SUCCESS = 'CREATE_PINS_SUCCESS';
export const CREATE_PINS_FAILURE = 'CREATE_PINS_FAILURE';

export const createPins = (pins) => async dispatch => {
    dispatch({ type: CREATE_PINS_REQUEST });

    try {
        for (let i = 0; i < pins.length; i += 1) {
            db.collection("pins").doc(pins[i].id).set(pins[i])
                .then(function () {
                    console.log("Created pins!");
                })
                .catch(function (error) {
                    console.error("Error creating pins: ", error);
                });

            return dispatch({
                type: CREATE_PINS_SUCCESS,
                payload: pins,
            });
        }

    } catch (err) {
        console.log('err in create pins', err)
        return dispatch({
            type: CREATE_PINS_FAILURE,
            payload: err,
            error: true,
        });
    }
};

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const addComment = (pinId, comment) => async dispatch => {
    dispatch({ type: ADD_COMMENT_REQUEST });
    const pinRef = db.collection('pins').doc(pinId);
    const rando = await uuidv4();

    commentObj = {
        value: comment,
        id: rando,
        pinId: pinId
    }

    try {
        await pinRef.update({
            comments: firebase.firestore.FieldValue.arrayUnion(commentObj)
        }).then(res => {
            console.log('Add comment returns res ', res)
            dispatch({
                comment: commentObj,
                type: ADD_COMMENT_SUCCESS,
            })

            return dispatch({
                pinId,
                type: SELECT_PIN,
            })
        })

    } catch (err) {
        console.log('err in add comment', err)
        return dispatch({
            type: ADD_COMMENT_FAILURE,
            payload: err,
            error: true,
        });
    }
};

export const LIKE_REQUEST = 'LIKE_REQUEST';
export const LIKE_SUCCESS = 'LIKE_SUCCESS';
export const LIKE_FAILURE = 'LIKE_FAILURE';

export const like = (pinId, userId) => async dispatch => {
    dispatch({ type: LIKE_REQUEST });
    const pinRef = db.collection('pins').doc(pinId);

    try {
        await pinRef.update({
            likes: firebase.firestore.FieldValue.arrayUnion(userId)
        }).then(res => {
            console.log('Like returns res ', res)
            dispatch({
                userId,
                pinId,
                type: LIKE_SUCCESS,
            })

            return dispatch({
                pinId,
                type: SELECT_PIN,
            })
        })

    } catch (err) {
        console.log('err in like', err)
        return dispatch({
            type: LIKE_FAILURE,
            payload: err,
            error: true,
        });
    }
};

export const UNLIKE_REQUEST = 'UNLIKE_REQUEST';
export const UNLIKE_SUCCESS = 'UNLIKE_SUCCESS';
export const UNLIKE_FAILURE = 'UNLIKE_FAILURE';

export const unLike = (pinId, userId) => async dispatch => {
    dispatch({ type: UNLIKE_REQUEST });
    const pinRef = db.collection('pins').doc(pinId);

    try {
        await pinRef.update({
            likes: firebase.firestore.FieldValue.arrayRemove(pinId)
        }).then(res => {
            console.log('unlike returns res ', res)
            dispatch({
                userId,
                pinId,
                type: UNLIKE_SUCCESS,
            })

            return dispatch({
                pinId,
                type: SELECT_PIN,
            })
        })

    } catch (err) {
        console.log('err in unlike', err)
        return dispatch({
            type: UNLIKE_FAILURE,
            payload: err,
            error: true,
        });
    }
};
