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

export default class GeneralModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      header: props.header,
      description: props.description,
      buttontext: props.buttontext,
    };
  }

  componentHide = () => {
    this.setState({ header: '' });
  };

  render() {
    return (
      <View style={styles.container}>
        <Modal visible={Boolean(this.state.header != '')}>
          <View style={styles.popup}>
            <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'white' }}>
              {this.state.header}
            </Text>
            <Text
              style={{
                color: '#db9f44',
                fontSize: 30,
                fontWeight: 'bold',
              }}>
              -{this.state.description}
            </Text>

            <TouchableOpacity
              style={styles.button}
              onPress={this.componentHide}>
              <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
                {this.state.buttontext}
              </Text>
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
    height: '100%',
    width: '100%',
    alignItems: 'center',
    opacity: 0.7,
    flex: 1,
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