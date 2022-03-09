import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";

const Modall = ({camvisible, setcamvisible,takepicture, selectpicture, cancel}) => {

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={camvisible}
        onRequestClose={setcamvisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={selectpicture}
            >
              <Text style={styles.textStyle}>Select Picture</Text>
            </Pressable>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={takepicture}
            >
              <Text style={styles.textStyle}>Take Picture</Text>
            </Pressable>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={cancel}
            >
              <Text style={styles.textStyle}>Cancel</Text>
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
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 10,
    width: '100%'
  },
  modalView: {
    margin: 0,
    backgroundColor: "rgb(3, 3, 68)",
    borderRadius: 20,
    width: '90%',
    height: 170,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
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
    width: '90%',
    height: 40
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "white",
  },
  textStyle: {
    color: "rgb(3, 3, 68)",
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

export default Modall;