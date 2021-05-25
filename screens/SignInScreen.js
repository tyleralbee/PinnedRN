import React from 'react';
import {
    StyleSheet,
    ActivityIndicator,
    View,
    Text,
    KeyboardAvoidingView,
    Button,
    TextInput,
    TouchableOpacity,
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import EStyleSheet from 'react-native-extended-stylesheet';

import { splashColor } from '../constants/Colors';
import { signIn, createAccount, signOut } from '../actions/users';

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#76d3a9',
    },
    button: {
        padding: '1rem',
        marginHorizontal: '4rem',
        marginTop: '1rem',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#add8e6',
    },
    buttonLabel: {
        // ...fontStyles.firaBold,
        color: 'white',
        fontSize: '2rem',
        textAlign: 'center',
    },
    textInput: {
        padding: '0.5rem',
        fontSize: '1.5rem',
        marginBottom: '1rem',
        marginHorizontal: '2rem',
        color: 'black',
        backgroundColor: 'white',
    },
    privacyButton: {
        backgroundColor: 'transparent',
        marginTop: '2rem',
    },
    privacyButtonLabel: {
        color: '#006667',
    },
    loginButtonText: {
        color: 'black',
        fontSize: '1rem',
    }
});

class SignInScreen extends React.Component {
    state = {
        loading: false,
        email: '',
        password: '',
    };

    componentDidMount() {
        console.log(this.props.navigation)
    }


    render() {
        return (
            <View style={styles.container}>
                {this.state.loading ?
                    (<ActivityIndicator />)
                    :
                    (
                        <View style={styles.container}>

                            <KeyboardAvoidingView
                                style={[styles.container, { justifyContent: 'center' }]}
                                behavior="padding"
                                enabled
                            // keyboardVerticalOffset={100}
                            >
                                <View>
                                    <TextInput
                                        autoComplete="email"
                                        autoFocus
                                        autoCapitalize="none"
                                        textContentType="emailAddress"
                                        keyboardType="email-address"
                                        value={this.state.email}
                                        onChangeText={text => this.setState({ email: text })}
                                        placeholder="Email"
                                        style={[{ ...TextInput.defaultProps.style }, styles.textInput]}
                                    />
                                    <TextInput
                                        autoCapitalize="none"
                                        secureTextEntry
                                        textContentType="password"
                                        value={this.state.password}
                                        onChangeText={text => this.setState({ password: text })}
                                        placeholder="Password"
                                        style={[{ ...TextInput.defaultProps.style }, styles.textInput]}
                                    />
                                    <TouchableOpacity
                                        style={styles.button}
                                        labelStyle={styles.buttonLabel}
                                        onPress={() => {
                                            this.props.signIn(this.state.email, this.state.password).then(this.props.navigation.navigate('Home'))
                                        }}
                                        disabled={this.state.loading}

                                    >
                                        <Text style={styles.loginButtonText}>
                                            {this.state.loading === false
                                                ? 'Sign in'.toUpperCase()
                                                : 'Logging In...'.toUpperCase()}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </KeyboardAvoidingView>
                        </View>
                    )
                }
            </View>
        );

    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            signIn,
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignInScreen);