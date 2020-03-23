import React from 'react';
import { View, Text, SafeAreaView, KeyboardAvoidingView, Image, ImageBackground, TextInput, ActivityIndicator, TouchableHighlight } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';

export default ({ name, isLoading, isUsernameValid, onChangeName, onPressContinue }) => (
  <SafeAreaView style={styles.container}>
    <ImageBackground source={require('_assets/img/toiletpaper.jpg')} style={styles.imageBackground}>
      <KeyboardAvoidingView enabled behavior="padding" style={styles.content}>
        <View>
          <Text style={styles.title}>Name your team!</Text>
        </View>
        {/* <Image source={require('_assets/icons/Pokal.png')} style={{width: 300, height: 300, resizeMode: 'contain', marginBottom: 70}} /> */}
        {/* <Text style={styles.info}>...to enter the Challenge</Text> */}
        <TextInput
          style={styles.textField}
          editable={!isLoading}
          placeholder="4lagig super flauschig"
          autoCompleteType="off"
          autoCorrect={false}
          value={name}
          onChangeText={onChangeName}
        />
        <TouchableHighlight style={styles.button} disabled={isLoading} onPress={onPressContinue}>
          <Text style={styles.buttonText}>Let's hunt!</Text>
        </TouchableHighlight>
      </KeyboardAvoidingView>
    </ImageBackground>
  </SafeAreaView>
);
