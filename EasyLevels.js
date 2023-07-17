import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome5";

const EasyLevelsScreen = ({ navigation }) => {
  const levels = [
    {
      level: "E1",
      color: "green",
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
      level: "E2",
      color: "green",
      levelPoints: 15,
      GRID_DATA: [["F", "F", "F", "F", "F"]],
      ROW_CLUES: ["Input F"],
    },
    {
      level: "E3",
      color: "green",
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
    // { level: "E3", color: "green", GRID_DATA: ..., ROW_CLUES: ... },
    // { level: "E4", color: "green", GRID_DATA: ..., ROW_CLUES: ... },
    // ...
  ];

  const handleLevelPress = (level, GRID_DATA, ROW_CLUES, levelPoints) => {
    navigation.navigate("CrosswordScreen", {
      level,
      GRID_DATA,
      ROW_CLUES,
      levelPoints,
    });
  };

  const renderLevel = ({ item }) => (
    <TouchableOpacity
      style={[styles.levelBox, { backgroundColor: item.color }]}
      onPress={() =>
        handleLevelPress(
          item.level,
          item.GRID_DATA,
          item.ROW_CLUES,
          item.levelPoints
        )
      }
    >
      <Text style={styles.levelText}>{item.level}</Text>
    </TouchableOpacity>
  );

  const keyExtractor = (item) => item.level;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-left" size={20} color="black" />
      </TouchableOpacity>

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
    width: 100,
    height: 100,
    borderRadius: 8,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  levelText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default EasyLevelsScreen;
