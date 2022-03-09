import React from 'react'
import {View, StyleSheet, Text, Image} from 'react-native'
import {AntDesign, Octicons } from '@expo/vector-icons'; 
import {baseUrl} from '../component/konst'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

const Fantasy = ({fantasy})=>{

    dayjs.extend(relativeTime)

    return(
        <View>
            {fantasy.length > 0 ? fantasy.map(item =>{

                let {media, likes, comments, body, date, _id} = item

                let image = media.replace(/\\/g, '/')
                let like = likes.length !== 0 ? likes.length : null
                let comment = comments.length !== 0  ? comments.length : null
         
                return(
                    <View>
                        <View>
     
              <View>
             <View >
                {media ? 
                <View key={_id}>
                    <View elevation={5} style={styles.card}>
                    <Image source={{uri: baseUrl+image}} style={styles.media} />
                <View style={styles.icon}>
                <Text style={{color: 'white', fontSize: 17, marginTop: 1, marginLeft: 5}}>{like} </Text>
                
                 <Text><AntDesign name="heart" size={26} color="white" /></Text>
                 

                <Text style={{color: 'white', fontSize: 17, marginTop: 1, marginLeft: 7}}>{comment} </Text>
                <Text><Octicons name="comment" size={26} color="white" /></Text>
             
                </View>

                <Text style={{color: 'white', }}>{body}</Text> 
                 {/* <Text>{comments && comments}</Text>  */}
                <Text style={{color: 'rgb(121, 121, 121)', marginBottom: 6}}>{dayjs(date).fromNow()}</Text> 
                  </View>
                  
                  
                </View>:
                <View elevation={5} style={styles.card} key={_id}>
                    <Text style={{color: 'white'}}>{body}</Text>
                 <View style={styles.icon}>
                <Text style={{color: 'white', fontSize: 17, marginTop: 1, marginLeft: 5}}>{like} </Text>
                 <Text><AntDesign name="heart" size={26} color="white" /></Text>
                 
                <Text style={{color: 'white', fontSize: 17, marginTop: 1, marginLeft: 7}}>{comment} </Text>
                <Text><Octicons name="comment" size={26} color="white" /></Text>
                </View>
                <Text style={{color: 'rgb(121, 121, 121)', marginBottom: 6}}>{dayjs(date).fromNow()}</Text> 
                </View>    
                }
                
               </View>
              </View>
           </View>   
                    </View>
                )
            })
            :<Text style={{color: 'white', textAlign: 'center', fontSize: 20}}>No post yet</Text>
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
        borderBottomWidth: 1,
        borderColor: 'purple'
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

export default Fantasy