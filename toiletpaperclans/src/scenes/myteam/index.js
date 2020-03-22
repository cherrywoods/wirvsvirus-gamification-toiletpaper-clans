import React from 'react';
import { BLACK } from '_styles';
import { View, Text, StyleSheet, SafeAreaView, Image, ImageBackground} from 'react-native';
import Swiper from 'react-native-swiper'
import FirebaseModel from '_utilities/FirebaseModel'

import MyTeamMembers from '_components/myteam-members.js';
import ProgressBar from '_components/progressbar.js';
import ScoreTable from '_ScoreTable/ScoreTable.js';

class MyTeamScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            "teamName": FirebaseModel.instance().teamName,
            "toiletpaperScore": FirebaseModel.instance().teamToiletpaper,
            "disinfectantScore": FirebaseModel.instance().teamDisinfectant,
        };
    }

    componentDidMount() {
        
        FirebaseModel.instance().on('teamName', (name) => this.setState({
            "teamName": name,
        }));
        FirebaseModel.instance().on('teamToiletpaper', (tp) => this.setState({
            "toiletpaperScore": tp,
        }));
        FirebaseModel.instance().on('teamDisinfectant', (dis) => this.setState({
            "disinfectantScore": dis,
        }));
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ImageBackground source={require('../../assets/img/toiletpaper.jpg')} style={{width: '100%', height: '100%', alignItems: 'center'}}>
                    <View style={styles.upperMenu}>
                        <Text style={styles.menuText}>{this.state.teamName}</Text>
                        <Text style={styles.menuText}>Score</Text>
                    </View>
                    <Swiper style={styles.wrapper} loop={false} showsPagination={false}>
                        <View style={styles.slide1}>
                            <MyTeamMembers></MyTeamMembers>
                            <View style={styles.ressourcesContainer}>
                                <View style={styles.ressource}>
                                    <Image style={styles.ressourceImage} source={require('../../assets/icons/ToiletPaper.png')}></Image>
                                    <Text style={styles.ressourceCount}>{this.state.toiletpaperScore}</Text>
                                </View>
                                <View style={styles.ressource}>
                                    <Image style={styles.ressourceImage} source={require('../../assets/icons/Desinfection.png')}></Image>
                                    <Text style={styles.ressourceCount}>{this.state.disinfectantScore}l</Text>
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
                            <ScoreTable></ScoreTable>
                        </View>
                    </Swiper>
                </ImageBackground>
            </SafeAreaView>
        );
    };
}

const styles = StyleSheet.create({
    wrapper: {},
    slide1: {
        flex: 1,
        alignItems: 'center',
    },
    slide2: {
        flex: 1,
        alignItems: 'center',
        width: '100%'
    },
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
    },
    progressContainer: {
        alignItems: "center", 
        flexDirection: "row",
        width: '90%',
    },
    progressbarIcon: {
        height: 70,
        width: 70,
        resizeMode: 'contain',
    }
});

export default MyTeamScreen;