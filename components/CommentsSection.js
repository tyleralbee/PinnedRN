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
import PostCommentButton from './PostCommentButton';
import Comment from './Comment';


const styles = EStyleSheet.create({
    container: {
        flex: 1,
    },
    commentsSection: {
        width: '23rem',
        height: '22rem',
        left: '5%',
        justifyContent: 'flex-start',
        // alignItems: 'flex-start',
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
        width: '21rem',
        height: '3rem',
        left: '5%',
        color: 'grey',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        backgroundColor: 'white',
    },
    addComment: {
        flexDirection: 'row',
        marginHorizontal: '1rem',
    }
});


const CommentsSection = (props) => {
    const {
        handleChange,
        handleAddComment,
        comments
    } = props


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >

            <View style={styles.commentsSection} onPress={() => console.log('Comments Section')}>
                {comments.length ? (comments.map(comment =>
                    <Comment comment={comment} />)) : (<Text> There are no comments.</Text>)}


            </View>
            <View style={styles.addComment}>
                <TextInput placeholder={'Write a comment...'} style={styles.textInput} onChangeText={comment => handleChange('comment', comment)} />
                <PostCommentButton handlePress={handleAddComment} />
            </View>
        </KeyboardAvoidingView>
    );
};

export default CommentsSection