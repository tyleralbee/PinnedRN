import React from 'react';
import {
    Text,
    View,
    TouchableOpacity
} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet';
import { fontStyles } from '../constants/Fonts';
import Icon from 'react-native-vector-icons/FontAwesome';
const myIcon = <Icon name="plus-square" size={48} color="green"/>;


const styles = EStyleSheet.create({
    postCommentButton: {
        width: '3rem',
        height: '3rem',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        // backgroundColor: 'white',
    },
});


const PostCommentButton = (props) => {
    const {
        handlePress
    } = props


    return (
        <TouchableOpacity style={styles.postCommentButton} onPress={() => handlePress()}>
            {myIcon}
        </TouchableOpacity>
    );
};

export default PostCommentButton