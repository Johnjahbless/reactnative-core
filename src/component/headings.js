import React from 'react'
import {View, Text, Button, Image} from 'react-native'

const Headings = ({navigation, name, imgg})=>{

    return(
        <View style={{height: 40, width: '100%', flex: 1, flexDirection: 'row'}}>
        <TouchableHighlight onPress={()=> navigation.push('ChatList')}>
        <View style={{marginLeft: 20, marginTop: 12}}><AntDesign name="leftcircle" size={24} color="orange" /></View>
        </TouchableHighlight>
        <Image source={{uri: tempRef(imgg)}} style={{ width: 40, height: 40 ,borderRadius: 30, marginLeft: 20, marginTop: 5}} />
        <Text style={{color: 'orange', marginLeft: 5, marginTop: 12, fontSize: 18, fontWeight: '200'}}> {name} </Text>
      </View>
    )
}