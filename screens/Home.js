import React from 'react';
import { StyleSheet, View, Text, Button, FlatList, Image} from 'react-native';
import { connect } from 'react-redux';
import { SessionObject } from './Session';
import { Container, Header, Content, Card, CardItem, Body } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
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
    SessionComponent = (session) => {
      return (
        <View style={{paddingLeft: 20, paddingRight: 20}}>
          <TouchableOpacity
            onPress={() => { this.NavigateToNextScreen(session) }}>
              <Card>
                <CardItem header>
                  <Text>{'Session ' + session.Name.toString()}</Text>
                </CardItem>
              </Card>
          </TouchableOpacity>
        </View>
      );
    };
    addNewSession = (id, name) => {
      var newSession = new SessionObject(id, name, []);
      this.props.addSession(newSession);

      /**<FlatList
            data={this.props.SessionList}
            renderItem={({item}) => this.SessionComponent(item)}
            keyExtractor={(item, index) => index.toString()}
            /> 
            <Button title={'Session ' + session.Name.toString()} 
              onPress={() => { this.NavigateToNextScreen(session) }} />*/
    };
    UpdateSession = (session) => {
      this.props.updateSession(session);
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