import { StyleSheet } from 'react-native';
import { BLACK } from '_styles';
export default StyleSheet.create({
  imageBackground: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  slide1: {
    flex: 1,
    alignItems: 'center',
  },
  slide2: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  container: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  upperMenu: {
    marginTop: 30,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  menuText: {
    fontFamily: 'Carista',
    color: BLACK,
    fontSize: 50,
  },
  ressourcesContainer: {
    width: '90%',
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  ressource: {
    marginLeft: 20,
    marginRight: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  ressourceImage: {
    height: 100,
    width: 100,
    resizeMode: 'contain',
  },
  ressourceCount: {
    fontSize: 60,
    fontFamily: 'Carista',
    position: 'relative',
    top: -40,
  },
  progressContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '90%',
  },
  progressbarIcon: {
    height: 70,
    width: 70,
    resizeMode: 'contain',
  },
  popup: {
    width: '100%',
    height: 250,
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
  },
  footer: {
    width: '100%',
    alignItems: 'flex-end'
  },
  smallText: {
    color: '#B40E22',
    fontSize: 16,
    margin: 20,
    padding: 10,
  },
});
