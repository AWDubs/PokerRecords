import React from 'react';
import { StyleSheet, View, Text, Button, Alert, FlatList} from 'react-native';
import { HandObject } from './Hand';

export function SessionObject(_id, _name, _hands) {
    this.Id = _id, //int
    this.Name = _name, //string
    this.HandList = _hands //array of HandObject objects
}
var defaultSession = new SessionObject(0, "default", []);

export default class Session extends React.Component {
  state = {
    Session: this.props.navigation.getParam('Session'),
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
      var newHand = new HandObject(this.state.Session.HandList.length + 1,
        ["000", "000"], 0, [0, 0], "", ["000", "000", "000"], "000", "000", ["000", "000"], "Notes", [], [], [], []);
        this.setState((state, props) => ({
        Session : {
          ...state.Session,
          HandList: [...state.Session.HandList, newHand]
        },
        }))
    };
    componentDidUpdate() {
        this.props.navigation.state.params.updateMethod(this.state.Session); //update store
    };
    SessionHeader = () => {
        return (
            <Text>Session {this.state.Session.Name}</Text>
        );
    };
    SessionBody = () => {
        return (
            <View>
                <Button title="Add new Hand" onPress={() => this.addItem() }></Button>
                <FlatList
                    data={this.state.Session.HandList}
                    renderItem={({item}) => this.HandComponent(item)}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    };
    HandComponent = (hand) => {
        return (
          <View>
            <Button title={'hand ' + hand.Id.toString()}
              onPress={() => { this.NavigateToNextScreen(hand) }} />
          </View>
        );
      };
    UpdateHand = (handToUpdate) => {
        this.setState((state, props) => ({
           ...state,
           Session: {
             ...state.Session,
              HandList: state.Session.HandList.map((hand) => {
              if (hand.Id === handToUpdate.Id) {
                  return handToUpdate;
              }
              return hand;
              })
          }
        }))
    };
    NavigateToNextScreen = (hand) => {
      this.props.navigation.navigate('Hand', {
        Hand: hand,
        SessionName: this.state.Session.Name,
        updateMethod: this.UpdateHand.bind(this),
      });
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