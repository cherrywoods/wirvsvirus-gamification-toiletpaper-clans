import { StyleSheet } from 'react-native';
export default StyleSheet.create({
  imageBackground: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  highlight: {
    height: '100%',
    width: '100%',
  },
  container: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 250,
    width: 250,
    resizeMode: 'contain',
  },
  logoWord: {
    width: 250,
    resizeMode: 'contain',
    position: 'relative',
    top: -70,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
