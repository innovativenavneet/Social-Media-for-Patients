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

const Supplements = ({set_Object_Supplements}) => {
  const [query_string, set_query_string] = useState("");
  const [supplements_list, set_supplements_list] = useState([
    {
        "id": 1,
        "name": "Vitamin D",
        "description": "Helps in the absorption of calcium and promotes bone health.",
        "price": 15.99,
        "stock": 100,
        "manufacturer": "HealthCorp",
        "expiry_date": "2025-12-31"
    },
    {
        "id": 2,
        "name": "Vitamin C",
        "description": "Boosts immune system and helps in collagen production.",
        "price": 10.99,
        "stock": 150,
        "manufacturer": "NutriLife",
        "expiry_date": "2024-11-30"
    },
    {
        "id": 3,
        "name": "Fish Oil",
        "description": "Rich in Omega-3 fatty acids, good for heart health.",
        "price": 20.99,
        "stock": 80,
        "manufacturer": "WellnessCo",
        "expiry_date": "2024-10-25"
    },
    {
        "id": 4,
        "name": "Probiotics",
        "description": "Supports gut health and improves digestion.",
        "price": 18.50,
        "stock": 120,
        "manufacturer": "BioHealth",
        "expiry_date": "2025-01-20"
    },
    {
        "id": 5,
        "name": "Magnesium",
        "description": "Supports muscle and nerve function.",
        "price": 12.99,
        "stock": 90,
        "manufacturer": "MineralMax",
        "expiry_date": "2024-09-15"
    },
    {
        "id": 6,
        "name": "Calcium",
        "description": "Essential for bone and teeth health.",
        "price": 14.50,
        "stock": 110,
        "manufacturer": "StrongBones",
        "expiry_date": "2025-04-10"
    },
    {
        "id": 7,
        "name": "Multivitamin",
        "description": "Complete daily nutrition support.",
        "price": 25.00,
        "stock": 200,
        "manufacturer": "NutriPack",
        "expiry_date": "2025-06-05"
    },
    {
        "id": 8,
        "name": "Zinc",
        "description": "Supports immune function and metabolism.",
        "price": 11.99,
        "stock": 140,
        "manufacturer": "HealthBoost",
        "expiry_date": "2024-08-30"
    },
    {
        "id": 9,
        "name": "Iron",
        "description": "Essential for blood production.",
        "price": 9.99,
        "stock": 130,
        "manufacturer": "VitalHealth",
        "expiry_date": "2024-12-20"
    },
    {
        "id": 10,
        "name": "Vitamin B12",
        "description": "Supports nerve function and red blood cell formation.",
        "price": 13.50,
        "stock": 100,
        "manufacturer": "EnergyPlus",
        "expiry_date": "2025-02-15"
    }
]
);
  const [filtered_list, set_filtered_list] = useState(supplements_list);
  const [selected_supplements, set_selected_supplements] = useState([]);
  const [list_loader, set_list_loader] = useState(false);

  const disabledSupplements  = (item) => {
    return selected_supplements.some(selectedItem => selectedItem.id === item.id && selectedItem.type === item.type);
  }

  const add_supplementss = (item) => {
    if (!disabledSupplements (item)) {
      set_selected_supplements([...selected_supplements, item]);
      set_Object_Supplements([...selected_supplements, item])
    }
  }

  const remove_supplements = (item) => {
    set_selected_supplements(selected_supplements.filter(selectedItem => selectedItem.id !== item.id || selectedItem.type !== item.type));

    set_Object_Supplements(selected_supplements.filter(selectedItem => selectedItem.id !== item.id || selectedItem.type !== item.type))
  }

  const searchFoodByName = (name) => {
    set_query_string(name);
    if (name) {
      const supplements_list_array = supplements_list.filter(item => item.name.toLowerCase().includes(name.toLowerCase()));
      set_filtered_list(supplements_list_array);
    } else {
      set_filtered_list(supplements_list);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Suplements</Text>
      <View style={styles.textBox}>
        {selected_supplements.length > 0 && (
          <>
            {selected_supplements.map((item) => (
              <View key={'selected_supplements' + item.id + item.type} style={styles.selectedDiagnosis}>
                <Image
                  style={{ width: 15, height: 15 }}
                  source={require("../../../assets/Logo/supplements.png")}
                />
                <Text style={styles.tagText}>{item.name}</Text>
                <TouchableOpacity style={styles.closeIcon} onPress={() => remove_supplements(item)}>
                  <Icon
                    name="close-circle-outline"
                    size={18}
                    color="#4F8EF7"
                  />
                </TouchableOpacity>
              </View>
            ))}
          </>
        )}
        <View>
          <TextInput
            placeholder="Add one or more supplements"
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
            {filtered_list.map((item) => (
              !disabledSupplements (item) && (
                <TouchableOpacity key={'disabled_supplements' + item.id + item.type} onPress={() => add_supplementss(item)} style={styles.tagIcon}>
                  <Image
                    style={{ width: 15, height: 15 }}
                    source={require("../../../assets/Logo/supplements.png")}
                  />
                  <Text style={styles.tagText}>{item.name}</Text>
                </TouchableOpacity>
              )
            ))}
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
    alignItems: 'center',
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

export default Supplements;