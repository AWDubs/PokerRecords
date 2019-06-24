import React from 'react';
import { StyleSheet, View, Text, Button, FlatList, Image, Alert} from 'react-native';
import { connect } from 'react-redux';
import { SessionObject } from './Session';
import { Card, CardItem, Fab, Separator } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
//NativeBase, FirstBorn

class Home extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => ({
    header: null
  })
  render() {
      return (
        <View style={styles.container}>
        <View style={{height: 24}}></View>
          <View style={styles.horizontal}>
          <Image source={require('../cards/PokerRecords.png')} style={styles.imageStyle}/>
          <Image source={require('../cards/record.png')} style={styles.imageStyle}/>
          </View>
          <View style={{flex: .3,}}>
          <Separator bordered style={{backgroundColor: '#fff'}}>
            <Text style={{textAlign: "center", fontWeight: 'bold'}}>My Sessions</Text>
          </Separator>
          </View>
          <View style={styles.style_flex3}>
          { this.FirstTimeButton() }
              <FlatList
                data={this.props.SessionList}
                renderItem={({item}) => this.SessionComponent(item)}
                keyExtractor={(item, index) => index.toString()}
              />
              <Fab 
                active={true} 
                onPress={() => this.addNewSession(this.props.NextId, this.props.NextId + 1)}
                position="bottomRight">
                <Text>+</Text>
              </Fab>
          </View>
        </View>
      );
    }
    SessionComponent = (session) => {
      return (
        <View style={{paddingLeft: 15, paddingRight: 10}}>
          <View style={styles.horizontal}>
            <View style={{flex: 9}}>
              <TouchableOpacity
                onPress={() => { this.NavigateToNextScreen(session) }}>
                  <Card>
                    <CardItem header>
                      <View style={{flexDirection: "column"}}>
                        <Text>{'Session ' + session.Name.toString()}</Text>
                        <Text style={{}}>{'Hands: ' + session.HandList.length}</Text>
                      </View>
                    </CardItem>
                  </Card>
              </TouchableOpacity>
            </View>
            <View style={{height: 50, paddingTop: 20}}>
              <Button title="X" color='red' onPress={ () => this.DeleteSession(session) }></Button>
            </View>
          </View>
        </View>
      );
    };
    FirstTimeButton = () => {
      if (this.props.SessionList.length == 0) {
        return(
          <View>
            <Card>
              <CardItem>
                  <Text>
                    Click the "+" button in the bottom right to get started!
                  </Text>
              </CardItem>
            </Card>
          </View>
        );
      }
      else {
        return (
          <View>
          </View>
        );
      }
    };
    DeleteSession = (session) => {
      Alert.alert(
        'Are you sure?',
        "This will permanently delete the Session and all of it's data",
        [
          {text: 'NO'},
          {text: 'YES', onPress: () => this.props.deleteSession(session)},
        ],
      );
    };
    addNewSession = (id, name) => {
      var newSession = new SessionObject(id, name, []);
      this.props.addSession(newSession);
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
    backgroundColor: '#d3d3d3',
    paddingLeft: 20,
    paddingRight: 20,
  },
  horizontal: {
    flexDirection: 'row',
  },
  imageStyle: {
    width: 200, height: 150
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
      },
      deleteSession: (session) => {
        dispatch({
          type: "DELETE_SESSION",
          payload: session
        });
      },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);