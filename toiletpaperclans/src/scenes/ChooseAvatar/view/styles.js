import { StyleSheet } from 'react-native';
export default StyleSheet.create({
  view: {
    width: '100%',
    height: '100%'
  },
  imageBackground: {
    width: '100%',
    height: '100%'
  },
  header: {
    marginTop: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 100,
  },
  headerText: {
    color: '#B40E22',
    fontSize: 28,
    fontWeight: "500",
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
  footer: {
    width: '100%',
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
  createAvatarImg: {
    resizeMode: 'contain',
    width: '50%',
    aspectRatio: 1,
  },
  createAvatarButton: {
    width: '80%',
    paddingLeft: 40,
    height: 80,
    marginTop: -80
  },
  createAvatarText: {
    textAlign: 'right',
    paddingRight: 50,
    paddingBottom: 50,
    fontSize: 70,
    fontWeight: '700',
    color: '#B40E22',
  }
});