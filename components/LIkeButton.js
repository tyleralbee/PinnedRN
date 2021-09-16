import React from 'react';
import {
    Text,
    View,
    TouchableOpacity
} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet';
import { fontStyles } from '../constants/Fonts';
import Icon from 'react-native-vector-icons/FontAwesome';
const likedIcon = <Icon name="heart" size={36} color="red" />;
const unLikedIcon = <Icon name="heart-o" size={36} color="red" style={'regular'}/>;


const styles = EStyleSheet.create({
    likeButtonAndCounterContainer: {
        flexDirection: 'row',

    },
    likeButton: {
        width: '3rem',
        height: '3rem',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        // backgroundColor: 'white',
    },
});


const LikeButton = (props) => {
    const {
        handlePress,
        likesArr,
        liked,
    } = props


    return (
        <View style={styles.likeButtonAndCounterContainer}>
            <TouchableOpacity style={styles.likeButton} onPress={() => handlePress()}>
                { liked ? likedIcon : unLikedIcon }
            </TouchableOpacity>
            <Text>
                {likesArr.length}
            </Text>
        </View>
    );
};

export default LikeButton