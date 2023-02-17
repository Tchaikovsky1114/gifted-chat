import { View } from 'react-native'
import React, {useEffect, useRef, useState } from 'react'

import { GiftedChat } from 'react-native-gifted-chat';
import JoinScreen from '../../screens/JoinScreen';




const Home = () => {

  const [receiveMessages, setReceiveMessages] = useState([]);
  const [hasJoined,setHasJoined] = useState('');
  const [username,setUsername] = useState('');
  
  const onSend = (messages) => {
    console.log(messages);
    socket.emit('message', messages[0].text);
    setReceiveMessages(prev => GiftedChat.append(prev,messages));
  }

  useEffect(() => {
    socket.on('message', message => {
      setReceiveMessages(prev => GiftedChat.append(prev, message));
    })
  },[])
  return (
    <View style={{flex:1}}>
    {
    hasJoined
    ? <GiftedChat
      renderUsernameOnMessage
      messages={receiveMessages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id:1,
        name:username
      }}
    />
      : <JoinScreen />
  }
    </View>
  )
}

export default Home
