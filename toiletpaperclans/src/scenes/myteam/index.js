import React from 'react';
import { BLACK } from '_styles';
import { View, Text, StyleSheet, SafeAreaView, Image, ImageBackground} from 'react-native';
import MyTeamMembers from '_components/myteam-members.js';

const MyTeamScreen = ({}) => (
    <SafeAreaView style={styles.container}>
        <ImageBackground source={require('../../assets/img/toiletpaper.jpg')} style={{width: '100%', height: '100%', alignItems: 'center'}}>
            <View style={styles.upperMenu}>
                <Text style={styles.menuText}>My Team</Text>
                <Text style={styles.menuText}>Score</Text>
            </View>
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
        </ImageBackground>
    </SafeAreaView>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
    },
    upperMenu: {
        marginTop: 30,
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    menuText: {
        fontWeight: 'bold',
        color: BLACK,
        fontSize: 20,
    },
    ressourcesContainer: {
        width: '90%',
        marginTop: 50,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    ressource: {
        marginLeft: 20,
        marginRight: 20,
        flexDirection: 'column',
    },
    ressourceImage: {
        height: 100,
        width: 100,
        resizeMode: 'contain',
    },
    ressourceCount: {
        fontSize: 40,
        position: 'relative',
        top: -40,
        left: 30,
    }
});

export default MyTeamScreen;