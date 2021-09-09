import React from 'react';
import {
    Text,
    View,
    TouchableOpacity
} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet';
import { fontStyles } from '../constants/Fonts';



const styles = EStyleSheet.create({
    profileButton: {
        width: 80,
        height: 80,
        top: '75%',
        left: '35%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 100,
        backgroundColor: 'white',
    },
    profileButtonText: {
        ...fontStyles.firaLight,
        fontSize: '1rem',
        color: 'black',
    }
});


const ProfileButton = (props) => {
    const {
        handlePress
    } = props


    return (
        <TouchableOpacity style={styles.profileButton} onPress={() => handlePress('Profile')}>
            <Text style={styles.profileButtonText}>
                Profile
            </Text>
        </TouchableOpacity>
    );
};

export default ProfileButton