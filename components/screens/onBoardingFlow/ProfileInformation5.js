import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import Header from "../../../components/common/SkipHeader";
import { Svg, Circle, Rect } from "react-native-svg";
import NextButton from "../../widgets/Buttons/NextButton";
import { useNavigation } from "@react-navigation/native";
import Food_Diet from "../../widgets/TextBox/Food_Diet";
import Supplements from "../../widgets/TextBox/Supplements";
import Movement_Exercise from "../../widgets/TextBox/Movement_Exercise";
import Body_Therapies from "../../widgets/TextBox/Body_Therapies";
import { ADD_HEALTH_STYLE } from "../../API/apis";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import Body_Therapies from '../../widgets/TextBox/Body_Therapies';
// import Movement_Exercise from '../../widgets/TextBox/Movement_Exercise';
// import Supplements from './Supplements';

const { width, height } = Dimensions.get("window");

const HealthStyleScreen = () => {
  const [isTyping, setIsTyping] = useState(false);
  const navigation = useNavigation();
  const [userToken, setUserToken] = useState(null);

  const [Object_Food_Diet, set_Object_Food_Diet] = useState([]);
  const [Object_Supplements, set_Object_Supplements] = useState([]);
  const [Object_Movement_Exercise, set_Object_Movement_Exercise] = useState([]);
  const [Object_Body_Therapies, set_Object_Body_Therapies] = useState([]);
  useEffect(() => {
    const fetchToken = async () => {
      const token = await AsyncStorage.getItem("user_token");
      setUserToken(token);
    };
    fetchToken();
  }, []);
  const handleTypingStart = () => {
    setIsTyping(true);
  };

  const handleTypingEnd = () => {
    setIsTyping(false);
  };

  const handleNextButton = () => {
    navigation.navigate("Processing");
  };
  const ADD_HEALTH_STYLE_API = async () => {
    try {
      // const token = await AsyncStorage.getItem("user_token");
      const form_data = new FormData();
      form_data.append("user_token", userToken);
      form_data.append("foods_diets", JSON.stringify(Object_Food_Diet));
      form_data.append("supplements", JSON.stringify(Object_Supplements));
      form_data.append("movement_exercise", JSON.stringify(Object_Movement_Exercise));
      form_data.append("body_therapies", JSON.stringify(Object_Body_Therapies));
      const response = await ADD_HEALTH_STYLE(form_data);
     
      if (response?.data?.status) {
        await AsyncStorage.setItem("ProfileInformation5", "active");
        navigation.navigate('Processing');
      }else{
        // console.log('response?.data?', userToken)
      }
    } catch (error) {
      setError("ADD_USER_DIAGONSIS_API sadasd");
      console.error("asd asdas:", error);
    }
  };
  console.log(userToken)
  return (
    <View style={styles.outerContainer}>
      <Header />
      <ScrollView
        contentContainerStyle={[styles.container, { paddingBottom: 80 }]}
      >
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
            <Circle
              cx="60"
              cy="50"
              r="12"
              fill="#007bff"
              stroke="#bfbfbf"
              strokeWidth="1"
            />
            <Circle
              cx="100"
              cy="50"
              r="12"
              fill="#007bff"
              stroke="#bfbfbf"
              strokeWidth="1"
            />
            <Rect
              x="130"
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
          </Svg>
        </View>

        <Text style={styles.title}>Now let's look at your healthstyle.</Text>
        <Text style={styles.subHeader}>
          What are some of your current health actions focus areas?
        </Text>

        <View style={styles.section}>
          <Food_Diet set_Object_Food_Diet={set_Object_Food_Diet} />
        </View>

        <View style={styles.section}>
          <Supplements set_Object_Supplements={set_Object_Supplements} />
        </View>

        <View style={styles.section}>
          <Movement_Exercise
            set_Object_Movement_Exercise={set_Object_Movement_Exercise}
          />
        </View>
        <View style={styles.section}>
          <Body_Therapies
            set_Object_Body_Therapies={set_Object_Body_Therapies}
          />
        </View>

        <NextButton onPress={ADD_HEALTH_STYLE_API} isTyping={isTyping} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "#F6F5F2",
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 15,
    backgroundColor: "#F6F5F2",
  },
  svgContainer: {
    alignItems: "flex-start",
    marginBottom: 20,
    height: 24,
  },
  title: {
    fontSize: 20,
    fontFamily: "Poppins-SemiBold",
    color: "#4a4a4a",
    marginBottom: 24,
  },
  subHeader: {
    fontSize: 20,
    fontFamily: "Poppins-SemiBold",
    color: "#4a4a4a",
    marginBottom: -5,
  },
  section: {
    marginBottom: 0,
  },
});

export default HealthStyleScreen;
