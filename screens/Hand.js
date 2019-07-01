import React from 'react';
import { StyleSheet, View, Text, ScrollView, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import Card from '../CardGrabber';

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
    this.RiverAction =      _riveraction,
    this.NewActionId =      0
}

export default class Hand extends React.Component {
    static navigationOptions = ({navigation, screenProps}) => ({
        headerRight: (
          <Button buttonStyle={styles.btn} title="Save" onPress={() => { navigation.goBack(null) } }/>
        ),
      })
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
                    <Text style={styles.txt}>Session {this.props.navigation.state.params.SessionName}</Text>
                    <Text style={styles.txt}>Hand {this.state.Hand.Id}</Text>
                </View>
                { this.LineDivider() }
            </View>
        );
    }
    HandInfo = () => {
        return (
            <View>
                <View style={styles.horizontal}>
                    <Text style={styles.txt}>My Cards: </Text>
                    <View style={styles.horizontal}>
                        { this.TouchableCard(this.state.Hand.MyCards[0], 'my_card1')}
                        { this.TouchableCard(this.state.Hand.MyCards[1], 'my_card2')}
                    </View>
                </View>
                <View style={styles.horizontal}>
                    <Text style={styles.txt}>Stack: {this.state.Hand.Stack.toString()}</Text>
                        <View style={styles.numberInput}>
                            <TextInput 
                                keyboardType='numeric'
                                onEndEditing={(text)=> {
                                    var newStack = text.nativeEvent.text;
                                    if (text.nativeEvent.text != null) {
                                        this.setState((state, props) => ({
                                        ...state,
                                        Hand: {
                                            ...state.Hand,
                                            Stack: newStack,
                                        }}));
                                    }
                                    }}
                                ref={input => { this.textInput = input }}
                                />
                        </View>
                </View>
                <View style={styles.horizontal}>
                    <Text style={styles.txt}>Blinds: {this.state.Hand.Blinds[0]}/{this.state.Hand.Blinds[1]}</Text>
                        <View style={styles.numberInput}>
                            <TextInput 
                                keyboardType='numeric'
                                onEndEditing={(text)=> {
                                    var newBlind = text.nativeEvent.text;
                                    this.setState((state, props) => ({
                                    ...state,
                                    Hand: {
                                        ...state.Hand,
                                        Blinds: state.Hand.Blinds.map((b, index) => {
                                            if (index == 0) {
                                                return newBlind;
                                            } 
                                            return b;
                                        })
                                    }}));
                                    }}
                                ref={input => { this.textInput = input }}
                                />
                        </View>
                        <Text style={styles.txt}>/</Text>
                        <View style={styles.numberInput}>
                            <TextInput 
                                keyboardType='numeric'
                                onEndEditing={(text)=> {
                                    var newBlind = text.nativeEvent.text;
                                    this.setState((state, props) => ({
                                    ...state,
                                    Hand: {
                                        ...state.Hand,
                                        Blinds: state.Hand.Blinds.map((b, index) => {
                                            if (index == 1) {
                                                return newBlind;
                                            }
                                            return b;
                                        })
                                    }}));
                                    }}
                                ref={input => { this.textInput = input }}
                                />
                        </View>
                </View>
                <View style={styles.horizontal}>
                    <Text style={styles.txt}>Position: {this.state.Hand.Position}</Text>
                </View>
                <View style={styles.horizontal}>
                <Button type="outline" title="SB" onPress={() => this.SetPosition("SB") } />
                    <Button type="outline" title="BB" onPress={() => this.SetPosition("BB") } />
                    <Button type="outline" title="UTG" onPress={() => this.SetPosition("UTG") } />
                    <Button type="outline" title="UTG+1" onPress={() => this.SetPosition("UTG+1") } />
                    <Button type="outline" title="UTG+2" onPress={() => this.SetPosition("UTG+2") } />
                </View>
                <View style={styles.horizontal}>
                    <Button type="outline" title="UTG+3" onPress={() => this.SetPosition("UTG+3") } />
                    <Button type="outline" title="LJ" onPress={() => this.SetPosition("LJ") } />
                    <Button type="outline" title="HJ" onPress={() => this.SetPosition("HJ") } />
                    <Button type="outline" title="CO" onPress={() => this.SetPosition("CO") } />
                    <Button type="outline" title="BTN" onPress={() => this.SetPosition("BTN") } />
                </View>
                { this.LineDivider() }
            </View>
        );
    }
    PreFlop = () => {
        return (
            <View>
                <View style={styles.horizontal}>
                    <Text style={styles.txt}>PreFlop: </Text>
                    <Button buttonStyle={styles.btn} title="+" onPress={() => this.GetAction("PreFlop") } />
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
                    <Text style={styles.txt}>Flop: </Text>
                    { this.TouchableCard(this.state.Hand.FlopCards[0], 'flop1')}
                    { this.TouchableCard(this.state.Hand.FlopCards[1], 'flop2')}
                    { this.TouchableCard(this.state.Hand.FlopCards[2], 'flop3')}
                    <Button buttonStyle={styles.btn} title="+" onPress={() => this.GetAction("Flop") } />
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
                    <Text style={styles.txt}>Turn: </Text>
                    { this.TouchableCard(this.state.Hand.TurnCard, 'turn')}
                    <Button buttonStyle={styles.btn} title="+" onPress={() => this.GetAction("Turn") } />
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
                    <Text style={styles.txt}>River: </Text>
                    { this.TouchableCard(this.state.Hand.RiverCard, 'river')}
                    <Button buttonStyle={styles.btn} title="+" onPress={() => this.GetAction("River") } />
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
                    <Text style={styles.txt}>Opponents Hand: </Text>
                    <View style={styles.horizontal}>
                        { this.TouchableCard(this.state.Hand.OpponentsCards[0], 'opponent_card_1')}
                        { this.TouchableCard(this.state.Hand.OpponentsCards[1], 'opponent_card_2')}
                    </View>
                </View>
                { this.LineDivider() }
            </View>
        );
    };
    Notes = () => {
        return (
            <View>
                <View style={styles.notes}>
                    <Text style={styles.txt}>Notes:</Text>
                    <View style={{borderColor: 'gray', borderWidth: 1, borderRadius: 10}}>
                        <TextInput style={{fontSize: 16, flex: 1,}} multiline={true} 
                            onChangeText={(text) => {
                                this.setState((state, props) => ({
                                ...state,
                                Hand: {
                                    ...state.Hand,
                                    Notes: text
                                }
                                }));
                        }}>{this.state.Hand.Notes}</TextInput>
                    </View>
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
        const theme = {
            colors: {
                primary: 'red',
              }
          }
        return (
            <View style={styles.horizontal}>
                <View style={styles.actionView}>
                    <Text style={styles.actionText}>{action.ActionString}</Text>
                </View>
                <TouchableOpacity
                onPress={() => this.DeleteAction(action) }>
                    <View style={styles.actionView2}>
                        <Text style={[styles.actionText, {fontSize: 20, fontWeight: 'bold', justifyContent: 'center',alignItems: 'center'}]}>-</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
    DeleteAction = (action) => {
        this.setState((state, props) => ({
            ...state,
            Hand: {
                ...state.Hand,
                PreFlopAction: state.Hand.PreFlopAction.filter((a) => a.Id !== action.Id),
                FlopAction: state.Hand.FlopAction.filter((a) => a.Id !== action.Id),
                TurnAction: state.Hand.TurnAction.filter((a) => a.Id !== action.Id),
                RiverAction: state.Hand.RiverAction.filter((a) => a.Id !== action.Id),
            }
        }));
    };
    SetPosition = (newPosition) => {
        this.setState((state, props) => ({
            ...state,
            Hand: {
                ...state.Hand,
                Position: newPosition,
            }
        }));
    };
    AddAction = (type, actionObj) => {
        if (actionObj.ActionString != '') {
            switch (type) {
                case "PreFlop":
                        this.setState((state, props) => ({
                            ...state,
                            Hand: {
                                ...state.Hand,
                                PreFlopAction: [...state.Hand.PreFlopAction, actionObj],
                                NewActionId: state.Hand.NewActionId + 1,
                            }
                        }));
                    break;
                case "Flop":
                        this.setState((state, props) => ({
                            ...state,
                            Hand: {
                                ...state.Hand,
                                FlopAction: [...state.Hand.FlopAction, actionObj],
                                NewActionId: state.Hand.NewActionId + 1,
                            }
                        }));
                    break;
                case "Turn":
                        this.setState((state, props) => ({
                            ...state,
                            Hand: {
                                ...state.Hand,
                                TurnAction: [...state.Hand.TurnAction, actionObj],
                                NewActionId: state.Hand.NewActionId + 1,
                            }
                        }));
                    break;
                case "River":
                        this.setState((state, props) => ({
                            ...state,
                            Hand: {
                                ...state.Hand,
                                RiverAction: [...state.Hand.RiverAction, actionObj],
                                NewActionId: state.Hand.NewActionId + 1,
                            }
                        }));
                    break;
                }
        }
    };
    OnCardClick = (type) => {
        this.props.navigation.navigate('CardChanger', {
            Type: type,
            ChangeCard: this.ChangeCard.bind(this),
          });
    };
    ChangeCard = (type, new_card_id) => {
        switch (type) {
            case 'my_card1':
                    this.setState((state, props) => ({
                        ...state,
                        Hand: {
                            ...state.Hand,
                            MyCards: state.Hand.MyCards.map((card, index) => {
                                    if (index === 0) {
                                        return new_card_id;
                                    }
                                    return card; })}}));
                break;
            case 'my_card2':
                    this.setState((state, props) => ({
                        ...state,
                        Hand: {
                            ...state.Hand,
                            MyCards: state.Hand.MyCards.map((card, index) => {
                                    if (index === 1) {
                                        return new_card_id;
                                    }
                                    return card; })}}));
                break;
            case 'flop1':
                this.setState((state, props) => ({
                    ...state,
                    Hand: {
                        ...state.Hand,
                        FlopCards: state.Hand.FlopCards.map((card, index) => {
                                if (index === 0) {
                                    return new_card_id;
                                }
                                return card; })}}));
                break;
            case 'flop2':
                    this.setState((state, props) => ({
                        ...state,
                        Hand: {
                            ...state.Hand,
                            FlopCards: state.Hand.FlopCards.map((card, index) => {
                                    if (index === 1) {
                                        return new_card_id;
                                    }
                                    return card; })}}));
                break;
            case 'flop3':
                this.setState((state, props) => ({
                    ...state,
                    Hand: {
                        ...state.Hand,
                        FlopCards: state.Hand.FlopCards.map((card, index) => {
                                if (index === 2) {
                                    return new_card_id;
                                }
                                return card; })}}));
                break;
            case 'turn':
                this.setState((state, props) => ({
                    ...state,
                    Hand: {
                        ...state.Hand,
                        TurnCard: new_card_id }}));
                break;
            case 'river':
                this.setState((state, props) => ({
                    ...state,
                    Hand: {
                        ...state.Hand,
                        RiverCard: new_card_id }}));
                break;
            case 'opponent_card_1':
                this.setState((state, props) => ({
                    ...state,
                    Hand: {
                        ...state.Hand,
                        OpponentsCards: state.Hand.OpponentsCards.map((card, index) => {
                                if (index === 0) {
                                    return new_card_id;
                                }
                                return card; })}}));
                break;
            case 'opponent_card_2':
                this.setState((state, props) => ({
                    ...state,
                    Hand: {
                        ...state.Hand,
                        OpponentsCards: state.Hand.OpponentsCards.map((card, index) => {
                                if (index === 1) {
                                    return new_card_id;
                                }
                                return card; })}}));
                break;
        }
    };
    TouchableCard = (cardNumber, type) => {
        return (
            <View>
                <TouchableOpacity
                        onPress={() => this.OnCardClick(type) }>
                            { Card(cardNumber) }
                    </TouchableOpacity>
            </View>
        );
    };
    GetAction = (type) => {
        this.props.navigation.navigate('GetAction', {
            Type: type,
            AddAction: this.AddAction.bind(this),
            Id: this.state.Hand.NewActionId,
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
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 500,
  },
  btn: {
    borderWidth: 1,
    borderRadius: 12,
    overflow: 'hidden',
    padding: 12,
  },
  actionView: {
    flexDirection:'row',
    backgroundColor: '#d3d3d3',
    flex: 9,
    borderColor: 'gray', 
    borderWidth: 1, 
    borderRadius: 10
  },
  actionView2: {
    flex: 1,
    width: 15,
    flexDirection:'row',
    backgroundColor: '#ff0000',
    borderColor: 'gray', 
    borderWidth: 1, 
    borderRadius: 10
  },
  actionText: {
    flex: 1,
    fontSize: 17,
    paddingLeft: 2,
  },
  txt: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlignVertical: 'center'
  },
  numberInput: {
    flex: 10,
    margin: 15,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1,
 },
});
