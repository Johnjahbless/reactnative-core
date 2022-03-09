import React, {Component} from 'react'
import {View, Text, TextInput, StyleSheet, Image, TouchableHighlight, KeyboardAvoidingView, 
    StatusBar, TouchableOpacity, TouchableWithoutFeedback, Keyboard} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import {baseUrl, scolor, pcolor, mcolor} from '../component/konst'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 ,AntDesign } from '@expo/vector-icons'; 
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Modal from '../component/modal';



export default class Withdrawal extends Component{

    constructor(props){
        super(props)
        this.state = {
            user: {},
            loading: true,
            post: [],
            fantasy: [],
            postColor: mcolor,
            fantansyColor: scolor,
            step: 1,
            dp: '',
            image: null,
            show: 'none',
            camvisble: false
        }
 
    }

   async componentDidMount(){

    // try {
    //    // let usernamme = this.props.route.params.params.useridd
    //     let username = await AsyncStorage.getItem('username')
    //     let response = await fetch(`${baseUrl}user/${username}`, {method: 'get'})
    //     let result = await response.json()
    //     postt = result.post.reverse()
    //     fantasyy = result.fantasy.reverse()
    //     this.setState({fantasy:result.fantasy.reverse(), user: result.user, post: result.post.reverse(), loading: false, dp: result.user.profilepic.replace(/\\/g, '/')})
    // } catch (error) {
    //    console.log(error) 
    // }

    }

    componentWillUnmount(){
        this.setState({loading: true, post: [], user: []})
    }

    goBack = ()=>{
        this.props.navigation.goBack()
      }


    gotoEdit = ()=>{
        this.props.navigation.navigate('EditProfile') 
    }

    
    render(){
        let {user, loading, post, dp, fantasy, postColor, fantansyColor, step} = this.state
        dayjs.extend(relativeTime)

        const MyStatusBar = ({backgroundColor, ...props}) => (
            <View style={[styles.statusBar, { backgroundColor }]}>
              <StatusBar translucent backgroundColor={backgroundColor} {...props} />
            </View>
          );

       let img = dp && dp.trim() !== '' ? ( <Image source={{uri: baseUrl+dp}} style={styles.image} />) :

       <Image source={require('../image/noimage.jpg')} style={styles.image} />

        return(
            <KeyboardAvoidingView
            style={styles.container}
            behavior='position'
            >
                <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()} accessible={false}>
            <View style={styles.container}>
                 <MyStatusBar backgroundColor="white" barStyle="light-content" />
            <View style={{height: '18%', width: '100%',flexDirection: 'row', marginTop: 0, backgroundColor: 'rgb(1, 1, 48)'}}>
             <TouchableHighlight onPress={this.goBack}>
             <View style={{marginLeft: 15, marginTop: 38}}><AntDesign name="leftcircle" size={30} color='white' /></View>
             </TouchableHighlight>
             <Text style={{color: 'white', marginTop: 37, marginLeft: '20%', fontSize: 30}}>Withdrawal</Text>
             </View>
            
            <View style={styles.rest}>
            <View style={styles.fun}>
                <Text style={{marginLeft: 25, fontSize: 17, color: 'gray'}}>From</Text>
                <Text style={{marginLeft: '34%', fontSize: 17, color: 'gray'}}>To</Text>
            </View>

            <View style={{display: 'flex', flexDirection: 'row', marginTop: 10, marginLeft: 25, }}>
                <View style={{width: '45%', height: 40, backgroundColor: 'rgb(223, 223, 223)', 
                marginRight: 10, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 17, fontWeight: '400'}}>Naira Wallet</Text>
                </View>

                <View style={{width: '45%', height: 40, backgroundColor: 'rgb(223, 223, 223)',display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 17, fontWeight: '400'}}>Primary Account</Text>
                </View>
            </View>

            <Text style={{color: 'gray', marginLeft: 25, marginTop: 25, fontSize: 17}}>Accont Details</Text>

                <View style={{width: '87%', marginTop: 5, height: 65, borderWidth: 2, display: 'flex', 
                 borderColor: 'rgb(63, 175, 235)', marginLeft: 'auto', marginRight: 'auto', borderRadius: 6}}>
                  <Text style={{marginTop: 11, fontSize: 16, marginLeft: 30, fontWeight: '600'}}>09363553626 - Firstbank</Text> 
                  <Text style={{ fontSize: 15, marginLeft: 30, color: 'gray'}}>PHARREL WILLIAMS</Text>
                </View>

                <Text style={{color: 'gray', marginLeft: 25, marginTop: 25, fontSize: 17}}>Amount</Text>

                <View style={{width: '87%', height: 50, borderWidth: 2, borderRadius: 6,display: 'flex', flexDirection: 'row',
                borderColor: 'rgb(201, 201, 201)', marginLeft: 'auto', marginRight: 'auto', marginTop: 3}}>
                    <TextInput style={{width: '80%', padding: 8}} 
                    placeholder='Enter amount'
                    keyboardType='number-pad'
                    />
                    <View style={{width: '20%', height: '100%', backgroundColor: 'rgb(63, 175, 235)',
                     display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                         <Text style={{color: 'white', fontSize: 18}}>NGN</Text>
                    </View>
                </View>

                <Text style={{color: 'gray', marginLeft: 25, marginTop: 25, fontSize: 17}}>Pin</Text>

                <View style={{width: '87%', height: 50, borderWidth: 2, borderRadius: 6,display: 'flex', flexDirection: 'row',
                 borderColor: 'rgb(201, 201, 201)', marginLeft: 'auto', marginRight: 'auto', marginTop: 3}}>
                  <TextInput style={{width: '80%', padding: 8}} 
                   placeholder='Enter pin'
                   keyboardType='number-pad'
                   />
                 </View>

                 <TouchableOpacity style={{marginTop: 35, width: '80%', borderRadius: 7, marginLeft: 'auto', marginRight: 'auto',
                  height: 55, backgroundColor: 'rgb(1, 1, 48)', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                     <Text style={{color: 'white', fontSize: 19}}>Continue</Text>
                 </TouchableOpacity>

            </View>
            
          </View>
          </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(1, 1, 39)',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    rest:{
        height: '90%',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        width: '100%',
        backgroundColor: 'white',
        marginTop: -15,
        display: 'flex',
        flexDirection: 'column'
    },
    fun:{
        display: 'flex',
        flexDirection: 'row',
        marginTop: 25
    }
})


               
                    