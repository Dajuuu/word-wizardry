import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import CustomHeader from "./CustomHeader";
import { loadCompletedLevels } from "./AsyncStorageUtils";
import LevelScreen from "./LevelScreen"; // Import the LevelButton component

const MediumLevelsScreen = ({ navigation }) => {
  // Define color constants
  const MediumLevelsColorBackground = "rgba(246,197,58,1)";
  const MediumLevelsColorBackgroundCompleted = "rgba(195, 156, 45, 1)";
  const MediumLevelsColorOutline = "rgba(205,165,49,1)";
  const MediumLevelsColorOutlineCompleted = "rgba(154, 123, 37,1)";

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
      levelName: "M1",
      color: MediumLevelsColorBackground,
      levelPoints: 17,
      clueCount1Increase: 2,
      clueCount2Increase: 0,
      clueCount3Increase: 1,
      creditsIncrease: 20,
      GRID_DATA: [
        ["E", "N", "C", "H", "A", "N", "T"],
        ["W", "I", "L", "D", "L", "I", "F", "E"],
        ["S", "E", "R", "E", "N", "I", "T", "Y"],
        ["M", "O", "U", "N", "T", "A", "I", "N"],
        ["R", "U", "S", "S", "O"],
      ],

      ROW_CLUES: [
        "1. To delight or captivate with magic or charm.",
        "2. Animals living in their natural habitats.",
        "3. State of calm and peacefulness.",
        "4. Large landform with steep slopes and a peak.",
        "5. Brothers. Best known for directing Marvel movies.",
      ],
    },
    {
      levelName: "M2",
      color: MediumLevelsColorBackground,
      levelPoints: 16,
      clueCount1Increase: 1,
      clueCount2Increase: 1,
      clueCount3Increase: 1,
      creditsIncrease: 10,
      GRID_DATA: [
        ["L", "A", "V", "E", "N", "D", "E", "R"],
        ["P", "A", "R", "A", "D", "I", "S", "E"],
        ["M", "A", "J", "E", "S", "T", "I", "C"],
        ["T", "R", "A", "N", "S", "C", "R", "I", "P", "T"],
        ["P", "E", "R", "F", "U", "M", "E"],
        ["A", "L", "C", "O", "H", "O", "L"],
      ],

      ROW_CLUES: [
        "1. Fragrant purple flower used in aromatherapy.",
        "2. A place of perfect happiness and beauty.",
        "3. Grand and impressive in appearance.",
        "4. Written record of spoken words.",
        "5. Fragrant scented liquid.",
        "6. Common recreational beverage ingredient.",
      ],
    },
    {
      levelName: "M3",
      color: MediumLevelsColorBackground,
      levelPoints: 14,
      clueCount1Increase: 3,
      clueCount2Increase: 0,
      clueCount3Increase: 0,
      creditsIncrease: 20,
      GRID_DATA: [
        ["P", "A", "I", "N", "T", "I", "N", "G"],
        ["G", "L", "A", "S", "S", "E", "S"],
        ["N", "E", "C", "K", "L", "A", "C", "E"],
        ["T", "I", "S", "S", "U", "E", "S"],
        ["R", "A", "D", "I", "S", "H"],
        ["M", "A", "T", "C", "H", "E", "S"],
      ],

      ROW_CLUES: [
        "1. Artistic creation on canvas.",
        "2. Eyewear for vision correction.",
        "3. Jewelry worn around the neck.",
        "4. Disposable paper for nose blowing.",
        "5. A small, crisp, edible root vegetable.",
        "6. Fire-starting tools with a striking surface",
      ],
    },
    {
      levelName: "M4",
      color: MediumLevelsColorBackground,
      levelPoints: 18,
      clueCount1Increase: 2,
      clueCount2Increase: 0,
      clueCount3Increase: 2,
      creditsIncrease: 30,
      GRID_DATA: [
        ["C", "U", "T", "L", "E", "R", "Y"],
        ["G", "A", "R", "L", "I", "C"],
        ["F", "I", "R", "E", "P", "L", "A", "C", "E"],
        ["S", "E", "N", "S", "O", "R", "S"],
        ["C", "H", "O", "P", "S", "T", "I", "C", "K", "S"],
        ["S", "T", "E", "P", "H", "E", "N"],
      ],

      ROW_CLUES: [
        "1. Eating utensils like knives, forks, and spoons.",
        "2. Pungent and aromatic bulb used in cooking.",
        "3. Heating feature with a chimney for burning wood.",
        "4. Utensils used for eating in some Asian cuisines.",
        "5. A small, crisp, edible root vegetable.",
        "6. ... King. Famous author of horror novels.",
      ],
    },
    {
      levelName: "M5",
      color: MediumLevelsColorBackground,
      levelPoints: 20,
      clueCount1Increase: 2,
      clueCount2Increase: 2,
      clueCount3Increase: 0,
      creditsIncrease: 20,
      GRID_DATA: [
        ["B", "L", "I", "N", "D", "E", "R", "S"],
        ["C", "L", "O", "U", "D", "S"],
        ["A", "V", "O", "C", "A", "D", "O"],
        ["S", "P", "A", "G", "H", "E", "T", "T", "I"],
        ["N", "E", "S", "T", "L", "E"],
        ["S", "H", "E", "L", "L"],
        ["B", "I", "R", "C", "H"],
      ],

      ROW_CLUES: [
        "1. British crime drama TV series, starring Cillian Murphy.",
        "2. Visible collections of water droplets or ice crystals in the sky.",
        "3. Buttery green fruit often used in salads and spreads.",
        "4. Long, thin pasta noodles often served with sauce.",
        "5. Swiss multinational food and beverage company.",
        "6. Hard outer covering of various objects or organisms.",
        "7. A type of deciduous tree with distinctive white bark.",
      ],
    },
    {
      levelName: "M6",
      color: MediumLevelsColorBackground,
      levelPoints: 15,
      GRID_DATA: [["F", "F", "F", "F", "F"]],
      ROW_CLUES: ["Input F"],
      clueCount1Increase: 0,
      clueCount2Increase: 0,
      clueCount3Increase: 0,
      creditsIncrease: 0,
    },
    {
      levelName: "M7",
      color: MediumLevelsColorBackground,
      levelPoints: 15,
      GRID_DATA: [["F", "F", "F", "F", "F"]],
      ROW_CLUES: ["Input F"],
      clueCount1Increase: 1,
      clueCount2Increase: 0,
      clueCount3Increase: 0,
      creditsIncrease: 100,
    },
    {
      levelName: "M8",
      color: MediumLevelsColorBackground,
      levelPoints: 15,
      GRID_DATA: [["F", "F", "F", "F", "F"]],
      ROW_CLUES: ["Input F"],
      clueCount1Increase: 1,
      clueCount2Increase: 0,
      clueCount3Increase: 0,
      creditsIncrease: 100,
    },
    {
      levelName: "M9",
      color: MediumLevelsColorBackground,
      levelPoints: 15,
      GRID_DATA: [["F", "F", "F", "F", "F"]],
      ROW_CLUES: ["Input F"],
      clueCount1Increase: 1,
      clueCount2Increase: 1,
      clueCount3Increase: 0,
      creditsIncrease: 200,
    },
    {
      levelName: "M10",
      color: MediumLevelsColorBackground,
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
      <CustomHeader title="Medium Level" />

      <FlatList
        showsVerticalScrollIndicator={false} // Set this to false to hide vertical scrollbar
        showsHorizontalScrollIndicator={false}
        data={levels}
        renderItem={({ item }) => (
          <LevelScreen
            levelName={item.levelName}
            color={MediumLevelsColorBackground}
            completedColor={MediumLevelsColorBackgroundCompleted} // Use completed color
            outlineColor={MediumLevelsColorOutline} // Use outline color
            completedOutlineColor={MediumLevelsColorOutlineCompleted} // Use completed outline color
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
    backgroundColor: "rgba(246, 197, 58, 0.45)",
  },
  column: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default MediumLevelsScreen;
