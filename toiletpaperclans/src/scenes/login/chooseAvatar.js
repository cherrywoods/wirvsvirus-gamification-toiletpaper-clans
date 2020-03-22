import React from 'react';
import { BLACK, RED, BABYBlUE } from '_styles';
import {SafeAreaView, Text, TouchableHighlight, View, StyleSheet, Image} from 'react-native';

const ChooseAvatarScreen = ({navigation}) => (
  <SafeAreaView style={{ width: '100%', height: '100%'}}>
<ImageBackground source={require('../../assets/img/toiletpaper.jpg')} style={{width: '100%', height: '100%'}}> 
    <View style={styles.header} >
      <TouchableHighlight onPress={() => navigation.navigate('Home')}>
        <Text style={styles.headerIconLeft} >Home</Text>
      </TouchableHighlight>
      <Text style={styles.headerText}>Sign Up</Text>
      <Text style={styles.headerIconRight}>Icon</Text>
    </View>

  <View style={styles.textFieldWrapper}>
    <Text style={styles.headerText} >Create An Account</Text>
    <Image style={{width: '50%', aspectRatio:1, resizeMode: 'contain'}} source={require('../../assets/icons/Profile.png')} ></Image> 
    <TouchableHighlight style={styles.createAvatarButton} >
      <Text style={styles.createAvatarText} >+</Text>
    </TouchableHighlight>
  </View>

  <View style={styles.footer}>
  <Text style={styles.smallText}>
        By creating an account you agree to our 
        Terms of Service and Privacy Policy
        </Text>
    <TouchableHighlight style={styles.button}>
      <Text style={styles.buttonText}>Continue</Text>
    </TouchableHighlight>
      <TouchableHighlight>
        <Text style={styles.smallText}>Dont have an Account? Sign Up!</Text>
      </TouchableHighlight>
  </View>
  </ImageBackground>
</SafeAreaView>
);

const styles = StyleSheet.create({
  header: {
      marginTop: 30,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      marginBottom: 100,
  },
  headerText: {
      color: '#B40E22',
      fontSize: 28,
      fontWeight: "500",
      textAlign: 'center',
      marginBottom: 30,
  },
  headerIconLeft: {
      marginLeft: 30,
      color: '#B40E22',
      fontSize: 24,
      width: 90,
      marginBottom: 30,
  },
  headerIconRight: {
      marginRight: 30,
      opacity: 0,
      width: 90,
      marginBottom: 30,
  },
  textFieldWrapper: {
    alignItems: 'center',
},
  footer: {
    width: '100%',
    //marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallText: {
    color: '#B40E22',
    fontSize: 16,
    textAlign: 'center',
    margin: 20,
    padding: 10,
  },
  button: {
    backgroundColor: '#B40E22',
    width: '80%', 
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 28,
    fontWeight: '500',
  },
  createAvatarImg: {
      resizeMode: 'contain',
      width: '50%',
      aspectRatio: 1,
  },
  createAvatarButton: {
      width: '80%',
      paddingLeft: 40,
      height: 80,
      marginTop: -80,

  },
  createAvatarText: {
    textAlign: 'right',
    paddingRight: 50,
    paddingBottom: 50,
    fontSize: 70,
    fontWeight: '700',
    color: '#B40E22',
  }
});
export default ChooseAvatarScreen;
