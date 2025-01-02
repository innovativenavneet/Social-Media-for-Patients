import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from "../../../components/common/SkipHeader";
import DoneButton from '../../widgets/Buttons/doneButton';
import { ADD_OTP, VERIFY_OTP } from '../../API/apis';

const VerificationScreen = ({ route }) => {
  const { getmail } = route.params;
  const [code, setCode] = useState('');
  const [userEmail, setUserEmail] = useState(getmail);
  const [otpType, setOtpType] = useState("set_password");
  const [error, setError] = useState("");
  const [errorm, setErrorm] = useState("");
  const [loader, setLoader] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const navigation = useNavigation();

  const VERIFY_USER_OTP = async () => {
    try {
      setLoader(true);
      const form_data = new FormData();
      form_data.append("email", userEmail);
      form_data.append("otp", code);
      form_data.append("otp_type", otpType);
  
      const VERIFY_USER_OTP_API_RESPONSE = await VERIFY_OTP(form_data);
      console.log("VERIFY_USER_OTP_API_RESPONSE:", VERIFY_USER_OTP_API_RESPONSE.data); 
     
  
      if (VERIFY_USER_OTP_API_RESPONSE?.data?.status) {

        Alert.alert("Success", "OTP Verified successfully.");
        navigation.navigate("Passwordset", { getmail: getmail });
      } else {
        setLoader(false);
        setError(VERIFY_USER_OTP_API_RESPONSE?.data?.errors);
        VERIFY_USER_OTP_API_RESPONSE?.data?.message && setErrorm(VERIFY_USER_OTP_API_RESPONSE?.data?.message)
      }
    } catch (error) {
      setLoader(false);
      setError(error.toString());
      Alert.alert("Error", "An error occurred during verification. Please try again.");
    }
    
    // navigation.navigate("Passwordset", { getmail: getmail });
  };
  

  const RESEND_USER_OTP = async () => {
    try {
      setLoader(true);
      const form_data = new FormData();
      form_data.append("email", userEmail);
      form_data.append("otp_type", otpType);

      const RESEND_USER_OTP_API_RESPONSE = await ADD_OTP(form_data);
      setLoader(false);

      if (RESEND_USER_OTP_API_RESPONSE?.data?.status) {
        Alert.alert("Success", "OTP has been resent successfully.");
      } else {
        setError(RESEND_USER_OTP_API_RESPONSE?.data?.message || "Unable to resend OTP. Please try again.");
        Alert.alert("Resend Failed", RESEND_USER_OTP_API_RESPONSE?.data?.message || "Unable to resend OTP. Please try again.");
      }
    } catch (error) {
      setLoader(false);
      setError(error.toString());
      Alert.alert("Error", "An error occurred while resending the OTP. Please try again.");
    }
  };

  const handleInputChange = (text) => {
    setCode(text);
    setIsTyping(text.length > 0);
  };

  return (
    <>
      {/* <View style={styles.head}>
        <Header />
      </View> */}
      <View style={styles.container}>
        {loader ? (
          <ActivityIndicator style={styles.actiivity_loader} size="large" color="#0000ff" />
        ) : (
           <>
           <View style={styles.content}>
            <Text style={styles.heading}>Tell us it's really you</Text>
            <Text style={styles.subHeading}>Verify your account by adding the verification code</Text>
            <Text style={styles.label}>Add Verification Code</Text>
            <TextInput
              style={styles.input}
              placeholder="Add Verification Code"
              value={code}
              onChangeText={handleInputChange}
              keyboardType="number-pad"
              autoCapitalize="none"
            />
            {error?.otp && <Text style={styles.errorText}>{error?.otp}</Text>}
            {errorm && <Text style={styles.errorText}>{errorm}</Text>}
            <TouchableOpacity style={styles.resendButton}>
              <Text style={[styles.label, { color: "#007bff" }]}>
                Did not get the Code?
                <Text style={styles.resendText} onPress={RESEND_USER_OTP}> Resend Code</Text>
              </Text>
            </TouchableOpacity>
          </View>
          <DoneButton  onPress={VERIFY_USER_OTP} isTyping={isTyping} />
           </>
        )}
        
        
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  head: {
    marginTop: 0,
  },
  actiivity_loader: {
    position: "absolute",
    left: "50%",
    top: "50%",
    //  flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 10,
    paddingHorizontal: 20,
    backgroundColor: '#F6F5F2',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  subHeading: {
    fontSize: 16,
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  label: {
    fontSize: 14,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  resendButton: {
    alignSelf: 'flex-start',
  },
  resendText: {
    color: '#007bff',
    fontSize: 14,
  },
  errorText: {
    color: '#007bff', 
    marginBottom: 10,
    position:"relative",
    top:-15,
    fontFamily: 'Poppins-SemiBold',
    alignSelf: 'flex-start',
  },
});

export default VerificationScreen;
