import React from 'react';
import { StyleSheet, View, Text, Button, FlatList, Alert} from 'react-native';
import { connect } from 'react-redux';
import { SessionObject } from './Session';
//NativeBase, FirstBorn

class Home extends React.Component {
  render() {
      return (
        <View style={styles.container}>
          <View style={styles.container}>
            <Text>Home Screen!! :)</Text>
          </View>
          <View style={styles.style_flex3}>
            <Button title="Add new Session!" onPress={() => 
              this.addNewSession(this.props.NextId, this.props.SessionList.length + 1) } />
            <FlatList
            data={this.props.SessionList}
            renderItem={({item}) => this.SessionComponent(item)}
            keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
      );
    }
    addNewSession = (id, name) => {
      var newSession = new SessionObject(id, name, []);
      this.props.addSession(newSession);
    };
    UpdateSession = (session) => {
      this.props.updateSession(session);
    };
    SessionComponent = (session) => {
      return (
        <View>
          <Button title={'Session ' + session.Name.toString()} 
              onPress={() => { this.NavigateToNextScreen(session) }} />
        </View>
      );
    };
    NavigateToNextScreen = (session) => {
      this.props.navigation.navigate('Session', {
        Session: session,
        updateMethod: this.UpdateSession.bind(this),
      });
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

const mapStateToProps = (state) => {
  return {
    SessionList: state.SessionList,
    NextId: state.NextId
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
      addSession: (newSession) => {
        dispatch({
          type: "ADD_SESSION",
          payload: newSession
        });
      },
      updateSession: (session) => {
        dispatch({
          type: "UPDATE_SESSION",
          payload: session
        });
      }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);