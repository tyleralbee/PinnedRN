import React from 'react';
import { ActivityIndicator, View, Text, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import EStyleSheet from 'react-native-extended-stylesheet';

import { signIn } from '../actions/users';

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

    render() {
        return (
            <View style={styles.container}>
                <KeyboardAvoidingView
                    style={[styles.container, { justifyContent: 'center' }]}
                    behavior="padding"
                    enabled
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
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => bindActionCreators({ signIn }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);