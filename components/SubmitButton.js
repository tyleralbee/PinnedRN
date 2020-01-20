import React from 'react';
import {
    Text,
    View,
    TouchableOpacity
} from 'react-native'
import { ExpoConfigView } from '@expo/samples';
import { SearchBar, Button } from 'react-native-elements';
import EStyleSheet from 'react-native-extended-stylesheet';



const styles = EStyleSheet.create({
    btnContainer: {
        padding: '1rem',
    },
    submitBtn: {
        padding: '1rem',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#6699ff',
        borderRadius: '1rem',
    },
    submitText: {
        fontSize: '1.4rem',
    },
});


const SubmitButton = (props) => {
    const {
        type,
        text,
        handleSearchUser,
        handleCreateUser,
    } = props


    return (
        <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.submitBtn} onPress={type === 'create' ? handleCreateUser : handleSearchUser}>
                <Text style={styles.submitText}>
                    {text}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default SubmitButton