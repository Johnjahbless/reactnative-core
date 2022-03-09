import React, { useState} from 'react';
import { TouchableOpacity, StyleSheet, Text, View, TouchableWithoutFeedback, 
  TextInput, Keyboard, KeyboardAvoidingView, ActivityIndicator, ScrollView, StatusBar} from 'react-native';
import Background from '../component/Background';
import Logo from '../component/Logo';
import Header from '../component/Header';
import AsyncStorage from '@react-native-community/async-storage'
// import {SpinnerButton} from 'react-native-spinner-button';
import axios from 'axios'
import { baserUrl } from '../component/konst';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons'; 


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
}

const MyStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);
  
const signup = ()=>{
  navigation.push('SignUp')
}

  return (
    <KeyboardAvoidingView
    style={styles.container}
    behavior="padding"
    >
       <MyStatusBar  backgroundColor="white" barStyle="light-content" />
    <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()} accessible={false}>
    <View style={styles.container}>
      <View style={styles.contain}>
        <Logo />
        <Text style={styles.welcome}>Welcome back,</Text>
        <Text style={styles.sign}>Sign in to continue</Text>
        <Text style={styles.email}>Email</Text>
        <View style={styles.views}>
        <MaterialIcons name="person" size={26} color="white" />
        <TextInput 
        style={styles.username} 
        placeholder='example@gmail.com'
        placeholderTextColor="white"
       />
        </View>

        <Text style={styles.email}>Password</Text>
        <View style={styles.views}>
        <FontAwesome name="lock" size={24} color="white" />
        <TextInput 
        secureTextEntry={true}
        style={styles.username} 
       />
        </View>

        <TouchableOpacity style={styles.forgot}>
        <Text style={{color: 'white'}}>Forgot Password?</Text>
        </TouchableOpacity>

        {load ? 
          <View style={styles.loader}>
          <ActivityIndicator size='large' />
         </View> :
          <TouchableOpacity style={styles.login} >
          <Text style={{color: 'white', fontWeight: '600', fontSize: 18}}>LOGIN</Text>
          </TouchableOpacity>
        }

        <Text style={{display: show}}>{error}</Text>

        <View style={styles.acct}>
          <TouchableOpacity>
          <TouchableOpacity onPress={()=> signup()}>
            <Text style={{color: 'rgb(181, 180, 180)', fontSize: 16}}>Don't have an account?
             <Text style={{color: 'orange', fontSize: 16, fontWeight: '600'}}> Register</Text>
            </Text>
          </TouchableOpacity>
          </TouchableOpacity>
        </View>

      </View> 
    </View>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container:{
    width: '100%',
    display: 'flex',
    backgroundColor: 'rgb(1, 1, 12)',
    height: '100%',
    alignItems: 'center'
  },
  contain:{
    height: 'auto',
    width: '85%',
    marginTop: '6%'
  },
  forgot: {
    width: '93%',
    alignItems: 'flex-end',
    marginTop: 20,
    color: 'white'
  },
  welcome:{
    color: 'white',
    marginLeft: 20,
    fontSize: 19,
    fontWeight: '700'
  },
  sign:{
    color: 'white',
    marginLeft: 20,
    marginTop: 7,
    fontSize: 14
  },
  email:{
    color: 'white',
    marginLeft: 20,
    marginTop: 30,
    fontWeight: '600',
    fontSize: 16
  },
  views:{
    height: 35,
    width: '86%',
    borderBottomWidth: 2,
    borderBottomColor: 'white',
    marginLeft: 20,
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20
  },
  username:{
    marginLeft: 8,
    color: 'white',
    width: '87%',
  },
  loader: {
    marginTop: '10%',
    alignItems: 'center'
},
login:{
  height: 40,
  width: '86%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'orange',
  marginLeft: 20,
  marginTop: 30,
  borderRadius: 8
},
acct:{
  width: '86%',
  marginTop: 30,
  marginLeft: 20,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center'
}
});

export default LoginScreen;
