import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";

const ModallD = ({camvisible, setcamvisible,trash, cancel}) => {

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={camvisible}
        onRequestClose={setcamvisible}
      >
        <View style={styles.centeredView}>
            <Text style={{color: 'white', fontSize: 19, textAlign: 'center', marginBottom: 30}}>Are you sure ?</Text>
          <View style={styles.modalView}>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={cancel}
            >
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>

            <Pressable
              style={[styles.button, styles.buttonOpen]}
              onPress={trash}
            >
              <Text style={styles.textStyle}>Okay</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    width: '100%'
  },
  modalView: {
    margin: 0,
    backgroundColor: "rgb(33, 33, 33)",
    borderRadius: 20,
    width: '90%',
    height: 150,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    opacity: 0.8,
    // padding: 80,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 10,
    padding: 0,
    elevation: 2,
    width: '30%',
    height: 40
  },
  buttonOpen: {
    backgroundColor: "green",
  },
  buttonClose: {
    backgroundColor: "red",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
    marginTop: 7
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default ModallD;