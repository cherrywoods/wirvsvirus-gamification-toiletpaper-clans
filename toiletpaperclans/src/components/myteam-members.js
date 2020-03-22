import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import ProfilePicture from '_components/profilepicture.js';
import ButtonAddMember from '_components/addButton.js';

const MyTeamMembers = ({members}) => {

    var profiles = [];
    var counter = 0; // assing keys
    for (const member of members) {
        profiles.push(<ProfilePicture key={counter}></ProfilePicture>);
        counter += 1;
    }

    return (
        <View style={styles.container}>
            {profiles}
            <ButtonAddMember></ButtonAddMember>
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