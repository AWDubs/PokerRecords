import React from 'react';
import { StyleSheet, View, TextInput, Text } from 'react-native';
import { Button } from 'react-native-elements';


export default class GetAction extends React.Component {
    static navigationOptions =  ({navigation, screenProps}) => ({
        headerRight: (
            <Button title="Save" onPress={() => { navigation.goBack(null) }}/>
        ),
      })
  state = {
    Action: "",
    FirstPerson: false,
  }
  render() {
      return (
        <View style={styles.container}>
          <TextInput 
            onChangeText={(text)=> this.addItem(text)}
            placeholder="Select Action">
          {this.state.Action}</TextInput>
            { this.LineDivider() }
            
            { this.Nouns() }
            { this.LineDivider() }

            { this.Verbs() }
            { this.LineDivider() }

            { this.NumberAmount() }
            { this.LineDivider() }

            { this.Combos() }
            { this.LineDivider() }

            { this.Extras() }
            { this.LineDivider() }

          <Button type="outline" title="Clear" onPress={() => this.Clear() } style={styles.containerPadding} />
        </View>
      );
    }
    Nouns = () => {
        return (
            <View style={styles.containerPadding}>
                <View style={styles.horizontal}>
                    <Button type="outline" title="I" onPress={() => {
                        this.setState((state, props) => ({
                            ...state,
                            FirstPerson: true,
                            }));
                        this.addItem("I ");
                         }} />
                    <Button type="outline" title="SB" onPress={() => this.addItem("SB ") } />
                    <Button type="outline" title="BB" onPress={() => this.addItem("BB ") } />
                    <Button type="outline" title="UTG" onPress={() => this.addItem("UTG ") } />
                    <Button type="outline" title="UTG+1" onPress={() => this.addItem("UTG+1 ") } />
                    <Button type="outline" title="UTG+2" onPress={() => this.addItem("UTG+2 ") } />
                </View>
                <View style={styles.horizontal}>
                    <Button type="outline" title="UTG+3" onPress={() => this.addItem("UTG+3 ") } />
                    <Button type="outline" title="LJ" onPress={() => this.addItem("LJ ") } />
                    <Button type="outline" title="HJ" onPress={() => this.addItem("HJ ") } />
                    <Button type="outline" title="CO" onPress={() => this.addItem("CO ") } />
                    <Button type="outline" title="BTN" onPress={() => this.addItem("BTN ") } />
                </View>
            </View>
        );
    };
    Verbs = () => {
        return (
            <View style={styles.containerPadding}>
                <View style={styles.horizontal}>
                    <Button type="outline" title="checks" onPress={() => this.addVariableItem("checks ", "check ") } />
                    <Button type="outline" title="bets" onPress={() => this.addVariableItem("bets ", "bet ") } />
                    <Button type="outline" title="raises to" onPress={() => this.addVariableItem("raises to ", "raise to ") } />
                    <Button type="outline" title="folds." onPress={() => this.addVariableItem("folds. ", "fold. ") } />
                </View>
            </View>
        );
    };
    NumberAmount = () => {
        return (
            <View style={styles.horizontal}>
                <Text style={{ fontSize: 40, fontWeight: 'bold', justifyContent: "center", alignItems: "center" }}>$</Text>
                <View style={styles.numberInput}>
                        <TextInput 
                            keyboardType='numeric'
                            onSubmitEditing={(text)=> {
                                this.addItem(text.nativeEvent.text + ". ");
                                this.textInput.clear();
                                }}
                            ref={input => { this.textInput = input }}
                            />
                </View>
            </View>
        );
    };
    Combos = () => {
        return (
            <View style={styles.containerPadding}>
                <Button type="outline" title="Everyone checks" onPress={() => this.addItem("Everyone checks. ") } />
                <Button type="outline" title="Everyone folds" onPress={() => this.addItem("Everyone folds. ") } />
                <Button type="outline" title="goes all in" onPress={() => this.addVariableItem("goes all in. ", "go all in. ") } />
            </View>
        );
    };
    Extras = () => {
        return (
            <View style={styles.containerPadding}>
                <View style={styles.centerPadding}>
                    <View style={styles.horizontal}>
                        <Button type="outline" title="," onPress={() => this.addItem(", ") } />
                        <Button type="outline" title="&" onPress={() => this.addItem("& ") } />
                    </View>
                </View>
            </View>
        );
    };
    LineDivider = () => {
        return (
            <View style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1,
            }}
            />
        );
    }
    addVariableItem = (normalString, firstPersonString) => {

        this.addItem(this.state.FirstPerson ? firstPersonString : normalString);

        this.setState((state, props) => ({
            ...state,
            FirstPerson : false,
        }))
    };
    addItem = (stringToAdd) => {
        this.setState((state, props) => ({
            ...state,
            Action : state.Action + stringToAdd,
        }))
    };
    Clear = () => {
        this.setState((state, props) => ({
            ...state,
            Action : "",
        }))
    };
    componentWillUnmount() {
        this.props.navigation.state.params.AddAction(this.props.navigation.state.params.Type, this.state.Action); //update store
    };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    column: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    sidePadding: {
        paddingLeft: 5,
        paddingRight: 5,
    },
    containerPadding: {
        padding: 10,
    },
    centerPadding: {
        paddingLeft: 100,
        paddingRight: 100,
        justifyContent: 'center',
    },
    numberInput: {
        flex: 10,
        margin: 15,
        height: 40,
        borderColor: '#7a42f4',
        borderWidth: 1
     },
});