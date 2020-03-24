import React from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';
import IsRunningOverlay from '_components/IsRunningOverlay.js';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ProfilePicture = ({ isRunning, atHome }) => {
  const outsideOverlay = atHome ? null : (
    <View style={styles.outsideOverlay}>
      <Icon name="run" size={50} color="#F00" />
    </View>
  );
  return (
    <View>
      <Image
        style={styles.pictureStyle}
        source={{ uri: 'https://bilder.bild.de/fotos-skaliert/atemschutzmasken-sind-vielerorts-ausverkauft-auch-bei-desinfektionsmitteln-gibt-es-engpaesse-201371552-69076812/6,w=1280,c=0.bild.jpg' }}
      />
      {outsideOverlay}
      <IsRunningOverlay isRunning={isRunning} />
    </View>
  );
};

const styles = StyleSheet.create({
  pictureStyle: {
    width: 90,
    height: 90,
    borderRadius: 50,
    margin: 5,
    resizeMode: 'cover',
  },
  outsideOverlay: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: 90,
    height: 90,
    borderRadius: 50,
    margin: 5,
    backgroundColor: '#B40E2299',
  },
  homeOverlay: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: 90,
    height: 90,
    borderRadius: 50,
    margin: 5,
  },
});

export default ProfilePicture;
