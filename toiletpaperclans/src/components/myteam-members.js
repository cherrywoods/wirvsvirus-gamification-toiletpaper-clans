import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import ProfilePicture from '_components/profilepicture.js';
import ButtonAddMember from '_components/addButton.js';

const MyTeamMembers = ({ members }) => {
    const membersObject = useMemo(() => members && Object.fromEntries(members), [members]);
    return (
        <View style={styles.container}>
            {membersObject && Object.keys(membersObject).map(key => (
                <ProfilePicture key={key} />
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
