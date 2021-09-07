import React from 'react';
import {
    Text,
    View,
    TouchableOpacity
} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet';



const styles = EStyleSheet.create({

});


const ProfileButton = (props) => {
    const {

    } = props


    return (
        <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.submitBtn} onPress={handlePress}>
                <Text style={styles.submitText}>
                    {text}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default ProfileButton