import React from 'react';
import {
    Text,
    View,
    TouchableOpacity
} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet';
import { fontStyles } from '../constants/Fonts';
import Icon from 'react-native-vector-icons/FontAwesome';
const myIcon = <Icon name="user" size={36} color="black"/>;


const styles = EStyleSheet.create({
    peopleIndicator: {
        width: '3rem',
        height: '3rem',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        // backgroundColor: 'white',
    },
});


const PeopleIndicator = (props) => {
    const {
        handlePress
    } = props


    return (
        <TouchableOpacity style={styles.peopleIndicator} onPress={() => console.log('PeopleIndicator')}>
            {myIcon}
        </TouchableOpacity>
    );
};

export default PeopleIndicator