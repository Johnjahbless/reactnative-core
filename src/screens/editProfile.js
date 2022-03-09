import React, {  useState,  useEffect } from 'react';
import { View, Text, StyleSheet,TouchableHighlight, ScrollView, TextInput, KeyboardAvoidingView} from 'react-native';
import Background from '../component/Background';
import AsyncStorage from '@react-native-community/async-storage'
import Header from '../component/Header';
import Button from '../component/Button';
import dayjs from 'dayjs';
import {AntDesign } from '@expo/vector-icons'; 
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios'
import { baseUrl, pcolor, scolor, mcolor } from '../component/konst';

const  items = [
  {
      label: 'Fun',
      value: 'fun',
  },
  {
      label: 'Flirt',
      value: 'flirt',
  },
  {
      label: 'Relationship',
      value: 'relationship',
  },
  {
    label: 'Marraige',
    value: 'marraige',
  },
  {
    label: 'Friendship',
    value: 'friendship',
  }
]

const gen = [
  {
    label: 'Male',
    value: 'male',
  },
  {
    label: 'Female',
    value: "female"
  }
]

const EditProfile = ({ navigation }) => {
  
  const [myname, setMyname] = useState('')
  const [err, setErr] = useState('')
  const [dob, setDob] = useState('')
  const [bio, setBio] = useState('')
  const [looking, setLooking] = useState('')
  const [gender, setGender] = useState('')
  const [state, setState] = useState('')
  const [loading, setLoading] = useState(false)
  const [load, setLoad] = useState(true)
  const [col, setCol] = useState('')

   useEffect(()=>{
      onUsername()
   },[])

   const onUsername = async()=>{

        try {
            let username = await AsyncStorage.getItem('username')
            let response = await fetch(`${baseUrl}user/user/${username}`, {method: 'get'})
            let result = await response.json()
            setMyname(username)
            setBio(result.bio)
            setLooking(result.lookingfor)
            setGender(result.gender)
            setState(result.state)
            setDob(dayjs(result.dob).format('YYYY/MM/DD'))
            setLoad(false)
           
        } catch (error) {
            
        }
   }


  const _onSignUpPressed = (e) => {

    e.preventDefault()

    if(dob.trim() === '') {
      setErr('dob cannot be empty')
      setCol('red')
      return 
    }

    if(!dayjs().isValid()){
      setErr('dob must be in yyyy/mm/dd')
      setCol('red')
      return 
    }

    if(state.trim() === '') {
      setErr('state cannot be empty')
      setCol('red')
      return  
    }

    if(looking.trim() === '') {
      setErr('looking cannot be empty')
      setCol('red')
      return
    }

    if(gender.trim() === ''){
      setErr('gender cannot be empty')
      setCol('red')
      return 
    }


    setLoading(true)

    let data = {dob, state, lookingfor: looking, gender, bio}
    
  axios.put(`${baseUrl}user/update/${myname}`, data)
  .then(res =>{
    if(res.status === 200){
      setErr('Updated')
      setCol('green')
     setTimeout(() => {
      setErr('')
      setCol('')
     }, 3000);
      console.log(res.status)
   //   console.log(res.data)
      setLoading(false) 
      AsyncStorage.setItem('username', username)
      //  AsyncStorage.setItem('picc', res.data.img)
    }
  })
  .catch(() => {
    setLoading(false)
  })
  };

  return (
    <KeyboardAvoidingView
    style={styles.container}
    behavior="padding"
  >
    <ScrollView style={{backgroundColor: 'rgb(31, 30, 30)'}} >
         <View style={{height: 30, width: '100%',flexDirection: 'row', marginTop: 30, marginBottom: 10}}>
                 <TouchableHighlight onPress={() => navigation.goBack()}>
                 <View style={{marginLeft: 20, marginTop: 0}}><AntDesign name="leftcircle" size={28} color={scolor} /></View>
                 </TouchableHighlight>
                 </View>
                 {load ? <Text style={{color: 'white', marginTop: 30, fontSize: 17, textAlign: 'center'}}>Loading...</Text>:
                   <Background>
                   <Header>Edit Profile</Header>
                  <View style={{marginTop: -20}}>
             
                  <View style={styles.box}>
                    <Text style={styles.label}>State: </Text>
                    <TextInput style={styles.input} value={state} onChange={(e)=>{
                      setState(e.target.value)
                    }} />
                  </View>
             
                  <View style={styles.box}>
                    <Text style={styles.label}>Gender: </Text>
                    <RNPickerSelect
                    items={gen}
                    onValueChange={(value) => {
                      setGender(value)
                    }}

                    style={{ ...pickerSelectStyles }}
                    value={gender}
                />
                  </View>
             
                  <View style={styles.box}>
                    <Text style={styles.label}>Looking For: </Text>

                       <RNPickerSelect
                    items={items}
                    onValueChange={(value) => {
                      setLooking(value)
                    }}

                    style={{ ...pickerSelectStyles }}
                    value={looking}
                />
                  </View>
                    
                  <View style={styles.box}>
                    <Text style={styles.label}>D.O.B: </Text>
                    <TextInput style={styles.input} value={dob} onChange={(e)=>{
                      setDob(e.target.value)
                    }} />
                  </View>

                  <View style={styles.box}>
                    <Text style={styles.label}>Bio: </Text>
                    <TextInput style={styles.input} value={bio} />
                  </View>
                  </View>
                   <Button mode="contained" onPress={_onSignUpPressed} style={styles.button}>
                     UPDATE
                   </Button>
                   {loading ? <Text style={{color: 'white'}}>Loading...</Text> : null}
                   <Text style={{color: col, fontSize: 17, textAlign: 'center'}}> {err}</Text>
                 </Background>
                 }
   
    </ScrollView>
    </KeyboardAvoidingView>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
      fontSize: 16,
      marginTop: 20,
      borderWidth: 1,
      borderRadius: 4,
      borderBottomColor: 'white',
      backgroundColor: 'rgb(31, 30, 30)',
      color: 'white',
      height: 40,
      width: '150%'
  },
});

const styles = StyleSheet.create({
  label: {
    color: 'rgb(179, 179, 179)',
    width: '35%',
    fontSize: 17,
    marginTop: 30
  },
  input:{
    width: '65%',
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    color: 'white',
    fontSize: 16,
    height: 30,
    marginTop: 20
  },
  button: {
    marginTop: '35%',
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: 'rgb(30, 182, 30)',
    fontSize: 17
  },
  box:{
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 15,
    marginRight: 15,
    width: '100%',
    height: 50
  }
});

export default EditProfile
