import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  Button,
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
        <Modal visible={Boolean(this.state.content == 3)}>
          <View style={styles.popup}>
            <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'white' }}>
            THINGS MISSED UP!
            </Text>
            <View>
              <Image
                style={{
                  width: 50,
                  height: 50,
                  resizeMode: 'contain',
                }}
                source={{
                  uri:
                  'https://media.discordapp.net/attachments/690844505821151263/690972885275115641/Paper.png',
                }}
              />
              <Text
                style={{
                  color: '#db9f44',
                  fontSize: 30,
                  fontWeight: 'bold',
                  marginTop: -33,
                  marginLeft: -17,
                  position: 'relative',
                }}>
              -{this.state.value}
              </Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={this.componentHide}>
              <Text style={{ fontWeight: 'bold', fontSize: 18 }}>OKAY</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Modal visible={Boolean(this.state.content == 2)}>
          <View style={styles.popup} >
            <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'white' }}>
            GRATULATION!
            </Text>
            <View>
              <Image
                style={{
                  width: 50,
                  height: 50,
                  resizeMode: 'contain',
                }}
                source={{
                  uri:
                  'https://media.discordapp.net/attachments/690844505821151263/690972885275115641/Paper.png',
                }}
              />
              <Text
                style={{
                  color: '#db9f44',
                  fontSize: 30,
                  fontWeight: 'bold',
                  marginTop: -33,
                  marginLeft: -17,
                  position: 'relative',
                }}>
              +{this.state.value}
              </Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={this.componentHide}>
              <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
              COLLECT IT!
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Modal  visible={Boolean(this.state.content == 1)}>
          <View style={styles.popup}>
            <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'white' }}>
            ATTACK A TEAM!
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Image
                style={{
                  width: 35,
                  height: 35,
                  resizeMode: 'contain',
                }}
                source={{
                  uri:
                  'https://media.discordapp.net/attachments/690844505821151263/691015836021948434/sanduhr.png',
                }}
              />
              <Text style={{ color: 'white', fontSize: 18, marginTop: 4 }}>
              300 Minutes
              </Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={this.componentHide}>
              <Text style={{ fontWeight: 'bold', fontSize: 18 }}>LOOT THEM!</Text>
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    marginLeft: '5%',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 10,
  },
});

