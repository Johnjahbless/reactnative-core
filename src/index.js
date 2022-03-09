import React,{Component} from 'react'
import 'react-native-gesture-handler';
import {View, Text, StyleSheet} from 'react-native'
//import Welcome from '../screens/welcomeScreen'
import SignUp from '../screens/signin'
import { createAppContainer, createBottomTabNavigator} from 'react-navigation'
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs'
import {Icon} from 'react-native-elements'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { AntDesign } from '@expo/vector-icons';
import {createStackNavigator} from '@react-navigation/stack'
//import Profile from '../screens/profile'

class Index extends Component{

    render(){

        return(
            <View style={styles.container}>
               <Text>Welcome to index.js</Text>
            </View>
        )
    }
}

const AuthStack = createStackNavigator();

const MessageStackScreen = ()=>(
    <AuthStack.Navigator>
      <AuthStack.Screen name="ChatList" component={ChatList} options={{title: 'Inbox'}} />
      <AuthStack.Screen name="ChatBox" component={ChatBox} options={{title: 'Conversation'}} />
    </AuthStack.Navigator>
  )

const TabNavigator = createBottomTabNavigator({
    welcome: {
        screen: Welcome,
        navigationOptions: {
            tabBarLabel: '',
            tabBarIcon: ()=>{
                <View>
                    <Icon name={'home'} size={25} style={{color: 'blue'}} />
                </View>
            }
        }
    },
    Profile: {
        screen: Profile,
        navigationOptions: {
            tabBarLabel: '',
            tabBarIcon: ()=>{
                <View>
                    <Icon name={'person'} size={25} style={{color: 'white'}} />
                </View>
            }
        }
    }
    ,
    Chat: {
        screen: MessageStackScreen,
        navigationOptions: {
            tabBarLabel: '',
            tabBarIcon: ()=>{
                <View>
                    <AntDesign name="wechat" size={24} color="black" />
                </View>
            }
        }
    }

})

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default createAppContainer(TabNavigator);
