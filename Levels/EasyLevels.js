import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Dimensions } from "react-native";
import { loadCompletedLevels } from "../AsyncStorageUtils";
import CustomHeader from "../CustomHeader";
import LevelScreen from "../Screens/LevelScreen";

// Get the height of the device
const windowHeight = Dimensions.get("window").height;

const EasyLevelsScreen = ({ navigation }) => {
  // Define colours used for the Easy levels
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
  // All levels pass this information:
  // * levelName, levelPoints,
  // * color, hintCount1Increase, hintCount2Increase, hintCount3Increase,
  // * creditsIncrease, GRID_DATA, ROW_CLUES
  const levels = [
    {
      levelName: "E1",
      color: EasyLevelsColorBackground,
      levelPoints: 8,
      hintCount1Increase: 1,
      hintCount2Increase: 0,
      hintCount3Increase: 0,
      creditsIncrease: 15,
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
      hintCount1Increase: 0,
      hintCount2Increase: 1,
      hintCount3Increase: 0,
      creditsIncrease: 20,
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
      hintCount1Increase: 0,
      hintCount2Increase: 1,
      hintCount3Increase: 1,
      creditsIncrease: 20,
      GRID_DATA: [
        ["D", "O", "L", "P", "H", "I", "N"],
        ["S", "P", "R", "I", "N", "G"],
        ["L", "I", "G", "H", "T"],
        ["B", "I", "R", "D"],
        ["B", "O", "X"],
      ],

      ROW_CLUES: [
        "1. Intelligent marine mammal.",
        "2. Season of new growth and blossoms.",
        "3. Illumination or source of brightness.",
        "4. Feathered flying creature.",
        "5. People tend to put things inside it.",
      ],
    },
    {
      levelName: "E4",
      color: EasyLevelsColorBackground,
      levelPoints: 8,
      hintCount1Increase: 2,
      hintCount2Increase: 0,
      hintCount3Increase: 0,
      creditsIncrease: 15,
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
      hintCount1Increase: 1,
      hintCount2Increase: 0,
      hintCount3Increase: 1,
      creditsIncrease: 25,
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
      levelPoints: 7,
      hintCount1Increase: 0,
      hintCount2Increase: 0,
      hintCount3Increase: 0,
      creditsIncrease: 15,
      GRID_DATA: [
        ["B", "R", "E", "E", "Z", "E"],
        ["C", "A", "N", "D", "L", "E"],
        ["R", "A", "I", "N"],
        ["B", "O", "T", "T", "L", "E"],
        ["C", "A", "S", "T", "L", "E"],
      ],

      ROW_CLUES: [
        "1. Gentle and refreshing wind.",
        "2. Wax stick with a wick used for illumination.",
        "3. Water falling from the sky.",
        "4. Container for liquids.",
        "5. Fortified building often associated with royalty.",
      ],
    },
    {
      levelName: "E7",
      color: EasyLevelsColorBackground,
      levelPoints: 8,
      hintCount1Increase: 0,
      hintCount2Increase: 0,
      hintCount3Increase: 1,
      creditsIncrease: 20,
      GRID_DATA: [
        ["B", "A", "S", "K", "E", "T"],
        ["M", "E", "D", "A", "L"],
        ["B", "U", "L", "B"],
        ["H", "E", "A", "R", "T"],
        ["S", "H", "O", "U", "T"],
        ["B", "I", "N"],
      ],

      ROW_CLUES: [
        "1. Container made of woven material.",
        "2. Award for achievement.",
        "3. Source of illumination.",
        "4. Organ that pumps blood.",
        "5. Loud vocal expression.",
        "6. Container for storage.",
      ],
    },
    {
      levelName: "E8",
      color: EasyLevelsColorBackground,
      levelPoints: 11,
      hintCount1Increase: 1,
      hintCount2Increase: 0,
      hintCount3Increase: 1,
      creditsIncrease: 20,
      GRID_DATA: [
        ["E", "A", "R", "T", "H"],
        ["P", "O", "I", "N", "T", "S"],
        ["S", "P", "E", "A", "K", "E", "R", "S"],
        ["K", "N", "I", "F", "E"],
        ["N", "O", "T", "E", "P", "A", "D"],
        ["F", "R", "O", "G"],
      ],

      ROW_CLUES: [
        "1. Planet inhabited by humans.",
        "2. Scoring units in a game.",
        "3. Audio output devices.",
        "4. Cutting tool with a sharp blade.",
        "5. Place for writing notes.",
        "6. Amphibious jumping creature.",
      ],
    },
    {
      levelName: "E9",
      color: EasyLevelsColorBackground,
      levelPoints: 10,
      hintCount1Increase: 0,
      hintCount2Increase: 2,
      hintCount3Increase: 0,
      creditsIncrease: 15,
      GRID_DATA: [
        ["S", "C", "E", "N", "T"],
        ["M", "I", "C", "H", "A", "E", "L"],
        ["B", "R", "Y", "A", "N", "T"],
        ["F", "O", "R", "K"],
        ["P", "O", "R", "K"],
        ["S", "E", "T", "S", "Q", "U", "A", "R", "E"],
      ],

      ROW_CLUES: [
        "1. Pleasant aroma.",
        "2. ... Douglas. Hollywood actor and producer.",
        "3. LA Lakers legend.",
        "4. Eating utensil with prongs.",
        "5. Meat from a pig.",
        "6. Tool for measuring angles.",
      ],
    },
    {
      levelName: "E10",
      color: EasyLevelsColorBackground,
      levelPoints: 14,
      hintCount1Increase: 1,
      hintCount2Increase: 1,
      hintCount3Increase: 1,
      creditsIncrease: 10,
      GRID_DATA: [
        ["I", "N", "K"],
        ["P", "A", "C", "K", "A", "G", "E"],
        ["H", "A", "T", "T", "R", "I", "C", "K"],
        ["K", "E", "Y", "B", "O", "A", "R", "D"],
        ["P", "I", "L", "L", "O", "W"],
        ["F", "A", "L", "L", "O", "U", "T"],
        ["R", "E", "M", "O", "T", "E"],
        ["P", "L", "A", "T", "E"],
      ],

      ROW_CLUES: [
        "1. Fluid used for writing or printing.",
        "2. Wrapped collection of items.",
        "3. Scoring three goals in a game.",
        "4. Input device for typing",
        "5. Soft headrest for sleeping.",
        "6. Aftermath of a nuclear explosion. Also a popular video game series.",
        "7. Device for controlling a TV.",
        "8. Dish for serving food.",
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <CustomHeader title="Easy Levels" />
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <FlatList
          // Hide the scrollbars
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={levels}
          renderItem={({ item }) => (
            <LevelScreen
              // Pass all info to the LevelScreen component
              levelName={item.levelName}
              color={EasyLevelsColorBackground}
              completedColor={EasyLevelsColorBackgroundCompleted}
              outlineColor={EasyLevelsColorOutline}
              completedOutlineColor={EasyLevelsColorOutlineCompleted}
              completedLevels={completedLevels}
              GRID_DATA={item.GRID_DATA}
              ROW_CLUES={item.ROW_CLUES}
              levelPoints={item.levelPoints}
              hintCount1Increase={item.hintCount1Increase}
              hintCount2Increase={item.hintCount2Increase}
              hintCount3Increase={item.hintCount3Increase}
              creditsIncrease={item.creditsIncrease}
              navigation={navigation}
            />
          )}
          keyExtractor={(item) => item.levelName}
          numColumns={2}
          columnWrapperStyle={styles.column}
        />
        {/* Make a spacing at the bottom, to make sure all buttons are accesible */}
        <View
          style={{
            marginBottom: windowHeight * 0.27,
          }}
        ></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#b1fa9f",
  },
  column: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default EasyLevelsScreen;
