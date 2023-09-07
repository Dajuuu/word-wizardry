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
      levelPoints: 8,
      clueCount1Increase: 1,
      clueCount2Increase: 0,
      clueCount3Increase: 0,
      creditsIncrease: 20,
      GRID_DATA: [
        ["C", "A", "C", "T", "U", "S"],
        ["J", "I", "G", "S", "A", "W"],
        ["M", "O", "O", "N"],
        ["W", "I", "N", "T", "E", "R"],
        ["S", "M", "I", "L", "E"],
      ],

      ROW_CLUES: [
        "1. Desert plant known for its spikes.",
        "2. Puzzle with irregularly shaped pieces.",
        "3. Earth's natural satellite.",
        "4. Coldest season of the year.",
        "5. Facial expression of happiness.",
      ],
    },
    {
      levelName: "E2",
      color: EasyLevelsColorBackground,
      levelPoints: 6,
      clueCount1Increase: 0,
      clueCount2Increase: 1,
      clueCount3Increase: 0,
      creditsIncrease: 25,
      GRID_DATA: [
        ["P", "U", "Z", "Z", "L", "E"],
        ["B", "O", "O", "K"],
        ["P", "U", "P", "P", "Y"],
        ["A", "P", "P", "L", "E"],
        ["S", "U", "N", "S", "E", "T"],
      ],

      ROW_CLUES: [
        "1. Game or activity that requires problem-solving.",
        "2. Great source of information.",
        "3. Young dog.",
        "4. Round, red or green fruit. Producer of iPhones.",
        "5. The time when the sun disappears below the horizon.",
      ],
    },
    {
      levelName: "E3",
      color: EasyLevelsColorBackground,
      levelPoints: 10,
      clueCount1Increase: 0,
      clueCount2Increase: 1,
      clueCount3Increase: 1,
      creditsIncrease: 25,
      GRID_DATA: [
        ["D", "O", "L", "P", "H", "I", "N"],
        ["S", "P", "R", "I", "N", "G"],
        ["L", "I", "G", "H", "T"],
        ["B", "I", "R", "D"],
        ["B", "O", "X"],
      ],

      ROW_CLUES: [
        "1. Intelligent marine mammal.",
        "2. Dense area with trees and wildlife.",
        "3. Season of new growth and blossoms.",
        "4. Illumination or source of brightness.",
        "5. Feathered flying creature.",
        "6. People tend to put things inside it.",
      ],
    },
    {
      levelName: "E4",
      color: EasyLevelsColorBackground,
      levelPoints: 8,
      clueCount1Increase: 2,
      clueCount2Increase: 0,
      clueCount3Increase: 0,
      creditsIncrease: 20,
      GRID_DATA: [
        ["R", "I", "V", "E", "R"],
        ["W", "A", "T", "C", "H"],
        ["G", "A", "R", "D", "E", "N"],
        ["O", "R", "A", "N", "G", "E"],
        ["W", "H", "I", "S", "P", "E", "R"],
      ],

      ROW_CLUES: [
        "1. Flowing waterway.",
        "2. Timekeeping device worn on the wrist.",
        "3. Cultivated area with plants and flowers.",
        "4. Citrus and a colour with the same name.",
        "5. Feathered flying creature.",
        "6. Softly spoken words.",
      ],
    },
    {
      levelName: "E5",
      color: EasyLevelsColorBackground,
      levelPoints: 12,
      clueCount1Increase: 1,
      clueCount2Increase: 0,
      clueCount3Increase: 1,
      creditsIncrease: 30,
      GRID_DATA: [
        ["C", "A", "M", "P", "F", "I", "R", "E"],
        ["B", "U", "T", "T", "E", "R", "F", "L", "Y"],
        ["M", "A", "R", "S"],
        ["G", "R", "E", "E", "N"],
        ["D", "O", "L", "L", "A", "R"],
        ["R", "O", "O", "F"],
      ],

      ROW_CLUES: [
        "1. Outdoor fire for cooking or warmth.",
        "2. Colorful insect with delicate wings.",
        "3. Planet, bar or Bruno.",
        "4. For what does G stands for in RGB?",
        "5. Currency in USA.",
        "6. On top of the house",
      ],
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
