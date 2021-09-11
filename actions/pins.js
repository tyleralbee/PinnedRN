import { db } from '../config/firebase-config'
import firebase from 'firebase'

import 'react-native-get-random-values';

import { v4 as uuidv4 } from 'uuid';

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
                    console.log('querySnap')
                    // doc.data() is never undefined for query doc snapshots
                    pin = {
                        id: doc.id,
                        description: doc.data().desc,
                        lat: doc.data().lat,
                        lng: doc.data().lng,
                        comments: doc.data().comments,
                    }

                    pins.push(pin)
                });
            })

        console.log('getPins returns ', pins)

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
            const rando = await uuidv4();

            db.collection("pins").doc(rando).set(pins[i])
                .then(function () {
                    console.log("Document successfully written!");
                })
                .catch(function (error) {
                    console.error("Error writing document: ", error);
                });

            return dispatch({
                type: CREATE_PINS_SUCCESS,
                payload: pins,
            });
        }

    } catch (err) {
        console.log(err)
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
        id: rando
    }

    try {
        await pinRef.update({
            comments: firebase.firestore.FieldValue.arrayUnion(commentObj)
        }).then(res => dispatch({
            type: ADD_COMMENT_SUCCESS,
        }))

    } catch (err) {
        console.log(err)
        return dispatch({
            type: ADD_COMMENT_FAILURE,
            payload: err,
            error: true,
        });
    }
};