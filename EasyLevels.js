import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import CustomHeader from "./CustomHeader";
import { loadCompletedLevels } from "./AsyncStorageUtils";
import LevelScreen from "./LevelScreen"; // Import the LevelButton component

const EasyLevelsScreen = ({ navigation }) => {
  // Define color constants
  const EasyLevelsColorBackground = "rgba(56,167,63,1)";
  const EasyLevelsColorBackgroundCompleted = "rgba(38,100,42,1)";
  const EasyLevelsColorOutline = "rgba(49,133,53,1)";
  const EasyLevelsColorOutlineCompleted = "rgba(31,78,33,1)";

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
      clueCount2Increase: 0,
      clueCount3Increase: 0,
      creditsIncrease: 100,
    },
    {
      levelName: "E8",
      color: EasyLevelsColorBackground,
      levelPoints: 15,
      GRID_DATA: [["F", "F", "F", "F", "F"]],
      ROW_CLUES: ["Input F"],
      clueCount1Increase: 1,
      clueCount2Increase: 0,
      clueCount3Increase: 0,
      creditsIncrease: 100,
    },
    {
      levelName: "E9",
      color: EasyLevelsColorBackground,
      levelPoints: 15,
      GRID_DATA: [["F", "F", "F", "F", "F"]],
      ROW_CLUES: ["Input F"],
      clueCount1Increase: 1,
      clueCount2Increase: 1,
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

  return (
    <View style={styles.container}>
      <CustomHeader title="Easy Levels" />

      <FlatList
        showsVerticalScrollIndicator={false} // Set this to false to hide vertical scrollbar
        showsHorizontalScrollIndicator={false}
        data={levels}
        renderItem={({ item }) => (
          <LevelScreen
            levelName={item.levelName}
            color={EasyLevelsColorBackground}
            completedColor={EasyLevelsColorBackgroundCompleted} // Use completed color
            outlineColor={EasyLevelsColorOutline} // Use outline color
            completedOutlineColor={EasyLevelsColorOutlineCompleted} // Use completed outline color
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

export default EasyLevelsScreen;
