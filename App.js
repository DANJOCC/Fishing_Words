import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import store from './app/store';
import Bouncer from './screens/bouncer/Bouncer';
import Login from './screens/bouncer/Login';
import SingUp from './screens/bouncer/SingUp';
import MenuGame from './screens/juego/MenuGame';
import Profile from './screens/juego/Profile';

const Pages= createNativeStackNavigator()

//orange soda:#F06543
//platinum:#E8E9EB
//alabaster:#E0DFD5
//onyx:#313638
//sandy brown:#F09D51


export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Pages.Navigator>
        <Pages.Screen 
          name='Bouncer'
          options={{
            headerShown: false
          }}
          component={Bouncer}
        />
         <Pages.Screen 
          name='Login'
          component={Login}
          options={{
            headerShown: false
          }}
        />
         <Pages.Screen 
          name='SignUp'
          component={SingUp}
          options={{
            headerShown: false
          }}
        />
          <Pages.Screen 
          name='MenuGame'
          component={MenuGame}
          options={{
            headerShown: false
          }}
        />
        <Pages.Screen 
          name='Profile'
          component={Profile}
          options={{
            headerShown: false
          }}
        />
      </Pages.Navigator>
    </NavigationContainer>
    </Provider>
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
