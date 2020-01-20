import { db } from '../config/firebase-config'

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