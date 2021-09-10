import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet';
import { fontStyles } from '../constants/Fonts';



const styles = EStyleSheet.create({
    container: {
        flex: 1,
    },
    commentsSection: {
        width: '23rem',
        height: '22rem',
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
    },
    textInput: {
        paddingLeft: '1rem',
        // paddingTop: '1rem',
        borderColor: 'black',
        borderWidth: 1,
        width: '23rem',
        height: '3rem',
        left: '5%',
        color: 'grey',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        backgroundColor: 'white',
    }
});


const CommentsSection = (props) => {
    const {
        handlePress
    } = props


    return (
        <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        >

            <View style={styles.commentsSection} onPress={() => console.log('Comments Section')}>
                <Text style={styles.pinPictureText}>
                    Comments section
                </Text>
            </View>

            <TextInput style={styles.textInput}>
                Write a comment...
            </TextInput>
        </KeyboardAvoidingView>
    );
};

export default CommentsSection