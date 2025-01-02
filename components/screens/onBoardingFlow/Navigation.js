import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { checkUserAuth } from '../../API/auth';
import { setUser } from '../../redux/slices/userSlices';
import SplashScreen from './splashScreen';
import LoginScreen from './loginScreen';
import AuthenticationScreen from './authenticationScreen';
import WelcomeBackpage from './WelcomeBackpage';
import YouAreAuthenticated from './YouAreAuthenticated';
import Passwordset from "./Passwordset";
import ProfileSetup from './ProfileSetup';
import Profile from './Profile';
import ProfileFeed from "../BottomNavigator/FirstFeed";
import ProfileInformation3 from "./ProfileInformation3";
import ProfileInformation4 from './ProfileInformation4';
import ProfileInformation5 from './ProfileInformation5';
import Processing from "./Processing";
import ProfileReady from './ProfileReady';
import WelcomeScroll from "./WelcomeScroll";
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import PasswordSetup from "./PasswordSetup";
import VerificationScreen from "./VerificationScreen";
import CreatedAccount from "./CreatedAccount";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Verification2 from "./Verification2";


const Stack = createStackNavigator();

export default function Navigation() {
  const [appReady, setAppReady] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [user, set_user] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const user_token = await AsyncStorage.getItem('user_token');
      //console.log(local_storage?.user)
      if (user_token) {
        // await AsyncStorage.removeItem('google_details');
        // await AsyncStorage.removeItem('goal_id');
        // await AsyncStorage.removeItem('profile_setup');
        // await AsyncStorage.removeItem('user_token');
       set_user(true);

      }
      setDataFetched(true)
    };

    const splashTimeout = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    fetchData();
    return () => {
      clearTimeout(splashTimeout);
    };
  }, [user]);

  const handleUserSet = () => {
    set_user(true);
  };

  return (

    <Stack.Navigator screenOptions={{ headerShown: false }}  initialRouteName="Splash">

      {!dataFetched && (
        <Stack.Screen name="Loader">
          {() => (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color="#0000ff" />
              <Stack.Screen name="Splash" component={SplashScreen} />
            </View>
          )}
        </Stack.Screen>
      )}
      {!user ? (
        <>
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="AuthenticationScreen">
            {props => <AuthenticationScreen {...props} handleUserSet={handleUserSet} />}

          </Stack.Screen>
          <Stack.Screen name="Passwordset">
            {props => <Passwordset {...props} handleUserSet={handleUserSet} />}
          </Stack.Screen>

          <Stack.Screen name="WelcomeBackpage" >
            {props => <WelcomeBackpage {...props} handleUserSet={handleUserSet} />}
          </Stack.Screen>
          <Stack.Screen name='ProfileReady' component={ProfileReady} />
          <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
          <Stack.Screen name='ResetPassword' component={ResetPassword} />
          <Stack.Screen name='PasswordSetup' component={PasswordSetup} />
          <Stack.Screen name='VerificationScreen' component={VerificationScreen} />
          <Stack.Screen name='CreatedAccount' component={CreatedAccount} />
          <Stack.Screen name="Verification2" component={Verification2} />

        </>
      ) : (
        <>
          <Stack.Screen name='WelcomeScroll' component={WelcomeScroll} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="ProfileSetup" component={ProfileSetup} />
          <Stack.Screen name='ProfileInformation3' component={ProfileInformation3} /> 
          <Stack.Screen name='ProfileInformation4' component={ProfileInformation4} />
          <Stack.Screen name='ProfileInformation5' component={ProfileInformation5} />
          <Stack.Screen name='Processing' component={Processing} />
          <Stack.Screen name='ProfileReady' component={ProfileReady} />
          <Stack.Screen name="ProfileFeed" component={ProfileFeed} />
          <Stack.Screen name="Verification2" component={Verification2} />
         
          <Stack.Screen name="YouAreAuthenticated" component={YouAreAuthenticated} />
        </>


      )}
    </Stack.Navigator>

  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
