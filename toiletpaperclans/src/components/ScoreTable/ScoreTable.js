import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import ScoreTableRow from '_ScoreTable/ScoreTableRow.js';
import ScoreTableHeading from '_ScoreTable/ScoreTableHeading.js';
import ScoreTableYour from '_ScoreTable/ScoreTableYour';

export default class ScoreTable extends Component {
  render() {

    const leaderboard = this.props.leaderboard.leaderboard;
    const ownTeamRank = this.props.leaderboard.ownTeamRank;
    const teamName = this.props.teamName;
    const teamScore = this.props.toiletpaperScore;

    var tableEntries = [];
    for (i = 0; i < leaderboard.length; i += 1) {
      if (ownTeamRank === i) {
        tableEntries.push(
          <ScoreTableYour 
            key={i}
            index={i + 1} 
            score={leaderboard[i].score} 
            teamname={leaderboard[i].name}>
          </ScoreTableYour>
        );
      } else {
        tableEntries.push(
          <ScoreTableRow 
            key={i}
            index={i + 1} 
            score={leaderboard[i].score} 
            teamname={leaderboard[i].name}>
          </ScoreTableRow>
        );
      }
    }
    console.log("ownTeamRank", ownTeamRank);
    if (ownTeamRank > leaderboard.length) {
      tableEntries.push(
        <ScoreTableYour 
          key={leaderboard.length+1}
          index={ownTeamRank} 
          score={teamScore} 
          teamname={teamName}>
        </ScoreTableYour>
      );
    }

    return (
        <View style={styles.horizontal}>
        <ScoreTableHeading></ScoreTableHeading>
            {tableEntries}
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