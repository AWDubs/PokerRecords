import React from 'react';
import { StyleSheet, View, Text, Button, ScrollView, FlatList} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export function HandObject(_id, _mycards, _stack, _blinds, _position,
                           _flopcards, _turncard, _rivercard, _opponentscards,
                           _notes, _preflopaction, _flopaction, _turnaction, _riveraction) {
    this.Id =             _id,
    this.MyCards =          _mycards,
    this.Stack =            _stack,
    this.Blinds =           _blinds,
    this.Position =         _position,
    this.FlopCards =        _flopcards,
    this.TurnCard =         _turncard,
    this.RiverCard =        _rivercard,
    this.OpponentsCards =   _opponentscards,
    this.Notes =            _notes,
    this.PreFlopAction =    _preflopaction,
    this.FlopAction =       _flopaction,
    this.TurnAction =       _turnaction,
    this.RiverAction =      _riveraction
}


export default class Hand extends React.Component {
    static navigationOptions = {
        headerRight: (
          <Button title="Save" onPress={() => Save() }/>
        ),
      };
  state = {
    Hand: this.props.navigation.getParam('Hand'),
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
                { this.OpponentsHand() }
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
                    <Text>Session {this.props.navigation.state.params.SessionName}</Text>
                    <Text>Hand {this.state.Hand.Id}</Text>
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
                    <Button title="+Action" onPress={() => this.AddAction("PreFlop") } />
                </View>
                <View style={styles.horizontal}>
                    <FlatList
                        data={this.state.Hand.PreFlopAction}
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
                    <Button title="+Action" onPress={() => this.AddAction("Flop") } />
                </View>
                <View style={styles.horizontal}>
                    <FlatList
                            data={this.state.Hand.FlopAction}
                            renderItem={({item}) => this.DisplayAction(item)}
                            keyExtractor={(item, index) => index.toString()}
                        />
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
                    <Button title="+Action" onPress={() => this.AddAction("Turn") } />
                </View>
                <View style={styles.horizontal}>
                    <FlatList
                        data={this.state.Hand.TurnAction}
                        renderItem={({item}) => this.DisplayAction(item)}
                        keyExtractor={(item, index) => index.toString()}
                        />
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
                    <Button title="+Action" onPress={() => this.AddAction("River") } />
                </View>
                <View style={styles.horizontal}>
                    <FlatList
                        data={this.state.Hand.RiverAction}
                        renderItem={({item}) => this.DisplayAction(item)}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
                { this.LineDivider() }
            </View>
        );
    }
    OpponentsHand = () => {
        return (
            <View>
                <View style={styles.horizontal}>
                    <Text>Opponents Hand: </Text>
                </View>
                { this.LineDivider() }
            </View>
        );
    };
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
    componentDidUpdate() {
        this.props.navigation.state.params.updateMethod(this.state.Hand); //update store
    }
    DisplayAction = (action) => {
        return (
            <Text>{action}</Text>
        );
    }
    AddAction = (type) => {
        var action = this.GetActionString();
        switch (type) {
            case "PreFlop":
                    this.setState((state, props) => ({
                        ...state,
                        Hand: {
                            ...state.Hand,
                            PreFlopAction: [...state.Hand.PreFlopAction, action],
                        }
                    }));
                break;
            case "Flop":
                    this.setState((state, props) => ({
                        ...state,
                        Hand: {
                            ...state.Hand,
                            FlopAction: [...state.Hand.FlopAction, action],
                        }
                    }));
                break;
            case "Turn":
                    this.setState((state, props) => ({
                        ...state,
                        Hand: {
                            ...state.Hand,
                            TurnAction: [...state.Hand.TurnAction, action],
                        }
                    }));
                break;
            case "River":
                    this.setState((state, props) => ({
                        ...state,
                        Hand: {
                            ...state.Hand,
                            RiverAction: [...state.Hand.RiverAction, action],
                        }
                    }));
                break;
        }
    };
    
    GetActionString = () => {
        return "new action";
    };
}

function Save()
{
    //just return. 
    //use auto-save
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
