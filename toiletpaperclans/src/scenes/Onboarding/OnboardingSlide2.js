import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, ImageBackground } from 'react-native';

const OnboardingSlide2 = () => (
  <SafeAreaView style={styles.container}>
    <ImageBackground source={require('_assets/img/toiletpaper.jpg')} style={styles.imageBackground}>
      <View style={styles.slide}>
        <Text style={styles.title}>Your Toilet Paper</Text>
        <Image source={require('_assets/icons/your_toiletpaper.png')} style={styles.image} />
        <Text style={styles.info} >and fight for the most</Text>
        <Text style={styles.info}>valuable good for this time</Text>
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
    fontWeight: '600',
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

export default OnboardingSlide2;
