import React from 'react';
import { View, Text, SafeAreaView, Image, ImageBackground} from 'react-native';

import Swiper from 'react-native-swiper'

import MyTeamMembers from '_components/myteam-members';
import ProgressBar from '_components/progressbar';
import ScoreTable from '_components/ScoreTable';

// NO Logic here!
export default () => (
  <SafeAreaView style={styles.container}>
    <ImageBackground source={require('../../assets/img/toiletpaper.jpg')} style={styles.imageBackground}>
      <View style={styles.upperMenu}>
        <Text style={styles.menuText}>My Team</Text>
        <Text style={styles.menuText}>Score</Text>
      </View>
      <Swiper loop={false} showsPagination={false}>
        <View style={styles.slide1}>
          <MyTeamMembers></MyTeamMembers>
          <View style={styles.ressourcesContainer}>
            <View style={styles.ressource}>
              <Image style={styles.ressourceImage} source={require('../../assets/icons/ToiletPaper.png')}></Image>
              <Text style={styles.ressourceCount}>31</Text>
            </View>
            <View style={styles.ressource}>
              <Image style={styles.ressourceImage} source={require('../../assets/icons/Desinfection.png')}></Image>
              <Text style={styles.ressourceCount}>5l</Text>
            </View>
          </View>
          <View style={styles.progressContainer}>
            <ProgressBar
              row
              progress={0.8}
              duration={500}
              height={20}
              borderRadius={50}
            />
            <Image style={styles.progressbarIcon} source={require('../../assets/icons/Desinfection.png')}></Image>
          </View>
        </View>
        <View style={styles.slide2}>
          <ScoreTable />
        </View>
      </Swiper>
    </ImageBackground>
  </SafeAreaView>
);