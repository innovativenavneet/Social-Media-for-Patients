
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
import ProgressBar from "../../common/ProgressBar";
import Icon from "react-native-vector-icons/Ionicons";

const DiagnosisSymptoms = ({
  title,
  placeholder,
  data,
  set_data,
  list_diagnosis_symptoms,
  set_list_diagnosis_symptoms,
  list_loader,
}) => {
  const [index_value, set_index_value] = useState(0);

  useEffect(() => {
    var old_data = data;
    old_data["severity"] = index_value;
    console.log(data);
    set_data(old_data);
  }, [index_value]);
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.textBox}>
        {data?.id ? (
          <>
            <View style={styles.selectedDiagnosis}>
              <Image
                style={{ width: 15, height: 15 }}
                source={require("../../../assets/Logo/Diagnosis.png")}
              />
              <Text style={styles.tagText}>{data.title}</Text>
              <TouchableOpacity
                style={styles.closeIcon}
                onPress={() => set_data({})}
              >
                <Icon name="close-circle-outline" size={18} color="#4F8EF7" />
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <View>
              <Text>{placeholder}</Text>
            </View>
          </>
        )}
      </View>

      {/* {error && <Text style={styles.errorText}>{error}</Text>} */}

      <View style={styles.tagsContainer}>
        {list_loader ? (
          <>
            <View
              key={"tagsContainer" + item.id}
              style={[styles.activity_container, styles.horizontal]}
            >
              <ActivityIndicator
                style={styles.actiivity_loader}
                size="small"
                color="#0d66ff"
              />
            </View>
          </>
        ) : (
          <>
            {list_diagnosis_symptoms.length > 0 && !data.id ? (
              <>
                {list_diagnosis_symptoms.map((item) => (
                  <>
                 <TouchableOpacity
                      key={"tagsContainer" + item.id}
                      style={styles.tagIcon}
                      onPress={() => {
                        set_data(item)
                      }}
                    >
                      <Image
                        key={"image" + item.id}
                        style={{ width: 15, height: 15 }}
                        source={require("../../../assets/Logo/Diagnosis.png")}
                      />
                      <Text key={"text" + item.id} style={styles.tagText}>
                        {item.title}
                      </Text>
                    </TouchableOpacity>
                  
                    
                  </>
                ))}
              </>
            ) : (
              <>
                {data.id ? (
                  <></>
                ) : (
                  <>
                    <Text>Data Empty</Text>
                  </>
                )}
              </>
            )}
          </>
        )}
        <ProgressBar
          initialProgress={data.severity}
          set_index_value={set_index_value}
        />
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
    marginTop: 9,
    gap: 5,
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
    gap: 4,
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
    paddingVertical: 5,
    backgroundColor: "#9EC2FF",
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
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

export default DiagnosisSymptoms;
