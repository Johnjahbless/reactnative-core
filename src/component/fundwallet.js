import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text,  View, TouchableOpacity } from "react-native";

const FundWallet = ({camvisible, setcamvisible, cancel}) => {

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

            <Text style={{color: 'rgb(143, 143, 143)', fontSize: 23, fontWeight: '500', marginBottom: 15}}>Insufficient funds</Text>
            <Text style={{color: 'white', fontSize: 17}}>Please fund your wallet to continue</Text>
            <TouchableOpacity onPress={cancel} style={{width: 100, height: 40, backgroundColor: 'gray', 
            borderRadius: 8, marginTop: 15, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: 'white', fontSize: 20, fontWeight: '600'}}>Close</Text>
            </TouchableOpacity>
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
    flexDirection: 'column',
    justifyContent: 'center',
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

export default FundWallet;