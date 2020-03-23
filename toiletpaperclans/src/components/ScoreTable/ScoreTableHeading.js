import React from 'react';
import {View, StyleSheet, Image} from 'react-native';

const ScoreTableHeading = () => (
  <View style={styles.row}>
    <View style={[styles.column, styles.column1]}>
      <Image
        style={styles.icon}
        source={require('_assets/icons/Pokal.png')}
      />
    </View>
    <View style={[styles.column, styles.column2]}>
      <Image
        style={styles.icon}
        source={require('_assets/icons/Paper.png')}
      />
    </View>
    <View style={[styles.column, styles.column3]}>
      <Image
        style={styles.icon}
        source={require('_assets/icons/group.png')}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 7,
  },
  column: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'white',
  },
  column1: {
    flex: 1,
  },
  column2: {
    flex: 2,
  },
  column3: {
    flex: 3,
  },
  icon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
});

export default ScoreTableHeading;
