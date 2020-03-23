import React from 'react';
import { View, Text, SafeAreaView, KeyboardAvoidingView, ImageBackground, TextInput, TouchableHighlight } from 'react-native';

import styles from './styles';

export default ({ name, isLoading, isUsernameValid, onChangeName, onPressContinue }) => (
  <SafeAreaView style={styles.container}>
    <ImageBackground source={require('_assets/img/toiletpaper.jpg')} style={styles.imageBackground}>
      <KeyboardAvoidingView enabled behavior="padding" style={styles.content}>
        <View>
          <Text style={styles.title}>Name your team!</Text>
        </View>
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
