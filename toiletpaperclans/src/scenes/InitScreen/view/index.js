import React from 'react';
import { SafeAreaView, TouchableHighlight, ImageBackground, Image, View } from 'react-native';

import styles from './styles';

export default () => (
  <SafeAreaView>
    <ImageBackground source={require('_assets/img/toiletpaper.jpg')} style={styles.imageBackground}>
      <TouchableHighlight style={styles.highlight}>
        <View style={styles.container}>
          <Image style={styles.logo} source={require('_assets/img/logo.png')} />
          <Image style={styles.logoWord} source={require('_assets/img/logo_word.png')} />
        </View>
      </TouchableHighlight>
    </ImageBackground>
  </SafeAreaView>
);
