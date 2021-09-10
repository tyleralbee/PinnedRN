import React from 'react';
import { ActivityIndicator, View, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import { fontStyles } from '../constants/Fonts';
import ProfilePicture from '../components/ProfilePicture';

const styles = EStyleSheet.create({
    container: {
        flex: 1,
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
        color: 'black',
    }
});

class ProfileScreen extends React.Component {
    state = {
        loading: false,
    };

    componentDidMount() {

    }


    render() {
        return (
            <View style={styles.container}>
                {this.state.loading ?
                    (<ActivityIndicator />) : (
                        <View style={styles.container}>

                        <TouchableOpacity style={styles.xButton} onPress={() => this.props.navigation.navigate('Home')}>
                            <Text style={styles.xButtonText}>
                                Back
                            </Text>
                        </TouchableOpacity>
                        
                        <ProfilePicture/>
                        </View>
                    )}
            </View>
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
)(ProfileScreen);