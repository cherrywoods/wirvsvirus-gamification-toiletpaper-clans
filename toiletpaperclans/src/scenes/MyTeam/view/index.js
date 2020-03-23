import React, { useRef } from 'react';
import { View, Text, SafeAreaView, Image, ImageBackground, TouchableOpacity } from 'react-native';

import Swiper from 'react-native-swiper';

import MyTeamMembers from '_components/myteam-members';
import ProgressBar from '_components/progressbar';
import ScoreTable from '_components/ScoreTable';
import LootingPopup from '_components/LootingPopup';

import styles from './styles';

// NO Logic here!
export default ({ teamName, toiletpaperScore, disinfectantScore, teamMembers, leaderboard, onPressLogout, slide1, slide2, slideHasChanged, clickSliderButton }) => {

  const ref = useRef();

  return (
  <SafeAreaView style={styles.container}>
    <ImageBackground
      source={require('_assets/img/toiletpaper.jpg')}
      style={styles.imageBackground}
    >
      <View style={styles.upperMenu}>
        <TouchableOpacity onPress={() => clickSliderButton(ref)}>
          <Text style={[styles.menuText, { color: slide1 }]}>{teamName}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => clickSliderButton(ref)}>
          <Text style={[styles.menuText, { color: slide2 }]}>Score</Text>
        </TouchableOpacity>
      </View>
      <Swiper ref={ref} style={styles.wrapper} loop={false} showsPagination={false} onIndexChanged={(index)=>slideHasChanged(index)}>
        <View style={styles.slide1}>
          <MyTeamMembers members={teamMembers}/>
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
          </View>
        </View>
        <View style={styles.slide2}>
          <ScoreTable teamName={teamName} toiletpaperScore={toiletpaperScore} leaderboard={leaderboard}/>
        </View>
      </Swiper>
      <View style={styles.footer}>
        <TouchableOpacity onPress={onPressLogout}>
          <Text style={styles.smallText}>Log out</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  </SafeAreaView>
  );
}
