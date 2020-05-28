import React, { Component } from 'react';
import { FlatList, View, TextInput, ToastAndroid } from 'react-native';
import { Button, Icon, Text } from 'native-base';
import Post from '../components/Post'
import Details from './Details'
import axios from 'axios';
export default class PostsLists extends Component {
    constructor(props) {
        super(props);

        this.state = {
        	mypost: "",
        	postingswitch: false,
            loading: true,
            searchKey: "",
            allposts: [],

        };
        this.sendPost=this.sendPost.bind(this);
        this.postingswitch=this.postingswitch.bind(this);
        this.updateText=this.updateText.bind(this);
    }
    postingswitch(){
    	this.state.postingswitch ? this.setState({postingswitch: false}) : this.setState({postingswitch: true})
    }

    updateText(text, field) {
        if (field == 'search') {
            this.setState({ searchKey: text });
        }
        if(field=='mypost'){
        	this.setState({mypost: text})
        }
    }
    sendPost(){
    	axios.post('https://nirab.me:3000/posts/newpost', {post:this.state.mypost})
    	.then((data) => {
    		this.setState({mypost: ""})
    		ToastAndroid.show('Your Post Posted', ToastAndroid.SHORT)
    	})
    	.catch((err)=> console.log(err))
    }
    componentWillMount(){
	    axios
        .post('https://nirab.me:3000/posts/getposts')
        .then((posts) => {
          	this.setState({loading: false,allposts: posts.data})

        })
        .catch((err) => {
            console.log("ERRORAAYOSOLTI")
            console.log(err)
        })
    }

    render() {
    	let posting;
    	if(this.state.postingswitch){
    		posting =(
    			<View style={{flexDirection: 'row', justifyContent: 'center'}} >
    				<TextInput
					placeholder= 'Write a post'
					placeholderTextColor= 'gray'
					onChangeText={(text)=> this.updateText(text, 'mypost')}
					style= {{
						backgroundColor: '#eee',
						borderRadius: 15,
						width: 70+'%',
						height: 40 ,
						paddingLeft:15
					}}
					/>
					<Button transparent onPress={()=> this.sendPost()} >
						<Icon name= "send" style={{ color: 'black'}} />
					</Button>

    			</View>
    		)
    	}
    	else {
    		posting= null;
    	}
    	if(this.state.loading){
    		return(
    			<View></View>
    		)
    	}
        return (
            <View style={{marginBottom: 80}} >
				<View style={{flexDirection:'row', justifyContent: 'center',  shadowOffset: {height:0, width:0},shadowColor: '#000', shadowOpacity: 0.2, elevation: 1}} >
					<TextInput
					placeholder= 'search jobs and people'
					placeholderTextColor= 'black'
					onChangeText={(text)=> this.updateText(text, 'search')}
					style= {{
						backgroundColor: '#eee',
						fontWeight: '700',
						borderRadius: 15,
						width: 60+'%',
						height: 40 ,
						paddingLeft:15
					}}
					/>
					<Button  transparent>
						<Icon name= "search" style={{ color: 'black'}} />
					</Button>
					<Button  transparent onPress={()=>this.postingswitch()} >
						<Icon name= "create" style={{ color: 'black'}} />
					</Button>
					<Button  transparent onPress={()=> this.componentWillMount()}>
						<Icon name= "refresh" style={{ color: 'black'}} />
					</Button>
				</View>

				{posting}

				<View style={{paddingRight: 5,paddingTop: 10,backgroundColor: '#fff',}} >
					<FlatList
				        data={this.state.allposts}
				        keyExtractor={(item) => item._id}
				        renderItem={
				        	({item}) => <Post style={{margin: 5,}} postdata={item} onPress={()=>this.props.gotToDetails} />
				        }
			    	/>
			    </View>
		    </View>
        );
    }
}