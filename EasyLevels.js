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

const EasyLevelsScreen = ({ navigation }) => {
  // Change the colour of the level buttons, depending on the state
  // (was the level previously completed or not)
  const EasyLevelsColorBackground = "rgba(56,167,63,1)";
  const EasyLevelsColorBackgroundCompleted = "rgba(38,100,42,1)";

  const EasyLevelsColorOutline = "rgba(49,133,53,1)";
  const EasyLevelsColorOutlineCompleted = "rgba(31,78,33,1)";

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
      clueCount1Increase: 0,
      clueCount2Increase: 0,
      clueCount3Increase: 0,
      creditsIncrease: 0,
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
      clueCount1Increase: 0,
      clueCount2Increase: 0,
      clueCount3Increase: 0,
      creditsIncrease: 0,
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
      clueCount1Increase: 0,
      clueCount2Increase: 0,
      clueCount3Increase: 0,
      creditsIncrease: 0,
    },
    {
      levelName: "E4",
      color: EasyLevelsColorBackground,
      levelPoints: 15,
      GRID_DATA: [["F", "F", "F", "F", "F"]],
      ROW_CLUES: ["Input F"],
      clueCount1Increase: 0,
      clueCount2Increase: 0,
      clueCount3Increase: 0,
      creditsIncrease: 0,
    },
    {
      levelName: "E5",
      color: EasyLevelsColorBackground,
      levelPoints: 15,
      GRID_DATA: [["F", "F", "F", "F", "F"]],
      ROW_CLUES: ["Input F"],
      clueCount1Increase: 0,
      clueCount2Increase: 0,
      clueCount3Increase: 0,
      creditsIncrease: 0,
    },
    {
      levelName: "E6",
      color: EasyLevelsColorBackground,
      levelPoints: 15,
      GRID_DATA: [["F", "F", "F", "F", "F"]],
      ROW_CLUES: ["Input F"],
      clueCount1Increase: 0,
      clueCount2Increase: 0,
      clueCount3Increase: 0,
      creditsIncrease: 0,
    },
    {
      levelName: "E7",
      color: EasyLevelsColorBackground,
      levelPoints: 15,
      GRID_DATA: [["F", "F", "F", "F", "F"]],
      ROW_CLUES: ["Input F"],
      clueCount1Increase: 1,
      clueCount2Increase: 1,
      clueCount3Increase: 1,
      creditsIncrease: 100,
    },
    {
      levelName: "E8",
      color: EasyLevelsColorBackground,
      levelPoints: 15,
      GRID_DATA: [["F", "F", "F", "F", "F"]],
      ROW_CLUES: ["Input F"],
      clueCount1Increase: 0,
      clueCount2Increase: 0,
      clueCount3Increase: 0,
      creditsIncrease: 0,
    },
    {
      levelName: "E9",
      color: EasyLevelsColorBackground,
      levelPoints: 15,
      GRID_DATA: [["F", "F", "F", "F", "F"]],
      ROW_CLUES: ["Input F"],
      clueCount1Increase: 1,
      clueCount2Increase: 0,
      clueCount3Increase: 0,
      creditsIncrease: 200,
    },
    {
      levelName: "E10",
      color: EasyLevelsColorBackground,
      levelPoints: 15,
      GRID_DATA: [["F", "F", "F", "F", "F"]],
      ROW_CLUES: ["Input F"],
      clueCount1Increase: 1,
      clueCount2Increase: 1,
      clueCount3Increase: 1,
      creditsIncrease: 100,
    },
  ];

  // Pass all of the data to the CrosswordScreen
  const handleLevelPress = (
    levelName,
    GRID_DATA,
    ROW_CLUES,
    levelPoints,
    clueCount1Increase,
    clueCount2Increase,
    clueCount3Increase,
    creditsIncrease
  ) => {
    navigation.navigate("CrosswordScreen", {
      levelName,
      GRID_DATA,
      ROW_CLUES,
      levelPoints,
      clueCount1Increase,
      clueCount2Increase,
      clueCount3Increase,
      creditsIncrease,
    });
  };

  const renderLevel = ({ item }) => {
    // Check if the level is completed and set the colour accordingly
    const backgroundColor = completedLevels.includes(item.levelName)
      ? EasyLevelsColorBackgroundCompleted
      : item.color;

    const borderColor = completedLevels.includes(item.levelName)
      ? EasyLevelsColorOutlineCompleted
      : EasyLevelsColorOutline;

    return (
      <TouchableOpacity
        style={[styles.levelBox, { backgroundColor, borderColor }]}
        onPress={() =>
          handleLevelPress(
            item.levelName,
            item.GRID_DATA,
            item.ROW_CLUES,
            item.levelPoints,
            item.clueCount1Increase,
            item.clueCount2Increase,
            item.clueCount3Increase,
            item.creditsIncrease
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
      <CustomHeader title="Easy Levels" />

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

export default EasyLevelsScreen;
