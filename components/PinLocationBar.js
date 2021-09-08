import React from 'react';
import {
    Text,
    View,
    TouchableOpacity
} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet';
import { fontStyles } from '../constants/Fonts';


const styles = EStyleSheet.create({
    dropPinBar: {
        position: 'absolute',// use absolute position to show button on top of the map
        top: '88%', // for bottom align
        alignSelf: 'center', // for align to right
        backgroundColor: 'white',
        width: '100%',
        alignItems: 'center', // align text to center
        paddingBottom: '100%'
    },
    innerDropPinBar: {
        marginTop: '1rem',
        marginHorizontal: '2rem',
        backgroundColor: '#D3D3D3',
        padding: '1rem',
        borderRadius: 2,
    },
    innerDropPinBarText: {
        ...fontStyles.firaRegular,
        fontSize: '1.3rem',
        color: 'black',
    },
});


const PinLocationBar = (props) => {
    const {
        handlePress
    } = props


    return (
        <TouchableOpacity style={styles.dropPinBar} onPress={() => handlePress()}>
            <View style={styles.innerDropPinBar}>
                <Text style={styles.innerDropPinBarText}>
                    Pin a location to your friends...
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export default PinLocationBar