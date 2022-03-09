import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

const Like = ({navigation,like})=>{

    const dummyProfile = (name)=>{
        navigation.push('DummyProfile', {
            params: { useridd: name }
          })
    }

    dayjs.extend(relativeTime)

    return(
        <View style={{width: '100%'}}>
            {like && like.map(item =>(
                <TouchableOpacity onPress={()=>dummyProfile(item.username)}>
                    <View style={styles.wrapper} key={item._id}>
                    <Text style={styles.user}>{item.username}</Text>
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
    user: {
        color: '#b614b6',
        fontSize: 18,
        fontWeight: '500',
        marginLeft: 7
    },
    time:{
        color: 'gray',
        fontSize: 13,
        marginLeft: 7,
        marginBottom: 5
    }
})

export default Like;