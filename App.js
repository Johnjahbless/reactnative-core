import React, {useEffect, useState, useMemo} from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Welcome from './src/screens/welcomeScreen'
import SignUp from './src/screens/signup'
import Profile from './src/screens/profile'
import SignIn from './src/screens/signin'
import ChatBox from './src/screens/chatBox'
import ChatList from './src/screens/chatList'
import {createDrawerNavigator} from '@react-navigation/drawer'
import AuthView from './src/screens/authView'
import Ionicons from 'react-native-vector-icons/Ionicons';
import DummyProfile from './src/screens/dummyProfile'
import EditProfile from './src/screens/editProfile'
import AsyncStorage from '@react-native-community/async-storage'
import {DrawerContent} from './src/component/DrawerContent'
import {View, Text} from 'react-native'
import Notifications from './src/screens/notifications'
import ViewPost from './src/component/viewPost'
import Search from './src/component/search'
import Buy from './src/screens/buy'
import Sell from './src/screens/sellScreen'
import {Image} from 'react-native'
import axios from 'axios'
import { baseUrl } from './src/component/konst'
import Withdrawal from './src/screens/withdrawal'
import Settings from './src/screens/settings'
import ChangePassword from './src/screens/changePassword'
import ChangePin from './src/screens/changePin'
import ChangeEmail from './src/screens/changeEmail'
import Payment from './src/screens/payment'

const AuthStack = createStackNavigator();

const Tabs = createBottomTabNavigator();

const Drawer = createDrawerNavigator();

let pic;
let email = '';
let username;
let tempRef = (base64Stringuri) => `${base64Stringuri}`;

const WelcomeScreen = ()=>(

  <Tabs.Navigator
  screenOptions={({ route }) => ({
   tabBarIcon: ({ focused, color, size }) => {
     let iconName;

     if (route.name === 'Home') {
       iconName = focused
         ? 'ios-home'
         : 'ios-home';
     } else if (route.name === 'ChatList') {
       iconName = focused ? 'ios-chatboxes' : 'ios-chatboxes';
     }
     else if (route.name === 'Notifications'){
       iconName = focused ? 'ios-notifications' : 'ios-notifications';
     }
     else if (route.name === 'Profile'){
       iconName = focused ? 'ios-person' : 'ios-person'
     }

     // You can return any component that you like here!
     return <Ionicons name={iconName} size={size} color={color} />;
   },
 })}
 tabBarOptions={{
   activeTintColor: 'rgb(167, 240, 218)',
   inactiveTintColor: 'white',
   style:{
     backgroundColor: 'rgb(1, 1, 48)',
     justifyContent: 'space-between'
   }
 }}
  >
  <Tabs.Screen name="Home" component={Welcome} options={{title: 'Dashboard'}} />
  <Tabs.Screen name="ChatList" component={ChatList} options={{title: 'Chats'}} />
  <Tabs.Screen name="Notifications" component={Notifications} options={{title: 'Notifications'}}/>
  <Tabs.Screen name="Profile" component={Profile} options={{title: 'Profile'}}/>
  </Tabs.Navigator>
)

  
let check = true;
export default ()=>{

  const [isLoading, setIsLoading] = useState(true);
  

  useEffect(()=>{

    CheckValid()

  }, [])

  const CheckValid = async ()=>{

    await AsyncStorage.removeItem('username')

   username = await AsyncStorage.getItem('username')

   email = await AsyncStorage.getItem('email')

  // axios.get(`${baseUrl}user/find/${username}`)
    
    if(!username){
      check = true
      setIsLoading(false)
      return
    }
     check = true
    setIsLoading(false)
  }

  const Loader = ()=>{

    return(
     // <Background>
        <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', height: '100%', width: '100%'}}>
          <Image source={require('./src/image/logo.jpeg')}  style={{width: 100, height: 100, 
        borderRadius: 70, marginTop: 6}} />
        </View>
      //</Background>
    )
  }


  return(
    <NavigationContainer> 
      {isLoading ? <Loader/> : !check ? 
      <AuthStack.Navigator>
        <AuthStack.Screen name='SignIn' component={SignIn} options={{headerShown: false}} />
          <AuthStack.Screen name='SignUp' component={SignUp} options={{headerShown: false}} />  
      </AuthStack.Navigator> : 
         <Drawer.Navigator drawerContent={props => <DrawerContent {...props} usernamee={username} pic={{uri: tempRef(pic)}} email={email} />}>
           <Drawer.Screen name='Welcome' component={WelcomeScreen} options={{headerShown: false}} />
           <Drawer.Screen name='Sell' component={Sell} />
           <Drawer.Screen name='Buy' component={Buy} />
           <Drawer.Screen name='Withdrawal' component={Withdrawal} />
           <Drawer.Screen name="Settings" component={Settings} />
           <Drawer.Screen name="ChangePassword" component={ChangePassword}/>
           <Drawer.Screen name='ChangePin' component={ChangePin} />
           <Drawer.Screen name='ChangeEmail' component={ChangeEmail} />
           <Drawer.Screen name='FundWallet' component={Payment}/>
           <Drawer.Screen name='ChatBox' component={ChatBox} />
       </Drawer.Navigator>
      } 
    </NavigationContainer>
  )
    
}

