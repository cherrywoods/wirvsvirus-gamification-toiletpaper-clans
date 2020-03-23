import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {StyleSheet, View} from 'react-native';



const IsRunningOverlay = ({isRunning}) => {
  if (!isRunning){
    return null;
  }
  return (
    <View style={styles.overlay}>
      <Icon name="run" size={40} color="#aec8c3" />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    margin: 5,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: 90,
    height: 90,
    borderRadius: 50,
    backgroundColor: 'rgba(255,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default IsRunningOverlay;
