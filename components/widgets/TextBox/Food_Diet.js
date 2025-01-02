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

const Food_Diet = ({set_Object_Food_Diet}) => {
  const [query_string, set_query_string] = useState("");
  const [food_diet_list, set_food_diet_list] = useState([
    {
      id: 1,
      name: "Apple",
      type: "foods",
      calories: 95,
      protein_g: 0.5,
      fat_g: 0.3,
      carbs_g: 25,
      fiber_g: 4.4,
      sugar_g: 19,
    },
    {
      id: 2,
      name: "Banana",
      type: "foods",
      calories: 105,
      protein_g: 1.3,
      fat_g: 0.4,
      carbs_g: 27,
      fiber_g: 3.1,
      sugar_g: 14,
    },
    {
      id: 3,
      name: "Chicken Breast",
      type: "foods",
      calories: 165,
      protein_g: 31,
      fat_g: 3.6,
      carbs_g: 0,
      fiber_g: 0,
      sugar_g: 0,
    },
    {
      id: 1,
      type: "diets",
      name: "Keto",
      description: "A low-carb, high-fat diet.",
      recommended_foods: [1, 3],
      restricted_foods: [2],
    },
    {
      id: 2,
      type: "diets",
      name: "Vegetarian",
      description: "A diet that excludes meat and fish.",
      recommended_foods: [1, 2],
      restricted_foods: [3],
    },
  ]);
  const [filtered_list, set_filtered_list] = useState(food_diet_list);
  const [selected_food_diet, set_selected_food_diet] = useState([]);
  const [list_loader, set_list_loader] = useState(false);

  const disabledFoodDiet = (item) => {
    return selected_food_diet.some(
      (selectedItem) =>
        selectedItem.id === item.id && selectedItem.type === item.type
    );
  };

  const add_food_diets = (item) => {
    if (!disabledFoodDiet(item)) {
      set_selected_food_diet([...selected_food_diet, item]);
      set_Object_Food_Diet([...selected_food_diet, item])
    }
  };

  const remove_food_diet = (item) => {
    set_selected_food_diet(
      selected_food_diet.filter(
        (selectedItem) =>
          selectedItem.id !== item.id || selectedItem.type !== item.type
      )
    );
    set_Object_Food_Diet(
      selected_food_diet.filter(
        (selectedItem) =>
          selectedItem.id !== item.id || selectedItem.type !== item.type
      ))
  };

  const searchFoodByName = (name) => {
    set_query_string(name);
    if (name) {
      const food_diet_list_array = food_diet_list.filter((item) =>
        item.name.toLowerCase().includes(name.toLowerCase())
      );
      set_filtered_list(food_diet_list_array);
    } else {
      set_filtered_list(food_diet_list);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Food & Diets</Text>
      <View style={styles.textBox}>
        {selected_food_diet.length > 0 && (
          <>
            {selected_food_diet.map((item) => (
              <View
                key={"selected_food_diet" + item.id + item.type}
                style={styles.selectedDiagnosis}
              >
                <Image
                  style={{ width: 15, height: 15 }}
                  source={require("../../../assets/Logo/food_diet.png")}
                />
                <Text style={styles.tagText}>{item.name}</Text>
                <TouchableOpacity
                  style={styles.closeIcon}
                  onPress={() => remove_food_diet(item)}
                >
                  <Icon name="close-circle-outline" size={18} color="#4F8EF7" />
                </TouchableOpacity>
              </View>
            ))}
          </>
        )}
        <View>
          <TextInput
            placeholder="Add one or more diets"
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
                !disabledFoodDiet(item) && (
                  <TouchableOpacity
                    key={"disabled_food_diet" + item.id + item.type}
                    onPress={() => add_food_diets(item)}
                    style={styles.tagIcon}
                  >
                    <Image
                      style={{ width: 15, height: 15 }}
                      source={require("../../../assets/Logo/food_diet.png")}
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

export default Food_Diet;