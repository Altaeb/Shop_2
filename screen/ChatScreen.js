import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat'
import {
    View,
    Text,
} from 'react-native';
import axios from 'axios';

export default class ChatScreen extends React.Component {
    static navigationOptions = {
        title: "Chat",
        headerStyle: {
            backgroundColor: '#888',
        },
        headerTintColor: '#fff',
    }
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            messages: [],
            name: "",
        };
        this.onSend = this.onSend.bind(this);
    }
    componentWillMount() {
        let a = [];
        console.log(this.props.navigation.state.params.name)
        this.props.navigation.state.params.msgdata.forEach((msg) => {
            if (this.props.navigation.state.params.name === msg.from || this.props.navigation.state.params.name === msg.to) {
            	if(this.props.navigation.state.params.name === msg.from ){
            		newmessage = {
	                    _id: 1,
	                    createdAt: msg.createdAt,
	                    text: msg.message,
	                    user: {
	                        _id: 2,
	                        name: msg.from,
	                        avatar: 'https://placeimg.com/140/140/any',
	                    }
                	};
                	a.push(newmessage);

            	}
            	else{
            		newmessage = {
	                    _id: 1,
	                    createdAt: msg.createdAt,
	                    text: msg.message,
	                    user: {
	                        _id: 2,
	                        name: msg.from,
	                        avatar: 'https://placeimg.com/140/140/any',
	                    }
                	};
                	a.push(newmessage);

            	}

                
                
            }
        })
        console.log(a);
        this.setState({ loading: false, messages: a, })
        

        // this.setState({
        //   messages: [
        //     {
        //       _id: 1,
        //       text: 'Hello developer',
        //       createdAt: new Date(),
        //       user: {
        //         _id: 2,
        //         name: 'React Native',
        //         avatar: 'https://placeimg.com/140/140/any',
        //       },
        //     },
        //   ],
        // });
    }

    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }))
    }
    render() {
        if (this.state.loading) {
            return (
                <View>
				</View>
            )
        }
        return (
            <GiftedChat 
				style={{flex: 1}}
			    messages={this.state.messages}
        		onSend={messages => this.onSend(messages)}
        		user={{
        			_id: 1,
        		}}
				keyboardShouldPersistTaps='never'
	

			/>
        );
    }
}