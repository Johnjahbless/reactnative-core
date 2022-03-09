import React,{Component} from 'react'
import {View, Text, Button, Image, ScrollView, StyleSheet, Animated, TextInput, StatusBar} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import {baseUrl,pcolor, scolor, mcolor, bcolor} from '../component/konst'
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from 'dayjs'
import {  TouchableWithoutFeedback, RectButton, TouchableOpacity } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import ConfirmAlert from '../component/confirmAlert'
import axios from 'axios'
import { AntDesign, FontAwesome,MaterialIcons } from '@expo/vector-icons';

let idd;
let sss;
let rrr;
let show = 'flex'

let myInbox;

// { moment(date).format("DD/MM/YYYY")}
export default class ChatList extends Component{

    constructor(props){
        super(props)
        this.state = {
            into: [],
            username: 'sandra',
            user: {}, 
            loading: true,
           name: '', 
           visible: false,
           showw: 'flex'
        }
        //this.name = ''
    }
    async componentDidMount(){

      let namee;
    //  console.log('hello')
      myInbox = [
        {
          auid: 1,
          from: 'sandra',
          to: 'pharrel',
          body: 'I need me some money and a good house and some goodies',
          date: new Date('09/05/2021'),
          read: true
        },
        {
          auid: 2,
          from: 'williams',
          to: 'sandra',
          body: 'I need me some money and a good house',
          date: new Date('09/06/2021'),
          read: false
        }
      ]
      this.setState({loading: false})
    // console.log(myInbox)
      try {
        // namee = await AsyncStorage.getItem('username')
        // this.setState({username: namee})

       } catch (error) {
       console.log('error')
      }
    //  this.getInbox(namee)
      
    }

    getInbox = (name)=>{

      axios.get(`${baseUrl}inbox/find/${name}`)
      .then(res =>{
      this.setState({loading: false})
      this.setState({into: res.data})
     })
    .catch(err => {
      console.log(err)
    })

    }

    getStorage = async ()=>{

      try {
       
        // let namee = await AsyncStorage.getItem('username')
        // console.log(namee)
        // this.setState({username: namee})

       } catch (error) {
       console.log('error')
      }
    }

    close = ()=>{
      show = 'none'
    }

