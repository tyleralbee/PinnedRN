import React from 'react';
import {
    TouchableOpacity
} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import { GOOGLE_PLACES_API_KEY } from '../config/google-config';

const styles = EStyleSheet.create({
    gPlaceAutoContainer: {
        position: 'absolute',// use absolute position to show on top of the map
        backgroundColor: 'red',
        alignSelf: 'center', // for align to right
        backgroundColor: 'white',
        width: '100%',
        alignItems: 'center', // align text to center
        top: '10%', // for bottom align
        alignItems: 'center', // align text to center
      },
});


const SearchLocationBar = (props) => {
    const {
        handlePress,
        handleLocationSelected
    } = props


    return (
        <TouchableOpacity style={styles.gPlaceAutoContainer} onPress={() => handlePress()}>
            <GooglePlacesAutocomplete
                autoFocus={true}
                placeholder="Search"
                query={{
                    key: GOOGLE_PLACES_API_KEY,
                    language: 'en', // language of the results
                }}
                onPress={(data, details = null) => handleLocationSelected(data)}
                onFail={(error) => console.error(error)}
                requestUrl={{
                    url:
                        'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api',
                    useOnPlatform: 'web',
                }} // this in only required for use on the web. See https://git.io/JflFv more for details.
                styles={{
                    textInputContainer: {
                      width: '100%',
                    },
                    textInput: {
                      height: 38,
                      color: '#5d5d5d',
                      fontSize: 16,
                      
                    },
                    predefinedPlacesDescription: {
                      color: '#1faadb',
                    },
                  }}
            />
        </TouchableOpacity>
    );
};

export default SearchLocationBar