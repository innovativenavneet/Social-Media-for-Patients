
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Dimensions, KeyboardAvoidingView, Alert, DevSettings } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, clearUser } from '../../redux/slices/userSlices';
import { checkUserAuth } from '../../API/auth';
import ContinueButton from '../../widgets/Buttons/continueButton';
import Header from '../../common/WelcomeHeader';
import { ScrollView } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { google_webClientId } from '../../API/apis';
import AsyncStorage from '@react-native-async-storage/async-storage';

GoogleSignin.configure({
    webClientId: google_webClientId,
});
const { width, height } = Dimensions.get('window');

const scale = (size) => (width / 375) * size;
const verticalScale = (size) => (height / 812) * size;
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;

const WelcomeBack = ({ handleUserSet }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const navigation = useNavigation();

    // useEffect(() => {
    //     checkUserAuth(dispatch); // Check if user is authenticated on component mount
    // }, [dispatch]);

    const handleForgotPassword = () => {
        navigation.navigate('ForgotPassword');
    };
    //navigation.navigate('ForgotPassword');

    const handleGoogleSignIn = async () => {
        try {
            // Get the user's ID token
            await GoogleSignin.hasPlayServices();
            const { idToken } = await GoogleSignin.signIn();

            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);

            // Sign-in the user with the credential
            const firebase_response = await auth().signInWithCredential(googleCredential);
            console.log(firebase_response);
            const google_details = await AsyncStorage.setItem('google_details', JSON.stringify(firebase_response));
            // const uniqueId = new Date().getTime().toString();
            // await AsyncStorage.setItem('login_token', uniqueId);
            await AsyncStorage.setItem('email', firebase_response?.additionalUserInfo?.profile?.email);
            await AsyncStorage.setItem('user_token', firebase_response?.user?.uid);
            await AsyncStorage.setItem('google_login', 'active');
            await AsyncStorage.setItem('facebook_login', 'deactive');
            await AsyncStorage.setItem('apple_login', 'deactive');
            handleUserSet();
            navigation.navigate('WelcomeScroll');
        } catch (error) {
            // if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            //     Alert.alert('Sign in cancelled');
            // } else if (error.code === statusCodes.IN_PROGRESS) {
            //     Alert.alert('Sign in in progress');
            // } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            //     Alert.alert('Play services not available');
            // } else {
            //     Alert.alert('Login Failed', error.message);
            // }
        }
    };

    const handleLogin = async () => {
        if (password && email) {
            setPasswordError('');
            try {
                const firebase_response = await auth().signInWithEmailAndPassword(email, password);
                const user = firebase_response.user;
                const idToken = await user.getIdToken();
                // const uniqueId = new Date().getTime().toString();
                const google_details = await AsyncStorage.setItem('google_details', JSON.stringify(firebase_response));
                // await AsyncStorage.setItem('login_token', uniqueId);
                await AsyncStorage.setItem('email', firebase_response?.user?.email);
                await AsyncStorage.setItem('user_token', firebase_response?.user?.uid);
                await AsyncStorage.setItem('google_login', 'active');
                await AsyncStorage.setItem('facebook_login', 'deactive');
                await AsyncStorage.setItem('apple_login', 'deactive');

                handleUserSet();
                navigation.navigate('WelcomeScroll');
                // Navigate to the next screen or do something else
            } catch (error) {
                console.log('sss', error)
                if (error.code == 'auth/invalid-email') {
                    setPasswordError('Email address is not valid.')
                }
                if (error.code == 'auth/user-disabled') {
                    setPasswordError('User corresponding to the given email has been disabled. Please contact with admin.')
                }
                if (error.code == 'auth/user-not-found') {
                    setPasswordError('There is no user corresponding to the given email. Please create your account.')
                }
                if (error.code == 'auth/wrong-password') {
                    setPasswordError('the password is invalid for the given email, or the account corresponding to the email does not have a password set.')
                }
                if (error.code == 'auth/invalid-credential') {
                    setPasswordError('the password is invalid for the given email, or the account corresponding to the email does not have a password set.')
                }
                //Alert.alert('Login Failed', error.message);
            }
        } else {
            setPasswordError('Please enter email and password.')
        }

    };
    const validatePassword = () => {
        if (password.length < 8) {
            setPasswordError('Password too short');
        } else {
            setPasswordError('');
        }
    };

    const handleInputChange = (value, setValue) => {
        setValue(value);
        setIsTyping(email.length > 0 || password.length > 0);
    };

    return (
        <View style={styles.container}>
            <ScrollView keyboardShouldPersistTaps="handled">
                {/* <Header /> */}
                <View style={styles.contentContainer}>
                    <Text style={styles.heading}>
                        Welcome back!
                    </Text>
                    <Text style={styles.heading2}>
                        Sign in to your account
                    </Text>
                    <Text style={styles.emtitle}>Email ID</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Add email id"
                        value={email}
                        onChangeText={(value) => handleInputChange(value, setEmail)}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <Text style={styles.emtitle}>Password</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        value={password}
                        onChangeText={(value) => handleInputChange(value, setPassword)}
                        secureTextEntry={true}
                        onBlur={validatePassword}
                    />
                    {passwordError && <Text style={styles.errorText1}>{passwordError}</Text>}
                    <Text style={styles.forgot} onPress={handleForgotPassword}>
                        Forgot Password?
                    </Text>
                </View>

                <View style={styles.card}>
                    <View style={styles.separator}>
                        <Text style={styles.or}>OR</Text>
                        <View style={styles.line}></View>
                    </View>

                    <TouchableOpacity style={[styles.button, styles.appleButton]}>
                        <Image source={require('../../../assets/Logo/apple.png')} style={styles.buttonLogo} />
                        <Text style={styles.buttonText1}>Continue with Apple</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.button, styles.googleButton]} onPress={handleGoogleSignIn}>
                        <Image source={require('../../../assets/Logo/google.png')} style={styles.buttonLogo} />
                        <Text style={styles.buttonText2}>Continue with Google</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.button, styles.googleButton]}>
                        <Image source={require('../../../assets/Logo/facebooklogo.png')} style={styles.buttonLogo2} />
                        <Text style={styles.buttonText2}>Continue with Facebook</Text>
                    </TouchableOpacity>


                    <ContinueButton onPress={handleLogin} isTyping={isTyping} />

                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FBFBFB',
    },
    contentContainer: {
        paddingHorizontal: 15,
        paddingBottom: 0,
    },
    card: {
        marginBottom: 30,
        padding: 10,
        backgroundColor: '#FBFBFB',
    },
    heading: {
        fontSize: 20,
        fontWeight: '600',
        fontFamily: 'Poppins-SemiBold',
        color: '#404040',
        paddingVertical: 1,
        marginTop: 20,
    },
    heading2: {
        fontSize: 14,
        marginBottom: 20,
        fontFamily: 'Poppins-Regular',
        color: '#4a4a4a',
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: 'white',
        borderRadius: 12,
        paddingHorizontal: 10,
        marginBottom: 10,
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        elevation: 1,
    },
    emtitle: {
        fontSize: 14,
        marginBottom: 5,
        fontFamily: 'Poppins-Regular',
        color: '#4a4a4a',
    },
    errorText1: {
        color: '#007bff',
        marginBottom: 10,
        fontFamily: 'Poppins-Bold',
    },
    forgot: {
        color: "#007bff",
        fontFamily: 'Poppins-Regular',
        marginBottom: 180,
    },
    button: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        marginBottom: 18,
        flexDirection: 'row',
    },
    buttonText1: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
    },
    buttonText2: {
        color: 'black',
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
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
        marginVertical: 10,
    },
    or: {
        fontSize: 18,
        fontFamily: 'Poppins-Regular',
        fontSize: 20,
        textAlign: 'center',
        zIndex: 1,
        position: 'relative',
        backgroundColor: '#FBFBFB',
        paddingHorizontal: 10,
        color: '#4a4a4a',
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

    googleButton: {
        borderRadius: 50,
        borderColor: '#404040',
        borderWidth: 2,
        backgroundColor: '#FFFFFF',
    },
    appleButton: {
        backgroundColor: '#404040',
    },
});

export default WelcomeBack;