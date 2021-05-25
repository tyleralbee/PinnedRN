import React from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

class SignInScreen extends React.Component {
  state = {
    loading: true,
  };

  componentDidMount() {

  }


  render() {
    return (
      <View style={styles.container}>
        {this.state.loading ?
          (<ActivityIndicator />)
          :
          (null)
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
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInScreen);