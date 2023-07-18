import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome5";
import CustomHeader from "./CustomHeader";
import { loadCompletedLevels } from "./AsyncStorageUtils";

const EasyLevelsScreen = ({ navigation, route }) => {
  const EasyLevelsColorBackground = "rgba(56,167,63,1)";
  const EasyLevelsColorBackgroundCompleted = "rgba(38,100,42,1)";

  // Take the parameters from the CrosswordScreen when the level is completed
  // const { levelCompleted, completedLevelName } = route.params;
  const [completedLevels, setCompletedLevels] = useState([]);

  // Load the completed levels on component mount
  useEffect(() => {
    const loadCompletedLevelsData = async () => {
      const levels = await loadCompletedLevels();
      setCompletedLevels(levels);
    };
    loadCompletedLevelsData();
  }, []);
  const levels = [
    {
      levelName: "E1",
      color: EasyLevelsColorBackground,
      levelPoints: 10,
      GRID_DATA: [
        ["C", "A", "C", "T", "U", "S"],
        ["J", "I", "G", "S", "A", "W"],
        ["S", "P", "I", "R", "I", "T"],
        ["T", "U", "R", "T", "L", "E"],
        ["W", "I", "N", "T", "E", "R"],
        ["R", "O", "C", "K", "E", "T"],
      ],
      ROW_CLUES: [
        "1. Desert plant known for its spikes.",
        "2. Puzzle with irregularly shaped pieces.",
        "3. Inner essence or mood.",
        "4. Reptile with a protective shell.",
        "5. Coldest season of the year.",
        "6. Vehicle used for space travel.",
      ],
    },
    {
      levelName: "E2",
      color: EasyLevelsColorBackground,
      levelPoints: 15,
      GRID_DATA: [["F", "F", "F", "F", "F"]],
      ROW_CLUES: ["Input F"],
    },
    {
      levelName: "E3",
      color: EasyLevelsColorBackground,
      levelPoints: 15,
      GRID_DATA: [
        ["F", "F", "F", "F", "F", "F", "F", "F", "F", "F"],
        ["G", "H", "I", "J", "K", "L", "F", "F", "F", "F"],
        ["A", "N", "O", "P", "Q", "R", "F", "F", "F", "F"],
        ["S", "T", "U", "V", "W", "X", "F", "F", "F", "F"],
        ["F", "F", "U", "V", "W", "X", "F", "F", "F", "F"],
        ["Y", "Z", "1", "2", "3", "4", "F", "F", "F", "F"],
        ["F", "H", "1", "2", "2", "4", "F", "F", "F", "F"],
        ["F", "H", "1", "2", "2", "4", "F", "F", "F", "F"],
        ["F", "H", "1", "2", "2", "4", "F", "F", "F", "F"],
        ["F", "H", "1", "2", "2", "4", "F", "F", "F", "F"],
        ["F", "H", "1", "2", "2", "4", "F", "F", "F", "F"],
      ],
      ROW_CLUES: ["Clue for Row 1", "Clue for Row 2"],
    },
    // Add more levels with their corresponding GRID_DATA and ROW_CLUES
    // { level: "E3", color: EasyLevelsColorBackground, GRID_DATA: ..., ROW_CLUES: ... },
    // { level: "E4", color: EasyLevelsColorBackground, GRID_DATA: ..., ROW_CLUES: ... },
    // ...

    {
      levelName: "E4",
      color: EasyLevelsColorBackground,
      levelPoints: 15,
      GRID_DATA: [["F", "F", "F", "F", "F"]],
      ROW_CLUES: ["Input F"],
    },
    {
      levelName: "E5",
      color: EasyLevelsColorBackground,
      levelPoints: 15,
      GRID_DATA: [["F", "F", "F", "F", "F"]],
      ROW_CLUES: ["Input F"],
    },
    {
      levelName: "E6",
      color: EasyLevelsColorBackground,
      levelPoints: 15,
      GRID_DATA: [["F", "F", "F", "F", "F"]],
      ROW_CLUES: ["Input F"],
    },
    {
      levelName: "E7",
      color: EasyLevelsColorBackground,
      levelPoints: 15,
      GRID_DATA: [["F", "F", "F", "F", "F"]],
      ROW_CLUES: ["Input F"],
    },
    {
      levelName: "E8",
      color: EasyLevelsColorBackground,
      levelPoints: 15,
      GRID_DATA: [["F", "F", "F", "F", "F"]],
      ROW_CLUES: ["Input F"],
    },
    {
      levelName: "E9",
      color: EasyLevelsColorBackground,
      levelPoints: 15,
      GRID_DATA: [["F", "F", "F", "F", "F"]],
      ROW_CLUES: ["Input F"],
    },
    {
      levelName: "E10",
      color: EasyLevelsColorBackground,
      levelPoints: 15,
      GRID_DATA: [["F", "F", "F", "F", "F"]],
      ROW_CLUES: ["Input F"],
    },
  ];

  // Hide the header
  React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const handleLevelPress = (levelName, GRID_DATA, ROW_CLUES, levelPoints) => {
    navigation.navigate("CrosswordScreen", {
      levelName,
      GRID_DATA,
      ROW_CLUES,
      levelPoints,
    });
  };

  const renderLevel = ({ item }) => {
    // Check if the level is completed and set the color accordingly
    const backgroundColor = completedLevels.includes(item.levelName)
      ? EasyLevelsColorBackgroundCompleted
      : item.color;

    return (
      <TouchableOpacity
        style={[styles.levelBox, { backgroundColor }]}
        onPress={() =>
          handleLevelPress(
            item.levelName,
            item.GRID_DATA,
            item.ROW_CLUES,
            item.levelPoints
          )
        }
      >
        <Text style={styles.levelText}>{item.levelName}</Text>
        {completedLevels.includes(item.levelName) && (
          <Text style={styles.completedText}>Completed</Text>
        )}
      </TouchableOpacity>
    );
  };

  const keyExtractor = (item) => item.levelName;

  return (
    <View style={styles.container}>
      <CustomHeader
        // import nazwy levela
        title="Easy Levels"
      />
      {/* <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-left" size={20} color="black" />
      </TouchableOpacity> */}

      <FlatList
        data={levels}
        renderItem={renderLevel}
        keyExtractor={keyExtractor}
        numColumns={2}
        columnWrapperStyle={styles.column}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#b1fa9f",
  },
  backButton: {
    position: "absolute",
    top: 30,
    left: 20,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  column: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  levelBox: {
    width: "45%",
    height: 150,
    borderRadius: 8,
    marginVertical: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  levelText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  completedText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    marginTop: 5,
  },
});

export default EasyLevelsScreen;
