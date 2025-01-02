import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { launchImageLibrary } from "react-native-image-picker";
import Header from "../../common/Header";
import { Svg, Rect, Circle } from "react-native-svg";
import NextButton from "../../widgets/Buttons/NextButton";
import { add_profile_information } from "../../API/apis";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoaderButton from "../../widgets/Buttons/loaderButton";
const { width, height } = Dimensions.get("window");

function ProfileSetUp() {
  const [loader, setLoader] = useState("");
  const [error, setError] = useState("");
  const [fullname, setFullname] = useState("");
  const [dob, setDob] = useState(new Date());
  const [alias, setAlias] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [isTyping, setIsTyping] = useState(false);

  const navigation = useNavigation();


  useEffect(() => {
    async function fetchData() {
      const check_goal_set = await AsyncStorage.getItem("goal_id");
    }
    fetchData();
  }, []); // Or [] if effect doesn't need props or state

  const add_user_profile_information = async () => {
    setLoader(true);
    // retriving tokn

    try {
      // const login_token = await AsyncStorage.getItem('login_token');
      const user_token = await AsyncStorage.getItem("user_token");
      const storage_data = await AsyncStorage.getItem("google_details");
      const storage_data_json = JSON.parse(storage_data);
      // setting key values to formdata
      const form_data = new FormData();

      form_data.append("user_token", user_token);
      // form_data.append('login_token', login_token);
      form_data.append("name", fullname);
      form_data.append("d_o_b", dob);
      form_data.append("nick_name", alias);
      form_data.append("image_url", profileImage);
      const add_profile_information_response = await add_profile_information(
        form_data
      );
      if (add_profile_information_response?.data?.status) {
        await AsyncStorage.setItem("profile_setup", "active");
        navigation.navigate("ProfileInformation3");
        
      } else {
        setError(add_profile_information_response?.data?.error);
      }
    } catch (error) {
      setError(error);
    }
  };

  const handleChangePicture = async () => {
    const options = {
      mediaType: "photo",
      maxWidth: 300,
      maxHeight: 300,
      quality: 1,
      includeBase64: true,
    };

    try {
      const response = await new Promise((resolve, reject) => {
        launchImageLibrary(options, (response) => {
          if (response.didCancel) {
            console.log("User cancelled image picker");
            resolve(null);
          } else if (response.errorCode) {
            console.log("ImagePicker Error: ", response.errorCode);
            reject(response.errorCode);
          } else {
            resolve(response);
          }
        });
      });

      if (response && response.assets && response.assets.length > 0) {
        const imageUrl =
          "data:" +
          response.assets[0].type +
          ";base64," +
          response.assets[0].base64;
        // const source = { uri: response.assets[0].uri };
        console.log(imageUrl);
        setProfileImage(imageUrl);
        // dispatch(setProfileImage(source.uri));
      }
    } catch (error) {
      console.error("Error picking image: ", error);
    }
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleDobChange = (text) => {
    // Remove all non-numeric characters
    let cleaned = ("" + text).replace(/\D/g, "");

    // Limit the length to 8 characters (DDMMYYYY)
    if (cleaned.length > 8) {
      cleaned = cleaned.slice(0, 8);
    }

    // Split the cleaned string into parts
    let day = cleaned.slice(0, 2);
    let month = cleaned.slice(2, 4);
    const year = cleaned.slice(4, 8);

    // Validate day and month
    if (day > 31) day = "31";
    if (month > 12) month = "12";

    // Form the final value
    let formatted = day;
    if (month.length) formatted += "/" + month;
    if (year.length) formatted += "/" + year;

    setDob(formatted);
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.svgContainer}>
          <Svg width="240" height="60" viewBox="0 0 400 100">
            <Circle
              cx="15"
              cy="50"
              r="12"
              fill="#007bff"
              stroke="#bfbfbf"
              strokeWidth="1"
            />
            <Rect
              x="45"
              y="40"
              width="40"
              height="20"
              rx="10"
              ry="10"
              fill="#007bff"
              stroke="#bfbfbf"
              strokeWidth="1"
              borderRadius="20"
            />
            <Circle
              cx="115"
              cy="50"
              r="12"
              fill="#9EC2FF"
              stroke="#bfbfbf"
              strokeWidth="1"
            />
            <Circle
              cx="160"
              cy="50"
              r="12"
              fill="#9EC2FF"
              stroke="#bfbfbf"
              strokeWidth="1"
            />
          </Svg>
        </View>

        <View style={styles.profileSection}>
          <View style={styles.profilePictureContainer}>
            <Image
              source={
                profileImage
                  ? { uri: profileImage }
                  : require("../../../assets/Logo/ProfilePic.png")
              }
              style={styles.profilePicture}
            />
            <View>
              <Text style={styles.profilePictureText}>Profile Picture</Text>
              <TouchableOpacity onPress={handleChangePicture}>
                <Text style={styles.changePictureText}>Change Picture</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.emtitile}>Your Name</Text>
            <TextInput
              style={styles.input}
              placeholder="What is your name?"
              value={fullname}
              onChangeText={(text) => {
                setFullname(text);
                setIsTyping(text !== "");
              }}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.emtitile}>Date of Birth*</Text>

            <TextInput
              style={styles.input}
              placeholder="DD / MM / YYYY"
              value={dob}
              onChangeText={handleDobChange}
              keyboardType="numeric"
              maxLength={10}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.emtitile}>Alias*</Text>
            <TextInput
              style={styles.input}
              placeholder="Create an alias for your profile"
              value={alias}
              onChangeText={(text) => {
                setAlias(text);
                setIsTyping(text !== "");
              }}
            />
          </View>
        </View>
        {loader ? (
          <>
            <LoaderButton />
          </>
        ) : (
          <>
            <NextButton
              onPress={add_user_profile_information}
              isTyping={isTyping}
            />
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 15,
    paddingBottom: 70,
  },
  innerContainer: {
    flex: 1,
  },
  svgContainer: {
    alignItems: "flex-start",
    marginBottom: 15,
    height: 24,
  },
  emtitile: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    fontWeight: "500",
    color: "#404040",
  },
  profileSection: {
    marginTop: 10,
    paddingBottom: 70,
  },
  profilePictureContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  profilePicture: {
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: (width * 0.25) / 2,
  },
  profilePictureText: {
    marginLeft: 10,
    fontSize: 12,
    color: "#404040",
    fontFamily: "Poppins-Regular",
  },
  changePictureText: {
    marginLeft: 10,
    fontSize: 10,
    color: "#007bff",
    fontFamily: "Poppins-Regular",
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 35,
    backgroundColor: "white",
    borderRadius: 12,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontFamily: "Poppins-Regular",
    fontSize: 12,
  },
  buttonContainer: {
    marginBottom: -19,
  },
});

export default ProfileSetUp;
