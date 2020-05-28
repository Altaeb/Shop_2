import React, { Component } from 'react';
import { Button, FlatList, View, Text, AsyncStorage } from 'react-native';
import Message from '../components/Message';
import axios from 'axios';
import { withNavigation } from 'react-navigation';
class MessagesLists extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mydata: {},
            loading: true,
            msgdata: [],
            msglist: [],
            refinedmsglist: [],
        };
    }
    componentWillMount() {
        AsyncStorage.getItem("userdata").then((value) => {
            this.setState({ mydata: JSON.parse(value) });
        });
        axios
            .post('https://nirab.me:3000/msg/getmessages')
            .then((allmessages) => {
                this.setState({ msgdata: allmessages.data.filter(msg => { return msg.to == this.state.mydata.name || msg.from == this.state.mydata.name }), msglist: allmessages.data.filter(msg => msg.to == this.state.mydata.name) })
                let a = []

                this.state.msglist.forEach((msg) => {
                    if (!a.includes(msg.from)) {
                        if (msg.from !== this.state.mydata.name) {
                            a.push(msg.from);
                        }
                    }
                    this.setState({ refinedmsglist: a })
                })
                this.setState({ loading: false })
            })
    }

    render() {
        if (this.state.loading) {
            return (
                <View style={{justifyContent: 'center'}} >
    			<Button
    			title="Refresh"
    			onPress={()=>this.componentWillMount()}
    			/>
    			<Text>Loading</Text>
    			</View>
            )
        }
        return (
            <View style={{paddingRight: 5,paddingTop: 15,paddingBottom: 10,backgroundColor: '#fff',}} >
				<FlatList
			        data={this.state.refinedmsglist}
			        keyExtractor={(item) => item}
			        renderItem={({item}) => <Message style={{margin: 5,}} msgdata={item}  onPress={()=> this.props.navigation.navigate('ChatScreen', {msgdata: this.state.msglist, name: item, mydata: this.state.mydata})} />}
		    	/>
		    </View>
        );
    }
}
export default withNavigation(MessagesLists);