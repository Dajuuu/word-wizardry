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
      levelPoints: 31,
      clueCount1Increase: 2,
      clueCount2Increase: 0,
      clueCount3Increase: 2,
      creditsIncrease: 40,
      GRID_DATA: [
        ["Q", "U", "A", "S", "A", "R"],
        ["P", "A", "R", "A", "D", "O", "X"],
        ["A", "L", "G", "O", "R", "I", "T", "H", "M"],
        ["P", "A", "L", "I", "N", "D", "R", "O", "M", "E"],
        ["P", "A", "R", "A", "B", "O", "L", "A"],
      ],

      ROW_CLUES: [
        "1. British crime drama TV series, starring Cillian Murphy.",
        "2. A statement that contradicts itself but may be true.",
        "3. Step-by-step procedure or set of rules for solving problems.",
        "4. A word or phrase that reads the same forwards and backwards.",
        "5. A U-shaped curve in mathematics.",
      ],
    },
    {
      levelName: "H2",
      color: HardLevelsColorBackground,
      levelPoints: 33,
      clueCount1Increase: 2,
      clueCount2Increase: 1,
      clueCount3Increase: 1,
      creditsIncrease: 30,
      GRID_DATA: [
        ["A", "N", "A", "C", "H", "R", "O", "N", "I", "S", "M"],
        ["N", "E", "B", "U", "L", "O", "U", "S"],
        ["E", "N", "N", "U", "I"],
        ["C", "A", "C", "O", "P", "H", "O", "N", "Y"],
        ["Q", "U", "I", "X", "O", "T", "I", "C"],
      ],

      ROW_CLUES: [
        "1. Something that is out of its proper time period.",
        "2. Hazy, unclear, or lacking definite form.",
        "3. A feeling of listlessness and dissatisfaction.",
        "4. A harsh, discordant mixture of sounds.",
        "5. Exceedingly idealistic and unrealistic, which are not practical or likely to succeed.",
      ],
    },
    {
      levelName: "H3",
      color: HardLevelsColorBackground,
      levelPoints: 30,
      clueCount1Increase: 4,
      clueCount2Increase: 0,
      clueCount3Increase: 1,
      creditsIncrease: 30,
      GRID_DATA: [
        ["A", "B", "E", "R", "R", "R", "A", "N", "T"],
        ["E", "T", "H", "E", "R", "E", "A", "L"],
        ["P", "A", "R", "O", "X", "Y", "S", "M"],
        ["P", "A", "N", "T", "H", "E", "O", "N"],
        ["Q", "U", "A", "D", "R", "I", "C", "E", "P", "S"],
      ],

      ROW_CLUES: [
        "1. Departing from the usual or normal course.",
        "2. Extremely delicate and light, as if from another world.",
        "3. A sudden, violent outburst or fit of emotion.",
        "4. In the art of ancient Greece and ancient Rome - a temple dedicated to all gods.",
        "5. A group of muscles at the front of the thigh.",
      ],
    },
    {
      levelName: "H4",
      color: HardLevelsColorBackground,
      levelPoints: 34,
      clueCount1Increase: 0,
      clueCount2Increase: 0,
      clueCount3Increase: 3,
      creditsIncrease: 25,
      GRID_DATA: [
        ["C", "Y", "B", "E", "R", "P", "U", "N", "K"],
        ["A", "B", "E", "R", "R", "A", "T", "I", "O", "N"],
        ["I", "N", "S", "C", "R", "U", "T", "A", "B", "L", "E"],
        ["X", "E", "R", "O", "P", "H", "Y", "T", "E"],
        ["C", "H", "O", "C", "O", "L", "A", "T", "E"],
      ],

      ROW_CLUES: [
        "1. A genre of science fiction that often features a dystopian future, advanced technology, and cybernetics.",
        "2. A departure from what is normal or expected.",
        "3. Impossible to understand or interpret.",
        "4. A plant adapted to survive in arid conditions.",
        "5. Sweet, brown treat made from cacao beans.",
      ],
    },
    {
      levelName: "H5",
      color: HardLevelsColorBackground,
      levelPoints: 29,
      clueCount1Increase: 0,
      clueCount2Increase: 2,
      clueCount3Increase: 0,
      creditsIncrease: 20,
      GRID_DATA: [
        ["A", "L", "A", "C", "R", "I", "C", "I", "T", "Y"],
        ["P", "A", "R", "A", "G", "O", "N"],
        ["C", "A", "M", "E", "R", "O", "N"],
        ["P", "H", "O", "T", "O", "S", "H", "O", "P"],
        ["M", "I", "C", "R", "O", "P", "H", "O", "N", "E"],
      ],

      ROW_CLUES: [
        "1. Brisk and cheerful readiness or eagerness.",
        "2. A departure from what is normal or expected.",
        "3. James ... - director of `Avatar`",
        "4. Popular image editing software.",
        "5. Device for capturing and amplifying sound.",
      ],
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
        showsVerticalScrollIndicator={false} // Set this to false to hide vertical scrollbar
        showsHorizontalScrollIndicator={false}
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
    backgroundColor: "rgba(255, 160, 0, 0.4)",
  },
  column: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default HardLevelsScreen;
