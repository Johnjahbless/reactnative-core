import React, { useEffect, useState } from 'react'
import {View, Text, StyleSheet, Image, Button, Switch, ImageBackground} from 'react-native'
import { AntDesign, SimpleLineIcons, Entypo } from '@expo/vector-icons'; 
import {pcolor,scolor,mcolor,fcolor} from './konst'
import {baseUrl} from './konst'
import AsyncStorage from '@react-native-community/async-storage'
import { TouchableOpacity } from 'react-native-gesture-handler';
// import {AuthContext} from '../context'

export function DrawerContent({pic, email, usernamee, navigation}){

    const [img, setImg] = useState('')

    useEffect(()=>{

        async function getImage(){
            try {
                // let image = await AsyncStorage.getItem('dp')
                // setImg(image)
                // console.log(image)
            } catch (error) {
                console.log(error)
            }
        }

        getImage()

    }, [])

    const gotoWithdraw = ()=>{
        navigation.navigate('Withdrawal')
      }

    // const {signOut} = useContext(AuthContext)
  //  const [isDarkTheme, setIsDarkTheme] = useState(false);

    // const toggleTheme = ()=>{
    //     setIsDarkTheme(!isDarkTheme)
    // }

    let dp = img.trim() !== '' ? <Image source={{uri: baseUrl+img}} style={{ width: 40, height: 40 ,borderRadius: 30, marginLeft: 5, marginTop: 5}} /> 
      : <Image source={require('../image/noimage.jpg')} style={{ width: 40, height: 40 ,borderRadius: 30, marginLeft: 20, marginTop: 5}} />

    return(
        <View style={{flex: 1, backgroundColor: 'white                                                                                                                     '}}>
            <ImageBackground 
            source={require('../image/dog.jpg')}
            style={{width: '100%', height: '100%', }}
            >
                <View style={styles.userInfoSection}>
                    <View style={{flexDirection: 'row', marginTop: 30}}>
                    <Image source={require('../image/noimage.jpg')} style={{ width: 40, height: 40 ,borderRadius: 30, marginLeft: 5, marginTop: 5}} />
                    <View style={{marginLeft: 5, flexDirection: 'column'}}>
                        <Text style={styles.title}>olamide oladayo</Text>
                        <Text style={styles.caption}> olamide@gmail.com </Text>
                    </View>
                  </View>
                </View>

                <View>
                    <Text style={{color: 'white', marginTop: 30, marginLeft: 25, fontSize: 17}}>Money Funded</Text>
                    <Text style={{color: 'white',marginTop: 5, marginLeft: 25, fontSize: 20, fontWeight: '600'}}>N789,000.00</Text>
                </View>

                <View style={styles.drawerSection}>
                <View style={{flexDirection: 'row'}}>
               <View style={{marginTop: 20, marginLeft: 5, marginRight: 40}}>
                   <AntDesign name="home" size={30} color={fcolor}/>
                   </View> 
                   <TouchableOpacity >
                    <Text style={{color: 'white', marginTop: 23, fontWeight: '600', fontSize: 24, marginLeft: -15}}>Dashboard</Text>
                </TouchableOpacity>
                </View>

                <View style={{flexDirection: 'row'}}>
               <View style={{marginTop: 20, marginLeft: 5, marginRight: 40}}>
               <SimpleLineIcons name="wallet" size={30} color="white" />
                   </View> 
                   <TouchableOpacity onPress={()=>navigation.navigate('FundWallet')}>
                    <Text style={{color: 'white', marginTop: 23, fontWeight: '600', fontSize: 24, marginLeft: -15}}>Fund Wallet</Text>
                </TouchableOpacity>
                </View>

                <View style={{flexDirection: 'row'}}>
               <View style={{marginTop: 20, marginLeft: 5, marginRight: 40}}>
                  <Entypo name="arrow-with-circle-up" size={30} color="white" />
                   </View> 
                   <TouchableOpacity onPress={()=>gotoWithdraw()}>
                    <Text style={{color: 'white', marginTop: 23, fontWeight: '600', fontSize: 24, marginLeft: -15}}>Withdrawal</Text>
                </TouchableOpacity>
                </View>

                <View style={{flexDirection: 'row'}}>
               <View style={{marginTop: 20, marginLeft: 5, marginRight: 40}}>
                   <AntDesign name="setting" size={30} color={fcolor} />
                   </View> 
                <TouchableOpacity onPress={()=>{navigation.navigate('Settings')}}>
                    <Text style={{color: 'white', marginTop: 23, fontWeight: '600', fontSize: 24, marginLeft: -15}}>Settings</Text>
                </TouchableOpacity>
                </View>

                <View style={{flexDirection: 'row'}}>
               <View style={{marginTop: 20, marginLeft: 5, marginRight: 40}}>
               <AntDesign name="logout" size={30} color={fcolor} />
                   </View> 
                <TouchableOpacity>
                    <Text style={{color: 'white', marginTop: 23, fontWeight: '600', fontSize: 24, marginLeft: -15}}>Logout</Text>
                </TouchableOpacity>
                </View>

                </View>
              
            </ImageBackground>

            <View style={styles.bottomDrawerSection}>
                <View style={{flexDirection: 'row'}}>
               <View style={{marginTop: 10, marginLeft: 20, marginRight: 30}}>
                   <AntDesign name="logout" size={24} color={fcolor} />
                   </View> 
                <Button title='Sign Out' color='white' onPress={() => console.log('hellos')} />
                </View>
            </View>
       </View>
   
    )
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
        backgroundColor: 'rgb(9, 56, 126)',
    },
    userInfoSection: {
        paddingLeft: 20
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
        color: fcolor
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        color: 'white'
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
        color: fcolor
    },
    drawerSection: {
        marginTop: 25,
        marginLeft: 20
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: pcolor,
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16
    }
})