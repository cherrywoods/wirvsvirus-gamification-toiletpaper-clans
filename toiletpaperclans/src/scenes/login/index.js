import React from 'react';
import {SafeAreaView, Text, TouchableHighlight} from 'react-native';
import * as ut from '_utilities/api.js';

const LoginScreen = ({navigation}) => (
  <SafeAreaView>
    <Text>Screen: Login</Text>

    <TouchableHighlight onPress={() => navigation.navigate('Home')}>
      <Text>Go to home</Text>
    </TouchableHighlight>
  </SafeAreaView>
);

export default LoginScreen;