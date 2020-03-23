import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const ScoreTableRow = ({ rank, score, teamName, isOwnTeam }) => (
  <View style={styles.row}>
    <View style={[styles.column, styles.column1]}>
      <Text style={[styles.text, isOwnTeam && styles.ownTeamText]}>{ rank }</Text>
    </View>
    <View style={[styles.column, styles.column2]}>
      <Text style={[styles.text, isOwnTeam && styles.ownTeamText]}>{ score }</Text>
    </View>
    <View style={[styles.column, styles.column3]}>
      <Text style={[styles.text, isOwnTeam && styles.ownTeamText]}>{ teamName }</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 7,
  },
  column: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  column1: {
    flex: 1,
  },
  column2: {
    flex: 2,
  },
  column3: {
    flex: 3,
  },
  text: {
    marginTop: 25,
    fontWeight: 'bold',
  },
  ownTeamText: {
    fontSize: 18,
    color: '#B40E22',
  },
});

export default ScoreTableRow;
