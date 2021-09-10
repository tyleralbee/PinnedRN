import React from 'react';
import { ActivityIndicator, View, TouchableOpacity, Text, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import { fontStyles } from '../constants/Fonts';
import PinPicture from '../components/PinPicture';
import LikeButton from '../components/LIkeButton';
import PeopleIndicator from '../components/PeopleIndicator';
import CommentsSection from '../components/CommentsSection';
import { ScrollView } from 'react-native-gesture-handler';

const styles = EStyleSheet.create({
    container: {
        flex: 1,
    },
    likeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: '.5rem',
        marginHorizontal: '1.7rem',

    },
    xButton: {
        width: 80,
        height: 80,
        top: '2.5%',
        left: '2.5%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
    },
    xButtonText: {
        ...fontStyles.firaLight,
        fontSize: '1.5rem',
        color: 'blue',
    },
    addressText: {
        ...fontStyles.firaLight,
        margin: '1rem',
        fontSize: '1.5rem',
        color: 'black',
    },

});

class ViewPinScreen extends React.Component {
    state = {
        loading: false,
    };

    componentDidMount() {

    }


    render() {
        console.log(this.props.route)
        const {
            marker
        } = this.props.route.params

        return (
            <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}

            style={styles.container}>
                {this.state.loading ?
                    (<ActivityIndicator />) : (
                        <View style={styles.container}>

                            <TouchableOpacity style={styles.xButton} onPress={() => this.props.navigation.navigate('Home')}>
                                <Text style={styles.xButtonText}>
                                    Back
                                </Text>
                            </TouchableOpacity>
                            <Text style={styles.addressText}>
                                {marker.description}
                            </Text>
                            <PinPicture />
                            <View style={styles.likeContainer}>
                                <PeopleIndicator />
                                <LikeButton />
                            </View>
                            <CommentsSection/>
                        </View>
                    )}
            </KeyboardAvoidingView>
        );

    }
}

const mapStateToProps = state => ({
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
)(ViewPinScreen);