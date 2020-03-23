import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, ImageBackground} from 'react-native';

import Swiper from 'react-native-swiper';

import OnboardingSlide1 from './OnboardingSlide1';
import OnboardingSlide2 from './OnboardingSlide2';
import OnboardingSlide3 from './OnboardingSlide3';
import OnboardingSlide4 from './OnboardingSlide4';

const OnboardingScreen = ({ navigation }) => (
    <SafeAreaView style={styles.container}>
        <ImageBackground source={require('_assets/img/toiletpaper.jpg')} style={{width: '100%', height: '100%', alignItems: 'center'}}>
            <Swiper style={styles.wrapper} loop={false} showsPagination={false}>
                <View style={styles.slide}>
                    <OnboardingSlide1 />
                </View>
                <View style={styles.slide}>
                    <OnboardingSlide2 />
                </View>
                <View style={styles.slide}>
                    <OnboardingSlide3 />
                </View>
                <View style={styles.slide}>
                    <OnboardingSlide4 onPressContinue={() => navigation.navigate('OnboardingChallenge')} />
                </View>
            </Swiper>
        </ImageBackground>
    </SafeAreaView>
);

const styles = StyleSheet.create({
    slide: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    footer: {
      fontSize: 20,
      fontWeight: '600',
      margin: 20,
    },
});

export default OnboardingScreen;
