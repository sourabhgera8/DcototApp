import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './apps/screens/SplashScreen';
import CreateRecord from './apps/screens/CreateRecord';
import ReportScreen from './apps/screens/ReportScreen';

const Stack = createNativeStackNavigator();
  
  function Routes() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SplashScreen">

          <Stack.Screen  options={{headerShown: false}}  
          name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="CreateRecord" component={CreateRecord}      />
          <Stack.Screen name="ReportScreen" component={ReportScreen}      /> 

        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  
  export default Routes;