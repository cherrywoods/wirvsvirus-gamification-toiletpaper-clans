import React from 'react';
import { SafeAreaView, Text, TouchableHighlight, ImageBackground, Image, View } from 'react-native';

import styles from './styles';
  
export default ({ onPressLogin }) => (
  <SafeAreaView>
    <ImageBackground source={require('../../assets/img/toiletpaper.jpg')} style={styles.imageBackground}>
      <TouchableHighlight style={styles.highlight} onPress={onPressLogin}>
        <View style={styles.container}>
          <Image style={styles.logo} source={require('../../assets/img/logo.png')}></Image>
          <Image style={styles.logoWord} source={require('../../assets/img/logo_word.png')}></Image>
          <Text style={styles.text}>Press to Play!</Text>
        </View>
      </TouchableHighlight>
    </ImageBackground>
  </SafeAreaView>
);