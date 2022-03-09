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
            <View style={{height: '17%', width: '100%',flexDirection: 'row', marginTop: 0, backgroundColor: 'rgb(6, 1, 87)'}}>
             <TouchableHighlight onPress={this.goBack}>
             <View style={{marginLeft: 15, marginTop: 38}}><AntDesign name="leftcircle" size={30} color='white' /></View>
             </TouchableHighlight>
             <Text style={{color: 'white', marginTop: 37, marginLeft: '27%', fontSize: 30}}>Profile</Text>
             </View>

             <View style={{width: '100%', height: '26%', display: 'flex',marginTop: -20,
             flexDirection: 'column',  alignItems: 'center'}}>
             <Image source={require('../image/noimage.jpg')}  style={{width: 70, height: 70,
              borderRadius: 50, marginTop: 6}} />
              <Text style={{color: 'white', fontWeight: '600', fontSize: 25, marginTop: 8}}>N700,000.00</Text>
              <Text style={{color: 'white', fontWeight: '400'}}>Funded Wallet</Text>
             </View>
            
            <View style={styles.rest}>
           
           <Text style={{color: 'gray', fontWeight: '600', fontSize: 19, marginTop: 15, marginLeft: 20}}>User Details</Text>

           <View style={styles.fun}>
                <Text style={{marginLeft: 20, fontSize: 17, color: 'gray', fontWeight: '400'}}>Firstname</Text>
                <Text style={{marginLeft: '25%', fontSize: 17, color: 'gray', fontWeight: '400'}}>Lastname</Text>
            </View>

            <View style={{display: 'flex', flexDirection: 'row', marginTop: 10, marginLeft: 20, }}>
                <View style={{width: '45%', height: 40, backgroundColor: 'rgb(223, 223, 223)', 
                marginRight: 10, display: 'flex', justifyContent: 'center'}}>
                    <Text style={{fontSize: 17, fontWeight: '400', marginLeft: 10}}>Pharrel</Text>
                </View>

                <View style={{width: '45%', height: 40, backgroundColor: 'rgb(223, 223, 223)',display: 'flex', justifyContent:'center'}}>
                <Text style={{fontSize: 17, fontWeight: '400', marginLeft: 10}}>Williams</Text>
                </View>
            </View>

            <Text style={{marginLeft: 20, fontSize: 17, color: 'gray', fontWeight: '400', marginTop: 15}}>Phone</Text>

               <View style={{width: '89%', height: 40, backgroundColor: 'rgb(223, 223, 223)', 
                marginRight: 'auto', marginLeft: 'auto', display: 'flex', justifyContent: 'center', marginTop: 10}}>
                    <Text style={{fontSize: 17, fontWeight: '400', marginLeft: 10}}>080534462453</Text>
                </View>

                <Text style={{marginLeft: 20, fontSize: 17, color: 'gray', fontWeight: '400', marginTop: 15}}>Email</Text>

               <View style={{width: '89%', height: 40, backgroundColor: 'rgb(223, 223, 223)', 
                marginRight: 'auto', marginLeft: 'auto', display: 'flex', justifyContent: 'center', marginTop: 10}}>
                    <Text style={{fontSize: 17, fontWeight: '400', marginLeft: 10}}>Pharrel@gmail.com</Text>
                </View>

                <TouchableOpacity style={{marginTop: 20, width: '80%', borderRadius: 7, marginLeft: 'auto', marginRight: 'auto',
                  height: 55, backgroundColor: 'rgb(3, 3, 114)', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                     <Text style={{color: 'white', fontSize: 19}}>Edit Profile</Text>
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
        backgroundColor: 'rgb(6, 1, 87)',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    rest:{
        height: '70%',
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
        marginTop: 10
    }
})


               
                    