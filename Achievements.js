import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Modal,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomHeader from "./CustomHeader";
import { CreditsContext } from "./CreditsContext";

const Achievements = () => {
  // Hook that determimes how many Easy levels were completed
  const [easyLevelsCompletedCount, setEasyLevelsCompletedCount] = useState(0);
  const [selectedAchievement, setSelectedAchievement] = useState(null); // Store the selected achievement
  const [isModalVisible, setIsModalVisible] = useState(false); // Control modal visibility
  const [unlockedAchievements, setUnlockedAchievements] = useState([]);
  const [unlockedAchievementIndexes, setUnlockedAchievementIndexes] = useState(
    []
  );
  const [isLoading, setIsLoading] = useState(true); // New loading state

  const [creditsAdded, setCreditsAdded] = useState(false);

  const { addCredits } = useContext(CreditsContext);
  useEffect(() => {
    async function fetchCompletedLevels() {
      try {
        const completedLevelsString = await AsyncStorage.getItem(
          "completedLevels"
        );
        if (completedLevelsString) {
          const completedLevels = JSON.parse(completedLevelsString);
          const easyCompleted = completedLevels.filter((level) =>
            level.startsWith("E")
          ).length;
          setEasyLevelsCompletedCount(easyCompleted);

          const unlockedIndexes = achievementsList
            .filter((achievement) => achievement.hideOverlayCondition)
            .map((achievement) => achievement.achivIndex);

          setUnlockedAchievementIndexes(unlockedIndexes);

          // Adding credits
          if (!creditsAdded) {
            unlockedIndexes.forEach((index) => {
              const achievement = achievementsList.find(
                (ach) => ach.achivIndex === index
              );
              addCredits(achievement.creditsIncrese);
            });
            setCreditsAdded(true);
          }

          setIsLoading(false); // Set loading to false when done
        }
      } catch (error) {
        console.error("Error fetching completed levels:", error);
        setIsLoading(false); // Set loading to false even on error
      }
    }

    fetchCompletedLevels();
  }, [addCredits, creditsAdded]);

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
});

export default Achievements;
