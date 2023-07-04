import React, { useState, useRef, useContext, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Platform,
  ScrollView,
  Modal,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage

import { PointsContext } from "./PointsContext";

import CustomKeyboard from "./CustomKeyboard";

const CrosswordApp = ({ route }) => {
  const navigation = useNavigation();

  // Add points
  const { addPoints } = useContext(PointsContext);
  const { points } = useContext(PointsContext);

  const { GRID_DATA, ROW_CLUES, levelPoints } = route.params;
  const [hiddenGrid, setHiddenGrid] = useState(() =>
    GRID_DATA.map((row) => row.map(() => ""))
  );
  const [selectedBox, setSelectedBox] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  // const [isModalVisible, setIsModalVisible] = useState(false);
  const [levelCompleted, setLevelCompleted] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    // Load saved user input for the given level
    loadUserInput();
  }, []);
  const saveUserInput = async () => {
    try {
      const userInputKey = `userInput:${route.params.level}`;
      const userInput = hiddenGrid.map((row) =>
        row.map((box) => (box ? box.letter : ""))
      );
      await AsyncStorage.setItem(userInputKey, JSON.stringify(userInput));
    } catch (error) {
      console.log("Error saving user input:", error);
    }
  };

  const loadUserInput = async () => {
    try {
      const userInputKey = `userInput:${route.params.level}`;
      const savedUserInput = await AsyncStorage.getItem(userInputKey);
      if (savedUserInput !== null) {
        const userInput = JSON.parse(savedUserInput);
        setHiddenGrid(
          userInput.map((row) => row.map((letter) => ({ letter })))
        );
      }
    } catch (error) {
      console.log("Error loading user input:", error);
    }
  };

  const handleBoxSelection = (rowIndex, columnIndex) => {
    setSelectedBox({ rowIndex, columnIndex });
    setSelectedRow(rowIndex);
  };

  const handleBoxInput = (text, rowIndex, columnIndex) => {
    const hiddenLetter = GRID_DATA[rowIndex][columnIndex].toUpperCase();
    const inputtedLetter = text.toUpperCase();

    const updateHiddenGrid = () => {
      // Update hiddenGrid state
      const newHiddenGrid = [...hiddenGrid];
      newHiddenGrid[rowIndex][columnIndex] = {
        letter: inputtedLetter,
        isCorrect: inputtedLetter === hiddenLetter,
      };
      setHiddenGrid(newHiddenGrid);
      // Save user input
      saveUserInput();
      // Check if all boxes are filled correctly
      const isLevelFinished = newHiddenGrid.every((row) =>
        row.every((box) => box.isCorrect)
      );

      // When level is finished
      if (isLevelFinished) {
        // Will need changing
        // addPoints(levelPoints);
        // addPoints(parseInt(levelPoints));
        // console.log(levelPoints);
        console.log("Level finished!");
        // console.log("Total points:", points);
        // setIsModalVisible(true);
        setLevelCompleted(true);
      }
    };

    clearTimeout(inputRefs.current[rowIndex][columnIndex].timer);
    inputRefs.current[rowIndex][columnIndex].timer = setTimeout(
      updateHiddenGrid,
      10
    );

    // Select the box to the right
    if (columnIndex < GRID_DATA[rowIndex].length - 1) {
      const nextColumnIndex = columnIndex + 1;
      handleBoxSelection(rowIndex, nextColumnIndex);
      const nextInputRef = inputRefs.current[rowIndex][nextColumnIndex];
      nextInputRef && nextInputRef.focus();
    }
  };

  const handleKeyPress = (key) => {
    if (selectedBox) {
      const { rowIndex, columnIndex } = selectedBox;
      handleBoxInput(key, rowIndex, columnIndex);
      inputRefs.current[rowIndex][columnIndex].focus();
    }
  };

  const disableBuiltInKeyboard = () => {
    if (Platform.OS === "ios") {
      return { editable: false };
    } else {
      return { editable: false, pointerEvents: "none" };
    }
  };

  const closeModal = () => {
    // setIsModalVisible(false);
    setLevelCompleted(false);
    // Add points on closing the box
    // Small fix for the points doubling in some cases
    // Thats why the addPoints function with passed variable is here, instead of isLevelFinished
    addPoints(levelPoints);
    // When level is finished, clocking goes back to the level selection screen
    navigation.goBack();

    // Delete saved user input for the given level
    deleteUserInput();
  };
  const deleteUserInput = async () => {
    try {
      const userInputKey = `userInput:${route.params.level}`;
      await AsyncStorage.removeItem(userInputKey);
    } catch (error) {
      console.log("Error deleting user input:", error);
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <ScrollView contentContainerStyle={styles.gridContainer}>
          {GRID_DATA.map((row, rowIndex) => {
            inputRefs.current[rowIndex] = [];

            return (
              <View
                key={rowIndex}
                style={[
                  styles.row,
                  selectedRow === rowIndex && styles.highlightedRow,
                ]}
              >
                {row.map((box, columnIndex) => {
                  const isBoxSelected =
                    selectedBox &&
                    selectedBox.rowIndex === rowIndex &&
                    selectedBox.columnIndex === columnIndex;

                  const hiddenLetter =
                    GRID_DATA[rowIndex][columnIndex].toUpperCase();
                  const inputtedLetter =
                    hiddenGrid[rowIndex][columnIndex]?.letter;

                  const isLetterCorrect =
                    hiddenGrid[rowIndex][columnIndex]?.isCorrect || false;

                  return (
                    <TouchableOpacity
                      key={columnIndex}
                      style={[
                        styles.box,
                        isBoxSelected && { backgroundColor: "yellow" },
                        isLetterCorrect && { backgroundColor: "blue" },
                      ]}
                      onPress={() => handleBoxSelection(rowIndex, columnIndex)}
                    >
                      {isBoxSelected ? (
                        <TextInput
                          style={styles.boxText}
                          maxLength={1}
                          value={inputtedLetter}
                          onChangeText={(text) =>
                            handleBoxInput(text, rowIndex, columnIndex)
                          }
                          ref={(ref) =>
                            (inputRefs.current[rowIndex][columnIndex] = ref)
                          }
                          autoFocus={true}
                          returnKeyType="next"
                          onSubmitEditing={() => {
                            if (columnIndex < GRID_DATA[rowIndex].length - 1) {
                              const nextInputRef =
                                inputRefs.current[rowIndex][columnIndex + 1];
                              nextInputRef && nextInputRef.focus();
                            }
                          }}
                          {...disableBuiltInKeyboard()}
                        />
                      ) : (
                        <Text style={styles.boxText}>
                          {hiddenGrid[rowIndex][columnIndex]?.letter || ""}
                        </Text>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            );
          })}
        </ScrollView>
      </ScrollView>

      {selectedRow !== null && (
        <View style={styles.clueContainer}>
          <Text style={styles.clueText}>{ROW_CLUES[selectedRow]}</Text>
        </View>
      )}

      <CustomKeyboard onKeyPress={handleKeyPress} />

      {levelCompleted && (
        <Modal
          visible={levelCompleted}
          animationType="fade"
          transparent
          statusBarTranslucent
        >
          <View style={styles.overlay}>
            <View style={styles.overlayBox}>
              <Text style={styles.overlayText}>Level Completed!</Text>
              <Text style={styles.overlayText}>
                You got: {levelPoints} points
              </Text>
              <Text style={styles.overlayText}>
                Your total score {points + levelPoints}
              </Text>
              <TouchableOpacity
                style={styles.goBackButton}
                onPress={closeModal}
              >
                <Text style={styles.goBackButtonText}>Go Back</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#c9fcbc",
  },
  gridContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start", // Align boxes to the left
  },
  highlightedRow: {
    backgroundColor: "rgba(0, 128, 0, 0.5)",
  },
  box: {
    width: 50,
    height: 50,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 2,
    padding: 5,
  },
  boxText: {
    fontSize: 16,
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
  },
  modalText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  overlayBox: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  overlayText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  goBackButton: {
    backgroundColor: "green",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  goBackButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  clueContainer: {
    width: "120%",
    paddingHorizontal: 40,
    paddingVertical: 15,
    backgroundColor: "red",
  },
  clueText: {
    fontSize: 18,
    // marginTop: 10,
    alignSelf: "center",
  },
});

export default CrosswordApp;
