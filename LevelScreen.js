import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

// Do Wyjebania
// Do Wyjebania
// Do Wyjebania
const LevelScreen = ({ route, navigation }) => {
  const { level } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.levelText}>Level: {level}</Text>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Go Back</Text>
      </TouchableOpacity>
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
  levelText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  backButton: {
    width: 120,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default LevelScreen;
