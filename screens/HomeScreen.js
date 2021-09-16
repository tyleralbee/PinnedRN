import * as Location from 'expo-location';
import React from 'react';
import {
  ActivityIndicator,
  View,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import MapView from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { v4 as uuidv4 } from 'uuid';

import { signIn, createAccount, signOut } from '../actions/users';
import PinLocationBar from '../components/PinLocationBar';
import ProfileButton from '../components/ProfileButton';
import SearchLocationBar from '../components/SearchLocationBar';
import {
  createPins,
  getPins,
  selectPin,
  GET_PINS_SUCCESS,
} from '../actions/pins';
import { GOOGLE_GEOCODING_API_KEY } from '../config/google-config';
import DropDownHolder from '../helpers/dropdownHolder';

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
    errorMessage: null,
    loading: true,
    location: null,
    locationBar: false,
  };

  async componentDidMount() {
    await this._getLocationAsync()
    this.setState({ loading: false })

    await this.props.getPins()
      .then(res => {
        if (res.type !== GET_PINS_SUCCESS) {
          return DropDownHolder.dropDown.alertWithType(
            'error',
            'Error',
            'There was a problem getting your pins. Are you connected to the internet?'
          );
        }
      })

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
    console.log('location selected : ', data)
    const rando = await uuidv4();

    Geocoder.init(GOOGLE_GEOCODING_API_KEY);
    let pins = []

    let pin = {
      desc: data.description || '',
      lat: '',
      lng: '',
      comments: [],
      likes: [],
      id: rando
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
        console.log('res in createPins in HomeScreen ', res)
        if (res.type === 'CREATE_PINS_SUCCESS') {
          console.log('back in function after create pins success')
        }
      })
  }

  handleSelectPin = async pinId => {
    await this.props.selectPin(pinId);

    console.log('back in selectPin ', this.props.selectedPin)

    this.props.navigation.navigate('ViewPin')
  }

  render() {

    console.log('HomeScreen re-render with pins ', this.props.pins)
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
              {this.props.pins.map(pin => {
                console.log('pin in HomeScreen mapping ', pin)
                return (
                  <MapView.Marker
                    coordinate={{ longitude: pin.lng, latitude: pin.lat }}
                    title={pin.desc}
                    description={pin.desc}
                    key={pin.id}
                    onPress={() => this.handleSelectPin(pin.id)}
                  />
                )
              })}
            </MapView>
            <ProfileButton handlePress={this.props.navigation.navigate} />
            {this.state.locationBar ? (
              <SearchLocationBar handlePress={this.handleToggleLocationBar} handleLocationSelected={this.handleLocationSelected} />
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
  selectedPin: state.pins.selectedPin
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
      selectPin
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);