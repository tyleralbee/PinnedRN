import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  View,
} from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

import { becomeUser } from '../actions/users'
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { MonoText } from '../components/StyledText';

// NOTES 
// explore what monotext is 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

class HomeScreen extends React.Component {
  state = {
    loading: true,
    location: null,
    errorMessage: null,
  };

  componentDidMount() {
    this._getLocationAsync()
    this.props.becomeUser('User1')
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location, loading: false, }, () => console.log(location));
  };


  render() {
    return (
      <View style={styles.container}>
        {this.state.loading ?
          (<ActivityIndicator />)
          :
          (
            <MapView
              style={styles.mapStyle}
              initialRegion={{
                latitude: this.state.location.coords.latitude,
                longitude: this.state.location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              {/* {this.state.markers.map(marker => (
                <Marker
                  coordinate={marker.latlng}
                  title={marker.title}
                  description={marker.description}
                />
              ))} */}
            </MapView>
          )
        }

      </View>
    );

  }
}

HomeScreen.navigationOptions = {
  header: null,
};



const mapStateToProps = state => ({
  currentUser: state.users.currentUser,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      becomeUser,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);