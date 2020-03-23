import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, ImageBackground } from 'react-native';

const OnboardingSlide1 = () => (
  <SafeAreaView style={styles.container}>
    <ImageBackground source={require('_assets/img/toiletpaper.jpg')} style={styles.imageBackground}>
      <View style={styles.slide}>
        <Text style={styles.title}>Your Clan</Text>
        <Image source={require('_assets/icons/group.png')} style={styles.image} />
        <Text style={styles.info} >Times are tough but together you are strong!</Text>
        <Text style={styles.info}>Establish your clan... </Text>
      </View>
    </ImageBackground>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  imageBackground: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  slide: {
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    margin: 70,
  },
  image: {
    width: 300,
    height: 300,
    aspectRatio: 1,
    marginBottom: 70,
  },
  info: {
    fontSize: 26,
    fontWeight: '400',
    marginLeft: 50,
    marginRight: 50,
    textAlign: 'center',
  },
  footer: {
    fontSize: 16,
    margin: 30,
    textAlign: 'center',
  },
});

export default OnboardingSlide1;
