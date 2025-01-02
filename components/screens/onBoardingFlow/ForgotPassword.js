import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert, Dimensions } from 'react-native';
import Header from '../../common/WelcomeHeader';
import { useNavigation } from '@react-navigation/native';
import SendEmailButton from '../../widgets/Buttons/sendEmailButton';
import { ADD_OTP } from "../../API/apis.js";

const { width, height } = Dimensions.get('window');

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);

  const [isTyping, setIsTyping] = useState(false);
  const navigation = useNavigation();

  const ADD_USER_OTP = async () => {
    try {
      setLoader(true);
      const form_data = new FormData();
      form_data.append("email", email);
      form_data.append("otp_type", "reset_password");
      const ADD_USER_OTP_API_RESPONSE = await ADD_OTP(form_data);
      console.log(ADD_USER_OTP_API_RESPONSE);
      if (ADD_USER_OTP_API_RESPONSE?.data?.status) {
        navigation.navigate("Verification2", { getmail: email });
      } else {
        setLoader(false);
        console.log(ADD_USER_OTP_API_RESPONSE.data)
        setError(ADD_USER_OTP_API_RESPONSE?.data?.errors?.email || "Failed to send OTP");
        // setIsTyping(false);
      }
    } catch (error) {
      setLoader(false);
      setError(error.toString());
    }
  };

  const handleInputChange = (text) => {
    setEmail(text);
    setIsTyping(text.length > 0); // Update isTyping based on whether the input field has text or not
  };



  return (
    <>
      <View style={styles.outerContainer}>
        <Header />
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.innerContainer}>
            <Text style={styles.title}>Forgot Password</Text>
            <Text style={styles.emtitle}>Enter your email ID to get a reset link</Text>
            <Text style={styles.textbox}>Email Id</Text>
            <TextInput
              style={styles.input}
              placeholder="Add email id"
              value={email}
              onChangeText={handleInputChange}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <TouchableOpacity onPress={() => setEmail('')}>
              <Text style={styles.forgot}>Resend email</Text>
            </TouchableOpacity>
          </View>
          <SendEmailButton onPress={ADD_USER_OTP} loading={loader} isTyping={isTyping} />
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#FBFBFB',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    backgroundColor: "#FBFBFB",
    paddingBottom:70,
  },
  innerContainer: {
    paddingBottom: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#4a4a4a',
  },
  emtitle: {
    color: '#4a4a4a',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    marginBottom: 10,
  },
  textbox: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#4a4a4a',
    marginBottom: 1,
  },
  forgot: {
    color: '#007bff',
    marginBottom: 10,
  },
  input: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'white',
    marginBottom: 20,
    paddingHorizontal: 8,
    elevation: 1,
    width: '100%',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});