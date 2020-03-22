import React from 'react';
import {SafeAreaView, Text, TouchableHighlight, StyleSheet, ImageBackground, Image, View} from 'react-native';

const StartScreen = ({navigation}) => (
  <SafeAreaView>
    <ImageBackground source={require('_assets/img/toiletpaper.jpg')} style={{width: '100%', height: '100%', alignItems: 'center'}}>
      <TouchableHighlight style={styles.highlight} onPress={() => navigation.navigate('Login')}>
        <View style={styles.container}>
          <Image style={styles.logo} source={require('_assets/img/logo.png')} />
          <Image style={styles.logoWord} source={require('_assets/img/logo_word.png')} />
          <Text style={styles.text}>Press to Play!</Text>
        </View>
      </TouchableHighlight>
    </ImageBackground>
  </SafeAreaView>
);

const styles = StyleSheet.create({
    highlight: {
      height: '100%',
      width: '100%',
    },
    container: {
      width: '100%',
      height: '100%',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    logo: {
      height: 250,
      width: 250,
      resizeMode: 'contain',
    },
    logoWord: {
      width: 250,
      resizeMode: 'contain',
      position: 'relative',
      top: -70,
    },
    text: {
      fontSize: 20,
      fontWeight: 'bold',
    },
  });

export default StartScreen;
