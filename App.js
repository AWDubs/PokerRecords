import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from './screens/Home';
import Session from './screens/Session';
import Hand from './screens/Hand';

export default class App extends React.Component {
  render() {
      return (
        <AppContainer />
      );
    }
}
//creating the stack navigation variable
const AppStackNavigator = createStackNavigator({
  Home: Home,
  Session: Session,
  Hand: Hand
})

//Contains the app navigation variable,
//using a navigator variable
const AppContainer = createAppContainer(AppStackNavigator);