import React, { useEffect, useState } from "react";
import { StyleSheet, Text, Pressable, View , TextInput, TouchableOpacity,
   ScrollView, Image, KeyboardAvoidingView, Platform} from "react-native";
import {AntDesign,FontAwesome } from '@expo/vector-icons'; 
import axios from 'axios'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions';
import Modal from '../component/modal';
import ModallD from '../component/sellReference';
import { baseUrl } from "../component/konst";
import Spinner from 'react-native-loading-spinner-overlay';


const Sell = ({navigation}) => {

  const [media, setMedia] = useState('')
  const [show, setShow] = useState(false)
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [amount, setAmount] = useState(0)
  const [location, setLocation] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [alert, setAlert] = useState(false)
  const [tprice, setTprice] = useState(0)
  const [loading, setLoading] = useState(false)
  const [id, setId ] = useState('')
  const [err, setErr] = useState('')

  const selectPicture = async ()=>{
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const {cancelled, uri} = await ImagePicker.launchImageLibraryAsync({
        aspect: 1,
        allowsEditing: true
    })
    if(!cancelled){
       // console.log(uri)
        setMedia(uri)
        setShow(!show)
    }
    setShow(!show)
    
}

const onSubmit = ()=>{

  setLoading(true)
 const fdata = new FormData()
 fdata.append('amount', tprice)
 fdata.append('img', media )
 fdata.append('location', location)
 fdata.append('description', desc)
 fdata.append('quantity', quantity)
 fdata.append('name', name)

  axios.post(`${baseUrl}`, fdata)
  .then(res =>{
    setLoading(false)
    if(res.status === 200){
      setId(res.data.id)
      setAlert(true)
      setQuantity('')
      setName('')
      setAmount('')
      setTprice(0)
    }
    else{
      setErr('Failed, please try again')
    }
  })
  .catch(err => {
    setLoading(false)
    setErr('Failed, please try again')
  })
}

const takePicture = async ()=>{
    await Permissions.askAsync(Permissions.CAMERA);
    const {cancelled, uri} = await ImagePicker.launchCameraAsync({
        allowsEditing: true
    })
    if(!cancelled){
      setMedia(uri)
      setShow(!show)
    }
    setShow(!show)
    
}

const cancel = ()=>{
  setAlert(!alert)
}

const onCancel = ()=>{
  setShow(!show)
}

let newShow = name === '' || !quantity || !amount || desc === '' || !media ? 'none' : 'flex'

  return (
    <KeyboardAvoidingView
    style={styles.centeredView}
    behavior="padding"
  >
    <ScrollView style={styles.centeredView}> 
         <View style={{display: 'flex', flexDirection: 'row', marginTop: 15}}>
           <TouchableOpacity style={{marginLeft: 15}} onPress={()=>navigation.goBack()}>
           <AntDesign name="leftcircle" size={28} color="rgb(21, 21, 49)" />
           </TouchableOpacity>
           <Text style={{color: 'rgb(21, 21, 49)', fontWeight: '600', 
           fontSize: 20, marginLeft: 'auto', marginRight: 'auto'}}>Enter Transaction</Text>
         </View> 

          <Text style={{fontWeight: '700', fontSize: 23, marginLeft: 15, marginTop: 15}}>Sub Total: 
          <Text style={{fontSize: 20, fontWeight: '400'}}> {tprice} </Text>
          </Text>   
          <View>
           <TextInput style={styles.input} multiline={true} numberOfLines={2} 
           placeholder='Product name'
            placeholderTextColor="rgb(21, 21, 49)"
            value={name}
            onChangeText={text => setName(text)}
             />

            <TextInput style={styles.input} multiline={true} numberOfLines={2} 
             placeholder='Quantity'
             keyboardType='number-pad'
            placeholderTextColor="rgb(21, 21, 49)"
            value={quantity}
            onChangeText={text => setQuantity(text)}
             />

           <TextInput style={styles.input} multiline={true}  
           placeholder='Price per 1'
           keyboardType='number-pad'
            placeholderTextColor="rgb(21, 21, 49)"
            value={amount}
            onChangeText={text => {
              setAmount(text)
              setTprice(text * quantity)
            }}
             />

           <TextInput style={styles.input} multiline={true} numberOfLines={2} 
           placeholder='Description'
            placeholderTextColor="rgb(21, 21, 49)"
            value={desc}
            onChangeText={text => setDesc(text)}
             />

            <TextInput style={styles.input} multiline={true} numberOfLines={2} 
             placeholder='Product location'
            placeholderTextColor="rgb(21, 21, 49)"
            value={location}
            onChangeText={text => setLocation(text)}
             />

           <View style={{width: '92%', height: 70, display: 'flex', flexDirection: 'row', 
           justifyContent: 'space-between', alignItems: 'center', marginLeft: 15, marginRight: 15}}>
           <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={()=>{setShow(!show)}}
            >
              <AntDesign name="camera" size={30} color="rgb(3, 3, 68)" />
            </Pressable>

            <Pressable style={{display: newShow}}
              // style={[styles.button, styles.buttonOpen]}
              onPress={onSubmit}
            >
              <Text style={styles.textStyle} >Send</Text>
            </Pressable>
           </View>

           <View style={{marginTop: 20, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              {media ? 
              <Image style={{width: '85%', height: 270}} source={{uri: media}} /> : null}
           </View>
           <Text style={{color: 'red', textAlign: 'center', fontSize: 18, marginTop: 15}}>{err}</Text>
          </View>
          <ModallD camvisible={alert} setcamvisible={alert} cancel={cancel} id={id} />
          <Modal camvisible={show} cancel={onCancel} takepicture={takePicture} selectpicture={selectPicture} />
          <Spinner
          visible={loading}
          textContent={'Submitting...'}
          animation={'fade'}
          cancelable={true}
        />
    </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    marginTop: 10,
    width: '100%',
    backgroundColor: 'white'
  },
  modalView: {
    margin: 0,
    backgroundColor: "white",
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
    color: "rgb(3, 3, 68)",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
    marginTop: 7
  },
  input:{
      borderBottomWidth: 1,
      borderBottomColor: 'rgb(21, 21, 49)',
      width: '90%',
      marginLeft: 15,
      marginTop: 30,
      padding: 6,
      color: 'rgb(21, 21, 49)',
      fontSize: 14
  },
  button: {
    borderRadius: 7,
    padding: 0,
    elevation: 2,
    width: '23%',
    height: 35
  },
  buttonOpen: {
    borderWidth: 1,
    borderColor: 'white'

  },
  buttonClose: {

  }
});

export default Sell;