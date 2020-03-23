import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ButtonAddMember = ({ onPress }) => (
  <TouchableOpacity style={styles.buttonStyle} onPress={onPress}>
    <Icon name="plus" size={50} color="#aec8c3" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  buttonStyle: {
    width: 90,
    height: 90,
    borderRadius: 50,
    margin: 5,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ButtonAddMember;
