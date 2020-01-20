import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList
} from 'react-native'
import SubmitButton from '../components/SubmitButton'
import { SearchBar, Button } from 'react-native-elements';
import EStyleSheet from 'react-native-extended-stylesheet';
import { db } from '../config/firebase-config'
// mongodb+srv://tyleralbee:<password>@cluster0-7fkcf.mongodb.net/test?retryWrites=true&w=majority

const styles = EStyleSheet.create({
  btnContainer: {
    justifyContent: 'center',
  },
});

function Item({ title }) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

export default class SettingsScreen extends React.Component {
  state = {
    search: '',
    foundUsers: [],
  };

  constructor() {
    super();
    this.handleCreateUser = this.handleCreateUser.bind(this);
    this.handleSearchUser = this.handleSearchUser.bind(this);
  }

  updateSearch = search => {
    this.setState({ search });
  };

  handleCreateUser = () => {
    db.collection("users").doc().set({
      username: this.state.search,
    }
    )
      .then(function () {
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  }

  handleSearchUser = () => {
    this.setState({foundUsers: []})

    db.collection("users").where("username", ">", "")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          const obj = {
            id: doc.id,
            username: doc.data().username,
          }

          var joined = this.state.foundUsers.concat(obj);
          this.setState({ foundUsers: joined })

          // this.setState(prevState => ({
          //   foundUsers: [
          //     ...prevState.foundUsers,
          //     doc.data()
          //   ]
          // }))
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });

      console.log('this.state.foundUsers', this.state.foundUsers)
  }

  render() {
    const { search, foundUsers } = this.state;

    return (
      <View>
        <SearchBar
          placeholder="Type Here..."
          onChangeText={this.updateSearch}
          value={search}
        />
        <SubmitButton text='Create User' type='create' handleCreateUser={this.handleCreateUser} />
        <SubmitButton text='Search User' type='search' handleSearchUser={this.handleSearchUser} />

        <FlatList
          data={foundUsers}
          renderItem={({ item }) => <Item title={item.username} />}
          keyExtractor={item => item.id}

        />


      </View>
    )
  }
}