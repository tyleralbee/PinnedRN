import { db } from '../config/firebase-config'
import firebase from 'firebase'
import 'react-native-get-random-values';

import { v4 as uuidv4 } from 'uuid';

// also used to update redux store during addFriend, 
export const GET_PINS_REQUEST = 'GET_PINS_REQUEST';
export const GET_PINS_SUCCESS = 'GET_PINS_SUCCESS';
export const GET_PINS_FAILURE = 'GET_PINS_FAILURE';

export const getPins = uids => async dispatch => {
    dispatch({ type: GET_PINS_REQUEST });
    var pinRef = db.collection("pins").where(firebase.firestore.FieldPath.documentId(), "in", uids);
    let pin = {};
    let pins = [];

    try {

        await pinRef
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    pin = {
                        id: doc.id,
                        description: doc.data().description,
                        geometry: doc.data().geometry,
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

export const createPins = (data, details) => async dispatch => {
    dispatch({ type: CREATE_PINS_REQUEST });

    try {

        console.log(data, details);
        const rando = await uuidv4();
        console.log(rando)

        db.collection("pins").doc(rando).set({
            data,
            details
        })
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

    } catch (err) {
        console.log(err)
        return dispatch({
            type: CREATE_PINS_FAILURE,
            payload: err,
            error: true,
        });
    }
};
