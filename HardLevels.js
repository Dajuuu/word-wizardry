import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import CustomHeader from "./CustomHeader";
import { loadCompletedLevels } from "./AsyncStorageUtils";
import LevelScreen from "./LevelScreen"; // Import the LevelButton component

const HardLevelsScreen = ({ navigation }) => {
  // Define color constants
  const HardLevelsColorBackground = "rgb(255, 143, 0)";
  const HardLevelsColorBackgroundCompleted = "rgb(177, 98, 0)";
  const HardLevelsColorOutline = "rgb(204, 114, 0)";
  const HardLevelsColorOutlineCompleted = "rgb(163, 70, 0)";

  // Declare state for completed levels
  const [completedLevels, setCompletedLevels] = useState([]);

  // Load completed levels on component mount
  useEffect(() => {
    const loadCompletedLevelsData = async () => {
      const levels = await loadCompletedLevels();
      setCompletedLevels(levels);
    };
    loadCompletedLevelsData();
  }, []);

  // Define level data
  const levels = [
    {
      levelName: "H1",
      color: HardLevelsColorBackground,
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
      levelName: "H2",
      color: HardLevelsColorBackground,
      levelPoints: 15,
      GRID_DATA: [["F", "F", "F", "F", "F"]],
      ROW_CLUES: ["Input F"],
      clueCount1Increase: 0,
      clueCount2Increase: 0,
      clueCount3Increase: 0,
      creditsIncrease: 0,
    },
    {
      levelName: "H3",
      color: HardLevelsColorBackground,
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
      levelName: "H4",
      color: HardLevelsColorBackground,
      levelPoints: 15,
      GRID_DATA: [["F", "F", "F", "F", "F"]],
      ROW_CLUES: ["Input F"],
      clueCount1Increase: 0,
      clueCount2Increase: 0,
      clueCount3Increase: 0,
      creditsIncrease: 0,
    },
    {
      levelName: "H5",
      color: HardLevelsColorBackground,
      levelPoints: 15,
      GRID_DATA: [["F", "F", "F", "F", "F"]],
      ROW_CLUES: ["Input F"],
      clueCount1Increase: 0,
      clueCount2Increase: 0,
      clueCount3Increase: 0,
      creditsIncrease: 0,
    },
    {
      levelName: "H6",
      color: HardLevelsColorBackground,
      levelPoints: 15,
      GRID_DATA: [["F", "F", "F", "F", "F"]],
      ROW_CLUES: ["Input F"],
      clueCount1Increase: 0,
      clueCount2Increase: 0,
      clueCount3Increase: 0,
      creditsIncrease: 0,
    },
    {
      levelName: "H7",
      color: HardLevelsColorBackground,
      levelPoints: 15,
      GRID_DATA: [["F", "F", "F", "F", "F"]],
      ROW_CLUES: ["Input F"],
      clueCount1Increase: 1,
      clueCount2Increase: 0,
      clueCount3Increase: 0,
      creditsIncrease: 100,
    },
    {
      levelName: "H8",
      color: HardLevelsColorBackground,
      levelPoints: 15,
      GRID_DATA: [["F", "F", "F", "F", "F"]],
      ROW_CLUES: ["Input F"],
      clueCount1Increase: 1,
      clueCount2Increase: 0,
      clueCount3Increase: 0,
      creditsIncrease: 100,
    },
    {
      levelName: "H9",
      color: HardLevelsColorBackground,
      levelPoints: 15,
      GRID_DATA: [["F", "F", "F", "F", "F"]],
      ROW_CLUES: ["Input F"],
      clueCount1Increase: 1,
      clueCount2Increase: 1,
      clueCount3Increase: 0,
      creditsIncrease: 200,
    },
    {
      levelName: "H10",
      color: HardLevelsColorBackground,
      levelPoints: 15,
      GRID_DATA: [["F", "F", "F", "F", "F"]],
      ROW_CLUES: ["Input F"],
      clueCount1Increase: 1,
      clueCount2Increase: 1,
      clueCount3Increase: 1,
      creditsIncrease: 100,
    },
  ];

  return (
    <View style={styles.container}>
      <CustomHeader title="Hard Levels" />

      <FlatList
        data={levels}
        renderItem={({ item }) => (
          <LevelScreen
            levelName={item.levelName}
            color={HardLevelsColorBackground}
            completedColor={HardLevelsColorBackgroundCompleted} // Use completed color
            outlineColor={HardLevelsColorOutline} // Use outline color
            completedOutlineColor={HardLevelsColorOutlineCompleted} // Use completed outline color
            completedLevels={completedLevels}
            GRID_DATA={item.GRID_DATA}
            ROW_CLUES={item.ROW_CLUES}
            levelPoints={item.levelPoints}
            clueCount1Increase={item.clueCount1Increase}
            clueCount2Increase={item.clueCount2Increase}
            clueCount3Increase={item.clueCount3Increase}
            creditsIncrease={item.creditsIncrease}
            navigation={navigation}
          />
        )}
        keyExtractor={(item) => item.levelName}
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
  column: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default HardLevelsScreen;
