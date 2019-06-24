import React from 'react';
import { StyleSheet, View, Text, FlatList, TextInput} from 'react-native';
import { Button, Card, CardItem, Right, DatePicker } from 'native-base';
import { HandObject } from './Hand';
import _Card from '../CardGrabber';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AntIcon from "react-native-vector-icons/AntDesign";

export function SessionObject(_id, _name, _hands) {
    this.Id = _id, //int
    this.Name = _name, //string
    this.HandList = _hands, //array of HandObject objects
    this.Location = "location", //string
    this.SessionDate = new Date().toLocaleDateString() //string
}
var defaultSession = new SessionObject(0, "default", []);

export default class Session extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => ({
    title: 'Session ' + (navigation.state.params.Session.Id + 1)
  })
  state = {
    Session: this.props.navigation.getParam('Session'),
    EditMode: false,
    Edit_Name: this.props.navigation.getParam('Session').Name,
    Edit_Location: this.props.navigation.getParam('Session').Location,
    Edit_Date: this.props.navigation.getParam('Session').SessionDate,
  }
  render() {
      return (
        <View style={styles.container}>
          <View style={styles.container}>
            { this.SessionHeader() }
          </View>
          { this.LineDivider() }
          { this.SessionDivider() }
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
      this.NavigateToNextScreen(newHand);
    };
    componentDidUpdate() {
        this.props.navigation.state.params.updateMethod(this.state.Session); //update store
    };
    SessionHeader = () => {
      if (!this.state.EditMode) {
        return (
          <View style={{paddingLeft: 10, paddingTop: 10, paddingRight: 10}}>
            <View style={styles.horizontal}>
                <View style={{alignSelf: 'flex-start', paddingLeft: 10}}>
                    <Text style={styles.textStyle}>{this.state.Session.Name}</Text>
                </View>
                <View style={{alignSelf: 'flex-end', paddingRight: 10}}>
                  <AntIcon name="edit" color="blue" size={40} 
                  onPress={() => this.setState((state, props) => ({
                  ...state,
                  EditMode: true,
                  })) } />
                </View>
            </View>
            <Text style={styles.textStyle}>{this.state.Session.Location}</Text>
            <Text style={styles.textStyle}>{this.state.Session.SessionDate}</Text>
          </View>
        );
      }
      else {
        return (
          <View>
            <View style={{alignSelf: 'flex-end', paddingRight: 10}}>
              <AntIcon name="check" color="green" size={40} 
              onPress={() => this.SaveEdits() } />
            </View>
            <View style={{ flexDirection: 'row'}}>
              <Text style={styles.textStyle}>Name: </Text>
              <TextInput placeholder={this.state.Session.Name.toString()} style={styles.textInput}
                onChangeText={(text) => this.setState((state, props) => ({
                    ...state,
                    Edit_Name: text,
                    })) } />
            </View>
            <View style={{ flexDirection: 'row'}}>
              <Text style={styles.textStyle}>Location: </Text>
              <TextInput placeholder={this.state.Session.Location.toString()} style={styles.textInput}
              onChangeText={(text) => this.setState((state, props) => ({
                    ...state,
                    Edit_Location: text,
                    })) } />
            </View>
            <DatePicker style={styles.textStyle} 
              onDateChange={(text) => this.setState((state, props) => ({
                    ...state,
                    Edit_Date: text.toString().substr(4, 12)
                    })) } />
          </View>
        );
      }
    };
    SaveEdits = () => {
      this.setState((state, props) => ({
        ...state,
        EditMode: false,
        Session: {
          ...state.Session,
          Name: state.Edit_Name,
          Location: state.Edit_Location,
          SessionDate: state.Edit_Date,
        }
        }))
      };
    SessionDivider = () => {
      if (!this.state.EditMode) {
        return (
          <View style={styles.horizontal}>
            <View style={{alignSelf: 'flex-start', paddingLeft: 10}}>
              <Text style={styles.textStyle}>Hands: {this.state.Session.HandList.length}</Text>
            </View>
            <View style={{alignSelf: 'flex-end', paddingRight: 10}}>
                <Button rounded info onPress={() => this.addItem() }>
                  <Text style={{paddingLeft: 15, paddingRight: 15, fontSize: 20}}>New Hand</Text>
                </Button>
            </View>
        </View>
        );
      }
      else {
        return (
          <View></View>
        );
      }
    };
    SessionBody = () => {
      if (!this.state.EditMode) {
        return (
            <View>
                <FlatList
                    data={this.state.Session.HandList}
                    renderItem={({item}) => this.HandComponent(item)}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
      }
      else {
        return (
          <View></View>
        );
      }
    };
    HandComponent = (hand) => {
        return (
          <View>
          <TouchableOpacity 
            onPress={() => { this.NavigateToNextScreen(hand) }}>
            <Card>
              <CardItem>
                <Text>{'Hand ' + hand.Id.toString()}</Text>
                <Right>
                  <View style={styles.horizontal}>
                    { _Card(hand.MyCards[0]) }
                    { _Card(hand.MyCards[1]) }
                  </View>
                </Right>
              </CardItem>
            </Card>
          </TouchableOpacity>
          </View>
        );
      };
    LineDivider = () => {
        if (!this.state.EditMode) {
          return (
            <View style={{
              paddingTop: 5,
              paddingBottom: 5,
            }}>
              <View style={{
                  borderBottomColor: 'black',
                  borderBottomWidth: 1,
              }}
              />
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
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textStyle: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  textInput: {
    fontSize: 20,
  },
});