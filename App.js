import React, { useState, useEffect } from 'react';
import { View, StatusBar, ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';
import { Provider } from 'react-redux';
import store from './components/redux/store';
import RootNavigation from './Rootnavigation';
import { setCustomText } from 'react-native-global-props';




const fonts = {
  'Poppins-Regular': require('./assets/Fonts/Poppins-Regular.ttf'),
  'Poppins-Bold': require('./assets/Fonts/Poppins-Bold.ttf'),
  'Poppins-SemiBold': require('./assets/Fonts/Poppins-SemiBold.ttf'),
  'Poppins-Light': require('./assets/Fonts/Poppins-Light.ttf'),
  'Poppins-Medium': require('./assets/Fonts/Poppins-Medium.ttf'),
};


export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync(fonts);
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      const customTextProps = {
        style: {
          fontFamily: 'Poppins-Regular',
        },
      };
      setCustomText(customTextProps);
     
    }
  }, [fontsLoaded]);

  // if (!fontsLoaded) {
  //   return <ActivityIndicator size="large" color="#0000ff" />;
  // }

  return (
      <>
       <StatusBar
        backgroundColor="transparent"
        transparent={true}
        barStyle="dark-content"
      />
       <RootNavigation />
      </>
  );
}
