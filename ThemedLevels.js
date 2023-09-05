import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import CustomHeader from "./CustomHeader";
import { loadCompletedLevels } from "./AsyncStorageUtils";
import LevelScreen from "./LevelScreen"; // Import the LevelButton component

const HardLevelsScreen = ({ navigation }) => {
  // Define color constants
  const ThemedLevelsColorBackground = "rgb(135, 0, 255)";
  const ThemedLevelsColorBackgroundCompleted = "rgb(100, 0, 255)";
  const ThemedLevelsColorOutline = "rgb(95, 0, 204)";
  const ThemedLevelsColorOutlineCompleted = "rgb(90, 0, 153)";

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
      levelName: "T1 \nAnimals",
      color: ThemedLevelsColorBackground,
      levelPoints: 25,
      clueCount1Increase: 1,
      clueCount2Increase: 0,
      clueCount3Increase: 0,
      creditsIncrease: 20,
      GRID_DATA: [
        ["T", "I", "G", "E", "R"],
        ["S", "E", "A", "H", "O", "R", "S", "E"],
        ["O", "C", "T", "O", "P", "U", "S"],
        ["E", "L", "E", "P", "H", "A", "N", "T"],
        ["C", "R", "O", "C", "O", "D", "I", "L", "E"],
        ["D", "O", "G"],
        ["P", "E", "N", "G", "U", "I", "N"],
        ["S", "Q", "U", "I", "R", "R", "E", "L"],
      ],

      ROW_CLUES: [
        "1. Striped feline known for its strength and agility.",
        "2. Tiny marine fish with a unique upright posture.",
        "3. Eight-armed sea creature with incredible intelligence.",
        "4. Largest land mammal, known for its trunk and tusks.",
        "5. Large reptile with a powerful jaw, found in rivers.",
        "6. It is said, a man's best friend",
        "7. Flightless bird found in Antarctica.",
        "8. Small, bushy-tailed rodent known for hoarding nuts.",
      ],
    },

    {
      levelName: "T2 \nPlants",
      color: ThemedLevelsColorBackground,
      levelPoints: 30,
      clueCount1Increase: 1,
      clueCount2Increase: 1,
      clueCount3Increase: 0,
      creditsIncrease: 25,
      GRID_DATA: [
        ["R", "O", "S", "E"],
        ["T", "U", "L", "I", "P"],
        ["C", "A", "C", "T", "U", "S"],
        ["R", "E", "D", "W", "O", "O", "D"],
        ["L", "A", "V", "E", "N", "D", "E", "R"],
        ["O", "R", "C", "H", "I", "D"],
        ["D", "A", "N", "D", "E", "L", "I", "O", "N"],
        ["F", "E", "R", "N"],
      ],

      ROW_CLUES: [
        "1. Fragrant flower known for its beauty.",
        "2. Colorful, cup-shaped springtime flower.",
        "3. Desert plant with spines and succulent stems.",
        "4. Massive tree species known for its height.",
        "5. Large reptile with a powerful jaw, found in rivers.",
        "6. Exotic flower prized for its elegance.",
        "7. Common weed with yellow flowers and fluffy seeds.",
        "8. Leafy green plant often found in forests.",
      ],
    },
    {
      levelName: "T3 \nVideo Games",
      color: ThemedLevelsColorBackground,
      levelPoints: 20,
      clueCount1Increase: 0,
      clueCount2Increase: 0,
      clueCount3Increase: 2,
      creditsIncrease: 30,
      GRID_DATA: [
        ["M", "A", "R", "I", "O"],
        ["Z", "E", "L", "D", "A"],
        ["F", "O", "R", "T", "N", "I", "T", "E"],
        ["S", "K", "Y", "R", "I", "M"],
        ["M", "I", "N", "E", "C", "R", "A", "F", "T"],
        ["T", "E", "T", "R", "I", "S"],
        ["H", "A", "L", "O"],
        ["D", "I", "A", "B", "L", "O"],
        ["P", "O", "R", "T", "A", "L"],
      ],
      ROW_CLUES: [
        "1. Plumber who battles villains in the Mushroom Kingdom.",
        "2. Princess and adventurer in a legendary fantasy series.",
        "3. Popular battle royale game with building mechanics.",
        "4. Open-world fantasy RPG with dragons and epic quests.",
        "5. Sandbox game where players build and explore.",
        "6. Block-stacking puzzle game from Russia.",
        "7. Sci-fi shooter featuring Master Chief.",
        "8. Action role-playing game with dark fantasy themes.",
        "9. Puzzle-platformer with teleportation mechanics.",
      ],
    },
    {
      levelName: "T4 \nSport",
      color: ThemedLevelsColorBackground,
      levelPoints: 25,
      clueCount1Increase: 1,
      clueCount2Increase: 0,
      clueCount3Increase: 1,
      creditsIncrease: 35,
      GRID_DATA: [
        ["F", "O", "O", "T", "B", "A", "L", "L"],
        ["T", "E", "N", "N", "I", "S"],
        ["B", "A", "S", "E", "B", "A", "L", "L"],
        ["S", "W", "I", "M", "M", "I", "N", "G"],
        ["C", "Y", "C", "L", "I", "N", "G"],
        ["G", "O", "L", "F"],
        ["B", "A", "D", "M", "I", "N", "T", "O", "N"],
        ["N", "A", "A", "C", "A", "R"],
        ["B", "I", "A", "T", "H", "L", "O", "N"],
      ],
      ROW_CLUES: [
        "1. The world's most popular sport, played with a ball and goalposts.",
        "2. Racket sport played on a rectangular court.",
        "3. Bat-and-ball game with bases and innings.",
        "4. Activity of moving through water using strokes.",
        "5. Sport involving riding bicycles in races or tours.",
        "6. Precision club-and-ball sport played on a course.",
        "7. Racket sport played with a shuttlecock.",
        "8. Stock car racing series popular in the United States.",
        "9. Winter sport combining skiing and rifle shooting.",
      ],
    },
    {
      levelName: "T5 \nCharacters",
      color: ThemedLevelsColorBackground,
      levelPoints: 20,
      clueCount1Increase: 1,
      clueCount2Increase: 1,
      clueCount3Increase: 0,
      creditsIncrease: 30,
      GRID_DATA: [
        ["S", "I", "M", "B", "A"],
        ["E", "L", "S", "A"],
        ["S", "H", "R", "E", "K"],
        ["A", "R", "I", "E", "L"],
        ["R", "A", "P", "U", "N", "Z", "E", "L"],
        ["N", "E", "M", "O"],
        ["P", "U", "M", "B", "A", "A"],
        ["P", "U", "S", "S"],
        ["W", "O", "O", "D", "Y"],
      ],
      ROW_CLUES: [
        "1. Lion who becomes king",
        "2. Snow queen with ice powers",
        "3. Most popular ogre of all time",
        "4. Red-haired mermaid",
        "5. Princess with long, blond hair",
        "6. Clownfish in search of his family",
        "7. Very good friend of Timon",
        "8. Clever, sword-fighting cat",
        "9. Hero, who finds a magical lamp.",
        "10. Cowboy doll.",
      ],
    },

    {
      levelName: "T6",
      color: ThemedLevelsColorBackground,
      levelPoints: 15,
      GRID_DATA: [["F", "F", "F", "F"]],
      ROW_CLUES: ["Input F"],
      clueCount1Increase: 0,
      clueCount2Increase: 0,
      clueCount3Increase: 0,
      creditsIncrease: 0,
    },
    {
      levelName: "T7",
      color: ThemedLevelsColorBackground,
      levelPoints: 15,
      GRID_DATA: [["F", "F", "F", "F", "F"]],
      ROW_CLUES: ["Input F"],
      clueCount1Increase: 1,
      clueCount2Increase: 0,
      clueCount3Increase: 0,
      creditsIncrease: 100,
    },
    {
      levelName: "T8",
      color: ThemedLevelsColorBackground,
      levelPoints: 15,
      GRID_DATA: [["F", "F", "F", "F", "F"]],
      ROW_CLUES: ["Input F"],
      clueCount1Increase: 1,
      clueCount2Increase: 0,
      clueCount3Increase: 0,
      creditsIncrease: 100,
    },
    {
      levelName: "T9",
      color: ThemedLevelsColorBackground,
      levelPoints: 15,
      GRID_DATA: [["F", "F", "F", "F", "F"]],
      ROW_CLUES: ["Input F"],
      clueCount1Increase: 1,
      clueCount2Increase: 1,
      clueCount3Increase: 0,
      creditsIncrease: 200,
    },
    {
      levelName: "T10",
      color: ThemedLevelsColorBackground,
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
      <CustomHeader title="Themed Levels" />

      <FlatList
        showsVerticalScrollIndicator={false} // Set this to false to hide vertical scrollbar
        showsHorizontalScrollIndicator={false}
        data={levels}
        renderItem={({ item }) => (
          <LevelScreen
            levelName={item.levelName}
            color={ThemedLevelsColorBackground}
            completedColor={ThemedLevelsColorBackgroundCompleted} // Use completed color
            outlineColor={ThemedLevelsColorOutline} // Use outline color
            completedOutlineColor={ThemedLevelsColorOutlineCompleted} // Use completed outline color
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
    backgroundColor: "rgba(151, 0, 255, 0.3)",
  },
  column: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default HardLevelsScreen;
