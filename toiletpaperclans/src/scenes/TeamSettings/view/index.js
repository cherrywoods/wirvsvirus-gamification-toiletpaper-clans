import React from 'react';
import { SafeAreaView, Text, TouchableHighlight, View, TextInput, ImageBackground } from 'react-native';

import styles from './styles';

export default ({teamname, newTeamnname, playerID, onChangeTeamname, onChangeInvitePlayer, onPressChangeTeamname,  onPressInvitePlayer, onPressCreateTeam, onPressBack, onPressLeaveTeam}) => (
  <SafeAreaView style={styles.view}>
    <ImageBackground source={require('_assets/img/toiletpaper.jpg')} style={styles.imageBackground}>
        <View style={styles.header}>
            <Text style={styles.headerText}>{teamname}</Text>
        </View>

        <View style={styles.textFieldWrapper}>

            <TextInput style={styles.textField}
            placeholder="Neuer Teamname"
            onChangeText={onChangeTeamname}
            value={newTeamnname}
            />
            <TouchableHighlight style={styles.button} onPress={onPressChangeTeamname}>
                <Text style={styles.buttonText}>Ändern!</Text>
            </TouchableHighlight>

            <TextInput style={styles.textField}
            placeholder="Spieler ID" 
            onChangeText={onChangeInvitePlayer}
            value={playerID}
            />
            <TouchableHighlight style={styles.button} onPress={onPressInvitePlayer}>
                <Text style={styles.buttonText}>Einladen</Text>
            </TouchableHighlight>
            
            <TouchableHighlight style={styles.button} onPress={onPressLeaveTeam}>
                <Text style={styles.buttonText}>Team verlassen</Text>
            </TouchableHighlight>

            <TouchableHighlight style={styles.button} onPress={onPressCreateTeam}>
                <Text style={styles.buttonText}>Neues Team erstellen</Text>
            </TouchableHighlight>

        </View>

        <Text style={styles.smallText}>Dabei verlässt du dein Team</Text>

        <View style={styles.footer}>
            <TouchableHighlight onPress={onPressBack} >
                <Text style={styles.smallText}>Zurück</Text>
            </TouchableHighlight>
        </View>
    </ImageBackground>
  </SafeAreaView>
);

