import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../../../components/common/SkipHeader";
import NextButton from "../../widgets/Buttons/NextButton";
import Diagnosis from "../../widgets/TextBox/Diagnosis";
import Symptoms from "../../widgets/TextBox/Symptoms";


import AsyncStorage from "@react-native-async-storage/async-storage";
import LoaderButton from '../../widgets/Buttons/loaderButton';


import { Svg, Rect, Circle } from "react-native-svg";
import Navigation from "./Navigation";

const { width, height } = Dimensions.get("window");

const DiagSymptom = () => {
  const [userToken, setUserToken] = useState("");
  const [diagnosisTable, setDiagnosisTable] = useState([]);
  const [symptomsTable, setSymptomsTable] = useState([]);
  const [addDiagnosis, setAddDiagnosis] = useState("");
  const [addSymptoms, setAddSymptoms] = useState("");
  const [loader, setLoader] = useState(false);

  const [error, setError] = useState("");
  const navigation = useNavigation();

  const handleAddDiagnosis = () => {
    setDiagnosisTable([...diagnosisTable, addDiagnosis]);
    setAddDiagnosis("");
  };

  const handleAddSymptoms = () => {
    setSymptomsTable([...symptomsTable, addSymptoms]);
    setAddSymptoms("");
  };

  const next_screen = async() => {
    await AsyncStorage.setItem("ProfileInformation3", "active");
    navigation.navigate("ProfileInformation4")
  }
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Header />
        <View style={styles.innerContainer}>
          <View style={styles.objectiveContainer}>
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
                <Rect
                  x="90"
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
                  cx="160"
                  cy="50"
                  r="12"
                  fill="#9EC2FF"
                  stroke="#bfbfbf"
                  strokeWidth="1"
                />
              </Svg>
            </View>
            <Text style={styles.title}>
              Nimbo's Objective is to help you {"\n"}find experience based
              health solutions, beyond band-aids.
            </Text>
            <Text style={styles.subtitle}>
              Feel free to share your diagnosis {"\n"}or symptoms now or later
            </Text>
          </View>
          <View style={styles.diagnosis}>
            <Diagnosis add={addSymptoms} setAddSymptoms={setAddSymptoms} />
          </View>
          <View style={styles.symptoms}>
            <Symptoms
              addSymptoms={addSymptoms}
              setAddSymptoms={setAddSymptoms}
            />
          </View>
          {loader && (
            <View style={styles.loader}>
              <ActivityIndicator size="large" color="#007bff" />
            </View>
          )}
          {error && <Text style={styles.error}>{error}</Text>}
        </View>
        <View style={styles.nextButtonContainer}>
          
        {loader ? <>
          <LoaderButton />
        </> : <>
       
        <NextButton text="Next"  onPress={next_screen} />
        </>}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 80,
  },
  innerContainer: {
    padding: 20,
  },
  objectiveContainer: {
    paddingRight: 21,
    width: 354,
    height: 180,
  },
  svgContainer: {
    alignItems: "flex-start",
    marginBottom: 20,
    width: 106,
    height: 24,
  },
  title: {
    fontSize: 20,
    fontFamily: "Poppins-SemiBold",
    color: "#4a4a4a",
    marginVertical: 12,
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 20,
    fontFamily: "Poppins-SemiBold",
    color: "#4a4a4a",
    marginBottom: 30,
  },
  loader: {
    marginVertical: 20,
  },
  error: {
    color: "red",
    marginVertical: 10,
  },
  diagnosis: {
    marginTop: 80,
  },
  symptoms: {
    marginTop: 10,
  },
  nextButtonContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
});

export default DiagSymptom;
