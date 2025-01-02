import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ChangePasswordButton from "../../widgets/Buttons/changePasswordButton";
import { DevSettings } from "react-native";

const Password = ({ route }) => {
  const { getmail } = route.params;
  const [loader, setLoader] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isTyping, setIsTyping] = useState(false); // State to track if user is typing
  const navigation = useNavigation();

  const handleDone = async () => {
    setLoader(true);

    // Check if password meets requirements
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      setLoader(false);
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      setLoader(false);
      return;
    }

    try {
      if (responseErrorCode === "auth/email-already-in-use") {
        const firebaseResponse = await auth().createUserWithEmailAndPassword(
          getmail,
          password
        );
        navigation.navigate("LoginScreen");
        // await AsyncStorage.setItem(
        //   "google_details",
        //   JSON.stringify(firebaseResponse)
        // );
        // await AsyncStorage.setItem("user_token", firebaseResponse?.user?.uid);
        // Alert.alert("Nimbo", "Congrats! You have setup your account.");
        // DevSettings.reload();
      }
    } catch (error) {
      const responseErrorCode = error.code;

      navigation.navigate("LoginScreen");
    }
    setLoader(false);
  };

  return (
    <View style={styles.outerContainer}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Reset Password</Text>

        <Text style={[styles.textbox, styles.emtitle]}>New Password</Text>
        <TextInput
          style={styles.input}
          placeholder="New password"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setIsTyping(!!text);
          }}
          secureTextEntry={true}
        />
        {passwordError ? (
          <Text style={styles.errorText}>{passwordError}</Text>
        ) : null}

        <Text style={[styles.textbox, styles.emtitle]}>
          Confirm New Password
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Confirm new password"
          value={confirmPassword}
          onChangeText={(text) => {
            setConfirmPassword(text);
            setIsTyping(!!text);
          }}
          secureTextEntry={true}
        />
        {confirmPasswordError ? (
          <Text style={styles.errorText}>{confirmPasswordError}</Text>
        ) : null}

        <ChangePasswordButton onPress={handleDone} isTyping={isTyping} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 15,
    justifyContent: "space-between",
    backgroundColor: "#F6F5F2",
    paddingBottom: 580,
  },
  title: {
    fontSize: 20,
    fontFamily: "Poppins-SemiBold",
    color: "#4a4a4a",
    marginBottom: 10,
    marginTop: 10,
  },
  emtitle: {
    color: "#4a4a4a",
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderRadius: 12,
    backgroundColor: "white",
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  errorText: {
    color: "#ff0000",
    fontSize: 12,
    fontFamily: "Poppins-Regular",
  },
  buttonContainer: {
    justifyContent: "flex-end",
    marginTop: 0,
  },
});

export default Password;
