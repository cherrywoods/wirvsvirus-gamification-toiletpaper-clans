import React from 'react';
import {SafeAreaView, Text, TouchableHighlight} from 'react-native';

const LoginScreen = ({navigation}) => (
  <SafeAreaView>
    <Text>Screen: Login</Text>

    <TouchableHighlight onPress={() => navigation.navigate('MyTeam')}>
      <Text>Go to home</Text>
    </TouchableHighlight>
  </SafeAreaView>
);

export default LoginScreen;