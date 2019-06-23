import React from 'react';
import { StyleSheet, View, Text, Button, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
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
    this.RiverAction =      _riveraction
}


export default class Hand extends React.Component {
    static navigationOptions = ({navigation, screenProps}) => ({
        headerRight: (
          <Button title="Save" onPress={() => { navigation.goBack(null) } }/>
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
                <View style={styles.horizontal}>
                    <Text>My Cards: </Text>
                    { this.TouchableCard(this.state.Hand.MyCards[0], 'my_card1')}
                    { this.TouchableCard(this.state.Hand.MyCards[1], 'my_card2')}
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
                    <Button title="+Action" onPress={() => this.GetAction("PreFlop") } />
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
                    { this.TouchableCard(this.state.Hand.FlopCards[0], 'flop1')}
                    { this.TouchableCard(this.state.Hand.FlopCards[1], 'flop2')}
                    { this.TouchableCard(this.state.Hand.FlopCards[2], 'flop3')}
                    <Button title="+Action" onPress={() => this.GetAction("Flop") } />
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
                    { this.TouchableCard(this.state.Hand.TurnCard, 'turn')}
                    <Button title="+Action" onPress={() => this.GetAction("Turn") } />
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
                    { this.TouchableCard(this.state.Hand.RiverCard, 'river')}
                    <Button title="+Action" onPress={() => this.GetAction("River") } />
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
                    { this.TouchableCard(this.state.Hand.OpponentsCards[0], 'opponent_card_1')}
                    { this.TouchableCard(this.state.Hand.OpponentsCards[1], 'opponent_card_2')}
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
    AddAction = (type, actionString) => {
        switch (type) {
            case "PreFlop":
                    this.setState((state, props) => ({
                        ...state,
                        Hand: {
                            ...state.Hand,
                            PreFlopAction: [...state.Hand.PreFlopAction, actionString],
                        }
                    }));
                break;
            case "Flop":
                    this.setState((state, props) => ({
                        ...state,
                        Hand: {
                            ...state.Hand,
                            FlopAction: [...state.Hand.FlopAction, actionString],
                        }
                    }));
                break;
            case "Turn":
                    this.setState((state, props) => ({
                        ...state,
                        Hand: {
                            ...state.Hand,
                            TurnAction: [...state.Hand.TurnAction, actionString],
                        }
                    }));
                break;
            case "River":
                    this.setState((state, props) => ({
                        ...state,
                        Hand: {
                            ...state.Hand,
                            RiverAction: [...state.Hand.RiverAction, actionString],
                        }
                    }));
                break;
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
    margin: 30,
    marginBottom: 500,
  },
});
