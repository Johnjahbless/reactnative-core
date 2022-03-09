import React, {Component} from 'react'
import {View, Text, Button, ScrollView, StyleSheet, Image, TouchableHighlight, FlatList} from 'react-native'
import {baseUrl, scolor, pcolor} from '../component/konst'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 ,AntDesign } from '@expo/vector-icons'; 
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Post from '../component/post';
import Fantasy from '../component/fantasy';

let postt = []
let fantasyy = []
export default class Profile extends Component{

    constructor(props){
        super(props)
        this.state = {
            user: {},
            loading: true,
            post: [],
            fantasy: [],
            postColor: 'purple',
            fantansyColor: scolor,
            step: 1,
            dp: ''
        }
    }

   async componentDidMount(){

    try {
        let username = this.props.route.params.params.useridd
      //  let username = await AsyncStorage.getItem('username')
        let response = await fetch(`${baseUrl}user/${username}`, {method: 'get'})
        let result = await response.json()
        postt = result.post.reverse()
        fantasyy = result.fantasy.reverse()
        this.setState({user: result.user, loading: false, dp: result.user.profilepic.replace(/\\/g, '/')})
    } catch (error) {
       console.log(error) 
    }

    }

    componentWillUnmount(){
        this.setState({loading: true, post: [], user: []})
    }

    goBack = ()=>{
        this.props.navigation.goBack()
      }

      onPost = ()=>{
          this.setState({step: 1, postColor: 'purple', fantansyColor: scolor})
          
      }

      onFantasy = ()=>{
        this.setState({step: 2, postColor: scolor, fantansyColor: 'purple'})
        
    }
    

    render(){
        let {user, loading, dp, postColor, fantansyColor, step} = this.state
        dayjs.extend(relativeTime)

       let img = dp && dp.trim() !== '' ? ( <Image source={{uri: baseUrl+dp}} style={styles.image} />) :

       <Image source={require('../image/noimage.jpg')} style={styles.image} />

       // let tempRef = (base64Stringuri) => `${base64Stringuri}`;

        // postt = postt && postt.length < 1 ? <Text style={{color: scolor, fontSize: 17, textAlign: 'center'}}>No post yet</Text> : 
        // postt.map(p =>(
        //     <View key={p.id}>
        //         <Image source={{uri: tempRef(p.media)}}  style={styles.gallery} />
               
        //     </View>
        // ))

        return(
            <ScrollView style={styles.container}>
                {loading ? <Text style={{color: scolor, textAlign: 'center', marginTop: 20}}>Loading...</Text>:
                <View>
                <View style={{height: 40, width: '100%',flexDirection: 'row', marginTop: 30, marginBottom: 10}}>
                 <TouchableHighlight onPress={this.goBack}>
                 <View style={{marginLeft: 20, marginTop: 0}}><AntDesign name="leftcircle" size={24} color="purple" /></View>
                 </TouchableHighlight>
                 </View>
                    <Text style={{color: scolor, fontSize: 20, fontWeight: '700', textAlign:'center', marginBottom: 8, marginTop: -15}}>{user.username}</Text>
                 <View style={styles.head}>
                 {img}
                 
                 <View style={styles.headings}>
                     <Text style={{color: scolor, fontSize: 18, fontWeight: '700', textAlign:'center'}}>{postt.length}</Text>
                     <Text style={{color: 'rgb(199, 196, 196)', textAlign: 'center'}}>Posts</Text>
                 </View>

                 <View style={styles.headings}>
                     <Text style={{color: scolor, fontSize: 18, fontWeight: '700', textAlign:'center'}}>{fantasyy.length} </Text>
                     <Text style={{color: 'rgb(199, 196, 196)', textAlign: 'center'}}>Fantasy</Text>
                    
                 </View>

                 <View style={styles.headings}>
                     <Text style={{color: scolor, fontSize: 18, fontWeight: '700', textAlign:'center'}}>200 </Text>
                     <Text style={{color: 'rgb(199, 196, 196)', textAlign: 'center'}}>Following</Text>
                 </View>
                 </View>

                 <View>
                     <Text style={{color: scolor, fontSize: 18, fontWeight: '700', marginLeft: 15, marginTop: 7}}>{user.username}</Text>
                     
                        <Text style={{ color: scolor, marginLeft: 15, marginTop:4, width: 150}}>About: 
                        <Text style={{ color: 'rgb(126, 125, 125)',  marginTop:4, marginLeft: 3}}>{user.bio}</Text>
                        </Text>
                           
                     <View style={{display: 'flex', flexDirection: 'row'}}>
                         <Text style={{ color: scolor, marginLeft: 15, marginTop:4}}>Interested in:</Text>
                     <Text style={{ color: 'rgb(126, 125, 125)', marginLeft: 5, marginTop: 4}}>{user.lookingfor}</Text>
                     </View>

                     <View style={{display: 'flex', flexDirection: 'row'}}>
                         <Text style={{ color: scolor, marginLeft: 15, marginTop:4}}>Email:</Text>
                     <Text style={{ color: 'rgb(126, 125, 125)', marginLeft: 5, marginTop: 4}}>{user.email}</Text>
                     </View>

                     <View style={{display: 'flex', flexDirection: 'row'}}>
                         <Text style={{ color: scolor, marginLeft: 15, marginTop:4}}>Location:</Text>
                     <Text style={{ color: 'rgb(126, 125, 125)', marginLeft: 5, marginTop: 4}}>{user.state}</Text>
                     </View>

                     <View style={{display: 'flex', flexDirection: 'row'}}>
                         <Text style={{ color: scolor, marginLeft: 15, marginTop:4}}>Gender:</Text>
                     <Text style={{ color: 'rgb(126, 125, 125)', marginLeft: 5, marginTop: 4}}>{user.gender}</Text>
                     </View>
                     
                     <TouchableHighlight >
                 <View style={{ marginTop: 15,marginLeft: 15, height: 40, width: '90%', backgroundColor: 'rgb(37, 37, 37)', borderRadius: 10, borderWidth: 1, borderColor: scolor}}>
                    <Text style={{color: scolor, fontWeight: '500', fontSize: 18, textAlign: 'center',marginTop: 8}}>Message</Text>
                 </View>
                 </TouchableHighlight>

                 <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 20}}>
                     
                 <TouchableHighlight onPress={this.onPost} >
                 <View style={{marginRight: 20}}>
                 <MaterialCommunityIcons name="postage-stamp" size={35} color={postColor} />
                 </View>
                 </TouchableHighlight>

                 <TouchableHighlight onPress={this.onFantasy} >
                 <FontAwesome5 name="fantasy-flight-games" size={35} color={fantansyColor} />
                 </TouchableHighlight>
                 </View>

                 <View style={{marginTop: 5,marginBottom: 10, height: 15, width: '100%', borderBottomWidth: 0.3, borderColor: pcolor}}></View>

                 </View>
                  {step === 1 ?  <Post post={postt} /> : <Fantasy fantasy={fantasyy} />}
                 </View>
                }
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black'
    },
    head:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    headings: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    image:{
        width: '27%',
        height: 100,
        borderRadius: 50
    },  
    card: {
        width: '95%',
        height: 'auto',
        marginBottom: 15,
        display: 'flex',
        marginHorizontal: 10,
        borderBottomWidth: 1,
        borderColor: 'purple'
    },
    media:{
        width: '100%',
        height: 370
    },
    icon: {
        display: 'flex',
        flexDirection: 'row'
    }
})
