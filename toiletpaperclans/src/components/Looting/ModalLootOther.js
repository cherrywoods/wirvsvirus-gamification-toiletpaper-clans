import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Modal from 'react-native-modal';
import styles from '_components/Looting/styles';

const ModalLootOther = ({ isVisibleState, minutes }) => {

  const [isModalVisible, toggleModal] = useState(true);

  return (
    <Modal animationIn={'zoomIn'} animationOut={'zoomOut'} visible={isModalVisible} style={styles.modal}>
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
            { minutes } minutes
          </Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => toggleModal(!isModalVisible)}>
          <Text style={styles.buttonText}>LOOT THEM!</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

export default ModalLootOther;
