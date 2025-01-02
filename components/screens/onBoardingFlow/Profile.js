import React, { useEffect, useState } from "react";

import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Svg, Rect, Circle } from "react-native-svg";
import CreateMyProfileButton from "../../widgets/Buttons/createMyProfileButton";
import { ADD_GOAL } from "../../API/apis";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../../../components/common/Header";
import LoaderButton from "../../widgets/Buttons/loaderButton";

const images = [
  require("../../../assets/Goals/Group1.png"),
  require("../../../assets/Goals/Group2.png"),
  require("../../../assets/Goals/Group3.png"),
  require("../../../assets/Goals/Group4.png"),
];

const { width, height } = Dimensions.get("window");

const Profile = () => {
  const [selectedCard, setSelectedCard] = useState('');
  const [error, setError] = useState("");
  const [user_token, set_user_token] = useState("");
  const [email, set_email] = useState("");
  const [loader, setLoader] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    async function fetchData() {
     
      const storge_user_token =  await AsyncStorage.getItem("user_token");
      const email =  await AsyncStorage.getItem("email");
      console.log(email)
      if(storge_user_token){
        set_user_token(email)
        set_user_token(storge_user_token)
      }
    }
    fetchData();
  }, []); 

  const ADD_GOAL_API = async () => {
    if (selectedCard > 0) {
        setLoader(true);
        const data = new FormData();
        data.append("user_token", user_token);
        data.append("goal_id", selectedCard);
        data.append("email", email);
        const RESPONSE = await ADD_GOAL(data);
        if (RESPONSE?.data?.status) {
          await AsyncStorage.setItem("goal_id", 'active');
          navigation.navigate("ProfileSetup");
        } else {
          setLoader(false);
          console.log(RESPONSE?.data?.errors)
          setError(RESPONSE?.data?.errors);
        }
    } else {
      Alert.alert("Nimbo", "Please select health goal.");
    }
    //  navigation.navigate("ProfileSetup");
  };
  
  return (
    <>
      <View>
        <Header />
      </View>
      <View style={styles.container}>
        <View style={styles.svgContainer}>
          <Svg width="240" height="60" viewBox="0 0 400 100">
            <Rect
              x="5"
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
              cx="75"
              cy="50"
              r="12"
              fill="#9EC2FF"
              stroke="#bfbfbf"
              strokeWidth="1"
            />
            <Circle
              cx="120"
              cy="50"
              r="12"
              fill="#9EC2FF"
              stroke="#bfbfbf"
              strokeWidth="1"
            />
            <Circle
              cx="165"
              cy="50"
              r="12"
              fill="#9EC2FF"
              stroke="#bfbfbf"
              strokeWidth="1"
            />
          </Svg>
        </View>
        <View>
          <Text style={styles.goalText}>
            What are your dream {"\n"}health goals?{" "}
          </Text>
        </View>

        <View style={styles.imageGrid}>
          <View style={styles.imageContainer}>
            <TouchableOpacity
              style={[
                styles.card,
                selectedCard === 1 && {
                  borderColor: "#007bff",
                  borderWidth: 4,
                },
              ]}
              onPress={() => setSelectedCard(1)}
            >
              <Image
                style={[styles.image1]}
                source={require("../../../assets/Goals/Group1.png")}
              />
            </TouchableOpacity>
            <Text style={styles.text}>Reversing</Text>
          </View>

          <View style={styles.imageContainer}>
            <TouchableOpacity
              style={[
                styles.card,
                selectedCard === 2 && {
                  borderColor: "#007bff",
                  borderWidth: 4,
                },
              ]}
              onPress={() => setSelectedCard(2)}
            >
              <Image
                style={[styles.image, styles.image2]}
                source={require("../../../assets/Goals/Group2.png")}
              />
            </TouchableOpacity>
            <Text style={styles.text}>Stop Progression</Text>
          </View>

          <View style={styles.imageContainer1}>
            <TouchableOpacity
              style={[
                styles.card,
                selectedCard === 3 && {
                  borderColor: "#007bff",
                  borderWidth: 4,
                },
              ]}
              onPress={() => setSelectedCard(3)}
            >
              <Image
                style={[styles.image, styles.image3]}
                source={require("../../../assets/Goals/Group3.png")}
              />
            </TouchableOpacity>
            <Text style={styles.text}>Feel Better</Text>
          </View>

          <View style={styles.imageContainer}>
            <TouchableOpacity
              style={[
                styles.card,
                selectedCard === 4 && {
                  borderColor: "#007bff",
                  borderWidth: 4,
                },
              ]}
              onPress={() => setSelectedCard(4)}
            >
              <Image
                style={[styles.image, styles.image4]}
                source={require("../../../assets/Goals/Group4.png")}
              />
            </TouchableOpacity>
            <Text style={styles.text}>Learn more</Text>
          </View>
        </View>
        {loader ? <>
          <LoaderButton />
        </> : <>
          <CreateMyProfileButton onPress={ADD_GOAL_API} />
        </>}
      
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: "white",
    // width: width ,
    // height: height,
    // backgroundColor: '#F6F5F2',
  },
  svgContainer: {
    alignItems: "flex-start",
    marginTop: -20,
    marginBottom: -10,
  },
  goalText: {
    fontSize: 20,
    textAlign: "left",
    color: "#404040",
    fontFamily: "Poppins-SemiBold",
    marginBottom: 20,
  },
  images: {
    marginBottom: height * 0.01,
  },
  imageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  imageContainer: {
    alignItems: "center",
    width: "38%",
    marginBottom: 40,
  },
  imageContainer1: {
    alignItems: "center",
    width: "40%",
    marginBottom: 40,
  },
  card: {
    borderRadius: 15,
    overflow: "hidden",
    borderColor: "#404040",
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
    resizeMode: "contain",
  },
  text: {
    fontFamily: "Poppins-Regular",
    marginTop: 5,
    textAlign: "center",
    color: "#4a4a4a",
    fontSize: 16,
  },
  image1: {
    width: "100%",
    marginTop: 13,
    height: undefined,
    aspectRatio: 1,
    resizeMode: "cover",
  },
  image2: {
    marginBottom: 5,
    marginTop: 5,
  },
  image3: {
    marginTop: 19,
  },
  image4: {
    marginBottom: 8,
    marginTop: 12,
  },
});

export default Profile;