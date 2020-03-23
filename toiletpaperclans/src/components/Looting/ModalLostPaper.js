import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Modal from 'react-native-modal';
import styles from '_components/Looting/styles';

const ModalLostPaper = ({ isVisibleState, value }) => {

  const [isModalVisible, toggleModal] = useState(true);

  return (
    <Modal animationIn={'zoomIn'} animationOut={'zoomOut'} visible={isModalVisible} style={styles.modal}>
      <View style={styles.popup}>
        <Text style={styles.heading}>
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
            - {value}
          </Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => toggleModal(!isModalVisible)}>
          <Text style={styles.buttonText}>OKAY</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ModalLostPaper;
