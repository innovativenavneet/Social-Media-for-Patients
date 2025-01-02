import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
//import { setUser, clearUser } from '../redux/slices/userSlices';
import { StackActions } from '@react-navigation/native';

// Google Sign-in Configuration
GoogleSignin.configure({
  webClientId: '896882638088-agu668plvrennjkc7s0f26o5qji119jm.apps.googleusercontent.com',
});


// Google Sign-in
export const onGoogleButtonPress = async () => {
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    const userCredential = await auth().signInWithCredential(googleCredential);
    const userData = userCredential.user.toJSON();
    await AsyncStorage.setItem('user', JSON.stringify(userData));
    return userData;
  } catch (error) {
    console.error('Failed to authenticate with Google:', error);
    throw error;
  }
};

// // Create user with email and password
// export const createUserWithEmailAndPassword = async (email, password) => {
//   try {
//     const userCredential = await auth().createUserWithEmailAndPassword(email, password);
//     const userData = userCredential.user.toJSON();
//     console.log(userData);
//     await AsyncStorage.setItem('user', JSON.stringify(userData));
//     return userData;
//   } catch (error) {
//     console.error('Failed to create account:', error);
//     throw error;
//   }
// };


// Check if user is authenticated
export const checkUserAuth = async (dispatch) => {
  const savedUser = await AsyncStorage.getItem('user');
  if (savedUser) {
    dispatch(setUser({ user: JSON.parse(savedUser), signInType: null })); 
    console.log('User is authenticated and logged in:', savedUser);
  }
};

// Handle logout
export const handleLogout = async (navigation, dispatch) => {
  try {
    await auth().signOut();
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
    await AsyncStorage.removeItem('user');
    dispatch(clearUser());
    navigation.dispatch(StackActions.replace('Login')); 
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};
