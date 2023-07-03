import React, { useState, useContext } from "react";
import { PointsContext } from "./PointsContext";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

const HomeScreen = ({ navigation }) => {
  const windowWidth = Dimensions.get("window").width;
  let iconWidth = windowWidth / 20;

  const { points } = useContext(PointsContext);

  const [settingsVisible, setSettingsVisible] = useState(false);

  const handlePlayButtonPress = () => {
    navigation.navigate("GameScreen");
  };

  const handleSettingsButtonPress = () => {
    setSettingsVisible(true);
  };

  const handleCloseSettings = () => {
    setSettingsVisible(false);
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Icon
            name="user"
            style={[styles.buttonIcon, { fontSize: iconWidth }]}
            solid
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Icon
            name="crown"
            style={[styles.buttonIcon, { fontSize: iconWidth }]}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Icon
            name="trophy"
            style={[styles.buttonIcon, { fontSize: iconWidth }]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSettingsButtonPress}
        >
          <Icon
            name="cog"
            style={[styles.buttonIcon, { fontSize: iconWidth }]}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>Score: {points}</Text>
      </View>
      <TouchableOpacity
        style={styles.playButton}
        onPress={handlePlayButtonPress}
      >
        <Text style={styles.playButtonText}>Play</Text>
      </TouchableOpacity>

      {/* Settings Overlay */}
      <Modal
        visible={settingsVisible}
        animationType="slide"
        transparent
        statusBarTranslucent
      >
        <View style={styles.settingsOverlay}>
          {/* Settings Box Content */}
          <View style={styles.settingsBox}>
            <Text style={styles.settingsText}>Settings</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleCloseSettings}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "pink",
  },

  // Button container
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 30,
  },

  button: {
    backgroundColor: "transparent",

    // paddingHorizontal: 12,
    // paddingVertical: 8,
    // borderRadius: 8,
    borderWidth: 2,
    width: "15%",
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ccc",
    borderRadius: 15,
    padding: 10,
  },
  buttonIcon: {
    justifyContent: "center",
    color: "#333",
  },

  // Score container
  scoreContainer: {
    width: "50%",
    backgroundColor: "blue",
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderRadius: 10,
    marginVertical: 20,
  },
  scoreText: {
    alignSelf: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  playButton: {
    backgroundColor: "green",
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderRadius: 50,
    marginBottom: 20,
    top: "45%",
    width: "70%",
  },
  playButtonText: {
    fontSize: 44,
    fontWeight: "bold",
    alignSelf: "center",
    color: "#fff",
  },
  settingsOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  settingsBox: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  settingsText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: "red",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default HomeScreen;
