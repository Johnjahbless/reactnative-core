import React, { memo, useState, useContext } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, TouchableWithoutFeedback, TextInput, 
  Keyboard, KeyboardAvoidingView, ActivityIndicator, StatusBar} from 'react-native';
import Logo from '../component/Logo';
import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios'
import { baserUrl } from '../component/konst';
import { MaterialIcons, FontAwesome, MaterialCommunityIcons} from '@expo/vector-icons'; 
import { ScrollView } from 'react-native-gesture-handler';


const LoginScreen = ({ navigation }) => {

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('')
  const [error, setError] = useState('')
  const [load, setIsLoad] = useState(false)
  const [show, setShow] = useState('none')


const onLoginPressed = (e)=>{

  e.preventDefault()
  setIsLoad(true)
  let data = {firstname, lastname, email, password}
  axios.post(`${baserUrl}login/verify`, data)
  .then(res =>{
    if(res.status === 200){
      console.log(res.data)
      setShow('none')
        setIsValid(true)
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

const signin = ()=>{
  navigation.push('SignIn')
}

const MyStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);
  

  return (
    <KeyboardAvoidingView
    style={styles.container}
    behavior="padding"
    >
      <MyStatusBar  backgroundColor="white" barStyle="light-content" />
      <ScrollView style={{width: '100%'}}>
    <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()} accessible={false}>
    <View style={styles.container}>
      <View style={styles.contain}>
        <Logo />
        <Text style={styles.welcome}>Create new account</Text>

        <View style={styles.views}>
        <MaterialIcons name="person" size={26} color="white" />
        <TextInput 
        style={styles.username} 
        placeholder='Firstname'
        placeholderTextColor="white"
       />
        </View>

        <View style={styles.views}>
        <MaterialIcons name="person" size={26} color="white" />
        <TextInput 
        style={styles.username} 
        placeholder='Lastname'
        placeholderTextColor="white"
       />
        </View>

        <View style={styles.views}>
        <MaterialCommunityIcons name="email-outline" size={26} color="white" />
        <TextInput 
        style={styles.username} 
        placeholder='Email'
        placeholderTextColor="white"
       />
        </View>

        <View style={styles.views}>
        <FontAwesome name="lock" size={24} color="white" />
        <TextInput 
        placeholder='Password'
        placeholderTextColor="white"
        secureTextEntry={true}
        style={styles.username} 
       />
        </View>

        <View style={styles.views}>
        <FontAwesome name="lock" size={24} color="white" />
        <TextInput 
        placeholder='Confirm password'
        placeholderTextColor="white"
        secureTextEntry={true}
        style={styles.username} 
       />
        </View>

        {load ? 
          <View style={styles.loader}>
          <ActivityIndicator size='large' />
         </View> :
          <TouchableOpacity style={styles.login}>
          <Text style={{color: 'white', fontWeight: '600', fontSize: 18}}>REGISTER</Text>
          </TouchableOpacity>
        }

        <Text style={{display: show}}>{error}</Text>

        <View style={styles.acct}>
          <TouchableOpacity onPress={()=> signin()}>
            <Text style={{color: 'rgb(181, 180, 180)', fontSize: 16}}>Already have an account?
             <Text style={{color: 'orange', fontSize: 16, fontWeight: '600'}}> Login</Text>
            </Text>
          </TouchableOpacity>
        </View>

      </View> 
    </View>
    </TouchableWithoutFeedback>
    </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container:{
    width: '100%',
    display: 'flex',
    backgroundColor: 'rgb(1, 1, 12)',
    height: '100%',
    alignItems: 'center',
    flex: 1
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
  views:{
    height: 35,
    width: '86%',
    borderBottomWidth: 2,
    borderBottomColor: 'white',
    marginLeft: 20,
    display: 'flex',
    flexDirection: 'row',
    marginTop: 25
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
  justifyContent: 'space-around',
  alignItems: 'center'
}
});

export default memo(LoginScreen);
