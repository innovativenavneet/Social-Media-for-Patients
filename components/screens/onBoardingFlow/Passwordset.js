import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import auth from '@react-native-firebase/auth';
import { setUser } from '../../redux/slices/userSlices';
import DoneButton from '../../widgets/Buttons/doneButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DevSettings } from 'react-native';
import LoaderButton from '../../widgets/Buttons/loaderButton';

const Password = ({handleUserSet}) => {
  
  const route = useRoute();
  // const { set_user } = route.params;
  
  const { getmail } = route.params;
  const [loader, set_loader] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const navigation = useNavigation();

  const handleDone = async () => {
    set_loader(true);
    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      set_loader(false);
      return;
    }


    if (password !== confirmPassword) {
       set_loader(false);
      setConfirmPasswordError('Passwords do not match');
      return;
    }

    try {
      // Attempt to sign up the user
     const firebase_response =  await auth().createUserWithEmailAndPassword(getmail, password);
     const google_details = await AsyncStorage.setItem('google_details', JSON.stringify(firebase_response));
     const uniqueId = new Date().getTime().toString();

     
     await AsyncStorage.setItem('login_token', uniqueId);
     await AsyncStorage.setItem('email', getmail);
     await AsyncStorage.setItem('user_token', firebase_response?.user?.uid);
     await AsyncStorage.setItem('google_login', 'active');
     await AsyncStorage.setItem('facebook_login', 'deactive');
     await AsyncStorage.setItem('apple_login', 'deactive');
     Alert.alert('Nimbo','Congrats! You have successfully created account.');
    
     handleUserSet();
     navigation.navigate('WelcomeScroll');
    } catch (error) {
          const response_error_code = error.code;
          if(response_error_code == 'auth/email-already-in-use'){
            Alert.alert('Nimbo', 'Already exists an account with the given email address. Please login your account.')
            navigation.navigate('LoginScreen');
          }
    }
    // navigation.navigate('WelcomeScroll');
    
  };



  return (
    <>
      {/* <Header /> */}
      <View style={styles.component}>
        <View style={styles.content}>
          <Text style={styles.headerText}>Set your Password</Text>
          <Text style={styles.subHeaderText}>Create a password for your account</Text>

          <Text style={styles.labelText}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="********"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setIsTyping(true);
            }}
            onBlur={() => setIsTyping(false)}
            secureTextEntry={true}
          />
         
          {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

          <Text style={styles.labelText}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            placeholder="********"
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              setIsTyping(true);
            }}
            onBlur={() => setIsTyping(false)}
            secureTextEntry={true}
          />
          {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}
        </View>
        {loader ? <>
          <LoaderButton />
        </> : <>
        <DoneButton onPress={handleDone}  isTyping={isTyping} textStyle={styles.boldText} />
        </>}
      
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  component: {
    flex: 1,
    backgroundColor: '#F6F5F2',
    paddingHorizontal: 15,
    justifyContent: 'space-between', 
  },
  content: {
    marginTop: 10,
  },
  headerText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: '#404040',
  },
  subHeaderText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    marginBottom: 10,
    color: '#404040',
  },
  labelText: {
    fontSize: 14,
    marginBottom: 5,
    fontFamily: 'Poppins-Regular',
    color: '#404040',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 10,
    marginBottom: 9,
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
  },
  errorText: {
    color: '#007bff', 
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
  boldText: {
    fontFamily: 'Poppins-Bold',
  },
});

export default Password;
