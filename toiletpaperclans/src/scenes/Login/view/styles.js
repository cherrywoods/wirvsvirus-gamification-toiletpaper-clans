import { StyleSheet } from 'react-native';
export default StyleSheet.create({
  view: {
    width: '100%',
    height: '100%',
  },
  imageBackground: {
    width: '100%',
    height: '100%',
  },
  header: {
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 100,
  },
  headerText: {
    color: '#B40E22',
    fontSize: 28,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 30,
  },
  headerIconLeft: {
    marginLeft: 30,
    color: '#B40E22',
    fontSize: 24,
    width: 90,
    marginBottom: 30,
  },
  headerIconRight: {
    marginRight: 30,
    opacity: 0,
    width: 90,
    marginBottom: 30,
  },
  textFieldWrapper: {
    alignItems: 'center',
  },
  textField: {
    backgroundColor: '#CCCCCC',
    margin: 10,
    height: 50,
    width: '80%',
    borderRadius: 10,
    padding: 10,
    color: '#B40E22',
    fontSize: 18,
  },
  footer: {
    width: '100%',
    marginTop: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallText: {
    color: '#B40E22',
    fontSize: 16,
    textAlign: 'center',
    margin: 20,
    padding: 10,
  },
  button: {
    backgroundColor: '#B40E22',
    width: '80%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 28,
    fontWeight: '500',
  },
});
