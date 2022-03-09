import React from 'react'
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native'
import { AntDesign, Octicons } from '@expo/vector-icons'; 
import {baseUrl, scolor} from '../component/konst'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useNavigation } from '@react-navigation/native';
 

const Post = ({post,img})=>{

    const navigation = useNavigation();
    dayjs.extend(relativeTime)

    return(
        <View>
            {post.length > 0 ? post.map((item, e) =>{
                
                let {media, likes, comments, body, date, _id} = item

                let image = media.replace(/\\/g, '/')
                let like = likes.length !== 0 ? likes.length : null
                let comment = comments.length !== 0  ? comments.length : null
         
                return(
                    <View>
                        <View>
     
              <TouchableOpacity key={e} onPress={()=> navigation.push('Viewpost', {
              params: {postid: _id, image: img}
               })}>
             <View>
                {media ? 
            
                <View  >
                    <View elevation={5} style={styles.card}>
                    <Image source={{uri: baseUrl+image}} style={styles.media} />
                <View style={styles.icon}>
                <Text style={{color: '#cc0dcc', fontSize: 17, marginTop: 1, marginLeft: 5}}>{like} </Text>
                
                 <Text><AntDesign name="heart" size={26} color={scolor} /></Text>
                 

                <Text style={{color: '#cc0dcc', fontSize: 17, marginTop: 1, marginLeft: 7}}>{comment} </Text>
                <Text><Octicons name="comment" size={26} color={scolor} /></Text>
             
                </View>

                <Text style={{color: scolor, }}>{body}</Text> 
                 {/* <Text>{comments && comments}</Text>  */}
                <Text style={{color: 'rgb(121, 121, 121)', marginBottom: 6}}>{dayjs(date).fromNow()}</Text> 
                  </View>
                  
                  
                </View>:
                <View elevation={5} style={styles.card}  >
                    <Text style={{color: scolor}}>{body}</Text>
                 <View style={styles.icon}>
                <Text style={{color: '#cc0dcc', fontSize: 17, marginTop: 1, marginLeft: 5}}>{like} </Text>
                 <Text><AntDesign name="heart" size={26} color={scolor} /></Text>
                 
                <Text style={{color: '#cc0dcc', fontSize: 17, marginTop: 1, marginLeft: 7}}>{comment} </Text>
                <Text><Octicons name="comment" size={26} color={scolor} /></Text>
                </View>
                <Text style={{color: 'rgb(121, 121, 121)', marginBottom: 6}}>{dayjs(date).fromNow()}</Text> 
                </View>    
                }
                
               </View>
              </TouchableOpacity>
           </View>   
                    </View>
                )
            })
            :<Text>No post yet</Text>
            }
        </View>
    )
}


const styles = StyleSheet.create({ 
    card: {
        width: '95%',
        height: 'auto',
        marginBottom: 15,
        display: 'flex',
        marginHorizontal: 10,
        borderBottomWidth: 0.3,
        borderColor: 'gray'
    },
    media:{
        width: '100%',
        height: 370,
        marginBottom: 4
    },
    icon: {
        display: 'flex',
        flexDirection: 'row'
    }
})

export default Post