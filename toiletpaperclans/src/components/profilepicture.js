import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import IsRunningOverlay from '_components/isRunningOverlay.js';

const ProfilePicture = ({isRunning}) => (
    <View>
        <Image
            style={styles.pictureStyle}
            source={{uri: 'https://bilder.bild.de/fotos-skaliert/atemschutzmasken-sind-vielerorts-ausverkauft-auch-bei-desinfektionsmitteln-gibt-es-engpaesse-201371552-69076812/6,w=1280,c=0.bild.jpg'}}
        />
        <IsRunningOverlay isRunning={isRunning} />
    </View>
);

const styles = StyleSheet.create({
    pictureStyle: {
        width: 90,
        height: 90,
        borderRadius: 50,
        margin: 5,
        resizeMode: 'cover',
    },
});

export default ProfilePicture;
