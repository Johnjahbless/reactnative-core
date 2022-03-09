import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View , TextInput} from "react-native";

const ModallD = ({camvisible, setcamvisible,send, cancel}) => {

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
          <Text style={{color: 'white', fontSize: 19, textAlign: 'center', marginBottom: 30, marginTop: 20}}>Add a comment</Text>
           <TextInput style={styles.input} multiline={true} numberOfLines={10} placeholder='Add a comment' />

           <View style={{width: '100%', height: 70, display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
           <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={cancel}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>

            <Pressable
              style={[styles.button, styles.buttonOpen]}
              onPress={send}
            >
              <Text style={styles.textStyle} >Send</Text>
            </Pressable>
           </View>
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
    width: '100%',
    marginBottom: 10
  },
  modalView: {
    margin: 0,
    backgroundColor: "rgb(33, 33, 33)",
    borderRadius: 20,
    width: '90%',
    height: '90%',
    display: 'flex',
    flexDirection: 'column',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
    marginTop: 7
  },
  input:{
      borderBottomWidth: 1,
      borderBottomColor: 'white',
      width: '95%',
      marginLeft: 5,
      marginTop: 30,
      padding: 10,
      color: 'white',
      fontSize: 14
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
  }
});

export default ModallD;