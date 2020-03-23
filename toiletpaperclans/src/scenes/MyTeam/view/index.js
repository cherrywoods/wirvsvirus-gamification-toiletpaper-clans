import React, { useRef } from 'react';
import { View, Text, SafeAreaView, Image, ImageBackground, TouchableOpacity } from 'react-native';

import Swiper from 'react-native-swiper';

import TeamMembers from '_components/TeamMembers';
import ProgressBar from '_components/ProgressBar';
import ScoreTable from '_components/ScoreTable';
import ModalAddMember from '_components/ModalAddMember';
import ModalLootOther from '_components/Looting/ModalLootOther';
import ModalGotPaper from '_components/Looting/ModalGotPaper';
import ModalLostPaper from '_components/Looting/ModalLostPaper';

import styles from './styles';

// NO Logic here!
export default ({
  teamName, teamMembers, leaderboard,
  toiletpaperScore, disinfectantScore,
  toiletpaperProgress, disinfectantProgress, toiletpaperTime, disinfectantTime,
  currentSlide, isAddModalVisible, onToggleAddModal, onPressLogout, onSelectSlide, onChangeCurrentSlide,
}) => {
  const ref = useRef();
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('_assets/img/toiletpaper.jpg')}
        style={styles.imageBackground}
      >
        <View style={styles.upperMenu}>
          <TouchableOpacity onPress={() => onSelectSlide(0, ref)}>
            <Text style={[styles.menuText, currentSlide === 0 && styles.selectedMenuText]}>{teamName}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onSelectSlide(1, ref)}>
            <Text style={[styles.menuText, currentSlide === 1 && styles.selectedMenuText]}>Score</Text>
          </TouchableOpacity>
        </View>
        <ModalAddMember isVisibleState={isAddModalVisible} toggleModal={onToggleAddModal} />
        <ModalLostPaper value={3}/>
        <ModalGotPaper value={4}/>
        <ModalLootOther minutes={10}/>
        <Swiper ref={ref} style={styles.wrapper} loop={false} showsPagination={false} onIndexChanged={onChangeCurrentSlide}>
          <View style={styles.slide1}>
            <TeamMembers members={teamMembers} onPressAdd={onToggleAddModal}/>
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
                <ProgressBar row progress={toiletpaperProgress} duration={toiletpaperTime} height={25} borderRadius={50} />
                <Image
                  style={styles.progressPaperIcon}
                  source={require('_assets/icons/Paper.png')}
                />
              </View>
              <View style={styles.progressDesinfection}>
                <ProgressBar row progress={disinfectantProgress} duration={disinfectantTime} height={25} borderRadius={50} />
                <Image
                  style={styles.progressDesinfectionIcon}
                  source={require('_assets/icons/desinfection_one.png')}
                />
              </View>
            </View>
          </View>
          <View style={styles.slide2}>
            <ScoreTable ownTeamName={teamName} ownTeamScore={toiletpaperScore} leaderboard={leaderboard} />
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
};
