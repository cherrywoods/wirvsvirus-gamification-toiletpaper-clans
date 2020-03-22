import React from 'react';
import { SafeAreaView, Text, TouchableHighlight, View, TextInput, ImageBackground } from 'react-native';

export default ({ onPressHome }) => (
  <SafeAreaView style={styles.view}>
    <ImageBackground source={require('_assets/img/toiletpaper.jpg')} style={styles.imageBackground}>
      <View style={styles.header}>
        <TouchableHighlight onPress={onPressHome}>
          <Text style={styles.headerIconLeft} >Home</Text>
        </TouchableHighlight>
        <Text style={styles.headerText}>Join a Team</Text>
        <Text style={styles.headerIconRight}>Icon</Text>
      </View>

      <View style={styles.textFieldWrapper}>
        <Text style={styles.headerText} >Search a Team to join</Text>
        <TextInput 
          style={styles.textField}
          placeholder="Cl4n%"
        />
      </View>

      <View style={styles.footer}>
        <TouchableHighlight style={styles.button}>
          <Text style={styles.buttonText}>Join</Text>
        </TouchableHighlight>
      </View>
    </ImageBackground>
  </SafeAreaView>
);
