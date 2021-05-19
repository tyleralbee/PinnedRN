import { db } from '../config/firebase-config'
import firebase from 'firebase'

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILURE = 'GET_USER_FAILURE';

export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE';

export const signIn = (email, password) => async dispatch => {
    dispatch({ type: SIGN_IN_REQUEST });

    try {
        db.collection("users").where("username", "==", username)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    obj = {
                        id: doc.id,
                        username: doc.data().username,
                        friends: doc.data().friends,
                    }

                    console.log(obj)

                    console.log('obj', obj)
                    return dispatch({
                        type: SIGN_IN_SUCCESS,
                        payload: obj,
                    });
                });
            })

    } catch (err) {
        return dispatch({
            type: SIGN_IN_FAILURE,
            payload: err,
            error: true,
        });
    }
};

export const BECOME_USER_REQUEST = 'BECOME_USER_REQUEST';
export const BECOME_USER_SUCCESS = 'BECOME_USER_SUCCESS';
export const BECOME_USER_FAILURE = 'BECOME_USER_FAILURE';

export const becomeUser = username => async dispatch => {
    dispatch({ type: BECOME_USER_REQUEST });

    let obj = {}

    try {
        db.collection("users").where("username", "==", username)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    obj = {
                        id: doc.id,
                        username: doc.data().username,
                        friends: doc.data().friends,
                    }

                    console.log(obj)

                    console.log('obj', obj)
                    return dispatch({
                        type: BECOME_USER_SUCCESS,
                        payload: obj,
                    });

                    // var joined = this.state.foundUsers.concat(obj);
                    // this.setState({ foundUsers: joined })

                    // this.setState(prevState => ({
                    //   foundUsers: [
                    //     ...prevState.foundUsers,
                    //     doc.data()
                    //   ]
                    // }))
                });
            })

    } catch (err) {
        return dispatch({
            type: BECOME_USER_FAILURE,
            payload: err,
            error: true,
        });
    }
};

export const ADD_FRIEND_REQUEST = 'ADD_FRIEND_REQUEST';
export const ADD_FRIEND_SUCCESS = 'ADD_FRIEND_SUCCESS';
export const ADD_FRIEND_FAILURE = 'ADD_FRIEND_FAILURE';

// userId, friendId
export const addFriend = (uid, fid) => async dispatch => {
    console.log('adding friend.. ')
    dispatch({ type: ADD_FRIEND_REQUEST });

    var userRef = db.collection("users").doc(uid);
    let friendRef = db.collection("users").doc(fid);

    friendRef
        .get()
        .then((doc) => {
            console.log('getting friend.. ')

            dispatch({ type: GET_USER_REQUEST });

            if (doc.exists) {
                console.log("Document data:", doc.data());

                userRef
                    .update({
                        friends: firebase.firestore.FieldValue.arrayUnion(doc.data())
                    })
                    .then(() => {
                        console.log('updated friend array ')

                    })
                    .catch(err => {
                        console.log(err)

                        return dispatch({
                            type: ADD_FRIEND_FAILURE,
                            payload: err,
                            error: true,
                        });
                    })

                return dispatch({
                    type: ADD_FRIEND_SUCCESS,
                    payload: uid,
                });
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });

    // try {
    //     userRef
    //         .update({
    //             friends: firebase.firestore.FieldValue.arrayUnion(uid)
    //         })
    //         .then(() => {

    //         })
    //         .catch(err => {

    //         })

    //     return dispatch({
    //         type: ADD_FRIEND_SUCCESS,
    //         payload: uid,
    //     });

    // } catch (err) {
    //     return dispatch({
    //         type: ADD_FRIEND_FAILURE,
    //         payload: err,
    //         error: true,
    //     });
    // }
};

// also used to update redux store during addFriend, 
export const GET_USERS_REQUEST = 'GET_USERS_REQUEST';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const GET_USERS_FAILURE = 'GET_USERS_FAILURE';

export const getUsers = uids => async dispatch => {
    dispatch({ type: GET_USERS_REQUEST });
    var userRef = db.collection("users").where(firebase.firestore.FieldPath.documentId(), "in", uids);
    let user = {};
    let users = [];

    try {

        await userRef
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    user = {
                        id: doc.id,
                        username: doc.data().username,
                    }

                    users.push(user)

                    // var joined = this.state.foundUsers.concat(obj);
                    // this.setState({ foundUsers: joined })

                    // this.setState(prevState => ({
                    //   foundUsers: [
                    //     ...prevState.foundUsers,
                    //     doc.data()
                    //   ]
                    // }))
                });
            })

        console.log('getUsers returns ', users)

        return dispatch({
            type: GET_USERS_SUCCESS,
            payload: users,
        });

    } catch (err) {
        return dispatch({
            type: GET_USERS_FAILURE,
            payload: err,
            error: true,
        });
    }
};

