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

const MediumLevelsScreen = ({ navigation }) => {
  // Change the colour of the level buttons, depending on the state
  // (was the level previously completed or not)
  const MediumLevelsColorBackground = "rgba(246,197,58,1)";
  const MediumLevelsColorBackgroundCompleted = "rgba(235,189,56,1)";

  const MediumLevelsColorOutline = "rgba(205,165,49,1)";
  const MediumLevelsColorOutlineCompleted = "rgba(183,147,43,1)";

  // Declare array for which the state of the levels will be saved
  const [completedLevels, setCompletedLevels] = useState([]);

  // Load the completed levels on component mount
  useEffect(() => {
    const loadCompletedLevelsData = async () => {
      const levels = await loadCompletedLevels();
      setCompletedLevels(levels);
    };
    loadCompletedLevelsData();
  }, []);

  // Declare the data for all of the levels
  // TODO add more aspects such as
  // - what hints will the user get after completing the level
  // - number of credits
  const levels = [
    {
      levelName: "M1",
      color: MediumLevelsColorBackground,
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
      levelName: "M2",
      color: MediumLevelsColorBackground,
      levelPoints: 15,
      GRID_DATA: [["F", "F", "F", "F", "F"]],
      ROW_CLUES: ["Input F"],
    },
    {
      levelName: "M3",
      color: MediumLevelsColorBackground,
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
    {
      levelName: "M4",
      color: MediumLevelsColorBackground,
      levelPoints: 15,
      GRID_DATA: [["F", "F", "F", "F", "F"]],
      ROW_CLUES: ["Input F"],
    },
    {
      levelName: "M5",
      color: MediumLevelsColorBackground,
      levelPoints: 15,
      GRID_DATA: [["F", "F", "F", "F", "F"]],
      ROW_CLUES: ["Input F"],
    },
    {
      levelName: "M6",
      color: MediumLevelsColorBackground,
      levelPoints: 15,
      GRID_DATA: [["F", "F", "F", "F", "F"]],
      ROW_CLUES: ["Input F"],
    },
    {
      levelName: "M7",
      color: MediumLevelsColorBackground,
      levelPoints: 15,
      GRID_DATA: [["F", "F", "F", "F", "F"]],
      ROW_CLUES: ["Input F"],
    },
    {
      levelName: "M8",
      color: MediumLevelsColorBackground,
      levelPoints: 15,
      GRID_DATA: [["F", "F", "F", "F", "F"]],
      ROW_CLUES: ["Input F"],
    },
    {
      levelName: "M9",
      color: MediumLevelsColorBackground,
      levelPoints: 15,
      GRID_DATA: [["F", "F", "F", "F", "F"]],
      ROW_CLUES: ["Input F"],
    },
    {
      levelName: "M10",
      color: MediumLevelsColorBackground,
      levelPoints: 15,
      GRID_DATA: [["F", "F", "F", "F", "F"]],
      ROW_CLUES: ["Input F"],
    },
  ];

  // Pass all of the data to the CrosswordScreen
  const handleLevelPress = (levelName, GRID_DATA, ROW_CLUES, levelPoints) => {
    navigation.navigate("CrosswordScreen", {
      levelName,
      GRID_DATA,
      ROW_CLUES,
      levelPoints,
    });
  };

  const renderLevel = ({ item }) => {
    // Check if the level is completed and set the colour accordingly
    const backgroundColor = completedLevels.includes(item.levelName)
      ? MediumLevelsColorBackgroundCompleted
      : item.color;

    const borderColor = completedLevels.includes(item.levelName)
      ? MediumLevelsColorOutlineCompleted
      : MediumLevelsColorOutline;

    return (
      <TouchableOpacity
        style={[styles.levelBox, { backgroundColor, borderColor }]}
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
      {/* Display Custom header */}
      <CustomHeader title="Medium Levels" />

      {/* Display all of the levels in a form of two columns */}
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
    // borderRadius: 5,
    margin: 5,
    // borderColor: "#318535",
    borderBottomWidth: 12,
    borderLeftWidth: 12,
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

export default MediumLevelsScreen;
