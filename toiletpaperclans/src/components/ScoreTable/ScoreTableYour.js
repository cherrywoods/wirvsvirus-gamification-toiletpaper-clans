import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const ScoreTableYour = ({ index, score, teamname }) => (
  <View style={[styles.row]}>
    <View style={[styles.row1Element, styles.row1ElementBottom, { paddingBottom: 20 }]}>
      <Text style={styles.textme}>{ index }</Text>
    </View>
    <View style={[styles.row2Element, { paddingBottom: 20 }]}>
      <Text style={styles.textme}>{ score }</Text>
    </View>
    <View style={[styles.row3Element, styles.row3ElementBottom, { paddingBottom: 20 }]}>
      <Text style={styles.textme}>{ teamname }</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  textme : {
    marginTop: 25,
    fontWeight: 'bold',
    fontSize: 16,
  },
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
  row1ElementBottom: {
    borderBottomLeftRadius: 10,
  },
  row2Element: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  row3Element: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginLeft: 7,
  },
  row3ElementBottom: {
    borderBottomRightRadius: 10,
  },
});

export default ScoreTableYour;
