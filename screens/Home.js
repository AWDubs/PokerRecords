import React from 'react';
import { StyleSheet, View, Text, Button, FlatList} from 'react-native';
import { SessionObject } from './Session';

var session = new SessionObject("Adam", []);
export default class Home extends React.Component {
  state = {
    SessionList : [],
    SessionCount : 1
  }
  render() {
    const { navigate } = this.props.navigation;   
      return (
        <View style={styles.container}>
          <View style={styles.container}>
            <Text>Home Screen!! :)</Text>
          </View>
          <View style={styles.style_flex3}>
          <Button title="Add new Session" onPress={() => this.addItem() }></Button>
          <FlatList
            data={this.state.SessionList}
            renderItem={({item}) => this.SessionComponent(item)}
            keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
      );
    }
    addItem = () => {
      this.setState((state, props) => ({
        SessionList : [...state.SessionList, new SessionObject(state.SessionCount)],
        SessionCount : state.SessionCount + 1,
      }));
    };
    SessionComponent = (session) => {
      return (
        <View>
          <Button title={'Session ' + session.name.toString()} onPress={() => {
              this.props.navigation.navigate('Session', {
                  Session: session
                });
              }} />
        </View>
      );
    };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  style_flex3: {
    flex: 3,
  },
});