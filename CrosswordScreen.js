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
import { saveCompletedLevel, loadCompletedLevels } from "./AsyncStorageUtils";

import { PointsContext } from "./PointsContext";

import CustomKeyboard from "./CustomKeyboard";
import CustomHeader from "./CustomHeader";

const CrosswordApp = ({ route }) => {
  const navigation = useNavigation();

  // Add points
  const { addPoints } = useContext(PointsContext);
  const { points } = useContext(PointsContext);

  const { GRID_DATA, ROW_CLUES, levelPoints, levelName } = route.params;
  const [hiddenGrid, setHiddenGrid] = useState(() =>
    GRID_DATA.map((row) => row.map(() => ""))
  );
  const [selectedBox, setSelectedBox] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  // const [isModalVisible, setIsModalVisible] = useState(false);
  const [levelCompleted, setLevelCompleted] = useState(false);

  // This hook determines whether the level was previously completed or not
  // If it was, then the keyboard will not be visible for the user, and so no
  // changes for the given grid can be made
  const [checkIfLevelCompleted, setCheckIfLevelCompleted] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    // Load saved user input for the given level
    loadUserInput();
    checkLevelCompletion(); // Check if level is already completed
  }, []);

  // Check if the level was previosly completed, based on the data in the AsyncStorage
  const checkLevelCompletion = async () => {
    const completedLevels = await loadCompletedLevels();
    if (completedLevels.includes(levelName)) {
      // set the variable to true
      setCheckIfLevelCompleted(true);
    }
  };

  const saveUserInput = async () => {
    try {
      const userInputKey = `userInput:${route.params.levelName}`;
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
      const userInputKey = `userInput:${route.params.levelName}`;
      const savedUserInput = await AsyncStorage.getItem(userInputKey);
      if (savedUserInput !== null) {
        const userInput = JSON.parse(savedUserInput);
        const restoredHiddenGrid = userInput.map((row, rowIndex) =>
          row.map((letter, columnIndex) => ({
            letter,
            isCorrect:
              letter === GRID_DATA[rowIndex][columnIndex].toUpperCase(),
          }))
        );
        setHiddenGrid(restoredHiddenGrid);
      }
    } catch (error) {
      console.log("Error loading user input:", error);
    }
  };
  const deleteUserInput = async () => {
    try {
      const userInputKey = `userInput:${route.params.levelName}`;
      await AsyncStorage.removeItem(userInputKey);
    } catch (error) {
      console.log("Error deleting user input:", error);
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
        // console.log("Level finished!");
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

      if (key === "") {
        // If backspace is pressed, delete the content of the selected box
        handleBoxInput("", rowIndex, columnIndex);
        inputRefs.current[rowIndex][columnIndex].focus();

        // Move the selection to the left
        const nextColumnIndex = columnIndex - 1;
        if (nextColumnIndex >= 0) {
          handleBoxSelection(rowIndex, nextColumnIndex);
          const nextInputRef = inputRefs.current[rowIndex][nextColumnIndex];
          nextInputRef && nextInputRef.focus();
        }
      } else {
        // If any other key is pressed, handle it as usual
        handleBoxInput(key, rowIndex, columnIndex);
        inputRefs.current[rowIndex][columnIndex].focus();
      }
    }
  };

  const disableBuiltInKeyboard = () => {
    if (Platform.OS === "ios") {
      return { editable: false };
    } else {
      return { editable: false, pointerEvents: "none" };
    }
  };

  const closeModal = async () => {
    // setIsModalVisible(false);
    setLevelCompleted(false);
    // Add points on closing the box
    // Small fix for the points doubling in some cases
    // Thats why the addPoints function with passed variable is here, instead of isLevelFinished
    addPoints(levelPoints);
    // When level is finished, clocking goes back to the level selection screen
    // navigation.goBack();

    // Delete saved user input for the given level
    // deleteUserInput();
    await saveCompletedLevel(levelName);
    // Navigate back to the level seclection screen with completion status and level name as parameters
    console.log("Points added - navigating to the Easy levels");
    navigation.navigate("GameScreen", {
      levelCompleted: true,
      completedLevelName: levelName,
    });
  };

  return (
    <View style={styles.container}>
      {/* Custom header component */}
      <CustomHeader
        // import nazwy levela
        title={levelName}
      />

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
                        isLetterCorrect && { backgroundColor: "#9ec4e8" },
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

      {checkIfLevelCompleted ? null : (
        <CustomKeyboard onKeyPress={handleKeyPress} />
      )}

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
    // padding: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#b9d8f5",
    // backgroundColor: "#b5ffd9",
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
    backgroundColor: "rgba(184,135,94,0.8)",
    paddingVertical: 2,
    borderRadius: 8,
  },
  box: {
    width: 50,
    height: 50,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 2,
    padding: 5,
    borderRadius: 4,
    backgroundColor: "rgba(255, 228, 204, 0.7)",
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
    backgroundColor: "#CE8B53",
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: "#9b673a",
  },
  clueText: {
    fontSize: 18,
    // marginTop: 10,
    alignSelf: "center",
  },
});

export default CrosswordApp;
