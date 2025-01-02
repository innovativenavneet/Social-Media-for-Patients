import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Header from "../../common/SkipHeader";
import { useNavigation } from "@react-navigation/native";
import ProgressBar from "../../common/ProgressBar";
import { Svg, Rect, Circle } from "react-native-svg";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { SYMPTOPS_DIAGNOSIS_LIST, ADD_SYSMPTOMS_DIAGNOSIS } from "../../API/apis";
import NextButton from "../../widgets/Buttons/NextButton";
import DiagnosisSymptoms from "../../widgets/TextBox/DiagnosisSymptoms";
export default function DiagSymtomSecond() {
  const [userToken, setUserToken] = useState(null);

  const navigation = useNavigation();
  const [data, setData] = useState([]);

  const [selectedDiagSymptom, setSelectedDiagSymptom] = useState({
    first: "",
    second: "",
    third: "",
  });

  const [list_loader, set_list_loader] = useState(false);
  const [list_diagnosis_symptoms, set_list_diagnosis_symptoms] = useState([]);

  const [severity, setSeverity] = useState({ first: 0, second: 0, third: 0 });
  const [focusedInput, setFocusedInput] = useState(null);
  const [isTyping, setIsTyping] = useState(false); // State to track typing status

  const [severity_1, set_severity_1] = useState({});
  const [severity_2, set_severity_2] = useState({});
  const [severity_3, set_severity_3] = useState({});

  const SYMPTOPS_DIAGNOSIS_LIST_API = async (userToken, query_string) => {
    try {
      if (!userToken) {
        setError("User token not found");
        return;
      }
      // console.log('asdaad')
      const form_data = new FormData();
      form_data.append("user_token", userToken);
      form_data.append("query_string", query_string);

      const response = await SYMPTOPS_DIAGNOSIS_LIST(form_data);
      console.log(response?.data);
      if (response?.data?.status) {
        set_list_diagnosis_symptoms(response?.data?.symptom_diagnosis_list);
        set_list_loader(false);
      } else {
        console.log(response?.data);
      }
    } catch (error) {
      setError("SYMPTOPS_DIAGNOSIS_LIST");
      console.error("SYMPTOPS_DIAGNOSIS_LIST:", error);
    }
  };

  const ADD_SYSMPTOMS_DIAGNOSIS_API = async () => {
    try {
      // const token = await AsyncStorage.getItem("user_token");
      const form_data = new FormData();
      form_data.append("user_token", userToken);
      form_data.append("severity_1", JSON.stringify(severity_1));
      form_data.append("severity_2", JSON.stringify(severity_2));
      form_data.append("severity_3", JSON.stringify(severity_3));
      
      const response = await ADD_SYSMPTOMS_DIAGNOSIS(form_data);
     
      if (response?.data?.status) {
        await AsyncStorage.setItem("ProfileInformation4", "active");
        navigation.navigate('ProfileInformation5');
      }else{
        // console.log('response?.data?', userToken)
      }
    } catch (error) {
      setError("ADD_USER_DIAGONSIS_API sadasd");
      console.error("asd asdas:", error);
    }
  };

  useEffect(() => {
    const fetchToken = async () => {
      const token = await AsyncStorage.getItem("user_token");
      setUserToken(token);
      SYMPTOPS_DIAGNOSIS_LIST_API(token, "");
    };
    fetchToken();
  }, []);

  return (
    <View style={styles.outerContainer}>
      <Header />
      <ScrollView contentContainerStyle={styles.container}>
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
        <Text style={styles.title}>
          Which 3 diagnosis/symptoms do you wish to focus on?
        </Text>
        <Text style={styles.subtitle}>
          Take the shortcut to finding what worked for someone just like you.
        </Text>
        <DiagnosisSymptoms
          list_loader={list_loader}
          list_diagnosis_symptoms={list_diagnosis_symptoms}
          set_list_diagnosis_symptoms={set_list_diagnosis_symptoms}
          set_data={set_severity_1}
          data={severity_1}
          key={"1st"}
          title={"1st"}
          placeholder={"Tap your top diagnosisi/sysmptop into the box"}
        />
        <DiagnosisSymptoms
          list_loader={list_loader}
          list_diagnosis_symptoms={list_diagnosis_symptoms}
          set_list_diagnosis_symptoms={set_list_diagnosis_symptoms}
          set_data={set_severity_2}
          data={severity_2}
          key={"2st"}
          title={"2st"}
          placeholder={"Tap a secound diagnosisi/sysmptop into the box"}
        />
        <DiagnosisSymptoms
          list_loader={list_loader}
          list_diagnosis_symptoms={list_diagnosis_symptoms}
          set_list_diagnosis_symptoms={set_list_diagnosis_symptoms}
          set_data={set_severity_3}
          data={severity_3}
          key={"3st"}
          title={"2st"}
          placeholder={"Tap a Third diagnosisi/sysmptop into the box"}
        />

        <NextButton
          style={styles.nextButton}
           onPress={ADD_SYSMPTOMS_DIAGNOSIS_API}
          isTyping={isTyping} // Pass isTyping state to NextButton component
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "#F6F5F2",
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 15,
    paddingBottom: 70,
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
    marginVertical: 15,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    fontFamily: "Poppins-SemiBold",
    color: "#4a4a4a",
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#4a4a4a",
    marginVertical: 16,
    marginBottom: 0,
  },
  inputContainer: {
    marginBottom: 20,
  },
  textBox: {
    borderRadius: 12,
    backgroundColor: "white",
    paddingHorizontal: 10,
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    marginBottom: 9,
    height: 35,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  imageContainer: {
    width: "33.33%",
    padding: 5,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 30,
    borderRadius: 5,
  },
  severityText: {
    marginTop: 15,
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#4a4a4a",
    marginBottom: 5,
  },
  nextButtonContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingHorizontal: 15,
    paddingBottom: 20,
    marginTop: 30,
  },
  nextButton: {
    backgroundColor: "#007bff",
    borderRadius: 10,
    padding: 12,
    alignItems: "center",
    marginTop: 30,
  },
});
