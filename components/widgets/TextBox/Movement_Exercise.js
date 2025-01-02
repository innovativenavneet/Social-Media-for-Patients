import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const Movement_Exercise = ({set_Object_Movement_Exercise}) => {
  const [query_string, set_query_string] = useState("");
  const [movement_exercise_list, set_movement_exercise_list] = useState([
    {
      type: "movement",
      id: 1,
      name: "Walking",
      duration_minutes: 30,
      distance_km: 2.5,
      calories_burned: 150,
    },
    {
      type: "movement",
      id:2,
      name: "Running",
      duration_minutes: 20,
      distance_km: 5,
      calories_burned: 300,
    },
    {
      type: "exercise",
      id: 3,
      name: "Push-ups",
      repetitions: 50,
      sets: 3,
      calories_burned: 100,
    },
    {
      type: "exercise",
      id: 4,
      name: "Squats",
      repetitions: 40,
      sets: 3,
      calories_burned: 120,
    },
  ]);
  const [filtered_list, set_filtered_list] = useState(movement_exercise_list);
  const [selected_movement_exercise, set_selected_movement_exercise] = useState(
    []
  );
  const [list_loader, set_list_loader] = useState(false);

  const disabledmovement_exercise = (item) => {
    return selected_movement_exercise.some(
      (selectedItem) =>
        selectedItem.id === item.id && selectedItem.type === item.type
    );
  };

  const add_movement_exercises = (item) => {
    if (!disabledmovement_exercise(item)) {
      set_selected_movement_exercise([...selected_movement_exercise, item]);
      set_Object_Movement_Exercise([...selected_movement_exercise, item])
    }
  };

  const remove_movement_exercise = (item) => {
    set_selected_movement_exercise(
      selected_movement_exercise.filter(
        (selectedItem) =>
          selectedItem.id !== item.id || selectedItem.type !== item.type
      )
      
    );
    set_Object_Movement_Exercise(
      selected_movement_exercise.filter(
        (selectedItem) =>
          selectedItem.id !== item.id || selectedItem.type !== item.type
      )
      )
  };

  const searchFoodByName = (name) => {
    set_query_string(name);
    if (name) {
      const movement_exercise_list_array = movement_exercise_list.filter(
        (item) => item.name.toLowerCase().includes(name.toLowerCase())
      );
      set_filtered_list(movement_exercise_list_array);
    } else {
      set_filtered_list(movement_exercise_list);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Movement & Exercise</Text>
      <View style={styles.textBox}>
        {selected_movement_exercise.length > 0 && (
          <>
            {selected_movement_exercise.map((item) => (
              <View
                key={"selected_movement_exercise" + item.id + item.type}
                style={styles.selectedDiagnosis}
              >
                <Image
                  style={{ width: 15, height: 15 }}
                  source={require("../../../assets/Logo/movement_exercise.png")}
                />
                <Text style={styles.tagText}>{item.name}</Text>
                <TouchableOpacity
                  style={styles.closeIcon}
                  onPress={() => remove_movement_exercise(item)}
                >
                  <Icon name="close-circle-outline" size={18} color="#4F8EF7" />
                </TouchableOpacity>
              </View>
            ))}
          </>
        )}
        <View>
          <TextInput
            placeholder="Add one or more Movement & Exerciserun"
            value={query_string}
            onChangeText={(text) => searchFoodByName(text)}
          />
        </View>
      </View>

      <View style={styles.tagsContainer}>
        {list_loader ? (
          <View style={[styles.activity_container, styles.horizontal]}>
            <ActivityIndicator
              style={styles.actiivity_loader}
              size="small"
              color="#0d66ff"
            />
          </View>
        ) : (
          <>
            {filtered_list.map(
              (item) =>
                !disabledmovement_exercise(item) && (
                  <TouchableOpacity
                    key={"disabled_movement_exercise" + item.id + item.type}
                    onPress={() => add_movement_exercises(item)}
                    style={styles.tagIcon}
                  >
                    <Image
                      style={{ width: 15, height: 15 }}
                      source={require("../../../assets/Logo/movement_exercise.png")}
                    />
                    <Text style={styles.tagText}>{item.name}</Text>
                  </TouchableOpacity>
                )
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
    paddingVertical: 5,
    backgroundColor: "#9EC2FF",
    flexDirection: "row",
    gap: 7,
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

export default Movement_Exercise;
