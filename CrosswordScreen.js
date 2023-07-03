import React, { useState, useRef } from "react";
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
  Button,
} from "react-native";

import CustomKeyboard from "./CustomKeyboard";

const CrosswordApp = ({ route }) => {
  const navigation = useNavigation();

  const { GRID_DATA, ROW_CLUES } = route.params;
  const [hiddenGrid, setHiddenGrid] = useState(() =>
    GRID_DATA.map((row) => row.map(() => ""))
  );
  const [selectedBox, setSelectedBox] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  // const [isModalVisible, setIsModalVisible] = useState(false);
  const [levelCompleted, setLevelCompleted] = useState(false);
  const inputRefs = useRef([]);

  const handleBoxSelection = (rowIndex, columnIndex) => {
    setSelectedBox({ rowIndex, columnIndex });
    setSelectedRow(rowIndex);
  };

  const handleBoxInput = (text, rowIndex, columnIndex) => {
    const hiddenLetter = GRID_DATA[rowIndex][columnIndex].toUpperCase();
    const inputtedLetter = text.toUpperCase();

    const updateHiddenGrid = () => {
      const newHiddenGrid = [...hiddenGrid];
      newHiddenGrid[rowIndex][columnIndex] = {
        letter: inputtedLetter,
        isCorrect: inputtedLetter === hiddenLetter,
      };
      setHiddenGrid(newHiddenGrid);

      // Check if all boxes are filled correctly
      const isLevelFinished = newHiddenGrid.every((row) =>
        row.every((box) => box.isCorrect)
      );

      if (isLevelFinished) {
        console.log("Level finished!");
        // setIsModalVisible(true);
        setLevelCompleted(true);
      }
    };

    clearTimeout(inputRefs.current[rowIndex][columnIndex].timer);
    inputRefs.current[rowIndex][columnIndex].timer = setTimeout(
      updateHiddenGrid,
      300
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
    // When level is finished, clocking goes back to the level selection screen
    navigation.goBack();
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
        <Text style={styles.clueText}>Clue: {ROW_CLUES[selectedRow]}</Text>
      )}

      <CustomKeyboard onKeyPress={handleKeyPress} />

      {levelCompleted && (
        <Modal visible={levelCompleted} animationType="fade" transparent>
          <View style={styles.overlay}>
            <View style={styles.overlayBox}>
              <Text style={styles.overlayText}>Level Completed!</Text>
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
  clueText: {
    fontSize: 18,
    marginTop: 10,
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
});

export default CrosswordApp;
