import React from 'react';
import { BLACK, RED, BABYBlUE } from '_styles';
import {SafeAreaView, Text, TouchableHighlight, View, StyleSheet, TextInput, ImageBackground} from 'react-native';

const JoinTeamScreen = ({navigation}) => (
  <SafeAreaView style={{backgroundColor: '#aec8c3', width: '100%', height: '100%'}}>
    <ImageBackground source={require('../../assets/img/toiletpaper.jpg')} style={{width: '100%', height: '100%'}}>
      <View style={styles.header} >
        <TouchableHighlight onPress={() => navigation.navigate('Home')}>
          <Text style={styles.headerIconLeft} >Home</Text>
        </TouchableHighlight>
        <Text style={styles.headerText}>Join a Team</Text>
        <Text style={styles.headerIconRight}>Icon</Text>
      </View>

    <View style={styles.textFieldWrapper}>
      <Text style={styles.headerText} >Search a Team to join</Text>
      <TextInput 
        style={styles.textField}
        placeholder="Cl4n%"
      />
    </View>

    <View style={styles.footer}>
      <TouchableHighlight style={styles.button}>
        <Text style={styles.buttonText}>Join</Text>
      </TouchableHighlight>
    </View>
    </ImageBackground>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  header: {
      marginTop: 30,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      marginBottom: 100,
  },
  headerText: {
      color: '#B40E22',
      fontSize: 28,
      fontWeight: "500",
      textAlign: 'center',
      marginBottom: 30,
  },
  headerIconLeft: {
      marginLeft: 30,
      color: '#B40E22',
      fontSize: 24,
      width: 90,
      marginBottom: 30,
  },
  headerIconRight: {
      marginRight: 30,
      opacity: 0,
      width: 90,
      marginBottom: 30,
  },
  textFieldWrapper: {
    alignItems: 'center',
    //marginBottom: '70%'
  },
  textField: {
      backgroundColor: '#CCCCCC',
      margin: 10,
      height: 50,
      width: '80%',
      borderRadius: 10,
      padding: 10,
      color: '#B40E22',
      fontSize: 18,
  },
  footer: {
    width: '100%',
    marginTop: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#B40E22',
    width: '80%', 
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 28,
    fontWeight: '500',
  }
});

export default JoinTeamScreen;
