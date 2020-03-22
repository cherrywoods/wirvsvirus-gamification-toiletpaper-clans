import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const ScoreTableRow = ({index, score, teamname}) => (
    <View style={styles.row}>
        <View style={styles.row1Element}>            
            <Text style={styles.text}>{ index }</Text>
        </View>
        <View style={styles.row2Element}>            
            <Text style={styles.text}>{ score }</Text>
        </View>
        <View style={styles.row3Element}>            
            <Text style={styles.text}>{ teamname }</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    row1Element: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        marginRight: 7,
    },
    row2Element: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    row3Element: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        marginLeft: 7,
    },
    text : {
        marginTop: 25,
        fontWeight: "bold",
    },
});

export default ScoreTableRow;