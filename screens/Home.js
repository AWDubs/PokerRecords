import React from 'react';
import { StyleSheet, View, Text, Button, FlatList} from 'react-native';
import { connect } from 'react-redux';
import { SessionObject } from './Session';

var session = new SessionObject("Session", []);
class Home extends React.Component {
  state = {
    _SessionList : [],
    SessionCount : 1
  }
  render() {
      return (
        <View style={styles.container}>
          <View style={styles.container}>
            <Text>Home Screen!! :)</Text>
          </View>
          <View style={styles.style_flex3}>
          <Button title="Add new Session with State" onPress={() => this.addItem() } />
          <FlatList
            data={this.state._SessionList}
            renderItem={({item}) => this.SessionComponent(item)}
            keyExtractor={(item, index) => index.toString()}
            />
            <Button title="Add new Session with Redux!" onPress={() => this.addNewSession(this.props.SessionList.length) } />
            <Text>{this.props.SessionList.length}</Text>
            <FlatList
            data={this.props.SessionList}
            renderItem={({item}) => this.SessionComponent(item)}
            keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
      );
    }
    addItem = () => {
      this.setState((state, props) => ({
        _SessionList : [...state._SessionList, new SessionObject(state.SessionCount)],
        SessionCount : state.SessionCount + 1,
      }));
    };
    addNewSession = (sessionID) => {
      var newSession = new SessionObject(sessionID, []);
      this.props.addSession(newSession);
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

const mapStateToProps = (state) => {
  return {
    SessionList: state.SessionList
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
      addSession: (newSession) => {
        dispatch({
          type: "ADD_SESSION",
          payload: newSession
        });
      }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);