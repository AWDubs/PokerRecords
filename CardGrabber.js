import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default function Card(card_id) {
    return (
        <View>
                { getCard(card_id) }
        </View>
    );
}

function getCard(card_id) {
    switch (card_id) {
        /*  General */
        case '000':
            return (<Image source={require('./cards/000.png')} style={ styles.cardStyle }/>);   //blank card

        /*  Clubs   */
        case '101':
            return (<Image source={require('./cards/101.png')} style={ styles.cardStyle }/>);
        case '102':
            return (<Image source={require('./cards/102.png')} style={ styles.cardStyle }/>);
        case '103':
            return (<Image source={require('./cards/103.png')} style={ styles.cardStyle }/>);
        case '104':
            return (<Image source={require('./cards/104.png')} style={ styles.cardStyle }/>);
        case '105':
            return (<Image source={require('./cards/105.png')} style={ styles.cardStyle }/>);
        case '106':
            return (<Image source={require('./cards/106.png')} style={ styles.cardStyle }/>);
        case '107':
            return (<Image source={require('./cards/107.png')} style={ styles.cardStyle }/>);
        case '108':
            return (<Image source={require('./cards/108.png')} style={ styles.cardStyle }/>);
        case '109':
            return (<Image source={require('./cards/109.png')} style={ styles.cardStyle }/>);
        case '110':
            return (<Image source={require('./cards/110.png')} style={ styles.cardStyle }/>);
        case '111':
            return (<Image source={require('./cards/111.png')} style={ styles.cardStyle }/>);
        case '112':
            return (<Image source={require('./cards/112.png')} style={ styles.cardStyle }/>);
        case '113':
            return (<Image source={require('./cards/113.png')} style={ styles.cardStyle }/>);

        /*  Diamonds   */
        case '201':
            return (<Image source={require('./cards/201.png')} style={ styles.cardStyle }/>);
        case '202':
            return (<Image source={require('./cards/202.png')} style={ styles.cardStyle }/>);
        case '203':
            return (<Image source={require('./cards/203.png')} style={ styles.cardStyle }/>);
        case '204':
            return (<Image source={require('./cards/204.png')} style={ styles.cardStyle }/>);
        case '205':
            return (<Image source={require('./cards/205.png')} style={ styles.cardStyle }/>);
        case '206':
            return (<Image source={require('./cards/206.png')} style={ styles.cardStyle }/>);
        case '207':
            return (<Image source={require('./cards/207.png')} style={ styles.cardStyle }/>);
        case '208':
            return (<Image source={require('./cards/208.png')} style={ styles.cardStyle }/>);
        case '209':
            return (<Image source={require('./cards/209.png')} style={ styles.cardStyle }/>);
        case '210':
            return (<Image source={require('./cards/210.png')} style={ styles.cardStyle }/>);
        case '211':
            return (<Image source={require('./cards/211.png')} style={ styles.cardStyle }/>);
        case '212':
            return (<Image source={require('./cards/212.png')} style={ styles.cardStyle }/>);
        case '213':
            return (<Image source={require('./cards/213.png')} style={ styles.cardStyle }/>);

        /*  Hearts   */
        case '301':
            return (<Image source={require('./cards/301.png')} style={ styles.cardStyle }/>);
        case '302':
            return (<Image source={require('./cards/302.png')} style={ styles.cardStyle }/>);
        case '303':
            return (<Image source={require('./cards/303.png')} style={ styles.cardStyle }/>);
        case '304':
            return (<Image source={require('./cards/304.png')} style={ styles.cardStyle }/>);
        case '305':
            return (<Image source={require('./cards/305.png')} style={ styles.cardStyle }/>);
        case '306':
            return (<Image source={require('./cards/306.png')} style={ styles.cardStyle }/>);
        case '307':
            return (<Image source={require('./cards/307.png')} style={ styles.cardStyle }/>);
        case '308':
            return (<Image source={require('./cards/308.png')} style={ styles.cardStyle }/>);
        case '309':
            return (<Image source={require('./cards/309.png')} style={ styles.cardStyle }/>);
        case '310':
            return (<Image source={require('./cards/310.png')} style={ styles.cardStyle }/>);
        case '311':
            return (<Image source={require('./cards/311.png')} style={ styles.cardStyle }/>);
        case '312':
            return (<Image source={require('./cards/312.png')} style={ styles.cardStyle }/>);
        case '313':
            return (<Image source={require('./cards/313.png')} style={ styles.cardStyle }/>);

        /*  Spades   */
        case '401':
            return (<Image source={require('./cards/401.png')} style={ styles.cardStyle }/>);
        case '402':
            return (<Image source={require('./cards/402.png')} style={ styles.cardStyle }/>);
        case '403':
            return (<Image source={require('./cards/403.png')} style={ styles.cardStyle }/>);
        case '404':
            return (<Image source={require('./cards/404.png')} style={ styles.cardStyle }/>);
        case '405':
            return (<Image source={require('./cards/405.png')} style={ styles.cardStyle }/>);
        case '406':
            return (<Image source={require('./cards/406.png')} style={ styles.cardStyle }/>);
        case '407':
            return (<Image source={require('./cards/407.png')} style={ styles.cardStyle }/>);
        case '408':
            return (<Image source={require('./cards/408.png')} style={ styles.cardStyle }/>);
        case '409':
            return (<Image source={require('./cards/409.png')} style={ styles.cardStyle }/>);
        case '410':
            return (<Image source={require('./cards/410.png')} style={ styles.cardStyle }/>);
        case '411':
            return (<Image source={require('./cards/411.png')} style={ styles.cardStyle }/>);
        case '412':
            return (<Image source={require('./cards/412.png')} style={ styles.cardStyle }/>);
        case '413':
            return (<Image source={require('./cards/413.png')} style={ styles.cardStyle }/>);
    }
}

const styles = StyleSheet.create({
    cardStyle: {
        width: 46, height: 62.5
    }
  });