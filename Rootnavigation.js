import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Navigation1 from './components/screens/onBoardingFlow/Navigation';
import Navigation2 from './components/screens/BottomNavigator/Navigation2';

const Stack = createStackNavigator();

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Navigation1" component={Navigation1} />
        <Stack.Screen name="Navigation2" component={Navigation2} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
