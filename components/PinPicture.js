import React from 'react';
import {
    Text,
    View,
    TouchableOpacity
} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet';
import { fontStyles } from '../constants/Fonts';



const styles = EStyleSheet.create({
    pinPicture: {
        width: '23rem',
        height: '12rem',
        left: '5%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        backgroundColor: 'white',
    },
    pinPictureText: {
        ...fontStyles.firaLight,
        fontSize: '1rem',
        color: 'black',
    }
});


const PinPicture = (props) => {
    const {
        handlePress
    } = props


    return (
        <TouchableOpacity style={styles.pinPicture} onPress={() => console.log('Pin Picture')}>
            <Text style={styles.pinPictureText}>
                Pin picture or map
            </Text>
        </TouchableOpacity>
    );
};

export default PinPicture