import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import ProfilePicture from '_components/profilepicture.js';
import ButtonAddMember from '_components/addButton.js';

const MyTeamMembers = ({}) => (
    <View style={styles.container}>
        <ProfilePicture />
        <ProfilePicture />
        <ProfilePicture />
        <ProfilePicture />
        <ButtonAddMember />
    </View>
);

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
});

export default MyTeamMembers;
