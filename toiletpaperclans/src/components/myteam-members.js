import React from 'react';
import { View, StyleSheet } from 'react-native';
import ProfilePicture from '_components/profilepicture.js';
import ButtonAddMember from '_components/addButton.js';

const MyTeamMembers = ({ members }) => {
    return (
        <View style={styles.container}>
            {members.map(member => (
                <ProfilePicture key={member.key} />
            ))}
            <ButtonAddMember />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
});

export default MyTeamMembers;
