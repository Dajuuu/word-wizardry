import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Modal,
} from "react-native";
import CustomHeader from "./CustomHeader";
import {
  fetchCompletedLevels,
  determineUnlockedAchievements,
} from "./AchievementUtils"; // Import the utility functions
import Icon from "react-native-vector-icons/FontAwesome5";

const Achievements = () => {
  const [loading, setLoading] = useState(true); // Add a loading state

  const [easyLevelsCompletedCount, setEasyLevelsCompletedCount] = useState(0);
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [unlockedAchievementIndexes, setUnlockedAchievementIndexes] = useState(
    []
  );

  useEffect(() => {
    fetchCompletedLevels().then((completedCount) => {
      setEasyLevelsCompletedCount(completedCount);
      setLoading(false); // Set loading to false once data is fetched
    });
  }, []);

  useEffect(() => {
    const unlockedIndexes = determineUnlockedAchievements(
      achievementsList,
      easyLevelsCompletedCount
    );
    setUnlockedAchievementIndexes(unlockedIndexes);
  }, [easyLevelsCompletedCount]);

  const achievementsList = [
    {
      achivIndex: 1,
      level: "Easy",
      achivDesc: "Complete 2 Easy levels",
      colorFront: "rgb(194, 178, 163)",
      imageSource: require("./assets/LevelDifficultyImages/easy.png"),
      // Define the condition on which the achievement will be unlocked
      hideOverlayCondition: easyLevelsCompletedCount >= 2,
      // Might be useful later
      creditsIncrese: 100,
      clueCount1Increase: 0,
      clueCount2Increase: 0,
      clueCount3Increase: 0,
    },
    {
      achivIndex: 2,
      creditsIncrese: 100,
      level: "Medium",
      achivDesc: "Complete 4 Easy levels",
      colorFront: "rgb(194, 178, 163)",
      hideOverlayCondition: easyLevelsCompletedCount >= 4,
    },
    {
      creditsIncrese: 100,
      achivIndex: 3,
      level: "Hard",
      colorFront: "rgb(194, 178, 163)",
      hideOverlayCondition: easyLevelsCompletedCount >= 5,
    },
    {
      creditsIncrese: 100,
      achivIndex: 4,
      level: "Themed",
      colorFront: "rgb(194, 178, 163)",
    },
    {
      creditsIncrese: 100,
      achivIndex: 4,
      level: "Themed",
      colorFront: "rgb(194, 178, 163)",
    },
    {
      creditsIncrese: 100,
      achivIndex: 4,
      level: "Themed",
      colorFront: "rgb(194, 178, 163)",
    },
  ];

  const openAchievementModal = (achievement) => {
    setSelectedAchievement(achievement);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedAchievement(null);
  };

  return (
    <View style={styles.container}>
      <CustomHeader title="Achievements" />
      <ScrollView style={{ width: "100%" }}>
        {achievementsList.map((level, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.difficultyBox,
              {
                backgroundColor: level.colorFront,
              },
            ]}
            onPress={() => openAchievementModal(level)} // Open modal on press
          >
            <Image source={level.imageSource} style={styles.image} />
            <Text style={styles.difficultyText}>{level.level}</Text>
            <Text style={styles.descText}>{level.achivDesc}</Text>
            {!unlockedAchievementIndexes.includes(level.achivIndex) && (
              <View style={styles.darkOverlay} />
            )}
            {unlockedAchievementIndexes.includes(level.achivIndex) && (
              <View style={styles.checkmarkContainer}>
                <Icon name="check" style={styles.checkmarkIcon} />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Modal */}
      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedAchievement && (
              <>
                <Image
                  source={selectedAchievement.imageSource}
                  style={styles.modalImage}
                />
                <Text style={styles.modalHeaderText}>
                  {selectedAchievement.level}
                </Text>
                <Text style={styles.modalDescText}>
                  {selectedAchievement.achivDesc}
                </Text>
                <Text style={styles.modalDescText}>
                  Credits added: {selectedAchievement.creditsIncrese}
                </Text>
              </>
            )}
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
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
    backgroundColor: "#f5e1ce",
  },
  difficultyBox: {
    width: "90%",
    height: 150,
    borderRadius: 8,
    // margin: 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 5,
  },
  difficultyText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
    alignSelf: "flex-end",
    right: 20,
  },
  descText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
    alignSelf: "flex-end",
    right: 20,
  },
  image: {
    position: "absolute",
    top: 15,
    left: 10,
    width: 100,
    height: 100,
    // marginRight: 10,
    alignSelf: "flex-start",
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 8,
  },

  // Modal/overlay
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  modalHeaderText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  modalDescText: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: "center",
  },
  closeButton: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },

  // Check styling
  checkmarkContainer: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(45,133,45,1)",
    borderRadius: 20,
    padding: 5,
  },
  checkmarkIcon: {
    color: "white",
    fontSize: 16,
  },
});

export default Achievements;
