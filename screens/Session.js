import React from 'react';
import { StyleSheet, View, Text, Button, Alert, FlatList} from 'react-native';
import { HandObject } from './Hand';

export function SessionObject(_name, _hands) {
    this.name = _name,
    this.hands = _hands
}
var defaultSession = new SessionObject("default", []);


export default class Session extends React.Component {
  state = {
    Session: this.props.navigation.getParam('Session', defaultSession),
    HandList : [],
    HandCount : 1
  }
  render() {
      return (
        <View style={styles.container}>
          <View style={styles.container}>
            { this.SessionHeader() }
          </View>
          <View style={styles.style_flex3}>
            { this.SessionBody() }
          </View>
        </View>
      );
    }
    addItem = () => {
        this.setState((state, props) => ({
        HandList : [...state.HandList, new HandObject(state.HandCount)],
        HandCount : state.HandCount + 1,
        }));
    };
    SessionHeader = () => {
        return (
            <Text>Session {this.state.Session.name}</Text>
        );
    }
    SessionBody = () => {
        return (
            <View>
                <Button title="Add new Hand" onPress={() => this.addItem() }></Button>
                <FlatList
                    data={this.state.HandList}
                    renderItem={({item}) => this.HandComponent(item)}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    }
    HandComponent = (hand) => {
        const sessionName = this.state.Session.name;
        return (
          <View>
            <Button title={'hand ' + hand.name.toString()} onPress={() => {
              this.props.navigation.navigate('Hand', {
                  Session: this.state.Session,
                  Hand: hand.name,
                });
              }} />
          </View>
        );
      }
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