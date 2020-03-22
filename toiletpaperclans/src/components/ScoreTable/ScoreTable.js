import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import ScoreTableRow from '_ScoreTable/ScoreTableRow.js';
import ScoreTableHeading from '_ScoreTable/ScoreTableHeading.js';
import ScoreTableYour from '_ScoreTable/ScoreTableYour';

export default class ScoreTable extends Component {
  render() {
    return (
      <View style={styles.horizontal}>
        <ScoreTableHeading></ScoreTableHeading>
        <ScoreTableRow index={1} score={232} teamname={'Team A'}></ScoreTableRow>
        <ScoreTableRow index={2} score={220} teamname={'Team B'}></ScoreTableRow>
        <ScoreTableRow index={3} score={219} teamname={'Team C'}></ScoreTableRow>
        <ScoreTableRow index={4} score={210} teamname={'Team D'}></ScoreTableRow>
        <ScoreTableRow index={5} score={204} teamname={'Team E'}></ScoreTableRow>
        <ScoreTableRow index={6} score={201} teamname={'Team F'}></ScoreTableRow>
        <ScoreTableRow index={7} score={196} teamname={'Team G'}></ScoreTableRow>
        <ScoreTableRow index={8} score={194} teamname={'Team H'}></ScoreTableRow>
        <ScoreTableRow index={9} score={193} teamname={'Team I'}></ScoreTableRow>
        <ScoreTableRow index={10} score={180} teamname={'Team J'}></ScoreTableRow>
        <ScoreTableYour index={203} score={134} teamname={'Ottos'}></ScoreTableYour>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  horizontal: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 10,
    width: '90%',
  }
});