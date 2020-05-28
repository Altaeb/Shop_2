import React from 'react';
import {
	View,
	Text,
	Button
} from 'react-native';

export default class  Details extends React.Component{
	static navigationOptions={
		title: '{jobDetail}',
    	headerStyle: {
    		backgroundColor: '#888',
    	},
    	headerTintColor: '#fff',
	}

	render(){
		return(
			<View>
				<Text>This is details</Text>
			</View>
		);
	}
}