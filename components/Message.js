import React, {Component} from 'react';
import {  StyleSheet, View  } from 'react-native';
import {Card, CardItem, Body, Text, Thumbnail, Left } from 'native-base';
import axios from 'axios';


export default class Message extends Component{
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	loading: true,
	  	photo: "",
	  	fullname:"",
	  };
	}
	componentWillMount(){
		console.log("componentwill moin")
        axios
            .post('https://nirab.me:3000/users/info', {requested: this.props.msgdata})
            .then((user) => {
                this.setState({ loading: false, photo: user.data.avatar, fullname: user.data.fullname })
                console.log("message bhayo")

            })
            .catch((err) => {
                console.log("ERRORAAYOSOLTI")
                console.log(err)
            })
	}
	render(){
		const uri= 'https://nirab.me:3000/images/'+ this.state.photo;
		if(this.state.loading){
			return (
				<View>
				<Text>Loading</Text>
				</View>
			)
		}
		return(
			
			<Card transparent style={{flexDirection: 'row'}} >
				<View style={{flex:1, paddingRight: 5}}>
					<Thumbnail small  source={{uri: uri}} />
				</View>
				<View style={{flex: 7, padding: 0}} >
					<CardItem button onPress={this.props.onPress}  style={{flexDirection: 'column'}} >
						<Left>
							<Body style={{ flexDirection: 'row',justifyContent: 'space-between'}} >
								<Text style={{fontWeight: 'bold'}} >{this.state.fullname}</Text>
								<Text note> 15, Jan</Text>
							</Body>
						</Left>
						<Left>
							<Body>
								<Text>Hi Chat with me</Text>
							</Body>
						</Left>
					</CardItem>
				</View>
			</Card>
		);
	}
}

const styles = StyleSheet.create({
	message:{
		padding:2,
		paddingRight: 5,
	},
	name: {
		fontWeight: 'bold',
		fontSize: 22,
	},
	text: {
		fontWeight: 'normal',
		fontSize: 16,
	}

});
