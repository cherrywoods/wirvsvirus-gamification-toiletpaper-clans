import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import ProfilePicture from '_components/ProfilePicture.js';
import AddButton from '_components/AddButton.js';

const TeamMembers = ({ members, onPressAdd }) => {
  const membersObject = useMemo(() => members && Object.fromEntries(members), [members]);
  return (
    <View style={styles.container}>
      {membersObject && Object.keys(membersObject).map(key => (
        <ProfilePicture key={key} />
      ))}
      <AddButton onPress={onPressAdd} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
});

export default TeamMembers;