      updateRead = (id)=>{

        let data={
          id: id
        }
  
        let options = {
          method: "Put",
          body: JSON.stringify(data),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*'
            }
        }
        return fetch(`${baserUrl}send/updateread`, options)
        .then(res => {
          return res.json()
        })
        .catch(err => console.log(err))
      }

      getOneConvo = async (id) =>{

        idd = id
        
     // console.log(idd)
       
        try {

          let response = await fetch(`${baseUrl}send/read/${id}`, {method: 'get'})
          let result = await response.json()
          
          if(result.from === this.state.username){
            sss = result.from
            rrr = result.to
            // console.log(sss)
            // console.log(rrr)
          } 
          else{
            sss = result.to
            rrr = result.from
            // console.log(sss)
            // console.log(rrr)
          }
          
        } catch (error) {
          console.log(error)
        }
       
      } 

      clearConvo = async ()=>{
      //  console.log(idd)
        let data={
          id: idd
        }
  
        let options = {
          method: "put",
          body: JSON.stringify(data),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*'
            }
        }
       try {
         const response = await fetch(`${baseUrl}send/clear/${this.state.username}`, options) 
         const res =  response.status
        // console.log(res)
         if(res < 400){
          this.setState({
            into: this.state.into.filter(inbox => inbox.id !== idd )
           })
           this.deleteConvo(sss, rrr)
         }
        
       } catch (error) {
         console.log(error)
       }
      }

      deleteConvo = async (s, r)=>{

      //  console.log(s, r)

        let options = {
          method: "put",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*'
            }
        }

        try {

          const response = await fetch(`${baseUrl}send/delete/${s}/${r}`, options)
          const res = await response.json()
          console.log(res)
          
        } catch (error) {
          console.log(error)
        }
      }

      gotoconvo = (name)=>{
          this.props.navigation.navigate('ChatBox', {
            sender: name
          }) 
      }

      setVisible = ()=>{
        this.setState({visible: !this.state.visible})
      }

      renderLeftActions = (progress, dragX, id) => {     
        show='flex'
        const trans = dragX.interpolate({
          inputRange: [0, 50, 100, 101],
          outputRange: [-20, 0, 0, 1],
        });
        return (
          
          <View style={{flexDirection: 'row', height: 60, justifyContent: 'center', alignItems: 'center', display: show, marginTop: 15}}>
          <View style={{backgroundColor:'rgb(162, 16, 16)', height: 60, justifyContent: 'center', alignItems: 'center'}}>
            <Button color={scolor} title='Delete' onPress={this.setVisible} />
          </View>
          </View>
        );
      };

  

    render(){

        let { username, loading, into} = this.state

        dayjs.extend(relativeTime)

        into && into.sort((a,b)=>{
            var dateA = new Date(a.date)
            var dateB = new Date(b.date)
  
            return dateB - dateA
            
          })

          let inbox =  myInbox && myInbox.map(e =>{
            let {from, to, body, date, read, auid} = e

            function msgSender(){
                if(from === username){
                  
                  return to;
                }
                return from;
              }

              let display = !read ? 
              <View style={styles.chat}>
                    <Image source={require('../image/noimage.jpg')} alt='' 
                    style={{borderRadius: 30, height: 50, width: 50, marginTop: 5, marginLeft: 7}}  />
                    <View style={styles.info}>
                        <Text style={styles.name}>{msgSender()}
                        </Text>
                        <Text style={styles.text}  numberOfLines={1} ellipsizeMode='tail'>{body} </Text>
                    </View>
                    <Text style={{marginTop: 10, position: 'absolute', marginLeft: '77%'}} > {dayjs(date).format('DD/MM/YYYY')}</Text>
                    </View>
                    :
                     <View style={styles.chatt}>
                     <Image source={require('../image/noimage.jpg')} alt='' 
                     style={{borderRadius: 30, height: 50, width: 50, marginTop: 5, marginLeft: 7}}  />
                     <View style={styles.info}>
                         <Text style={styles.name}>{msgSender()}
                         </Text>
                         <Text style={styles.read}  numberOfLines={1} ellipsizeMode='tail'>{body} </Text>
                     </View>
                     <Text style={{marginTop: 10, position: 'absolute', marginLeft: '77%'}} >{dayjs(date).format('DD/MM/YYYY')}</Text>
                     </View>

            return(
              <Swipeable  key={auid} renderLeftActions={this.renderLeftActions.bind(this, auid)} onSwipeableOpen={this.getOneConvo.bind(this, auid)}>
               
                <TouchableWithoutFeedback key={msgSender()} onPress={this.gotoconvo.bind(this, msgSender()) }  > 
                <View>
                {display}
                </View>
                </TouchableWithoutFeedback>
                </Swipeable>
                
            )
        })

        let search = this.state.showw === 'flex' ? 
        <View style={styles.status} >
        <Text style={{  fontSize: 25, fontWeight: '600',marginLeft: 10}}> Messages</Text>
        <TouchableOpacity 
        onPress={()=>{
          this.setState({showw: 'none'})
        }}
        style={{marginRight: 7, marginTop:6}} > 
        <FontAwesome name="search" size={28} color="rgb(6, 1, 87)" />
        </TouchableOpacity>
      </View>: 
       <View style={styles.status} >
         
       <TextInput 
       placeholder='search'
       style={{width: '85%', borderWidth: 2,fontSize: 17, borderRadius: 15, padding: 8, borderColor: 'gray', marginLeft: 10}} />
       <TouchableOpacity 
       onPress={()=>{
         this.setState({showw: 'flex'})
       }}
       style={{marginRight: 7, marginTop:6}}>
         <MaterialIcons name="cancel" size={30} color="gray" />
         </TouchableOpacity>
     </View>
      

        return(
            <ScrollView style={styles.container}>
              <ConfirmAlert okay={this.clearConvo} cancel={this.setVisible} visible={this.state.visible} />
                {loading ? <View><Text style={{color: 'gray', marginTop: 40, marginLeft: 20, fontSize: 17, textAlign: 'center'}}>Loading...</Text></View>: (
              <View>
              {search}
                  
              {inbox}
           </View>
                )}
               
            </ScrollView>   
         
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: 0,
        backgroundColor: 'white',   
    },
    status:{
      width: '100%',
      marginTop: 25,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    title: {
      fontSize: 25,
      fontWeight: '600',
      marginLeft: 10
    },
    chat: {
      height: 60,
      width: '100%',
      backgroundColor: 'rgb(223, 223, 223)',
      marginTop: 15,
      display: 'flex',
      flexDirection: 'row'
    },
    chatt: {
      height: 60,
      width: '100%',
      backgroundColor: 'white',
      marginTop: 15,
      display: 'flex',
      flexDirection: 'row'
    },
    info: {
      display: 'flex',
      flexDirection: 'column'

    },
    name:{
      fontSize: 18,
      fontWeight: '700',
      marginLeft: 10,
      marginTop: 5,
    },
    text:{
      fontSize: 14,
      fontWeight: '500',
      marginLeft: 10,
      marginTop: 10,
      color: 'rgb(75, 75, 75)',
      marginRight: 70
    },
    read:{
      fontSize: 14,
      fontWeight: '500',
      marginLeft: 10,
      marginTop: 10,
      color: 'gray',
      marginRight: 70
    }
})




       
  