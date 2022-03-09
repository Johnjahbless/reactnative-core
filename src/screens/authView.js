import React, {  useState,  } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, TouchableWithoutFeedback, TextInput, Keyboard} from 'react-native';
import Background from '../component/Background';
import Logo from '../component/Logo';
import Header from '../component/Header';
import AsyncStorage from '@react-native-community/async-storage'
// import {AuthContext} from '../../src/context'
import Button from '../component/Button';
import axios from 'axios'
import { baserUrl } from '../component/konst';


const LoginScreen = ({ navigation }) => {
  
  // const {signIn} = useContext(AuthContext)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')
  const [load, setIsLoad] = useState(false)
  const [show, setShow] = useState('none')


const onLoginPressed = (e)=>{

  e.preventDefault()
  setIsLoad(true)
  let data = {username: username, password: password}
  axios.post(`${baserUrl}login/verify`, data)
  .then(res =>{
    if(res.status === 200){
      console.log(res.data)
      setShow('none')
        setIsValid(true)
      
      AsyncStorage.setItem('username', username)
       AsyncStorage.setItem('picc', res.data.img)
       AsyncStorage.setItem('email', res.data.email)
        AsyncStorage.setItem('valid', true)
        setIsLoad(false)
        // signIn()
   }
   })
  .catch(err => {
    AsyncStorage.setItem('valid', false)
    setShow('flex')
    setError('Invalid credentials !!!')
    setIsLoad(false)
  })

  //setIsLoad(true)
  // let data = {username: username, password: password}
  // //console.log(data)
  // let options = {
  //   method: 'post',
  //   body: JSON.stringify(data),
  //   headers: {
  //     'Accept': '*/*',
  //     'Content-Type': 'application/json'
  //   }
  // }

  //   return fetch(`${baserUrl}login/verify`, options)
  //   .then(res =>{
  //     console.log(res)
  //   })
  //   .catch(err => console.log(err))
    // const response = await res.status
    // console.log(response)
    // if(response > 300){
    // AsyncStorage.setItem('valid', false)
    // setShow('flex')
    // setError('Invalid credentials !!!')
    // setIsLoad(false)
    //   return
    // }
    //       setShow('none')
    //     setIsValid(true)
      
    //   AsyncStorage.setItem('username', username)
    //    AsyncStorage.setItem('picc', data.img)
    //    AsyncStorage.setItem('email', data.email)
    //     AsyncStorage.setItem('valid', true)
    //     setIsLoad(false)
    //     signIn()
      
      // AsyncStorage.setItem('username', username)
      //  const data = await res.json()
      //  AsyncStorage.setItem('picc', data.img)
      //  AsyncStorage.setItem('email', data.email)
      //   AsyncStorage.setItem('valid', true)
      // signIn();
    
   
}
  

  return (
    <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()} accessible={false}>
    <Background>
    
      <Logo />

      <Header>Welcome back.</Header>
      <Text style={{color: 'rgb(107, 170, 241)', marginBottom: 10, fontWeight: 'bold', fontSize: 16}}>Username</Text>
      <TextInput style={{ width: '85%', borderBottomColor: 'white',textAlign: 'center', borderBottomWidth: 1, fontSize: 18, marginBottom: 25, color: 'white' }}
        
        value={username}
        onChangeText={text => setUsername(text)}
        autoCapitalize="none"
       
      />
      <Text style={{color: 'rgb(107, 170, 241)', marginBottom: 10, fontWeight: 'bold', fontSize: 16}}>Password</Text>
      <TextInput style={{ width: '85%', borderBottomColor: 'white',textAlign: 'center', borderBottomWidth: 1, fontSize: 18, marginBottom: 25, color: 'white' }}
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
      />
      <Text style={{color: 'red', fontSize: 18, marginBottom: 10, fontWeight: 'bold', display: show}}>Invalid credentials </Text>
       

      {/* <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPasswordScreen')}
        >
          <Text style={styles.label}>Forgot your password?</Text>
        </TouchableOpacity>
      </View> */}

      <Button
      mode="contained"
      onPress={onLoginPressed}
    >
      Login
    </Button>
    {load ? <Text style={{color: 'white'}}>Loading...</Text> : null}
      <View style={styles.row}>
        <Text style={styles.label}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.push('SignUp')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
     
    </Background>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  label: {
    color: 'white',
  },
  link: {
    fontWeight: 'bold',
    color: 'rrgb(107, 170, 241)',
    fontSize: 17,
    marginTop: -3
  },
});

export default LoginScreen;
