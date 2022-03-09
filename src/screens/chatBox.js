import React from 'react'
import {View, Text,  StyleSheet, Image,  TouchableHighlight, ActivityIndicator, Platform } from 'react-native'  
import {baseUrl} from '../component/konst'
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage'
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from 'dayjs'
import {GiftedChat, InputToolbar, Send, Bubble, Time} from 'react-native-gifted-chat'
import axios from 'axios'

// https://github.com/FaridSafi/react-native-gifted-chat/blob/master/App.tsx#L128


let dm = [];
let text = '';

const mess = [
  {
    id: 1,
    body: 'i want to buy your ad',
    name: 'Pharrel Williams',
    date: new Date('10/06/2021')
  },
  {
    id: 2,
    body: 'i want to buy your ad',
    name: 'Pharrel',
    date: new Date('10/07/2021')
  }
  ,
  {
    id: 3,
    body: 'Okay',
    name: 'Pharrel',
    date: new Date('10/09/2021')
  }
]
export default class ChatBox extends React.Component{

    constructor(props){
        super(props)

        this.state = {
          user: {}, 
          loading: false, 
          messages: [],
          username: '',
          pic: '',
          show: 'none',
          userid: '',
          id: 0
        }

    }

    

    async componentDidMount(){
             dm = [];
             let sender = this.props.route.params.sender
          let username;
          try {
            username = await AsyncStorage.getItem('username')
            this.setState({ userid: sender, username: username})
                
          } catch (error) {
             console.log(error) 
          } 
        // this.getConvoList(userid,username)

        mess.map(i =>{
          if(i.name === 'Pharrel'){
            dm.push(
              {
              _id: i.id,
              text: i.body,
              createdAt: i.date,
              user: {
              _id: i.name,
                name: i.name,
                avatar: ''
              },
              // image: baseUrl+img,
              sent: true
            })
          }
          else{
            dm.push({
              _id: i.id,
              text: i.body,
              createdAt: i.date,
              user: {
                _id: i.name,
                name: i.name,
                avatar: ''
              },
              //  image: baseUrl+img,
              // sent: true
            })
          }
        })
        
        this.setState({ messages: dm.reverse(), loading: false})
      }

      getConvoList = (userid, username)=>{
        dm = [];
        axios.get(`${baseUrl}message/find/${userid}/${username}`)
        .then(res =>{
            res.data.map(msg =>{
              let {body, from, date, _id, media} = msg
              let img = media.replace(/\\/g, '/');
              if(from === this.state.userid){
                dm.push(
                  {
                  _id: _id,
                  text: body,
                  createdAt: date,
                  user: {
                  _id: this.state.userid,
                    name: this.state.userid,
                    avatar: ''
                  },
                  // image: baseUrl+img,
                  sent: true
                })
              }
              else{
                dm.push({
                  _id: _id,
                  text: body,
                  createdAt: date,
                  user: {
                    _id: this.state.username,
                    name: this.state.username,
                    avatar: ''
                  },
                  //  image: baseUrl+img,
                  sent: true
                })
              }
            })
            const arr = this.getUniqueListBy(dm, '_id')
            this.setState({ messages: arr.reverse(), loading: false})
        })
      }

      componentWillUnmount(){
        AsyncStorage.removeItem('naming')
        this.setState({user: {}, messages: []})
        dm = [];
        text = ''
     }

