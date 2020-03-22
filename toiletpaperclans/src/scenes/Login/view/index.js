import React from 'react';
import { SafeAreaView, Text, TouchableHighlight, View, TextInput, ImageBackground } from 'react-native';

import styles from './styles';

// NO Logic here!
export default ({ onChangeEmail, onChangePassword, onPressHome, onPressLogin, onPressSignUp }) => (
  <SafeAreaView style={styles.view}>
    <ImageBackground source={require('_assets/img/toiletpaper.jpg')} style={styles.imageBackground}>
      <View style={styles.header} >
        {/* <TouchableHighlight onPress={onPressHome}>
          <Text style={styles.headerIconLeft} >Home</Text>
        </TouchableHighlight> */}
        <Text style={styles.headerText}>Sign In</Text>
        {/* <Text style={styles.headerIconRight}>Icon</Text> */}
      </View>

      <View style={styles.textFieldWrapper}>
        <Text style={styles.headerText}>Sign in with your</Text>
        <TextInput
          style={styles.textField}
          placeholder="E-mail"
          onChangeText={onChangeEmail}
        />
        <TextInput
          style={styles.textField}
          placeholder="Password"
          secureTextEntry
          onChangeText={onChangePassword}
        />
      </View>

      <View style={styles.footer}>
        <TouchableHighlight style={styles.button} onPress={onPressLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableHighlight>
          <TouchableHighlight onPress={onPressSignUp}>
            <Text style={styles.smallText}>Don't have an Account? Sign Up!</Text>
          </TouchableHighlight>
      </View>
    </ImageBackground>
  </SafeAreaView>
);

