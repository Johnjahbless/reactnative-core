import React, {Component} from 'react'
import {View, Text, TextInput, StyleSheet, Image, TouchableHighlight, KeyboardAvoidingView, 
    StatusBar, TouchableOpacity, TouchableWithoutFeedback, Keyboard} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import {baseUrl, scolor, pcolor, mcolor} from '../component/konst'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { AntDesign, Foundation } from '@expo/vector-icons'; 




export default class ChangePin extends Component{

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
                 <MyStatusBar backgroundColor="white" barStyle="dark-content" />
            <View style={{height: '18%', width: '100%',flexDirection: 'row', marginTop: 0}}>
             <TouchableHighlight onPress={this.goBack}>
             <View style={{marginLeft: 15, marginTop: 38}}><AntDesign name="leftcircle" size={30} color='black' /></View>
             </TouchableHighlight>
             <Text style={{color: 'black', marginTop: 37, marginLeft: '18%', fontSize: 25}}>Change Pin</Text>
             </View>

             <View style={{marginTop: 0, width: '100%', height: 'auto', display: 'flex', flexDirection: 'column'}}>
                    <View style={styles.sett}>
                    <Text><Foundation name="key" size={30} color="black" /></Text>

                    <TextInput style={styles.line}
                        placeholder='Old Password'
                    />  
                    </View>

                    <View style={styles.sett}>
                    <Text><Foundation name="key" size={30} color="black" /></Text>

                    <TextInput style={styles.line}
                        placeholder='New Password'
                    />  
                    </View>

                    <View style={styles.sett}>
                    <Text><Foundation name="key" size={30} color="black" /></Text>

                    <TextInput style={styles.line}
                        placeholder='Confirm Password'
                    />  
                    </View>
             </View>
    

                 <TouchableOpacity style={{marginTop: 35, width: '80%', borderRadius: 7, marginLeft: 'auto', marginRight: 'auto',
                  height: 55, backgroundColor: 'rgb(1, 1, 48)', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                     <Text style={{color: 'white', fontSize: 19}}>Continue</Text>
                 </TouchableOpacity>

            </View>
          </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
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
        marginTop: -15,
        display: 'flex',
        flexDirection: 'column'
    },
    fun:{
        display: 'flex',
        flexDirection: 'row',
        marginTop: 25
    },
    sett:{
        width: '100%',
        height: 40,
        display: 'flex',
        flexDirection: 'row',
        marginRight: 15,
        marginLeft: 15,
        marginBottom: 30
    },
    line:{
        marginLeft: 15,
        width: '73%',
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})


               
                    