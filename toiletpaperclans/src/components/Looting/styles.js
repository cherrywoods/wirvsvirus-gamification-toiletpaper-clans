import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  popup: {
    backgroundColor: 'red',
    height: 250,
    width: '100%',
    alignItems: 'center',
    opacity: 0.9,
    justifyContent: 'space-around',
    flexDirection: 'column',
    borderRadius: 10,
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
  },
  modalContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  imageWatch: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
  timeText: {
    color: 'white',
    fontSize: 18,
    marginTop: 4,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  imagePaper: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  value: {
    color: '#db9f44',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: -33,
    marginLeft: -17,
    position: 'relative',
  },
});

export default styles;
