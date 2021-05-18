import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList
} from 'react-native'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SubmitButton from '../components/SubmitButton'
import { SearchBar, Button } from 'react-native-elements';
import EStyleSheet from 'react-native-extended-stylesheet';
import { db } from '../config/firebase-config'

import { becomeUser, BECOME_USER_SUCCESS, addFriend } from '../actions/users'
// mongodb+srv://tyleralbee:<password>@cluster0-7fkcf.mongodb.net/test?retryWrites=true&w=majority

const styles = EStyleSheet.create({
  btnContainer: {
    justifyContent: 'center',
  },
});

function Item({ title, become, fid, addFriend }) {
  console.log('title', title)
  return (
    <View style={styles.item}>
      <TouchableOpacity onPress={() => become(title)}>
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => addFriend(fid)}>
        <Text style={styles.title}>Add Friend</Text>
      </TouchableOpacity>
    </View>
  );
}

class FriendsScreen extends React.Component {
  state = {
    search: '',
    foundUsers: [],
    friends: this.props.currentUser.friends || [],
  };

  // constructor() {
  //   super();
  //   this.handleCreateUser = this.handleCreateUser.bind(this);
  //   this.handleSearchUser = this.handleSearchUser.bind(this);
  // }

  handlePopulateFriends = () => {

  }

  updateSearch = search => {
    this.setState({ search });
  };

  handleAddFriend = (fid) => {
    this.props.addFriend(this.props.currentUser.id, fid).then(
      console.log('this.props.users.currentUser added friend', this.props.currentUser)
    )

  }

  handleBecomeUser = (username) => {
    this.props.becomeUser(username).then(
      console.log('this.props.users.currentUser', this.props.currentUser)
    )
  }

  handleCreateUser = () => {
    db.collection("users").doc().set({
      username: this.state.search,
      friends: []
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
    this.setState({ foundUsers: [] })

    // console.log(this.props.users.currentUser)

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
    const { search, foundUsers, friends } = this.state;

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
          renderItem={({ item }) => <Item title={item.username} fid={item.id} become={this.handleBecomeUser} addFriend={this.handleAddFriend} />}
          keyExtractor={item => item.id}

        />
        <Text>
          Friends
        </Text>
        <FlatList
          data={friends}
          renderItem={({ item }) => <Item title={item.username} become={this.handleBecomeUser} />}
          keyExtractor={item => item.id}

        />


      </View>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.users.currentUser,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      becomeUser,
      addFriend,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FriendsScreen);