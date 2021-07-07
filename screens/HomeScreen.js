import React from 'react';
import {
  Dimensions,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  View,
} from 'react-native';
import MapView from 'react-native-maps';

import * as Location from 'expo-location';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Geocoder from 'react-native-geocoding';

// actions
import { signIn, createAccount, signOut } from '../actions/users';
import {
  createPins,
  getPins,
  GET_PINS_SUCCESS,
} from '../actions/pins';

import { fontStyles } from '../constants/Fonts';
import { GOOGLE_PLACES_API_KEY, GOOGLE_GEOCODING_API_KEY } from '../config/google-config';

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
    markers: [],
  };

  async componentDidMount() {
    await this._getLocationAsync()
    // this.props.becomeUser('User1')
    // this.props.createAccount('tyleralbee25@gmail.com', 'pinned');
    // this.props.signIn('tyleralbee25@gmail.com', 'pinned');
    // this.props.signOut();
    await this.props.getPins()
      .then(res => {
        if (res.type === GET_PINS_SUCCESS) {
          // console.log('success in func ', res.payload)
        } else {
          console.log('fail func')
        }
      })

    console.log('success redux', this.props.pins)
    this.setState({ markers: this.props.pins, loading: false })
  }
ty
  _getLocationAsync = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };

  handleToggleLocationBar = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        locationBar: !prevState.locationBar
      }
    })
  }

  handleLocationSelected = async data => {
    console.log('data', data)
    Geocoder.init(GOOGLE_GEOCODING_API_KEY);
    let pins = []

    let pin = {
      desc: data.description || '',
      lat: '',
      lng: ''
    }

    await Geocoder.from(data.description)
      .then(json => {
        var location = json.results[0].geometry.location;
        pin.lat = location.lat
        pin.lng = location.lng
      })
      .catch(error => console.warn(error));

    pins.push(pin);

    await this.props.createPins(pins)
      .then(res => {
        if (res.type === 'CREATE_PINS_SUCCESS') {
          console.log('back in function success')
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
                      onPress={(data, details = null) => this.handleLocationSelected(data)}
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
              {this.state.markers.map(marker => {
                console.log('marker', marker)
                return                   (
                  <MapView.Marker
                    coordinate={{ longitude : marker.lng, latitude : marker.lat  }}
                    title={marker.desc}
                    description={marker.desc}
                    key={marker.id}
                  />
                )
              }

                )}
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
  pins: state.pins.pins,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      // becomeUser,
      signIn,
      createAccount,
      signOut,
      createPins,
      getPins,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);