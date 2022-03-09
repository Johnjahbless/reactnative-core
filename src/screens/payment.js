import { NavigationContainer } from '@react-navigation/native';
import {PayWithFlutterwave, FlutterwaveButton} from 'flutterwave-react-native';
import React, { useState } from 'react'
import {View, TouchableOpacity, Text, StatusBar, StyleSheet, Keyboard,
    KeyboardAvoidingView, TouchableWithoutFeedback, TextInput, Image, } from 'react-native'
import { AntDesign, FontAwesome } from '@expo/vector-icons'; 

// https://stackoverflow.com/questions/67817471/how-do-we-use-flutterwave-payment-in-react-native


const Payment = ({navigation})=>{

    const [amount, setAmount] = useState('')

    let price = (i) => (i).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

    const generateRef = (length) => {
        var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
        var b = [];  
        for (var i=0; i<length; i++) {
            var j = (Math.random() * (a.length-1)).toFixed(0);
            b[i] = a[j];
        }
        return b.join("");
    }

    const handleOnRedirect = () => {
        console.log('sadi')
     }

     const MyStatusBar = ({backgroundColor, ...props}) => (
        <View style={[styles.statusBar, { backgroundColor }]}>
          <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
      );
     

    return(
        <KeyboardAvoidingView
            style={styles.container}
            behavior='padding'
            >
                <MyStatusBar backgroundColor="white" barStyle="light-content" />
                <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()} accessible={false}>
        <View style={{width: '100%', height: '100%', display: 'flex', flexDirection: 'column'}}>
            
            <View style={{height: '20%', width: '100%',flexDirection: 'row', marginTop: 0}}>
             <TouchableOpacity onPress={()=> navigation.goBack() }>
             <View style={{marginLeft: 15, marginTop: 38}}><AntDesign name="leftcircle" size={30} color='white' /></View>
             </TouchableOpacity>
             <Text style={{color: 'white', marginTop: 37, marginLeft: '23%', fontSize: 25}}>Fund Wallet</Text>
             </View>

             <View style={styles.rest}>
                 <Text style={{textAlign: 'center', fontSize: 24, fontWeight: '600', marginTop: 20}}>We only accepts </Text>
                 <View style={{width: '100%', height: 70, display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
                     <Image source={require('../image/master.png')} style={{height: 50, width: 80}} />
                     <Image source={require('../image/visa.png')} style={{height: 50, width: 120}} />
                     <Image source={require('../image/verve.png')} style={{height: 50, width: 120}} />
                 </View>
                 <Text style={{marginBottom: 10, marginTop: 30, marginLeft: '10%', fontSize: 17}}>Enter Amount</Text>
                 <TextInput 
                 value={amount}
                 onChangeText={(text)=>setAmount(text)}
                  style={{width: '80%', padding: 8, height: 40, backgroundColor: 'rgb(201, 201, 201)', 
                 marginLeft: 'auto', marginRight: 'auto', marginBottom: 50, color: 'black', fontSize: 19}} 
                   placeholder='0.00'
                   keyboardType='number-pad'
                   />
                   <Text style={{textAlign: 'center', fontWeight: '600', fontSize: 18, color: 'gray'}}>{amount}</Text>
            <PayWithFlutterwave
             onRedirect={handleOnRedirect}
             customButton={(props) => (
                <TouchableOpacity
                onPress={props.onPress}
                  isBusy={props.isInitializing}
                  disabled={props.disabled}
                 style={{marginTop: 35, width: '80%', borderRadius: 7, marginLeft: 'auto', marginRight: 'auto',
                  height: 55, backgroundColor: 'rgb(1, 1, 48)', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                      <Text style={{marginRight: 25}}>
                      <FontAwesome name="credit-card" size={30} color="white" />
                      </Text>
                     <Text style={{color: 'white', fontSize: 19}}>Pay With Card</Text>
                 </TouchableOpacity>
                )}
               options={{
              tx_ref: generateRef(11),
              authorization: `FLWPUBK-b6f248ba340dfa2ed904671c63a77e99-X`,
              customer: {
               email: 'olajide.etti3@gmail.com'
            },
            amount: parseInt(amount),
            currency: 'NGN',
           payment_options: 'card',
           
            }}
         />
         </View>
        </View>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'rgb(1, 1, 48)'
    },
    rest:{
        height: '90%',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        width: '100%',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column'
    }
})
export default Payment;