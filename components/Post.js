import React, { Component } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Card, CardItem, Left, Thumbnail, Body, Text, Button, Icon } from 'native-base';
import axios from 'axios';
export default class Post extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            photo: '',
            fullname: ''
        };
    }
    componentWillMount() {
        axios
            .post('https://nirab.me:3000/users/info', {requested: this.props.postdata.name})
            .then((user) => {
                this.setState({ loading: false, photo: user.data.avatar, fullname: user.data.fullname })

            })
            .catch((err) => {
                console.log("ERRORAAYOSOLTI")
                console.log(err)
            })
    }

    render() {
        if (this.state.loading) {
            return (
                <View>
			</View>
            );
        }
        const uri = "https://nirab.me:3000/images/" + this.state.photo;
        return (
            <Card>
				<CardItem button onPress={this.props.onPress}>
					<Left>
					<Thumbnail square source={{uri: uri}} />
					<Body>
						<Text>{this.state.fullname}</Text>
						<Text note> 10, Mar 2019</Text>
					</Body>
					</Left>
				</CardItem>
				<CardItem>
					<Body>
						<Text>
						{this.props.postdata.post}
						</Text>
					</Body>
				</CardItem>
				<CardItem style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between'}} >
					<Button transparent>
						<Icon name="heart-empty" style={{color: 'black'}} />
					</Button>
					<Button transparent>
						<Icon name="chatbubbles" style={{color: 'black'}} />
					</Button>
					<Button transparent>
						<Icon name="share-alt" style={{color: 'black'}} />
					</Button>
				</CardItem>
			</Card>
        );
    }
}

const styles = StyleSheet.create({
    message: {
        padding: 2,
        paddingRight: 5,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    text: {
        fontWeight: 'normal',
        fontSize: 16,
    }

});