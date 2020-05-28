import React from 'react';
import { View, StyleSheet, Text, Button, AsyncStorage, Image, ScrollView, ImagePicker } from 'react-native';
import { withNavigation}  from 'react-navigation';

class ProfileScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            toggleedit: false,
            ready: false,
            userdata: {},
        };
        this.toggleedit = this.toggleedit.bind(this);
    }
    changePic() {
        ImagePicker.openPicker({
                width: 300,
                height: 400,
                cropping: true,
                mediaType: 'photo'
            })
            .then(image => {
                // const formData = new FormData()
                // formData.append('file', image)
                // formData.append('', 'XXXX')
                // return axios.post(
                //     `https://192.168.1.159/XXX`,
                //     formData
                // )
            })
            .catch(err => {
                console.log(`${err}`)
            })
    }

    clearlogin() {
        //alert("Unable to logout");
        this.props.navigation.navigate('main');
    }
    componentWillMount() {
        AsyncStorage.getItem("userdata").then((value) => {
            this.setState({ ready: true, userdata: JSON.parse(value) });
        });
    }
    toggleedit() {
        this.state.toggleedit ? this.setState({ toggleedit: false }) : this.setState({ toggleedit: true });
    }


    render() {
        let uri = "https://nirab.me:3000/images/" + this.state.userdata.avatar;
        if (!this.state.ready) {
            return (
                <View >
        		</View>
            );
        }
        if (this.state.toggleedit) {
            return (
                <View>
				<View style={styles.upper} >
					<Image source={{uri: uri}} style={{margin: 10,marginBottom:5, borderRadius: 20, height:100, width:100}} />
					<Button 
					onPress={()=> this.changePic()}
					title="changePic" 
					/>
					<Text style={{fontSize: 24,fontWeight: "bold"}} >{this.state.userdata.fullname} </Text>
					<Text style={{marginBottom: 10}} >{this.state.userdata.email}</Text>

				</View>
				<View>
					<ScrollView>
					<View style={{flexDirection:'row', justifyContent: 'space-between'}} >
						<Text style={{fontWeight: 'bold', fontSize: 22}} >RESUME</Text>
						<Button 
						title="Save"
						onPress={()=>this.toggleedit()}
						/>
					</View>
					</ScrollView>
					
				</View>

			</View>

            )

        }
        return (

            <View>
				<View style={styles.upper} >
					<Image source={{uri: uri}} style={{margin: 10,marginBottom:5, borderRadius: 20, height:100, width:100}} />
					<Text style={{fontSize: 24,fontWeight: "bold"}} >{this.state.userdata.fullname} </Text>
					<Text style={{marginBottom: 10}} >{this.state.userdata.email}</Text>


				</View>
				<View style={{flexDirection:'row', justifyContent: 'space-between'}} >
					<Text style={{fontWeight: 'bold', fontSize: 22}} >RESUME</Text>
					<Button 
					title="Edit"
					onPress={()=>this.toggleedit()}
					/>
				</View>
				
				<ScrollView>
				<View style={{marginRight:10,marginBottom:20}}>
				<Text  >{this.state.userdata.resume.description}</Text>
				</View>
				<View>
					<Text style={styles.title} >Studied at:</Text>
					{this.state.userdata.resume.study.map(
						(lists, i) => (<Text style={{marginLeft: 20}} key={i}> {lists} </Text>)
						
					)}
					<Text style={styles.title} >Done Internships at:</Text>
					{this.state.userdata.resume.intern.map(
						(lists, i) => (<Text style={{marginLeft: 20}} key={i}> {lists} </Text>)
						
					)}
					<Text style={styles.title} >Job at:</Text>
					{this.state.userdata.resume.work.map(
						(lists, i) => (<Text style={{marginLeft: 20}} key={i}> {lists} </Text>)
						
					)}
					<Text style={styles.title} >Interests:</Text>
					{this.state.userdata.resume.interests.map(
						(lists, i) => (<Text style={{marginLeft: 20}} key={i}> {lists} </Text>)
						
					)}
				</View>
				</ScrollView>
				

			</View>
        );
    }
}
const styles = StyleSheet.create({
	title: {
		fontSize: 16,
		fontWeight: 'bold',
		marginLeft: 10,
	},
    upper: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        paddingBottom: 10

    }

});

export default withNavigation(ProfileScreen);