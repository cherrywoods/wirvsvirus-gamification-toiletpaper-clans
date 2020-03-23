import React from 'react';
import { StyleSheet, View } from 'react-native';
import ScoreTableRow from '_ScoreTable/ScoreTableRow.js';
import ScoreTableHeading from '_ScoreTable/ScoreTableHeading.js';

export default ({ ownTeamName, ownTeamScore, leaderboard }) => {
  const { topTen, ownTeamIndex } = leaderboard || {};
  return (
    <View style={styles.horizontal}>
      <ScoreTableHeading />
      {topTen && topTen.map((team, index) => (
        <ScoreTableRow
          key={team.key}
          rank={index + 1}
          score={ownTeamIndex === index ? ownTeamScore : team.toiletpaper}
          teamName={ownTeamIndex === index ? ownTeamName : team.name}
          isOwnTeam={ownTeamIndex === index}
        />
      ))}
      {ownTeamIndex && ownTeamIndex > 9 && (
        <ScoreTableRow
          rank={ownTeamIndex + 1}
          score={ownTeamScore}
          teamName={ownTeamName}
          isOwnTeam
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  horizontal: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 10,
    marginVertical: 40,
    width: '90%',
    borderRadius: 10,
    backgroundColor: 'white',
  },
});
