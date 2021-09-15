import React from 'react';
import {
    Text,
    View,
    TouchableOpacity
} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet';
import { fontStyles } from '../constants/Fonts';



const styles = EStyleSheet.create({
    commentContainer: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: 4,
        flexDirection: 'row',
        // marginLeft: '1.5rem',
        marginRight: '5.5rem',
        marginTop: '.8rem',
    },
    commentText: {
        ...fontStyles.firaLight,
        marginTop: '.8rem',
        fontSize: '1rem',
        color: 'black',
    },
    commentPicture: {
        width: 50,
        height: 50,
        top: '3%',
        // left: '5%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 100,
        backgroundColor: 'grey',
        marginHorizontal: '1rem'
    },
    commentPictureText: {
        ...fontStyles.firaLight,
        fontSize: '1rem',
        color: 'black',
    }
});


const Comment = (props) => {
    const {
        handlePress,
        comment
    } = props

    console.log('comment in Comment component: ', comment)
    return (
        <TouchableOpacity style={styles.commentContainer} onPress={() => console.log('Comment')}>
            <TouchableOpacity style={styles.commentPicture} onPress={() => console.log('Profile Picture')}>
                <Text style={styles.commentPictureText}>
                    P
                </Text>
            </TouchableOpacity>
            <Text style={styles.commentText}>
                {comment}
            </Text>
        </TouchableOpacity>
    );
};

export default Comment