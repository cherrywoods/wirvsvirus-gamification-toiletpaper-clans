import React from 'react';
import { BLACK } from '_styles';
import { View, Text, StyleSheet, SafeAreaView, Image, ImageBackground, TouchableHighlight} from 'react-native';

const OnboardingSlide4 = ({}) => (
    <SafeAreaView style={styles.container}>
    <ImageBackground source={require('_assets/img/toiletpaper.jpg')} style={{width: '100%', height: '100%', alignItems: 'center'}}>
        <View style={styles.slide}>
            <Text style={styles.title}>Are you ready?</Text>
            <Image source={require('_assets/icons/Pokal.png')} style={{width: 300, height: 300, resizeMode: 'contain', marginBottom: 70}} />
            <Text style={styles.info} >...to enter the Challenge</Text>
            <TouchableHighlight style={styles.button}>
              <Text style={styles.buttonText}>Start!</Text>
            </TouchableHighlight>
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
        fontWeight: '600',
        marginLeft: 50,
        marginRight: 50,
        textAlign: 'center',
      },
      button: {
        backgroundColor: '#B40E22',
        width: 300,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        margin: 30,
      },
      buttonText: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontSize: 28,
        fontWeight: '500',
      },
      footer: {
        textSize: 16,
        margin: 30,
        textAlign: 'center',
      },

  });

export default OnboardingSlide4;
