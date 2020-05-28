import React from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage } from 'react-native';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { connect } from 'react-redux';
import axios from 'axios';
import {withNavigation} from 'react-navigation'

import MessagesLists from './MessagesLists';
import PostsLists from './PostsLists';
import ChatScreen from './ChatScreen';
import Details from './Details';
import ProfileScreen from './ProfileScreen';


import { createAppContainer, createStackNavigator, createBottomTabNavigator, createDrawerNavigator } from 'react-navigation';
const storeItem = async function(key, item) {
    try {
        var jsonOfItem = await AsyncStorage.setItem(key, JSON.stringify(item));
        return jsonOfItem;
    } catch (error) {
        console.log(error.message);
    }
}

class IconWithBadge extends React.Component {
    render() {
        const { name, badgeCount, color, size } = this.props;
        return (
            <View style={{ width: 24, height: 24, margin: 5 }}>
        <MaterialCommunityIcons name={name} size={size} color={color} />
        {badgeCount > 0 && (
          <View
            style={{
              position: 'absolute',
              right: -6,
              top: -3,
              backgroundColor: 'red',
              borderRadius: 6,
              width: 12,
              height: 12,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
              {badgeCount}
            </Text>
          </View>
        )}
      </View>
        );
    }
}

class Home extends React.Component {
    goToDetails = () => {
        this.props.navigation.navigate('Details');
    }
    render() {
        return (
            <PostsLists goToDetails={this.goToDetails} />
        );
    }
}
class Messages extends React.Component {
    // goToChat = () => {
    //     this.props.navigation.navigate('ChatScreen');
    // }
    render() {
        return (
            <MessagesLists goToChat={this.goToChat} />
        );
    }
}
class Notification extends React.Component {
    render() {
        return (
            <View style={styles.container}>
        <Text>ting ting this is  your Notification!</Text>
      </View>
        );
    }
}
class Todos extends React.Component {
    render() {
        return (
            <View style={styles.container}>
        <Text></Text>
      </View>
        );
    }
}
class Profile extends React.Component {

    logout = () => {
        alert("hi");
    }
    render() {
        return (
            <View style={styles.container}>
      <Text></Text>
      <ProfileScreen logout={this.logout}/>
      </View>
        );
    }
}
const NotificationIconWithBadge = props => {
    // You should pass down the badgeCount in some other ways like context, redux, mobx or event emitters.
    return <IconWithBadge {...props} badgeCount={1} />;
};
const MessageIconWithBadge = props => {
    // You should pass down the badgeCount in some other ways like context, redux, mobx or event emitters.
    return <IconWithBadge {...props} badgeCount={3} />;
};
const AppNavigator = createBottomTabNavigator({
    Home: {
        screen: Home
    },
    Messages: {
        screen: Messages
    },
    Notification: {
        screen: Notification,
    },
    Todos: {
        screen: Todos
    },
    Profile: {
        screen: ProfileScreen,
    }
}, {
    initialRouteName: "Home",

    defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
            const { routeName } = navigation.state;
            let IconComponent = MaterialCommunityIcons;
            let iconName;
            if (routeName === 'Home') {
                iconName = `home${focused ? '' : '-outline'}`;
            } else if (routeName === 'Messages') {
                iconName = `message${focused ? '' : '-outline'}`;
                IconComponent = MessageIconWithBadge;
            } else if (routeName === 'Notification') {
                iconName = `bell${focused ? '' : '-outline'}`;
                IconComponent = NotificationIconWithBadge;
            } else if (routeName === 'Todos') {
                iconName = `check-circle${focused ? '' : '-outline'}`;
            } else if (routeName === 'Profile') {
                iconName = `account${focused ? '' : '-outline'}`;
            }
            return <IconComponent name={iconName} size={25} color={tintColor} />;
        },
    }),
    tabBarOptions: {
        activeTintColor: 'gray',
        showLabel: false,
        style: {

        }
    },
});

const MainAppAll = createStackNavigator({
        Initial: {
            screen: withNavigation(AppNavigator),
            navigationOptions: {
                title: "JobCat",
                headerStyle: {
                    backgroundColor: '#888',
                },
                headerTintColor: '#fff',
            },
        },
        Details: {
            screen: Details,
        },

        ChatScreen: {
            screen: ChatScreen,
        }
    },

    /*{
      headerMode: 'none',
      navigationOptions:{
        headerVisible: false
      }
    }*/
)
const AppContainer = createAppContainer(withNavigation(MainAppAll));

class InJobCat extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }
    componentWillMount() {
        axios
            .post('https://nirab.me:3000/users/info')
            .then((usr) => {
              console.log(usr.data)
              storeItem('userdata', usr.data)
            })
            .catch((err) => {
                console.log("ERRORAAYOSOLTI")
                console.log(err)
            })
    }
    componentWillUnmount() {

    }
    render() {
        return <AppContainer />;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#bbb',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
const mapStateToProps = (state) => {
    return {
        loginKey: state.loginKey,
    }
}
export default connect(mapStateToProps)(InJobCat);