import React from 'react';
import {
    Text,
    View,
    TouchableOpacity
} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet';
import { fontStyles } from '../constants/Fonts';
import Icon from 'react-native-vector-icons/FontAwesome';
const myIcon = <Icon name="heart" size={36} color="red"/>;


const styles = EStyleSheet.create({
    likeButton: {
        width: '3rem',
        height: '3rem',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        // backgroundColor: 'white',
    },
});


const LikeButton = (props) => {
    const {
        handlePress
    } = props


    return (
        <TouchableOpacity style={styles.likeButton} onPress={() => console.log('LikeButton')}>
            {myIcon}
        </TouchableOpacity>
    );
};

export default LikeButton