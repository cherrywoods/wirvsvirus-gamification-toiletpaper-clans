import { StyleSheet } from 'react-native';
export default StyleSheet.create({
  imageBackground: {
    width: '100%',
    height: '100%',
  },
  content: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    margin: 70,
    textAlign: 'center',
  },
  info: {
    fontSize: 26,
    fontWeight: '600',
    marginLeft: 50,
    marginRight: 50,
    textAlign: 'center',
  },
  textFieldContainer: {
    width: '100%',
    alignItems: 'center',
  },
  textField: {
    backgroundColor: '#CCCCCC',
    margin: 10,
    height: 50,
    width: '80%',
    borderRadius: 10,
    padding: 10,
    paddingRight: 45,
    color: '#B40E22',
    fontSize: 18,
  },
  textFieldOverlay: {
    position: 'absolute',
    top: 1,
    bottom: 0,
    right: 50,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#B40E22',
    width: 300,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    margin: 30,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 28,
    fontWeight: '500',
  },
});
