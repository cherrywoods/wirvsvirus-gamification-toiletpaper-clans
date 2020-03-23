import React, { useRef } from 'react';
import { View, Text, SafeAreaView, Image, ImageBackground, TouchableOpacity } from 'react-native';

import Swiper from 'react-native-swiper';

import MyTeamMembers from '_components/myteam-members';
import ProgressBar from '_components/progressbar';
import ScoreTable from '_components/ScoreTable';
import ModalAddMember from '_components/ModalAddMember';
import LootingPopup from '_components/LootingPopup';


import styles from './styles';

// NO Logic here!
export default ({ teamName, toiletpaperScore, disinfectantScore, toiletpaperProgress, disinfectantProgress, teamMembers, leaderboard, onPressLogout, slide1, slide2, slideHasChanged, clickSliderButton, isAddModalVisible, toggleAddModal }) => {

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
      <ModalAddMember isVisibleState={isAddModalVisible} toggleModal={toggleAddModal} />
      <Swiper ref={ref} style={styles.wrapper} loop={false} showsPagination={false} onIndexChanged={(index)=>slideHasChanged(index)}>
        <View style={styles.slide1}>
          <MyTeamMembers members={teamMembers} onPressAdd={toggleAddModal}/>
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
            <View style={styles.progressPaper}>
              <ProgressBar row progress={toiletpaperProgress} duration={'4:49'} height={25} borderRadius={50} />
              <Image
                style={styles.progressPaperIcon}
                source={require('_assets/icons/Paper.png')}
              />
            </View>
            <View style={styles.progressDesinfection}>
              <ProgressBar row progress={disinfectantProgress} duration={'3:20'} height={25} borderRadius={50} />
              <Image
                style={styles.progressDesinfectionIcon}
                source={require('_assets/icons/desinfection_one.png')}
              />
            </View>
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
