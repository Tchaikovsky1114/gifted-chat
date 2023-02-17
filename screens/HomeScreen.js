import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Home from '../component/home/Home'
import Join from '../component/join/Join'
import FriendList from '../component/friendList/FriendList'


const Stack = createStackNavigator()

const HomeScreen = () => {

  return (
    
      <Stack.Navigator initialRouteName='Join'>
        <Stack.Screen name="Join" component={Join}  />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="FriendList" component={FriendList} />
      </Stack.Navigator>
    
  )
}

export default HomeScreen