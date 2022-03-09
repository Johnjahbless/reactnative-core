import React from 'react'
import {Text, View, Button, StyleSheet, Image, FlatList, ScrollView,TouchableHighlight,
     StatusBar ,ActivityIndicator, TextInput, TouchableOpacity} from 'react-native'
import Head from '../component/head'
import AsyncStorage from '@react-native-community/async-storage'
// import * as Progress from 'react-native-progress';
import {baseUrl} from '../component/konst'
import axios from 'axios'
import { MaterialIcons, AntDesign} from '@expo/vector-icons';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'


let currentPage = 1
let auth = false

export default class Welcome extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            pic: 'okay',
            username: '',
            count: 0,
        unread: 0,
        note: 'none',
        allusers: [],
        every: [],
        postPerPage: 10,
       // currentPage: 0,
        myList: [],
        states: [],
        cities: [{label: 'all', value: 'all'}],
        city: 'all',
        selectedState: 'all',
        age: '',
        lookingfor: 'all',
        loading: false,
        newUsers: {},
        image: '',
        gender: '',
        type: '',
        show: 'none',
        pro: false,
        posts: [],
        search: '',
        greet: ''
        }
    }

   async componentDidMount(){

        try {

           const date = new Date;
           let hours = date.getHours();
           let status = (hours < 12)? this.setState({greet: 'Good morning'}) :
             ((hours <= 18 && hours >= 12 ) ? this.setState({greet: 'Good afternoon'}): this.setState({greet: 'Good evening'}));

               let username = await AsyncStorage.getItem('username')
               if(!username) return this.props.navigation.push('SignIn')
               this.setState({loading: false})
        //     let response = await fetch(`${baseUrl}user/user/${username}`, {method: 'get'})
        //     let result = await response.json()
        //     this.setState({username: username, image: result.profilepic.replace(/\\/g, '/')})
        //     AsyncStorage.setItem('dp', result.profilepic.replace(/\\/g, '/'))
        } catch (error) {
            this.setState({loading: false})
        }

       // this.allPost()
              
    }


      componentWillUnmount(){
          
      //  this.allUsers(this.state.gender)
      }

    //   dummyProfile = (name)=>{
    //     this.props.navigation.push('DummyProfile', {
    //         params: { useridd: name }
    //       })
    //   }

      gotoBuy = ()=>{
        this.props.navigation.navigate('Buy')
      }

      gotoSell = ()=>{
        this.props.navigation.navigate('Sell')
      }

    render(){

        let {image} = this.state

       const Loader = ()=>{

            return(
             // <Background>
                <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', height: '100%', width: '100%'}}>
                  <Image source={require('../image/logo.jpeg')}  style={{width: 60, height: 60, 
                borderRadius: 40}} />
                </View>
              //</Background>
            )
          }

        dayjs.extend(relativeTime)

        const MyStatusBar = ({backgroundColor, ...props}) => (
            <View style={[styles.statusBar, { backgroundColor }]}>
              <StatusBar translucent backgroundColor={backgroundColor} {...props} />
            </View>
          );

          let img = image && image.trim() !== '' ? <Image source={{uri: baseUrl+image}}  style={{width: 45, height: 45, marginLeft: 15,
            borderRadius: 30, marginTop: 6}} /> :

       <Image source={require('../image/noimage.jpg')}  style={{width: 40, height: 40, marginRight: 15,
        borderRadius: 30, marginTop: 6}} />


        return(
            <View style={styles.container}>
                {this.state.loading ? <Loader /> :
                    <View style={styles.container}>
                    <MyStatusBar backgroundColor="white" barStyle="dark-content" />
                   <Head style={{ width: 40, height: 40 }} img={img}
                   drawer={()=> this.props.navigation.toggleDrawer()} />

                   <View style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                   <Text style={{marginLeft: 15, marginTop: 10, fontSize: 17, fontWeight: '600'}}>{this.state.greet}</Text>
                   <Text style={{marginRight: 15, marginTop: 10, fontSize: 14}}>Today,{dayjs(new Date()).format('ddd MMM. YYYY')}</Text>
                   </View>
                  
                   <View style={{backgroundColor: 'rgb(1, 1, 48)', height: '24%',
                    marginTop: 10, marginLeft: 15, marginRight: 15}}>
                        <Text style={{color: 'white', fontSize: 16, 
                        fontWeight: '600', textAlign: 'right', marginRight: 10, marginTop: 10}}> Paysequr</Text>

                        <Text style={{color: 'white', fontSize: 17, fontWeight: '400', marginLeft: 10, marginTop: 9}}>
                        <AntDesign name="creditcard" size={26} color="white" /> Funded Wallet</Text>
                        <Text style={{color: 'white', fontSize: 23, fontWeight: '700', marginLeft: 10, marginTop: 5}}>N567,003.00</Text>
                        <Text style={{color: 'white', fontSize: 17, marginTop: 15, marginLeft: 10}}>Wallet ID: 7353535362703663</Text>
                   </View>

                   <View style={{height: '24%',
                    marginTop: 7, marginLeft: 15, marginRight: 15, display: 'flex', flexDirection: 'row'}}>

                        <View style={{backgroundColor:'rgb(223, 102, 10)', height: '100%', width: '48.5%',
                         marginRight: '3%', borderBottomEndRadius: 50}}>
                             <Text style={{marginTop: 10, marginLeft: 10, color: 'white', fontSize: 18, 
                        fontWeight: '400'}}>Escrow Received</Text>
                        <Text style={{color: 'white', fontSize: 23, fontWeight: '700', marginLeft: 10, marginTop: 23}}>N567,003.00</Text>
                        <Text style={{color: 'white', fontSize: 15, marginTop: 15, marginLeft: 10}}>From Pharrel Williams</Text>
                        </View>

                        <View style={{backgroundColor:'rgb(3, 10, 118)', height: '100%', width: '48.5%', borderBottomEndRadius: 50}}>
                        <Text style={{marginTop: 10, marginLeft: 10, color: 'white', fontSize: 18, 
                        fontWeight: '400'}}>Escrow Sent</Text>
                        <Text style={{color: 'white', fontSize: 23, fontWeight: '700', marginLeft: 10, marginTop: 23}}>N567,003.00</Text>
                        <Text style={{color: 'white', fontSize: 15, marginTop: 15, marginLeft: 10}}>To Pharrel Williams</Text>
                        </View>
                   </View>

                    <View style={{display: 'flex', flexDirection: 'row', marginTop: 10}}>
                    <Text style={{marginLeft: 15}}><MaterialIcons name="history" size={35} color="black" /></Text>
                    <Text style={{marginLeft: 5, marginTop: 8, fontSize: 18, fontWeight: '600'}}>Recent Transactions</Text>
                    </View>

                    <View style={{width: '100%', height: 'auto', display: 'flex', flexDirection: 'row',
                      marginTop: 7, }}> 

                        <View style={{display: 'flex', flexDirection: 'column', width: 'auto', marginLeft: 15, alignItems: 'center'}}>
                        <Image source={require('../image/noimage.jpg')} alt='' 
                         style={{borderRadius: 25, height: 40, width: 40, marginTop: 0}}  />
                         <Text style={{fontSize: 12, fontWeight: '300'}}>Send to</Text>
                         <Text style={{fontWeight: '500'}}>Pharrel</Text>
                        </View>

                        <View style={{display: 'flex', flexDirection: 'column', width: 'auto', marginLeft: 15, alignItems: 'center'}}>
                        <Image source={require('../image/noimage.jpg')} alt='' 
                         style={{borderRadius: 25, height: 40, width: 40, marginTop: 0}}  />
                         <Text style={{fontSize: 12, fontWeight: '300'}}>Send to</Text>
                         <Text style={{fontWeight: '500'}}>Pharrel</Text>
                        </View>

                        <View style={{display: 'flex', flexDirection: 'column', width: 'auto', marginLeft: 15, alignItems: 'center'}}>
                        <Image source={require('../image/noimage.jpg')} alt='' 
                         style={{borderRadius: 25, height: 40, width: 40, marginTop: 0}}  />
                         <Text style={{fontSize: 12, fontWeight: '300'}}>Receive from</Text>
                         <Text style={{fontWeight: '500'}}>Pharrel</Text>
                        </View>

                        <View style={{display: 'flex', flexDirection: 'column', width: 'auto', marginLeft: 15, alignItems: 'center'}}>
                        <Image source={require('../image/noimage.jpg')} alt='' 
                         style={{borderRadius: 25, height: 40, width: 40, marginTop: 0}}  />
                         <Text style={{fontSize: 12, fontWeight: '300'}}>Send to</Text>
                         <Text style={{fontWeight: '500'}}>Pharrel</Text>
                        </View>

                        <View style={{display: 'flex', flexDirection: 'column', width: 'auto', marginLeft: 15, alignItems: 'center'}}>
                        <Image source={require('../image/noimage.jpg')} alt='' 
                         style={{borderRadius: 25, height: 40, width: 40, marginTop: 0}}  />
                         <Text style={{fontSize: 12, fontWeight: '300'}}>Receive from</Text>
                         <Text style={{fontWeight: '500'}}>Pharrel</Text>
                        </View>
                    </View>

                    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%', marginTop: 10}}>
                        <TouchableOpacity 
                        onPress={()=> this.props.navigation.navigate('Sell')}
                        style={{width: 110, height: 55, borderRadius: 30,
                            backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{color: 'rgb(223, 102, 10)', fontWeight: '600', fontSize: 26}} >Receive</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                        onPress={()=>this.props.navigation.navigate('Buy')}
                        style={{width: 85, height: 55, borderRadius: 30, marginLeft: 28,
                            backgroundColor: 'rgb(1, 1, 48)', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{color: 'white', fontWeight: '600', fontSize: 26}}>Send</Text>
                        </TouchableOpacity>
                    </View>
               </View>
                }
                
            </View>
        )
    }

}


const styles = StyleSheet.create({
    container:{
        backgroundColor: 'rgb(226, 226, 226)',
        height: '100%',
        width: '100%'
    },
   
})
