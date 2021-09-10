import React from 'react';
import {
    Text,
    View,
    TouchableOpacity
} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet';
import { fontStyles } from '../constants/Fonts';



const styles = EStyleSheet.create({
    profilePicture: {
        width: 160,
        height: 200,
        top: '3%',
        left: '5%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 100,
        backgroundColor: 'white',
    },
    profilePictureText: {
        ...fontStyles.firaLight,
        fontSize: '1rem',
        color: 'black',
    }
});


const ProfilePicture = (props) => {
    const {
        handlePress
    } = props


    return (
        <TouchableOpacity style={styles.profilePicture} onPress={() => console.log('Profile Picture')}>
            <Text style={styles.profilePictureText}>
                Profile picture
            </Text>
        </TouchableOpacity>
    );
};

export default ProfilePicture