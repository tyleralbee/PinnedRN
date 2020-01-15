import React from 'react';
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native'
import { ExpoConfigView } from '@expo/samples';
import SubmitButton from '../components/SubmitButton'
import { SearchBar, Button } from 'react-native-elements';
import EStyleSheet from 'react-native-extended-stylesheet';

// mongodb+srv://tyleralbee:<password>@cluster0-7fkcf.mongodb.net/test?retryWrites=true&w=majority

const styles = EStyleSheet.create({
  btnContainer: {
    justifyContent: 'center',
  },
});

export default class SettingsScreen extends React.Component {
  state = {
    search: '',
  };

  updateSearch = search => {
    this.setState({ search });
  };

  render() {
    const { search } = this.state;

    return (
      <View>
        <SearchBar
          placeholder="Type Here..."
          onChangeText={this.updateSearch}
          value={search}
        />
        <SubmitButton text='Create User' type='create'/>
        <SubmitButton text='Search User' type='search'/>

      </View>
    )
  }
}