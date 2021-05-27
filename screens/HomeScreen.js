import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Dimensions,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  View,
  TextInput,
} from 'react-native';
import Constants from 'expo-constants';

import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

import { becomeUser } from '../actions/users'
import * as Location from 'expo-location';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

// actions
import { signIn, createAccount, signOut } from '../actions/users';
import { fontStyles } from '../constants/Fonts';
import { GOOGLE_PLACES_API_KEY } from '../config/google-config';

import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gPlaceAutoContainer: {
    flex: 4,
    backgroundColor: '#ecf0f1',
    paddingTop: '4rem',
    //width: Dimensions.get('window').width,
  },
  map: {
    flex: 6,
    width: Dimensions.get('window').width,
  },
  dropPinBar: {
    flex: 1,
  },
  innerDropPinBar: {
    marginTop: '1rem',
    marginHorizontal: '2rem',
    backgroundColor: '#D3D3D3',
    padding: '1rem',
    paddingLeft: '1rem',
    borderRadius: 2,
  },
  innerDropPinBarText: {
    ...fontStyles.firaLight,
    fontSize: '1rem',
    color: 'black',
  },
});

class HomeScreen extends React.Component {
  state = {
    loading: true,
    location: null,
    errorMessage: null,
    locationBar: false,
  };

  componentDidMount() {
    this._getLocationAsync()
    // this.props.becomeUser('User1')
    // this.props.createAccount('tyleralbee25@gmail.com', 'pinned');
    this.props.signIn('tyleralbee25@gmail.com', 'pinned');
    this.props.signOut();


  }

  _getLocationAsync = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location, loading: false, }, () => console.log(location));
  };

  handleToggleLocationBar = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        locationBar: !prevState.locationBar
      }
    })
  }


  render() {
    return (
      <View style={styles.container}>
        {this.state.loading ?
          (<ActivityIndicator />)
          :
          (
            <View>
              {
                this.state.locationBar ? (
                  <TouchableOpacity style={styles.gPlaceAutoContainer} onPress={this.handleToggleLocationBar}>
                    <GooglePlacesAutocomplete
                      autoFocus={true}
                      placeholder="Search"
                      query={{
                        key: GOOGLE_PLACES_API_KEY,
                        language: 'en', // language of the results
                      }}
                      onPress={(data, details = null) => console.log(data)}
                      onFail={(error) => console.error(error)}
                      requestUrl={{
                        url:
                          'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api',
                        useOnPlatform: 'web',
                      }} // this in only required for use on the web. See https://git.io/JflFv more for details.
                    />
                  </TouchableOpacity>
                ) : (
                  null
                )
              }
              <MapView
                style={styles.map}
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

              {
                this.state.locationBar ? (
                  null
                ) : (
                  <>

                    <TouchableOpacity style={styles.dropPinBar} onPress={this.handleToggleLocationBar}>
                      <View style={styles.innerDropPinBar}>
                        <Text style={styles.innerDropPinBarText}>
                          Pin a location to your friends...
                  </Text>
                      </View>
                    </TouchableOpacity>
                  </>
                )
              }

            </View>

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
      // becomeUser,
      signIn,
      createAccount,
      signOut
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);