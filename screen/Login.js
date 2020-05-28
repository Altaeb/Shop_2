import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Linking,
    Image,
    AsyncStorage,
} from 'react-native';
import { Button } from 'native-base';
import { connect } from 'react-redux';


const logo = require('../assets/jobcat.png')
import axios from 'axios';
class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            credentials: {
                email: "",
                password: "",
            },
            error: "",
        };
        this.checklogin = this.checklogin.bind(this);
    }
    checklogin() {

        //this.props.dispatch(setKey("hsafasdfsadoney"));
        //setTimeout(()=>{alert(this.props.loginKey)}, 100)


        //alert(JSON.stringify(this.state.credentials));
        //this.props.navigation.navigate("main");
        console.log(this.state.credentials);
        axios
            .post("https://nirab.me:3000/users/login", this.state.credentials)
            .then(usr => {
                this.setState({ error: "" });
                axios.defaults.headers.common = {
                    Authorization: usr.data.token
                };
                this.props.dispatch(setKey(usr.data.token))
                this.props.navigation.navigate("main")
            })
            .catch(err => {
                if (err.response.status == 401) this.setState({ error: "Wrong Username. Try again" });
                else this.setState({ error: "Wrong Password. Try again" });
            });
    }
    updateText(text, field) {
        let newCredentials = Object.assign(this.state.credentials);
        newCredentials[field] = text;
        this.setState({ credentials: newCredentials });
    }

    render() {
        let error;
        if (this.state.error.length > 0) {
            error = <Text style={{marginVertical: 5}} >{this.state.error} </Text>;
        } else {
            error = null;
        }
        return (
            <View style={styles.container} >
	      	<Image source={logo} style={{marginTop: 80,marginBottom:20, width: 165.6, height: 176.4}}  />
	      	<TextInput 
	      		placeholder="Email" 
	      		placeholderTextColor={'rgba(0,0,0,0.7)'}
	      		style={styles.input} 
	      		onChangeText={(text)=> this.updateText(text, 'email')} 
	      		/>
	      	<TextInput 
		      	secureTextEntry 
		      	placeholder="Password"
		      	placeholderTextColor={'rgba(0,0,0,0.7)'}
		      	style={styles.input} 
		      	onChangeText={(text)=> this.updateText(text, 'password')}
		      	/>
		    {error}
	      	<Button 
	      		onPress= {()=>{this.checklogin()} }
	      		block
	      		dark
	      		style={{marginTop:10,marginLeft: 20+'%',justifyContent: 'center', width: 60 + '%'}}	
	      	>
	      		<Text style={{color: 'white'}} >Sign In</Text>
	      	</Button>
	      	<Text style={{marginTop: 10}} >Don't have an account?</Text>
	      	<Text>Create on <Text style={{color: 'blue'}}
	      		onPress={() => Linking.openURL('https://nirab.me/greeting/register')}>
	  			Jobcat
			</Text></Text>
	      </View>
        );

    }
}

const styles = StyleSheet.create({
    all: {
        marginVertical: 15,
        fontSize: 22,
    },
    input: {
        paddingLeft: 20,
        height: 40,
        marginHorizontal: 20,
        backgroundColor: '#bbb',
        marginVertical: 2,
        marginTop: 10,
        width: 60 + '%',
        borderColor: '#999',
        borderWidth: 1,
    },

    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

function getKey() {
    return {
        type: 'GET_LOGINKEY'
    }
}

function setKey(newKey) {
    return {
        type: 'SET_LOGINKEY',
        payload: {
            loginKey: newKey,
        }
    }
}
const mapStateToProps = (state) => {
    return {
        loginKey: state.loginKey,
    }
}
export default connect(mapStateToProps)(Login);