     onSend = (messages = [])=> {
       messages.map(m =>{
        text = m.text
       })
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, messages)
      }))
       this.sendMessage()
       this.sendInbox()
    }

    getUniqueListBy = (arr, key) => {
      return [...new Map(arr.map(item => [item[key], item])).values()]
  }
 
    // to send message without media
    sendMessage = ()=>{
    
      if(text.trim() === ''){
        return
      }

      let data = {
        from: this.state.username,
        to: this.state.userid,
        body: text
      }
      axios.post(`${baseUrl}message/save`, data)
      .then(res => console.log('sent'))
      .catch(err => console.log(err))
    }

    // to send message with media
    sendMedia = ()=>{
    
      if(!text){
        return
      }

      let data = new FormData()
      data.append('from', this.state.username)
      data.append('to', this.state.userid)
      data.append(media, text)

      axios({
        method: "post",
        url: `${baseUrl}messsage/media`,
        data: data,
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(res => console.log('sent'))
      .catch(err => console.log(err))
    }

    // to send inbox without media
     sendInbox = ()=>{

      if(text.trim() === ''){
        return
      }

      let data = {
        from: this.state.username,
        to: this.state.userid,
        body: text
      }
      axios.post(`${baseUrl}inbox/save`, data)
      .then(res => console.log('sent'))
      .catch(err => console.log(err))
    }

    // to send inbox with media

    inboxMedia = ()=>{
      if(!text){
        return
      }

      let data = new FormData()
      data.append('from', this.state.username)
      data.append('to', this.state.userid)
      data.append(media, text)

      axios({
        method: "post",
        url: `${baseUrl}inbox/media`,
        data: data,
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(res => console.log('sent'))
      .catch(err => console.log(err))
    }

    renderSend = (props)=> {
      return (
          <Send
              {...props}
          >
              <View style={{marginLeft: 0, marginTop: -47, marginRight: 0, position: 'relative'}}>
              <AntDesign name="rightcircleo" size={30} color="rgb(110, 165, 228)" />
              </View>
          </Send>
      )
  }


  renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: 'rgb(219, 94, 26)',
            // height: 'auto'
          },
          left: {
            backgroundColor: 'rgb(23, 158, 220)',
            // height: 'auto'
          }
        }}
        textStyle={{
          right: {
            color: "white",
          },
          left: {
            color: "white",
          }
        }}
        
      />
    )
  }

  renderTime = (props) => {
    return (
      <Time
      {...props}
        timeTextStyle={{
          left: {
            color: 'white',
          },
          right: {
            color: 'white',
          },
        }}
      />
    );
  };

  customtInputToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: "white",
          borderTopColor: "black",
          padding: 4,
          marginBottom: -10
        }}
      />
    );
  };

  goBack = ()=>{
    dm = []
    this.setState({messages: []})
     this.props.navigation.goBack()
  }

    render(){

      let {user, messages, username, loading, userid, pic} = this.state
      dayjs.extend(relativeTime)

        return(
            <View style={styles.container}>
                
                  <View style={{height: 40, width: '100%',flexDirection: 'row', marginTop: 15, marginBottom: 10}}>
                 <TouchableHighlight onPress={this.goBack}>
                 <View style={{marginLeft: 10, marginTop: 12}}><AntDesign name="leftcircle" size={28} color="black" /></View>
                 </TouchableHighlight>
                 {/* {profilePicture} */}
                 <Text style={{color: 'black', marginLeft: 5, marginTop: 12, fontSize: 20, fontWeight: '600'}}> Pharrel Williams </Text>
               </View>
               
              {loading ? (
                <View style={styles.loader}>
                <ActivityIndicator size='large' />
               </View>
              ):
              (
                
                <GiftedChat
                // { Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" /> }
                 messages={messages}
                 onSend={messages => this.onSend(messages)}
                 user={{
                   _id: 'Pharrel',
                  }}
                  renderAvatar={null}
                  textInputStyle={{backgroundColor: 'white', color: 'black', fontSize: 17}}
                  renderSend={this.renderSend}
                  renderTime={this.renderTime}
                  renderInputToolbar={props => this.customtInputToolbar(props)}
                  minInputToolbarHeight={45}
                  renderBubble={this.renderBubble}
               />
              )
            }
             
      </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      height: '100%',
    }, 
    input: {
      borderColor: 'gray',
      borderWidth: 2,
      borderRadius: 20,
      //  color: 'white',
       flex: 1,
      //  margin:10,
      //  fontSize: 17,
      // // width: '80%',
      // // marginLeft: 7,
      //  height: 'auto'

      fontFamily: 'SF-UI-Display-Regular',
      fontSize: 17,
      color: 'white',
      marginLeft: 7,
      borderRadius: 10,
      paddingLeft: 15,
      alignItems: 'center'
    },
    left: {
      display: 'flex',
      alignItems: 'center'
    },
    right:{
      marginRight: 10,
      display: 'flex',
      alignItems: 'center'
    },
    sender: {
      color: 'white',
      textAlign: 'right',
      fontSize: 16,
      marginRight: 7,
      marginTop: 4,
      fontWeight: 'bold',
      
    },
    send: {
      width: 'auto',
      backgroundColor: 'gray',
      marginTop: 7,
     marginLeft: 50,
     borderRadius: 7,
     marginRight: 7
    },
    loader: {
      marginTop: 10,
      alignItems: 'center'
  },
  receive: {
    backgroundColor: 'rgb(51, 45, 45)',
    marginTop: 7,
    marginRight: 50,
    borderRadius: 7,
    marginLeft: 7
  },
  receiver: {
    color: 'rgb(174, 167, 167)',
    textAlign: 'left',
    fontSize: 16,
    marginLeft: 7,
    marginTop: 4,
    fontWeight: 'bold'
  },
  bottom: {
    flexDirection: 'row',
    width: '96%',
    backgroundColor: 'rgb(44, 43, 43)',
    borderRadius: 20,
    marginLeft: 7,
    marginRight: 7
  }, 
  footer:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 7,
    marginBottom: 5,
    paddingLeft: 7,
    paddingTop: 10,
    paddingBottom: 5,
    paddingRight: 7.6
  }
  })

