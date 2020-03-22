import React from 'react';
import { BLACK } from '_styles';
import { View, Text, StyleSheet, SafeAreaView, Image, ImageBackground} from 'react-native';

const OnboardingSlide1 = ({}) => (
    <SafeAreaView style={styles.container}>
    <ImageBackground source={require('_assets/img/toiletpaper.jpg')} style={{width: '100%', height: '100%', alignItems: 'center'}}>
        <View style={styles.slide}>
            <Text style={styles.title}>Your Clan</Text>
            <Image source={require('_assets/icons/group.png')} style={{width: 300, height: 300, aspectRatio: 1, marginBottom: 70}} />
            <Text style={styles.info} >Times are tough but together you are strong!</Text>
            <Text style={styles.info}>Establish your clan... </Text>
            <Text sytle={styles.footer}>Swipe > </Text>
        </View>
    </ImageBackground>
    </SafeAreaView>
);

const styles = StyleSheet.create({
    slide: {
      alignItems: 'center',
    },
    title: {
      fontSize: 32,
      fontWeight: '700',
      margin: 70,
    },
    info: {
      fontSize: 26,
      fontWeight: '400',
      marginLeft: 50,
      marginRight: 50,
      textAlign: 'center',
    },
    footer: {
      textSize: 16,
      margin: 30,
      textAlign: 'center',
    },
  });

export default OnboardingSlide1;
