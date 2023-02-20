import { FlatList, Image, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'


const FriendList = () => {
  const [username,setUsername] = useState('');
  
  const usersOnline = useSelector(state => state.usersOnline);

  console.log(usersOnline);
  
  return (
    <View style={{flex:1, justifyContent:'flex-start',alignItems:'center'
    }}>
      <View style={{marginVertical:24}}>
      <Text style={{fontSize:32, fontWeight:'bold'}}>Online</Text>
      </View>

      <FlatList
      data={usersOnline}
      keyExtractor={(item) => item.userId}
      extraData={usersOnline}
      ItemSeparatorComponent={() => <View style={{height:24}} />}
      renderItem={({item}) => (
      <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',alignItems:'center',backgroundColor:'#fff',paddingHorizontal:24,borderRadius:16,paddingVertical:8}}>
        <Image style={{width:64,height:64,borderRadius:64}} source={{uri: item.avatar}} />
        <View style={{width:24}}/>
        <Text style={{fontSize:18,fontWeight:'bold',color:username === item.username ? '#2d63e2' : '#000'}}>{item.username} {username === item.username ? '(나)' : null}</Text>
      </View>)}
      />

      
    </View>
  )
}

export default FriendList
