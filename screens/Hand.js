import React from 'react';
import { StyleSheet, View, Text, Button, ScrollView, FlatList} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export function HandObject(_name) {
    this.name = _name
}
var defaultHand = new HandObject("default");


export default class Hand extends React.Component {
    static navigationOptions = {
        headerRight: (
          <Button title="Save" onPress={() => Save() }/>
        ),
      };
  state = {
    Session: this.props.navigation.getParam('Session', "defaultSession"),
    HandNumber: this.props.navigation.getParam('Hand', defaultHand),
    MyCards : [0, 0],
    Stack: 0,
    Blinds: [0, 0],
    Position: "Default",
    FlopCards: [0, 0, 0],
    TurnCard: 0,
    RiverCard: 0,
    Notes: "Notes",
    PreFlopAction: [],
    FlopAction: [],
    TurnAction: [],
    RiverAction: [],
  }
  render() {
      return (
        <View style={styles.container}>
          <View style={styles.container}>
          <ScrollView>
                { this.Header() }
                { this.HandInfo() }
                { this.PreFlop() }
                { this.Flop() }
                { this.Turn() }
                { this.River() }
                { this.Notes() }
            </ScrollView>
          </View>
        </View>
      );
    }
    Header = () => {
        return (
            <View>
                <View style={styles.header}>
                    <Text>Session {this.state.Session.name}</Text>
                    <Text>Hand {this.state.HandNumber}</Text>
                </View>
                { this.LineDivider() }
            </View>
        );
    }
    HandInfo = () => {
        return (
            <View>
                <View style={styles.vertical}>
                    <Text>My Cards: </Text>
                </View>
                <View style={styles.vertical}>
                    <Text>Stack: </Text>
                    <Text>Blinds: </Text>
                    <Text>Position: </Text>
                </View>
                { this.LineDivider() }
            </View>
        );
    }
    PreFlop = () => {
        return (
            <View>
                <View style={styles.horizontal}>
                    <Text>PreFlop: </Text>
                    <Button title="+Action" onPress={() => this.AddPreFlopAction("new action") } />
                </View>
                <View style={styles.horizontal}>
                    <FlatList
                        data={this.state.PreFlopAction}
                        renderItem={({item}) => this.DisplayAction(item)}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
                { this.LineDivider() }
            </View>
        );
    }
    Flop = () => {
        return (
            <View>
                <View style={styles.horizontal}>
                    <Text>Flop: </Text>
                    <Button title="+Action" onPress={() => this.addItem() } />
                </View>
                <View style={styles.horizontal}>
                
                </View>
                { this.LineDivider() }
            </View>
        );
    }
    Turn = () => {
        return (
            <View>
                <View style={styles.horizontal}>
                    <Text>Turn: </Text>
                    <Button title="+Action" onPress={() => this.addItem() } />
                </View>
                <View style={styles.horizontal}>
                
                </View>
                { this.LineDivider() }
            </View>
        );
    }
    River = () => {
        return (
            <View>
                <View style={styles.horizontal}>
                    <Text>River: </Text>
                    <Button title="+Action" onPress={() => this.addItem() } />
                </View>
                <View style={styles.horizontal}>
                
                </View>
                { this.LineDivider() }
            </View>
        );
    }
    Notes = () => {
        return (
            <View>
                <View style={styles.notes}>
                    <Text>Notes:</Text>
                    <TextInput>Notes</TextInput>
                </View>
            </View>
        );
    }
    LineDivider = () => {
        return (
            <View style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1,
            }}
            />
        );
    }
    DisplayAction = (action) => {
        return (
            <Text>{action}</Text>
        );
    }
    AddPreFlopAction = (preFlopAction) => {
        this.setState((state, props) => ({
            Session: state.Session,
            HandNumber: state.HandNumber,
            MyCards : state.MyCards,
            Stack: state.Stack,
            Blinds: state.Blinds,
            Position: state.Position,
            FlopCards: state.FlopCards,
            TurnCard: state.TurnCard,
            RiverCard: state.RiverCard,
            Notes: state.Notes,
            PreFlopAction: [...state.PreFlopAction, preFlopAction],
            FlopAction: state.FlopAction,
            TurnAction: state.TurnAction,
            RiverAction: state.RiverAction,
        }));
    };
}

function Save()
{
    //save and return
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  style_flex3: {
    flex: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginRight: 50,
    marginBottom: 20,
    marginLeft: 50,
  },
  horizontal: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin: 20,
  },
  vertical: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: 20,
  },
  notes: {
    margin: 30,
    marginBottom: 500,
  },
});
