import { StyleSheet } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStore, applyMiddleware } from 'redux';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';

const socket = io('http://192.168.50.64:4001');
const socketIoMiddleware = createSocketIoMiddleware(socket, 'server/');

function reducer(state = {}, action) {
  switch(action.type) {
    case 'message':
      return { ...state, message: action.data }
      default :
      return state;
  }
}

let store = applyMiddleware(socketIoMiddleware)(createStore)(reducer);

store.subscribe(() => {
  console.log("new state", store.getState());
})

store.dispatch({type:"server/hello", data:'hello!'});

export default function App() {
  return (
    <NavigationContainer>
      <HomeScreen />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
