import React from 'react';
import { BLACK } from '_styles';
import { View, Text, StyleSheet, SafeAreaView, Image, ImageBackground} from 'react-native';
import Swiper from 'react-native-swiper'

import OnboardingSlide1 from '_/OnboardingSlide1.js';
import OnboardingSlide2 from '_/OnboardingSlide2.js';
import OnboardingSlide3 from '_/OnboardingSlide3.js';
import OnboardingSlide4 from '_/OnboardingSlide4.js';

const OnboardingScreen = ({}) => (
    <SafeAreaView style={styles.container}>
        <ImageBackground source={require('_assets/img/toiletpaper.jpg')} style={{width: '100%', height: '100%', alignItems: 'center'}}>
            <Swiper style={styles.wrapper} loop={false} showsPagination={false}>
                <View style={styles.slide}>
                    <OnboardingSlide1></OnboardingSlide1>
                </View>
                <View style={styles.slide}>
                    <OnboardingSlide2></OnboardingSlide2>
                </View>
                <View style={styles.slide}>
                    <OnboardingSlide3></OnboardingSlide3>
                </View>
                <View style={styles.slide}>
                    <OnboardingSlide4></OnboardingSlide4>
                </View>
            </Swiper>
        </ImageBackground>
    </SafeAreaView>
);

const styles = StyleSheet.create({
    slide: {
        width: '100%',
        height: '100%',
        alignItems: 'center'
    },
    footer: {
      fontSize: 20,
      fontWeight: '600',
      margin: 20,
    },
});

export default OnboardingScreen;