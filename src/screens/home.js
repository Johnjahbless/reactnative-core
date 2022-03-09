import React, {Component} from 'react'
import {View, Text} from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import Welcome from './welcomeScreen'
import SignUp from './signup'

const AuthStack = createStackNavigator();
export default ()=>(

    <NavigationContainer>
        <AuthStack.Navigator>
            <AuthStack.Screen name='Welcome' component={Welcome} />
            <AuthStack.Screen name='signup' component={SignUp} />
        </AuthStack.Navigator>
    </NavigationContainer>
)
