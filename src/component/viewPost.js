import React, { useEffect, useState } from 'react'
import { View, FlatList, Text, Image, StyleSheet, ScrollView, TouchableHighlight,ActivityIndicator, TextInput, KeyboardAvoidingView} from 'react-native'
import axios from 'axios'
import { baseUrl, scolor, pcolor, mcolor, bcolor } from '../component/konst'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import { AntDesign, Octicons,FontAwesome,MaterialCommunityIcons,FontAwesome5} from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage'
import ModallD from './deleteModal';
import Comment from './comment';
import Like from './likes';

const ViewPost = ({navigation, route})=>{

    const [userid, setUserid] = useState('')
    const [loading, setLoading] = useState(true)
    const [username, setUsername] = useState('')
    const [comments, setComments] = useState([])
    const [likes, setLikes] = useState([])
    const [post, setPost] = useState({})
    const [alert, setAlert] = useState(false)
    const [image, setImage] = useState('')
    const [step, setStep] = useState(1)
    const [comVisible, setComVisible] = useState(false)
    const [comCol, setComcol] = useState(mcolor)
    const [likeCol, setLikecol] = useState(scolor)
    const [body, setBody] = useState('')
    const [img, setImg] = useState('')

    dayjs.extend(relativeTime)


useEffect(()=>{

    const getAll = async ()=>{
      await getUsername()
      await getPost()
    }

    getAll()

}, [body])

const getPost = ()=>{
    const id = route.params.params.postid
    const dp = route.params.params.image
    axios.get(`${baseUrl}post/post/${id}`)
    .then(res => {
        setUsername(res.data.post.username);
        setPost(res.data.post);
        setComments(res.data.comments.reverse());
        setLikes(res.data.likes);
        setImage(res.data.post.media.replace(/\\/g, '/'));
        setImg(dp)
        setLoading(false)
        
        //console.log(res.data.post._id)
    })
    .catch(err => setLoading(false))
}

const getUsername = async()=>{
    try {
        let username = await AsyncStorage.getItem('username')
        setUserid(username)
    } catch (error) {
        console.log(error)
    }
}

const onDelete = ()=>{

    setAlert(!alert)
}

const cancel = ()=>{
    setAlert(!alert)
}

const dummyProfile = (name)=>{
    navigation.push('DummyProfile', {
        params: { useridd: name }
      })
}

let show = body === '' ? 'none' : 'flex'


const comment = comments.length !== 0  ? comments.length : null
const like = likes.length > 0 ? likes.length : null


const trash = username === userid ? <TouchableHighlight onPress={onDelete}>
    <FontAwesome name="trash-o" size={30} color="red" /> 
</TouchableHighlight> : null

const dp =  img.trim() !== '' ? <Image source={{uri: baseUrl+img}} style={{width: 45, height: 45, marginLeft: 7,
    borderRadius: 30, marginTop:-7}} /> 
: <Image source={require('../image/noimage.jpg')} style={{ width: 40, height: 40 ,borderRadius: 30, marginLeft: 20, marginTop: 5}} />


    return(
        <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
      >
        <View style={styles.container}>
            <View style={{ width: '100%'}}>
            <View style={{height: 30, width: '100%',flexDirection: 'row', marginTop: 30, marginBottom: 10}}>
                 <TouchableHighlight onPress={() => navigation.goBack()}>
                 <View style={{marginLeft: 20, marginTop: 0, display: 'flex', flexDirection: 'row'}}>
                   <AntDesign name="leftcircle" size={28} color={scolor} /> 
                   <TouchableHighlight onPress={()=>dummyProfile(username)}>
                   <Text style={{color: scolor, fontSize: 19, marginLeft: 15}}>{username}</Text>
                   </TouchableHighlight>
                   
                   <Text style={{color: 'red',  marginLeft: 15}}>{trash}</Text>
                 </View>
                 </TouchableHighlight>
            </View>
            {loading ?
             <View style={styles.loader}>
             <ActivityIndicator size='large' />
            </View> : 
            <ScrollView>
                <View style={{display: 'flex', justifyContent: 'center', alignposts: 'center'}}>
                            <View style={styles.card} >
                               
                               {image ? 
                               <View>
                               <Image source={{uri: baseUrl+image}} style={styles.media} />
                               <View style={styles.icon}>
                               <Text style={{color: '#cc0dcc', fontSize: 17, marginTop: 1, marginLeft: 5}}>{like} </Text>
                               
                                <Text><AntDesign name="heart" size={26} color={scolor} /></Text>
                                

                               <Text style={{color: '#cc0dcc', fontSize: 17, marginTop: 1, marginLeft: 7}}>{comment} </Text>
                               <Text><Octicons name="comment" size={26} color={scolor} /></Text>
                            
                               </View>

                               <Text style={{color: scolor, marginLeft: 5, marginRight: 5}}>{post.body}</Text> 
                               {/* <Text>{post.comments && post.comments}</Text> */}
                               <Text style={{color: 'rgb(121, 121, 121)', marginBottom: 6}}>{dayjs(post.date).fromNow()}</Text>   
                               </View>:
                               <View>
                                   <Text style={{color: scolor, marginLeft: 5, marginRight: 5}}>{post.body}</Text>
                                <View style={styles.icon}>
                               <Text style={{color: '#cc0dcc', fontSize: 17, marginTop: 1, marginLeft: 5}}>{like} </Text>
                                <Text><AntDesign name="heart" size={26} color={scolor} /></Text>
                                
                               <Text style={{color: '#cc0dcc', fontSize: 17, marginTop: 1, marginLeft: 7}}>{comment} </Text>
                               <Text><Octicons name="comment" size={26} color={scolor} /></Text>
                               </View>
                               <Text style={{color: 'rgb(121, 121, 121)', marginBottom: 6}}>{dayjs(post.date).fromNow()}</Text> 
                               </View>    
                               }
                               
                            </View>
                </View>
                <View style={{marginTop: -13,height: 50, width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                   <TouchableHighlight onPress={()=>{
                       setStep(1)
                       setComcol(mcolor)
                       setLikecol(scolor)
                   }}> 
                       <Text style={{color: comCol, fontSize: 20, marginRight: 20}}>Comments</Text>
                   </TouchableHighlight>

                   <TouchableHighlight onPress={()=>{
                        setStep(2)
                        setComcol(scolor)
                        setLikecol(mcolor)
                   }}>
                   <Text style={{color: likeCol, fontSize: 20}}>Likes</Text>
                   </TouchableHighlight>
                </View>

                {step === 1 ? <Comment comment={comments}/> : <Like like={likes} /> }
                <ModallD camvisible={alert} setcamvisible={cancel} cancel={cancel} />
            </ScrollView>
            }
            </View>

             <View style={{bottom: 0, width: '100%',
              height: 50, position: 'absolute', display: 'flex', flexDirection: 'row'}}>
              {dp}

            <View style={{width: '82%', marginLeft: 7, marginRight: 5, height: '95%',borderColor: scolor, marginTop:-7,
            borderWidth: 1,borderRadius: 30, display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgb(33, 33, 33)'}}>
            <TextInput
            onChangeText={text => setBody(text)}
            placeholder='Add a comment'
            placeholderTextColor={scolor}
            value={body}
            autoCorrect={true}
             multiline={true} style={{color: scolor,  height: 40, fontSize: 15, width: '87%', padding: 10}} /> 
            <TouchableHighlight style={{display: show}}>
                <Text style={{color: '#b614b6', marginRight: 15, fontSize: 17, fontWeight: '500'}}>Post</Text>
            </TouchableHighlight>
            </View>
                
            </View> 
        </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: bcolor,
        flex: 1,
        width: '100%',
        flexDirection: 'column'
    },
    loader: {
        marginTop: '10%',
        alignItems: 'center'
    },
    card: {
        width: '95%',
        height: 'auto',
        marginBottom: 15,
        display: 'flex',
        marginHorizontal: 10,
        borderBottomWidth: 1,
        borderColor: scolor
    },
    media:{
        width: '100%',
        height: 300
    },
    icon: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 7
    }
})

export default ViewPost
