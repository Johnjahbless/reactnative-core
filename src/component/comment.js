import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useNavigation } from '@react-navigation/native';


const Comment = ({comment})=>{
    
    const navigation = useNavigation(); 
    dayjs.extend(relativeTime)

    return(
        <View style={{width: '100%'}}>
            {comment && comment.map(item =>(
                <TouchableOpacity onPress={()=>navigation.push('DummyProfile',{params: {useridd: item.username}})}>
                      <View style={styles.wrapper} key={item._id}>
                    <View style={styles.section} >
                        <Text style={styles.user}>{item.username}</Text>
                        <Text style={styles.text}>{item.body} </Text>
                    </View>
                    <Text style={styles.time}>{dayjs(item.date).fromNow()}</Text>
                </View>
                </TouchableOpacity>
              
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    section:{
       display: 'flex',
       flexDirection: 'row',
       alignItems: 'center',
       marginRight: 7,
       marginLeft: 7 
    },
    text: {
        color: 'white',
        fontSize: 13
    },
    user: {
        color: '#b614b6',
        fontSize: 18,
        fontWeight: '500',
        marginRight: 7
    },
    time:{
        color: 'gray',
        fontSize: 13,
        marginLeft: 7,
        marginBottom: 10 
    }
})

export default Comment