import React from 'react';
import { View, Text, SafeAreaView, Image, ImageBackground } from 'react-native';

import Swiper from 'react-native-swiper';

import MyTeamMembers from '_components/myteam-members';
import ProgressBar from '_components/progressbar';
import ScoreTable from '_components/ScoreTable';

import styles from './styles';

// NO Logic here!
export default ({ teamName, toiletpaperScore, disinfectantScore }) => (
  <SafeAreaView style={styles.container}>
    <ImageBackground
      source={require('_assets/img/toiletpaper.jpg')}
      style={styles.imageBackground}
    >
      <View style={styles.upperMenu}>
        <Text style={styles.menuText}>{teamName}</Text>
        <Text style={styles.menuText}>Score</Text>
      </View>
      <Swiper style={styles.wrapper} loop={false} showsPagination={false}>
        <View style={styles.slide1}>
          <MyTeamMembers />
          <View style={styles.ressourcesContainer}>
            <View style={styles.ressource}>
              <Image
                style={styles.ressourceImage}
                source={require('_assets/icons/ToiletPaper.png')}
              />
              <Text style={styles.ressourceCount}>{toiletpaperScore}</Text>
            </View>
            <View style={styles.ressource}>
              <Image
                style={styles.ressourceImage}
                source={require('_assets/icons/Desinfection.png')}
              />
              <Text style={styles.ressourceCount}>{disinfectantScore}</Text>
            </View>
          </View>
          <View style={styles.progressContainer}>
            <ProgressBar row progress={0.8} duration={500} height={20} borderRadius={50} />
            <Image
              style={styles.progressbarIcon}
              source={require('_assets/icons/Desinfection.png')}
            />
          </View>
        </View>
        <View style={styles.slide2}>
          <ScoreTable />
        </View>
      </Swiper>
    </ImageBackground>
  </SafeAreaView>
);
