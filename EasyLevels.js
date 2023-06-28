import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";

const EasyLevelsScreen = ({ navigation }) => {
  const levels = [
    { level: "E1", color: "green" },
    { level: "E2", color: "green" },
    { level: "E3", color: "green" },
    { level: "E4", color: "green" },
    { level: "E5", color: "green" },
    { level: "E6", color: "green" },
  ];

  const handleLevelPress = (level) => {
    navigation.navigate("LevelScreen", { level });
  };

  const renderLevel = ({ item }) => (
    <TouchableOpacity
      style={[styles.levelBox, { backgroundColor: item.color }]}
      onPress={() => handleLevelPress(item.level)}
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
        <Text style={styles.backButtonText}>Go Back</Text>
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
    backgroundColor: "#fff",
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
