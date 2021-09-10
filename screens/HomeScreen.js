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
import PinLocationBar from '../components/PinLocationBar';
import SearchLocationBar from '../components/SearchLocationBar';
import ProfileButton from '../components/ProfileButton';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  map: {
    ...EStyleSheet.absoluteFillObject,
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
        {this.state.loading ? (<ActivityIndicator />) : (
          <>
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
                return (
                  <MapView.Marker
                    coordinate={{ longitude: marker.lng, latitude: marker.lat }}
                    title={marker.desc}
                    description={marker.desc}
                    key={marker.id}
                    onPress={() => this.props.navigation.navigate('ViewPin', { marker })}
                  />
                )
              })}
            </MapView>
            <ProfileButton handlePress={this.props.navigation.navigate}/>
            {this.state.locationBar ? (
              <SearchLocationBar handlePress={this.handleToggleLocationBar} handleLocationSelected={this.handleLocationSelected}/>
            ) : (
              <PinLocationBar handlePress={this.handleToggleLocationBar} />
            )}
          </>
        )}

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