import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, KeyboardAvoidingView, Platform, Keyboard, ImageBackground, Dimensions, Alert, ActivityIndicator, DevSettings } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { onGoogleButtonPress, onFacebookButtonPress } from '../../API/auth';
import { ADD_OTP, google_webClientId } from "../../API/apis.js";
import { translate } from 'react-native-redash';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

GoogleSignin.configure({
  webClientId: google_webClientId,
});
const { width, height } = Dimensions.get('window');


const scale = (size) => (width / 375) * size;
const verticalScale = (size) => (height / 812) * size;
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;

const LoginScreen = ({handleUserSet}) => {
  const [email, setEmail] = useState('');
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const [button_loader, set_button_loader] = useState(false);
  const [otpType, setOtpType] = useState("");
  const navigation = useNavigation();
  const [isPressed, setIsPressed] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const ADD_USER_OTP = async () => {


    try {
      set_button_loader(true);
      const form_data = new FormData();
      form_data.append("email", email);
      form_data.append("otp_type", "set_password");
      const ADD_USER_OTP_API_RESPONSE = await ADD_OTP(form_data);
      console.log(ADD_USER_OTP_API_RESPONSE);
      if (ADD_USER_OTP_API_RESPONSE?.data?.status) {
        navigation.navigate("VerificationScreen", { getmail: email });
      }
      else {
        set_button_loader(false);
        setError(ADD_USER_OTP_API_RESPONSE?.data?.errors);
      }
    }
    catch (error) {
      setError(error.toString());
    }
   

  };

  const handleGoogleSignIn = async () => {
    try {
        // Get the user's ID token
        await GoogleSignin.hasPlayServices();
        const { idToken } = await GoogleSignin.signIn();

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // Sign-in the user with the credential
        const response_data = await auth().signInWithCredential(googleCredential);
        // console.log(response_data.user);
        const google_details = await AsyncStorage.setItem('google_details', JSON.stringify(response_data));
       // const uniqueId = new Date().getTime().toString();
        //await AsyncStorage.setItem('login_token', uniqueId);
        await AsyncStorage.setItem('email', response_data?.additionalUserInfo?.profile?.email);
        await AsyncStorage.setItem('user_token', response_data?.user?.uid);
        await AsyncStorage.setItem('google_login', 'active');
        await AsyncStorage.setItem('facebook_login', 'deactive');
        await AsyncStorage.setItem('apple_login', 'deactive');
        Alert.alert('Nimbo','Congrats! You have successfully created account.');
        handleUserSet();
        navigation.navigate('WelcomeScroll');
    } catch (error) {
      console.log('error',error);
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            Alert.alert('Sign in cancelled');
        } else if (error.code === statusCodes.IN_PROGRESS) {
            Alert.alert('Sign in in progress');
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            Alert.alert('Play services not available');
        } else {
            Alert.alert('Login Failed', error.message);
        }
        
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const user = await onFacebookButtonPress(dispatch);
      navigation.navigate('Profile', { user });
    } catch (error) {
      console.error('Failed to authenticate with Facebook:', error);
    }
  };

  const handleAppleLogin = () => {
    console.log('Continue with Apple');
    navigation.navigate("VerificationScreen", { getmail: email });
  };

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
    >
      <View style={styles.overlay} />
      <ImageBackground source={require('../../../assets/Logo/background-image-card.png')} style={styles.imageBackground} imageStyle={styles.backgroundImage}>
        <View style={styles.overlay} />
      </ImageBackground>
      {button_loader ? (
        <ActivityIndicator style={styles.actiivity_loader} size="large" color="#0000ff" />
      ) : (
        <View style={[styles.cardContainer, keyboardVisible && styles.cardContainerShifted]}>
          <View style={styles.card}>
            <View>
              <Text style={styles.title}>Continue with</Text>
              <View style={styles.line1}></View>
            </View>

            <Text style={styles.emtitle}>Email ID</Text>
            <TextInput
              style={styles.input}
              placeholder="Add email id"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setIsTyping(text.length > 0); 
              }}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {error?.email && <Text style={{ alignSelf: "flex-start", position: "relative", top: -16, color: "#0D66FF", fontFamily: 'Poppins-SemiBold' }}>{error?.email}</Text>}
            
            <TouchableOpacity
              style={[styles.button, isPressed ? styles.buttonPressed : null, isTyping && styles.buttonTyping]}
              onPress={ADD_USER_OTP}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
            >
              <Text style={styles.buttonText1}>Continue</Text>
            </TouchableOpacity>

            <View style={styles.separator}>
              <Text style={styles.or}>OR</Text>
              <View style={styles.line}></View>
            </View>

            <TouchableOpacity style={[styles.button, styles.appleButton]} onPress={handleAppleLogin}>
              <Image source={require('../../../assets/Logo/apple.png')} style={styles.buttonLogo} />
              <Text style={styles.buttonText1}>Continue with Apple</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.googleButton]} onPress={handleGoogleSignIn}>
              <Image source={require('../../../assets/Logo/google.png')} style={styles.buttonLogo} />
              <Text style={styles.buttonText2}>Continue with Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.googleButton]} onPress={handleFacebookLogin}>
              <Image source={require('../../../assets/Logo/facebooklogo.png')} style={styles.buttonLogo2} />
              <Text style={styles.buttonText2}>Continue with Facebook</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  actiivity_loader: {
    position: "absolute",
    left: "45%",
    top: "45%",
  },
  container: {
    flex: 1,
    width: width * 1,
    height: height * 1,
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(150),
    marginHorizontal: 10,
    marginBottom: 230,
  },
  backgroundImage: {
    width: width * 0.95,
    height: height * 0.2,
    alignSelf: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.88)',
  },
  cardContainer: {
    flex: 1,
    position: 'absolute',
    bottom: verticalScale(0),
    left: 0,
    right: 0,
    height: verticalScale(572),
    paddingTop: verticalScale(321),
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  cardContainerShifted: {
    justifyContent: 'center',
  },
  card: {
    backgroundColor: "#F7F7F7",
    borderRadius: moderateScale(5),
    padding: moderateScale(20),
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: scale(6),
    },
    shadowOpacity: 0.27,
    shadowRadius: moderateScale(5.65),
    elevation: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: '200',
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 8,
    marginRight: verticalScale(width * 0.50),
    alignSelf: 'flex-start',
    color: '#404040',
    height: 59,
  },
  emtitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    alignSelf: 'flex-start',
    color: '#404040',
    width: verticalScale(76),
    height: verticalScale(20),
    marginBottom: 7,
    marginTop: verticalScale(10),
  },
  input: {
    width: "100%",
    height: 40,
    display: "block",
    borderRadius: 15,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOpacity: 0.8,
    paddingHorizontal: moderateScale(10),
    marginBottom: 20,
    backgroundColor: 'white',
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
   
  },
  button: {
    width: '100%',
    height: verticalScale(50),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(50),
    marginBottom: 20,
    flexDirection: 'row',
    backgroundColor: '#9EC2FF', 
  },
  buttonPressed: {
    backgroundColor: '#0D66FF'
  },
  buttonTyping: {
    backgroundColor: '#0D66FF',
  },
  buttonText1: {
    color: '#fff',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
  buttonText2: {
    color: 'black',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
  buttonLogo: {
    width: scale(24),
    height: scale(24),
    marginRight: moderateScale(10),
  },
  buttonLogo2: {
    width: scale(30),
    height: scale(30),
    marginRight: moderateScale(10),
    borderRadius: 10,
  },
  separator: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 20,
  },
  or: {
    fontFamily: 'Poppins-Regular',
    fontSize: 20,
    textAlign: 'center',
    zIndex: 1,
    position: 'relative',
    backgroundColor: '#F7F7F7',
    paddingHorizontal: moderateScale(10),
    color: '#4a4a4a',
  },
  line1: {
    position: 'absolute',
    top: '70%',
    left: -50,
    right: -50,
    height: 1,
    backgroundColor: 'rgba(126, 126, 126, 0.5)',
  },
  line: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(126, 126, 126, 0.5)',
    zIndex: 0,
  },
  continueButton: {
    marginBottom: 0,
  },
  googleButton: {
    borderRadius: moderateScale(50),
    borderColor: '#404040',
    borderWidth: 2,
    backgroundColor: 'white',
  },
  appleButton: {
    backgroundColor: '#404040',
    marginBottom: 20,
  },
});

export default LoginScreen;