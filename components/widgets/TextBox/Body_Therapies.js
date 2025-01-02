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

const Body_Therapies = ({set_Object_Body_Therapies}) => {
  const [query_string, set_query_string] = useState("");
  const [body_therapies_list, set_body_therapies_list] = useState([
    {
        "id": 1,
        "name": "Swedish Massage",
        "description": "A relaxing full-body massage using long strokes, kneading, deep circular movements, vibration, and tapping.",
        "duration": "60 minutes"
    },
    {
        "id": 2,
        "name": "Deep Tissue Massage",
        "description": "A massage technique that's mainly used to treat musculoskeletal issues, such as strains and sports injuries.",
        "duration": "60 minutes"
    },
    {
        "id": 3,
        "name": "Hot Stone Massage",
        "description": "A type of massage therapy where smooth, heated stones are placed on specific parts of your body.",
        "duration": "75 minutes"
    },
    {
        "id": 4,
        "name": "Aromatherapy Massage",
        "description": "A massage therapy that involves the use of essential oils which can be calming, energizing, and stress-relieving.",
        "duration": "60 minutes"
    },
    {
        "id": 5,
        "name": "Thai Massage",
        "description": "A traditional therapy combining acupressure, Indian Ayurvedic principles, and assisted yoga postures.",
        "duration": "90 minutes"
    },
    {
        "id": 6,
        "name": "Reflexology",
        "description": "A type of massage that involves applying different amounts of pressure to the feet, hands, and ears.",
        "duration": "45 minutes"
    },
    {
        "id": 7,
        "name": "Shiatsu Massage",
        "description": "A form of Japanese bodywork based on concepts in traditional Chinese medicine such as the use of qi meridians.",
        "duration": "60 minutes"
    },
    {
        "id": 8,
        "name": "Sports Massage",
        "description": "A type of massage designed to help athletes prepare their bodies for optimal performance, recover after a big event, or function well during training.",
        "duration": "60 minutes"
    },
    {
        "id": 9,
        "name": "Prenatal Massage",
        "description": "A massage therapy specifically tailored for the expectant mother's needs.",
        "duration": "60 minutes"
    },
    {
        "id": 10,
        "name": "Couples Massage",
        "description": "A massage therapy where two people are massaged at the same time in the same room by two different therapists.",
        "duration": "60 minutes"
    }
]
);
  const [filtered_list, set_filtered_list] = useState(body_therapies_list);
  const [selected_body_therapies, set_selected_body_therapies] = useState([]);
  const [list_loader, set_list_loader] = useState(false);

  const disabled_body_therapies = (item) => {
    return selected_body_therapies.some(selectedItem => selectedItem.id === item.id && selectedItem.type === item.type);
  }

  const add_body_therapiess = (item) => {
    if (!disabled_body_therapies(item)) {
      set_selected_body_therapies([...selected_body_therapies, item]);
      set_Object_Body_Therapies([...selected_body_therapies, item])
    }
  }

  const remove_body_therapies = (item) => {
    set_selected_body_therapies(selected_body_therapies.filter(selectedItem => selectedItem.id !== item.id || selectedItem.type !== item.type));
    set_Object_Body_Therapies(selected_body_therapies.filter(selectedItem => selectedItem.id !== item.id || selectedItem.type !== item.type))
  }

  const searchFoodByName = (name) => {
    set_query_string(name);
    if (name) {
      const body_therapies_list_array = body_therapies_list.filter(item => item.name.toLowerCase().includes(name.toLowerCase()));
      set_filtered_list(body_therapies_list_array);
    } else {
      set_filtered_list(body_therapies_list);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Body Therapies</Text>
      <View style={styles.textBox}>
        {selected_body_therapies.length > 0 && (
          <>
            {selected_body_therapies.map((item) => (
              <View key={'selected_body_therapies' + item.id + item.type} style={styles.selectedDiagnosis}>
                <Image
                  style={{ width: 15, height: 15 }}
                  source={require("../../../assets/Logo/body_therapies.png")}
                />
                <Text style={styles.tagText}>{item.name}</Text>
                <TouchableOpacity style={styles.closeIcon} onPress={() => remove_body_therapies(item)}>
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
            placeholder="Add one or Body Therapies"
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
              !disabled_body_therapies(item) && (
                <TouchableOpacity key={'disabled_body_therapies' + item.id + item.type} onPress={() => add_body_therapiess(item)} style={styles.tagIcon}>
                  <Image
                    style={{ width: 15, height: 15 }}
                    source={require("../../../assets/Logo/body_therapies.png")}
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

export default Body_Therapies;
