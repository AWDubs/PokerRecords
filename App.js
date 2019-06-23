import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Provider } from 'react-redux';
import store from './store';
import Home from './screens/Home';
import Session from './screens/Session';
import Hand from './screens/Hand';
import GetAction from './screens/GetAction';
import CardChanger from './screens/CardChanger';

export default class App extends React.Component {
  render() {
      return (
        <Provider store={store}>
          <AppContainer />
        </Provider>
      );
    }
}
//creating the stack navigation variable
const AppStackNavigator = createStackNavigator({
  Home: Home,
  Session: Session,
  Hand: Hand,
  GetAction: GetAction,
  CardChanger: CardChanger,
})

//Contains the app navigation variable,
//using a navigator variable
const AppContainer = createAppContainer(AppStackNavigator);