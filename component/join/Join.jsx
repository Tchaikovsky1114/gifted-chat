import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'
import { FontAwesome5 } from '@expo/vector-icons';



import { useNavigation } from '@react-navigation/native';

const Join = () => {
  const [username,setUsername] = useState();  
  const navigation = useNavigation();

  const joinChat = (username) => {
    socket.emit('join', username);
    navigation.navigate('FriendList');
    setHasJoined(true);  
  }
  
  return (
    <View style={{flex:1, alignItems:'center', justifyContent:'space-around'}}>
      <View style={{justifyContent:'center',alignItems:'center'}}>
        <Text style={{fontWeight:'bold',fontSize:32,padding:8}}>Rocket Chat</Text>
      <FontAwesome5 name="rocketchat" size={220} color="#2d63e2" />
      </View>
      <TextInput value={username} onChangeText={(text) => setUsername(text)} style={{backgroundColor:'#fff',paddingHorizontal:16,paddingVertical:2,marginTop:8,fontSize:30,borderRadius:8}} placeholder='Enter your name' />
      <View style={{marginTop:8,paddingBottom:Platform.OS === 'ios' ? 70 : 0}}>
        <TouchableOpacity onPress={() => joinChat(username) } activeOpacity={0.5}>
          <Text style={{fontSize:24,color:'#2d63e2'}}>Join Chat</Text>
        </TouchableOpacity>
      </View>
      {Platform.OS === 'ios' && <KeyboardAvoidingView behavior='padding' />}
      
    </View>
  )
}

export default Join
