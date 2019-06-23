import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Card from '../CardGrabber';


export default class CardChanger extends React.Component {
  render() {
      return (
        <View style={styles.container}>
            { this.Column('000', '201', '202', '203', '204', '205') }
            { this.Column('206', '207', '208', '209', '210', '211') }
            { this.Column('212', '213', '101', '102', '103', '104') }
            { this.Column('105', '106', '107', '108', '109', '110') }
            { this.Column('111', '112', '113', '301', '302', '303') }
            { this.Column('304', '305', '306', '307', '308', '309') }
            { this.Column('310', '311', '312', '313', '401', '402') }
            { this.Column('403', '404', '405', '406', '407', '408') }
            { this.Column('409', '410', '411', '412', '413', '000') }
        </View>
      );
    }
    Column = (card1, card2, card3, card4, card5, card6) => {
        return (
            <View style={styles.horizontal}>
                { this.TouchableCard(card1) }
                { this.TouchableCard(card2) }
                { this.TouchableCard(card3) }
                { this.TouchableCard(card4) }
                { this.TouchableCard(card5) }
                { this.TouchableCard(card6) }
            </View>
        );
    };
    TouchableCard = (cardNumber) => {
        return (
            <View>
                <TouchableOpacity
                    onPress={() => this.ChooseCard(cardNumber) }>
                        { Card(cardNumber) }
                </TouchableOpacity>
            </View>
        );
    };
    ChooseCard = (ChosenCard) => {
        this.props.navigation.state.params.ChangeCard(this.props.navigation.state.params.Type, ChosenCard); //update hand
        this.props.navigation.goBack(null);
    };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 20,
    paddingRight: 20,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
},
    column: {
    flexDirection: 'column',
    justifyContent: 'space-between',
},
});