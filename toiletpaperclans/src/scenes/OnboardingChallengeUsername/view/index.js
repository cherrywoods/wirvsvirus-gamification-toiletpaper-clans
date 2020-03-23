import React from 'react';
import { View, Text, SafeAreaView, KeyboardAvoidingView, Image, ImageBackground, TextInput, ActivityIndicator, TouchableHighlight } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';

export default ({ username, isLoadingValidation, isUsernameValid, onChangeUsername, onPressContinue }) => (
  <SafeAreaView style={styles.container}>
    <ImageBackground source={require('_assets/img/toiletpaper.jpg')} style={styles.imageBackground}>
      <KeyboardAvoidingView enabled behavior="padding" style={styles.content}>
        <View>
          <Text style={styles.title}>Enter your battlename!</Text>
        </View>
        {/* <Image source={require('_assets/icons/Pokal.png')} style={{width: 300, height: 300, resizeMode: 'contain', marginBottom: 70}} /> */}
        {/* <Text style={styles.info}>...to enter the Challenge</Text> */}
        <View style={styles.textFieldContainer}>
          <TextInput
            style={styles.textField}
            placeholder="Bremsspur69"
            autoCompleteType="off"
            autoCorrect={false}
            value={username}
            onChangeText={onChangeUsername}
          />
          <View style={styles.textFieldOverlay}>
            {!isLoadingValidation && !isUsernameValid && (
              <Icon name="error" size={40} color="red" />
            )}
            {!isLoadingValidation && isUsernameValid && (
              <Icon name="check-circle" size={40} color="green" />
            )}
            {username.length > 2 && isLoadingValidation && (
              <ActivityIndicator color="red" size="large" />
            )}
          </View>
        </View>
        <TouchableHighlight style={styles.button} disabled={isLoadingValidation || !isUsernameValid} onPress={onPressContinue}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableHighlight>
      </KeyboardAvoidingView>
    </ImageBackground>
  </SafeAreaView>
);
