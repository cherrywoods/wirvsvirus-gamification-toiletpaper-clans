import React from 'react';
import { SafeAreaView, Text, TouchableHighlight, View, TextInput, ImageBackground } from 'react-native';

import styles from './styles';

// NO Logic here!
export default ({ isLoading, onChangeEmail, onChangePassword, onPressLogin, onPressSignUp }) => (
  <SafeAreaView style={styles.view}>
    <ImageBackground source={require('_assets/img/toiletpaper.jpg')} style={styles.imageBackground}>
      <View style={styles.header} >
        {/* <TouchableHighlight onPress={onPressHome}>
          <Text style={styles.headerIconLeft} >Home</Text>
        </TouchableHighlight> */}
        <Text style={styles.headerText}>Sign In</Text>
        {/* <Text style={styles.headerIconRight}>Icon</Text> */}
      </View>

      {/* TODO: Remove!!! */}
      {/* eslint-disable react-native/no-inline-styles */}
      <View>
        <Text style={{ color: 'green', fontSize: 30 }}>Dev credentials:</Text>
        <Text style={{ color: 'green', fontSize: 30 }}>Email: a@b.de</Text>
        <Text style={{ color: 'green', fontSize: 30 }}>Password: 123456789</Text>
      </View>
      {/* eslint-enable react-native/no-inline-styles */}
      {/* End remove */}

      <View style={styles.textFieldWrapper}>
        <Text style={styles.headerText}>Sign in with your</Text>
        <TextInput
          style={styles.textField}
          editable={!isLoading}
          placeholder="E-mail"
          autoCapitalize="none"
          autoCompleteType="email"
          keyboardType="email-address"
          onChangeText={onChangeEmail}
        />
        <TextInput
          style={styles.textField}
          editable={!isLoading}
          placeholder="Password"
          secureTextEntry
          onChangeText={onChangePassword}
        />
      </View>

      <View style={styles.footer}>
        <TouchableHighlight disabled={isLoading} style={styles.button} onPress={onPressLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableHighlight>
        <TouchableHighlight disabled={isLoading} onPress={onPressSignUp}>
          <Text style={styles.smallText}>Don't have an Account? Sign Up!</Text>
        </TouchableHighlight>
      </View>
    </ImageBackground>
  </SafeAreaView>
);

