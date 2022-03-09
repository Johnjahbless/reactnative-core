import React from 'react'
import {View, Text, TouchableHighlight, StyleSheet, TouchableOpacity, StatusBar} from 'react-native'
import { AntDesign, MaterialIcons,Fontisto,Foundation } from '@expo/vector-icons'; 


const Settings = ({navigation})=>{

    const MyStatusBar = ({backgroundColor, ...props}) => (
        <View style={[styles.statusBar, { backgroundColor }]}>
          <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
      )

    return(
        <View style={{height: '100%', width: '100%'}}>
            <MyStatusBar backgroundColor="white" barStyle="dark-content" />
             <View style={{height: '16%', width: '100%',flexDirection: 'row', marginTop: 20}}>
             <TouchableHighlight onPress={()=>navigation.goBack()}>
             <View style={{marginLeft: 15, marginTop: 18}}><AntDesign name="leftcircle" size={30} color='black' /></View>
             </TouchableHighlight>
             <Text style={{color: 'black', marginTop: 18, marginLeft: '22%', fontSize: 27}}>Settings</Text>
             </View>

             <View style={{marginTop: 0, width: '100%', height: 'auto', display: 'flex', flexDirection: 'column'}}>
                    <TouchableOpacity style={styles.sett} onPress={()=> navigation.navigate('ChangePassword')}>
                    <Text><Foundation name="key" size={30} color="black" /></Text>
                    <View style={styles.line}>
                        <Text style={{fontSize: 19, fontWeight: '500', marginTop: 6}}>Change Password</Text>
                        <MaterialIcons name="keyboard-arrow-right" size={35} color="gray" />
                    </View>
                    </TouchableOpacity>

                <TouchableOpacity style={styles.sett} onPress={()=> navigation.navigate('ChangePin')}>
                    <Text><MaterialIcons name="lock-outline" size={30} color="black" /></Text>
                    <View style={styles.line}>
                        <Text style={{fontSize: 19, fontWeight: '500', marginTop: 6}}>Change Pin</Text>
                        <MaterialIcons name="keyboard-arrow-right" size={35} color="gray" />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.sett} onPress={()=> navigation.navigate('ChangeEmail')}>
                    <Text><Fontisto name="email" size={30} color="black" /></Text>
                    <View style={styles.line}>
                        <Text style={{fontSize: 19, fontWeight: '500', marginTop: 6}}>Change Email</Text>
                        <MaterialIcons name="keyboard-arrow-right" size={35} color="gray" />
                    </View>
                </TouchableOpacity>
             </View>
        </View>
    )
}

const styles = StyleSheet.create({
        sett:{
            width: '100%',
            height: 40,
            display: 'flex',
            flexDirection: 'row',
            marginRight: 15,
            marginLeft: 15,
            marginBottom: 30
        },
        line:{
            marginLeft: 15,
            width: '73%',
            height: 40,
            borderBottomWidth: 1,
            borderBottomColor: 'gray',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
        }
})

export default Settings;