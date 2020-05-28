import React from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {Login, InJobCat} from './screen/index';
import reducer from './src/reducers/loginReducer';

import {createSwitchNavigator , createAppContainer} from 'react-navigation';

const store = createStore(reducer);

const SwitchStack = createSwitchNavigator({
  login: {screen: Login},
  main: {screen: InJobCat},
});
const Main= createAppContainer(SwitchStack);
export default class App extends React.Component{
  render(){
    return(
    	<Provider store={store}>
    		<Main />
    	</Provider>
    );
  }
}