import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';

export default class LootingPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: props.content,
      value: props.value,
    };
  }

  componentHide = () => {
    this.setState({ content: 0 });
  };

  render() {
    return (
      <View style={styles.container}>
        <Modal visible={this.state.content === 3}>
          <View style={styles.popup}>
            <Text style={styles.header}>
            THINGS MISSED UP!
            </Text>
            <View>
              <Image
                style={styles.imagePaper}
                source={{
                  uri:
                  'https://media.discordapp.net/attachments/690844505821151263/690972885275115641/Paper.png',
                }}
              />
              <Text style={styles.value}>
                -{this.state.value}
              </Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={this.componentHide}>
              <Text style={styles.buttonText}>OKAY</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Modal visible={this.state.content === 2}>
          <View style={styles.popup} >
            <Text style={styles.heading}>
            GRATULATION!
            </Text>
            <View>
              <Image
                style={styles.imagePaper}
                source={{
                  uri: 'https://media.discordapp.net/attachments/690844505821151263/690972885275115641/Paper.png',
                }}
              />
              <Text
                style={styles.value}>
              +{this.state.value}
              </Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={this.componentHide}>
              <Text style={styles.heading}>
              COLLECT IT!
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Modal visible={this.state.content === 1}>
          <View style={styles.popup}>
            <Text style={styles.heading}>
            ATTACK A TEAM!
            </Text>
            <View style={styles.modalContainer}>
              <Image
                style={styles.imageWatch}
                source={{
                  uri:
                  'https://media.discordapp.net/attachments/690844505821151263/691015836021948434/sanduhr.png',
                }}
              />
              <Text style={styles.timeText}>
              300 Minutes
              </Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={this.componentHide}>
              <Text style={styles.buttonText}>LOOT THEM!</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  popup: {
    backgroundColor: 'red',
    height: '40%',
    width: '90%',
    alignItems: 'center',
    opacity: 0.7,
    justifyContent: 'space-around',
    flexDirection: 'column',
  },
  header: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    marginLeft: '5%',
  },
  modalContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  imagePaper: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  imageWatch: {
    width: 35,
    height: 35,
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
});
