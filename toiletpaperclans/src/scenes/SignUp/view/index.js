import React from 'react';
import { SafeAreaView, Text, TouchableHighlight, View, TextInput, ImageBackground } from 'react-native';

import styles from './styles';

export default ({ isLoading, onChangeEmail, onChangePassword, onChangeConfirmPassword, onPressLogin, onPressSignUp }) => (
  <SafeAreaView style={styles.view}>
    <ImageBackground source={require('_assets/img/toiletpaper.jpg')} style={styles.imageBackground}>
      <View style={styles.header} >
        {/* <TouchableHighlight onPress={onPressHome}>
          <Text style={styles.headerIconLeft} >Home</Text>
        </TouchableHighlight> */}
        <Text style={styles.headerText}>Sign Up</Text>
        {/* <Text style={styles.headerIconRight}>Icon</Text> */}
      </View>

      <View style={styles.textFieldWrapper}>
        <Text style={styles.headerText} >Create An Account</Text>
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
        <TextInput
          style={styles.textField}
          editable={!isLoading}
          placeholder="Confirm Password"
          secureTextEntry
          onChangeText={onChangeConfirmPassword}
        />
      </View>
      <View style={styles.footer}>
        <Text style={styles.smallText}>
          By creating an account you agree to our
          Terms of Service and Privacy Policy
        </Text>
        <TouchableHighlight disabled={isLoading} style={styles.button} onPress={onPressSignUp}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableHighlight>
        <TouchableHighlight disabled={isLoading} onPress={onPressLogin}>
          <Text style={styles.smallText}>Dont have an Account? Sign Up!</Text>
        </TouchableHighlight>
      </View>
    </ImageBackground>
  </SafeAreaView>
);
