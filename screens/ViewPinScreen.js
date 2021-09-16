import React from 'react';
import { ActivityIndicator, View, TouchableOpacity, Text, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import { fontStyles } from '../constants/Fonts';
import PinPicture from '../components/PinPicture';
import LikeButton from '../components/LIkeButton';
import PeopleIndicator from '../components/PeopleIndicator';
import CommentsSection from '../components/CommentsSection';
import { addComment, getPins, like, unLike } from '../actions/pins';

const styles = EStyleSheet.create({
    container: {
        flex: 1,
    },
    likeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: '.5rem',
        marginHorizontal: '1.7rem',

    },
    xButton: {
        width: 80,
        height: 80,
        top: '2.5%',
        left: '2.5%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
    },
    xButtonText: {
        ...fontStyles.firaLight,
        fontSize: '1.5rem',
        color: 'blue',
    },
    addressText: {
        ...fontStyles.firaLight,
        margin: '1rem',
        fontSize: '1.5rem',
        color: 'black',
    },

});

class ViewPinScreen extends React.Component {
    state = {
        loading: false,
        comment: '',
    };

    componentDidMount() {

    }

    handleChange = (field, value) =>
        this.setState(prevState => ({
            ...prevState,
            [field]: value
        }))

    handleAddComment = async () => {
        await this.props.addComment(this.props.selectedPin.id, this.state.comment).then(res => console.log('res in add comment fun in HomeScreen ', res))
        console.log('end of addComment func')
    }

    handleLike = async () => {
        await this.props.like(this.props.selectedPin.id, 'userId').then(res => console.log('res in like func in HomeScreen ', res))
        console.log('end of like func')
    }

    handleUnlike = async () => {
        await this.props.unLike(this.props.selectedPin.id, 'userId').then(res => console.log('res in unLike func in HomeScreen ', res))
        console.log('end of unLike func')
    }


    render() {

        console.log('ViewPinScreen re-render with pin ', this.props.selectedPin)

        const liked = this.props.selectedPin.likes.includes('userId')

        return (
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}

                style={styles.container}>
                {this.state.loading ?
                    (<ActivityIndicator />) : (
                        <View style={styles.container}>

                            <TouchableOpacity style={styles.xButton} onPress={() => this.props.navigation.navigate('Home')}>
                                <Text style={styles.xButtonText}>
                                    Back
                                </Text>
                            </TouchableOpacity>
                            <Text style={styles.addressText}>
                                {this.props.selectedPin.description}
                            </Text>
                            <PinPicture />
                            <View style={styles.likeContainer}>
                                <PeopleIndicator />
                                <LikeButton handlePress={liked ? this.handleUnlike : this.handleLike} likesArr={this.props.selectedPin.likes} liked={liked}/>
                            </View>
                            <CommentsSection key={this.props.selectedPin.id} comments={this.props.selectedPin.comments} handleChange={this.handleChange} handleAddComment={this.handleAddComment}/>
                        </View>
                    )}
            </KeyboardAvoidingView>
        );

    }
}

const mapStateToProps = state => ({
    pins: state.pins.pins,
    selectedPin: state.pins.selectedPin
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            addComment,
            getPins,
            like,
            unLike,
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewPinScreen);