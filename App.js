import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { extendTheme, NativeBaseProvider, Box } from 'native-base';
import Header from './components/Header';
import Home from './components/Home';
import Menu from './components/Menu'; 
import AboutUs from './components/AboutUs';
import Carrinho from './components/Carrinho';
import ForgotPassword from './components/ForgotPassword';
import Login from './components/Login';
import HistoryScreen from './components/HistoryScreen'; 
import RelatarProblema from './components/RelatarProblema'
import ToastManager, { Toast } from 'toastify-react-native';
import Register from './components/Register';

const Stack = createStackNavigator();

const newColorTheme = {
  brand: {
    900: '#8287af',
    800: '#7c83db',
    700: '#b3bef6',
  },
};

const theme = extendTheme({ colors: newColorTheme });
 
const App = () => {
  return (
    <NativeBaseProvider theme={theme} >
      <Box flex={1} safeArea>
        <NavigationContainer>
        <ToastManager />
          <Header />
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="Menu" component={Menu} options={{ headerShown: false }} />
            <Stack.Screen name="AboutUs" component={AboutUs} options={{ headerShown: false }} />
            <Stack.Screen name="HistoryScreen" component={HistoryScreen} options={{ headerShown: false }} />
            <Stack.Screen name="RelatarProblema" component={RelatarProblema} options={{ headerShown: false }} />
            <Stack.Screen name="Carrinho" component={Carrinho} options={{ headerShown: false }}/>
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }}/>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
            <Stack.Screen name="Register" component={Register} options={{ headerShown: false }}/>
          </Stack.Navigator> 
        </NavigationContainer>
      </Box>
    </NativeBaseProvider>
  );
};

export default App;
