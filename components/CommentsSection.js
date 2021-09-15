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
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


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


class CommentsSection extends React.Component {

    render() {
        const {
            handleChange,
            handleAddComment,
        } = this.props
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
            >
    
                <View style={styles.commentsSection} onPress={() => console.log('Comments Section')}>
                    {this.props.selectedPin.comments.length ? (this.props.selectedPin.comments.map(comment =>
                        <Comment key={comment.id} comment={comment.value} />)) : (<Text> There are no comments.</Text>)}
                </View>
                <View style={styles.addComment}>
                    <TextInput placeholder={'Write a comment...'} style={styles.textInput} onChangeText={comment => handleChange('comment', comment)} />
                    <PostCommentButton handlePress={handleAddComment} />
                </View>
            </KeyboardAvoidingView>
        )
    }
};

const mapStateToProps = state => ({
    pins: state.pins.pins,
    selectedPin: state.pins.selectedPin
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {

        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CommentsSection);