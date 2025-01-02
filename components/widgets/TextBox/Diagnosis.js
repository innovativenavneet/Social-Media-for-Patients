import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {
  DIAGNOSIS_LISTING,
  CREATE_DIAGNOSIS,
  ADD_USER_DIAGONSIS,
  USER_DIAGNOSIS_LISTING,
  DELETE_USER_DIAGONSIS
} from "../../API/apis";

import Icon from "react-native-vector-icons/Ionicons";

const Diagnosis = () => {
  const [userToken, setUserToken] = useState(null);
  const [query_string, set_query_string] = useState("");
  const [diagnosis_list, set_diagnosis_list] = useState([]);
  const [selected_diagnosis, set_selected_diagnosis] = useState([]);
  const [error, setError] = useState(null);

  const [list_loader, set_list_loader] = useState(true);

  const CREATE_DIAGNOSIS_API = async () => {
    try {
      const form_data = new FormData();
      form_data.append("user_token", userToken);
      form_data.append("title", query_string);
      const response = await CREATE_DIAGNOSIS(form_data);
      console.log(response);
      if (response?.data?.status) {
        set_selected_diagnosis(response?.data?.diagnosis_list);
        DIAGNOSIS_LISTING_API(token, "");
      }else{
        console.log('response?.data?', token)
      }
    } catch (error) {
      setError("CREATE_DIAGNOSIS_API");
      console.error("CREATE_DIAGNOSIS_API:", error);
    }
  };

  const DIAGNOSIS_LISTING_API = async (userToken, query_string) => {
    try {
      if (!userToken) {
        setError("User token not found");
        return;
      }
      const form_data = new FormData();
      form_data.append("user_token", userToken);
      form_data.append("query_string", query_string);

      const response = await DIAGNOSIS_LISTING(form_data);
      if (response?.data?.status) {
        set_diagnosis_list(response?.data?.message);
        // set_query_string('')
        set_list_loader(false);
      }
    } catch (error) {
      setError("DIAGNOSIS_LISTING_API");
      console.error("DIAGNOSIS_LISTING_API:", error);
    }
  };

  const ADD_USER_DIAGONSIS_API = async (diagnosis_id) => {
    try {
      // const token = await AsyncStorage.getItem("user_token");
      const form_data = new FormData();
      form_data.append("user_token", userToken);
      form_data.append("diagnosis_id", diagnosis_id);

      const response = await ADD_USER_DIAGONSIS(form_data);
     
      if (response?.data?.status) {
        set_selected_diagnosis(response?.data?.diagnosis_list);
        DIAGNOSIS_LISTING_API(userToken, "");
        set_query_string('')
      }else{
        // console.log('response?.data?', userToken)
      }
    } catch (error) {
      setError("ADD_USER_DIAGONSIS_API sadasd");
      console.error("asd asdas:", error);
    }
  };

  const USER_DIAGNOSIS_LISTING_API = async (userToken) => {
    try {
      if (!userToken) {
        setError("User token not found");
        return;
      }
      const form_data = new FormData();
      form_data.append("user_token", userToken);
      const response = await USER_DIAGNOSIS_LISTING(form_data);
      if (response?.data?.status) {
        set_selected_diagnosis(response?.data?.diagnosis_list);
        DIAGNOSIS_LISTING_API(userToken, "");
      }
    } catch (error) {
      setError("USER_DIAGNOSIS_LISTING_API");
      console.error("USER_DIAGNOSIS_LISTING_API:", error);
    }
  };


  const DELETE_USER_DIAGONSIS_API = async (id) => {
    try {
      if (!userToken) {
        setError("User token not found");
        return;
      }
      const form_data = new FormData();
      form_data.append("user_token", userToken);
      form_data.append("diagnosis_id", id);

      const response = await DELETE_USER_DIAGONSIS(form_data);
      if (response?.data?.status) {
        set_selected_diagnosis(response?.data?.diagnosis_list);
        DIAGNOSIS_LISTING_API(token, "");
      }
    } catch (error) {
    }
  };


  useEffect(() => {
    const fetchToken = async () => {
      const token = await AsyncStorage.getItem("user_token");
      setUserToken(token);
      DIAGNOSIS_LISTING_API(token, "");
      USER_DIAGNOSIS_LISTING_API(token)
    };

    fetchToken();
  }, []);


  const handleDiagnosisChange = (text) => {
    set_query_string(text);
    DIAGNOSIS_LISTING_API(userToken, text);
  };



  const disabled_diagnosis = (selected_diagnosis, diagnosis_id) => {
    const filteredArrayWithValue = selected_diagnosis.filter(obj => obj['id'] === diagnosis_id);
    if(filteredArrayWithValue.length > 0){
      return true;
    }
    return false;
  }


  
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Diagnosis</Text>
      <View style={styles.textBox}>
        {selected_diagnosis.length > 0 && (
          <>
            {selected_diagnosis.map((item) => (
              <>
                <View key={'selected_diagnosis'+item.id} style={styles.selectedDiagnosis}>
                <Image
                        style={{ width: 15, height: 15 }}
                        source={require("../../../assets/Logo/Diagnosis.png")}
                      />
                  <Text style={styles.tagText}>{item.title}</Text>
                  <TouchableOpacity style={styles.closeIcon} onPress={() => DELETE_USER_DIAGONSIS_API(item.id)}>
                    <Icon
                      name="close-circle-outline"
                      size={18}
                      color="#4F8EF7"
                    />
                  </TouchableOpacity>
                </View>
              </>
            ))}
          </>

        )}
        {/* <View style={styles.selectedDiagnosis}>
          <Text style={styles.tagText}>Diagnosis 1</Text>
          <TouchableOpacity style={styles.closeIcon}>
            <Icon name="close-circle-outline" size={18} color="#4F8EF7" />
          </TouchableOpacity>
        </View>
       */}
        <View>
          <TextInput
            placeholder="Add one or more diagnosis"
            value={query_string}
            onChangeText={(text) => handleDiagnosisChange(text)}
          />
        </View>
      </View>

      {/* {error && <Text style={styles.errorText}>{error}</Text>} */}

      <View style={styles.tagsContainer}>
        {list_loader ? (
          <>
            <View style={[styles.activity_container, styles.horizontal]}>
              <ActivityIndicator
                style={styles.actiivity_loader}
                size="small"
                color="#0d66ff"
              />
            </View>
          </>
        ) : (
          <>
            {diagnosis_list.length > 0 ? (
              <>
                {diagnosis_list.map((item) => (
                  <>
                  {!disabled_diagnosis(selected_diagnosis, item.id) && <>
                    <TouchableOpacity  key={'disabled_diagnosis'+item.id} onPress={() => ADD_USER_DIAGONSIS_API(item.id)} style={styles.tagIcon}>
                   
                      <Image
                        style={{ width: 15, height: 15 }}
                        source={require("../../../assets/Logo/Diagnosis.png")}
                      />
                      <Text style={styles.tagText}>{item.title}</Text>
                    
                    </TouchableOpacity>
                  </>}
                   
                  </>
                ))}
              </>
            ) : (
              <>
                <Text>Data not found.</Text>
                <TouchableOpacity onPress={() => CREATE_DIAGNOSIS_API()}>
                  <Text>Add New Diagnosis</Text>
                </TouchableOpacity>
              </>
            )}
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#4a4a4a",
    marginVertical: 10,
    marginBottom: 1,
  },
  textBox: {
    borderRadius: 20,
    backgroundColor: "white",
    paddingHorizontal: 12,
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    elevation: 1,
    marginBottom: 9,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "start",
    paddingVertical: 8,
    gap: 15,
  },
  suggestionsContainer: {
    backgroundColor: "white",
    elevation: 2,
    borderRadius: 5,
  },
  suggestion: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  suggestionIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  suggestionText: {
    fontSize: 14,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    gap: 10,
  },
  tagIcon: {
    backgroundColor: "#9EC2FF",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    display: "flex",
    flexWrap: "nowrap",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    borderRadius: 20,
    padding: 5,
    margin: 5,
  },

  tagText: {
    fontSize: 12,
    color: "white",
  },
  selectedDiagnosis: {
    position: "relative",
    paddingHorizontal: 8,
    paddingVertical:5,
    backgroundColor:"#9EC2FF",
    flexDirection:"row",
    gap:7,
    alignItems:'center',
    borderRadius: 5,
  },
  closeIcon: {
    position: "absolute",
    right: -12,
    top: -12,
  },
  removeTagText: {
    marginLeft: 5,
    color: "#0D66FF",
  },
  errorText: {
    color: "#0D66FF",
    marginBottom: 10,
  },
  activity_container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});

export default Diagnosis;
