import React, { Component } from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export default class ModalAddMember extends Component {

    constructor(props){
        super(props);
        this.isVisibleState = this.props.isVisibleState;
    }

    state = {
        isModalVisible: false,
        inputValue: '',
    };

    toggleModal = () => {
        this.setState({isModalVisible: !this.state.isModalVisible});
    };

    onChangeText = (text) => {
        this.setState({inputValue: text});
    }

    render() {
        return (
            <Modal isVisible={this.state.isModalVisible} style={{ alignItems: 'center' }}>
                <View style={styles.container}>
                    <TouchableOpacity onPress={this.toggleModal} style={{ position: 'absolute', zIndex: 1, right: 10, top: 10 }}>
                        <Icon name="close" size={25} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.heading}>Who do you want to add?</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={text => this.onChangeText(text)}
                        value={this.state.inputValue}
                        placeholder={'Username'}
                    />
                    <TouchableOpacity style={styles.button} onPress={this.toggleModal}>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Add User</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        height: 300,
        width: '90%',
        borderRadius: 10,
    },
    heading: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 40,
    },
    textInput: {
        height: 40,
        width: '70%',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 40,
    },
    button: {
        borderRadius: 10,
        backgroundColor: '#aec8c3',
        paddingHorizontal: 40,
        paddingVertical: 10,
    },
});
