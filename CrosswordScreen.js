import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Platform,
  ScrollView, // Import ScrollView component
} from "react-native";

// Custom Keyboard Component
import CustomKeyboard from "./CustomKeyboard"; // Import the CustomKeyboard component from its separate file

// import { GRID_DATA } from "./EasyLevels";
// wywali blad jak jest to samo variable
// import { GRID_DATA } from "./HardLevelsScreen";

// Sample GRID_DATA with rows and columns
// const GRID_DATA = [
//   ["A", "A", "C", "D", "E", "F"],
//   ["G", "H", "I", "J", "K", "L"],
//   ["A", "N", "O", "P", "Q", "R"],
//   ["S", "T", "U", "V", "W", "X"],
//   ["F", "F", "U", "V", "W", "X"],
//   ["Y", "Z", "1", "2", "3", "4"],
//   ["F", "H", "1", "2", "2", "4"],
//   ["F", "H", "1", "2", "2", "4"],
//   ["F", "H", "1", "2", "2", "4"],
//   ["F", "H", "1", "2", "2", "4"],
//   ["F", "H", "1", "2", "2", "4"],
//   ["F", "H", "1", "2", "2", "4"],
//   ["F", "H", "1", "2", "2", "4"],
// ];

// Array of clues corresponding to each row
// const ROW_CLUES = [
//   "Clue for Row 1",
//   "Clue for Row 2",
//   "Clue for Row 3",
//   "Clue for Row 4",
//   "Clue for Row 5",
//   "Clue for Row 6",
//   "Clue for Row 7",
// ];

const CrosswordApp = ({ route }) => {
  const { GRID_DATA, ROW_CLUES } = route.params;
  const [hiddenGrid, setHiddenGrid] = useState(() =>
    GRID_DATA.map((row) => row.map(() => ""))
  );
  const [selectedBox, setSelectedBox] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const inputRefs = useRef([]);

  // Function to handle box selection
  const handleBoxSelection = (rowIndex, columnIndex) => {
    setSelectedBox({ rowIndex, columnIndex });
    setSelectedRow(rowIndex);
  };

  // Function to handle box input
  const handleBoxInput = (text, rowIndex, columnIndex) => {
    const newHiddenGrid = [...hiddenGrid];
    const hiddenLetter = GRID_DATA[rowIndex][columnIndex].toUpperCase();
    const inputtedLetter = text.toUpperCase();
    newHiddenGrid[rowIndex][columnIndex] = {
      letter: inputtedLetter,
      isCorrect: inputtedLetter === hiddenLetter,
    };
    setHiddenGrid(newHiddenGrid);
  };

  // Function to handle keyboard key press
  const handleKeyPress = (key) => {
    if (selectedBox) {
      const { rowIndex, columnIndex } = selectedBox;
      handleBoxInput(key, rowIndex, columnIndex);
      inputRefs.current[rowIndex][columnIndex].focus();
    }
  };

  // Function to disable the built-in keyboard
  const disableBuiltInKeyboard = () => {
    if (Platform.OS === "ios") {
      return { editable: false };
    } else {
      return { editable: false, pointerEvents: "none" };
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.gridContainer}>
        {/* Wrap the gridContainer with ScrollView */}
        {/* Create rows and columns */}
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
                          // Shift focus to the right when pressing 'next' on the keyboard
                          if (columnIndex < GRID_DATA[rowIndex].length - 1) {
                            const nextInputRef =
                              inputRefs.current[rowIndex][columnIndex + 1];
                            nextInputRef && nextInputRef.focus();
                          }
                        }}
                        {...disableBuiltInKeyboard()} // Disable built-in keyboard
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

      {/* Display the selected clue */}
      {selectedRow !== null && (
        <Text style={styles.clueText}>Clue: {ROW_CLUES[selectedRow]}</Text>
      )}

      {/* Custom Keyboard */}
      <CustomKeyboard onKeyPress={handleKeyPress} />
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
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
  },
  highlightedRow: {
    backgroundColor: "rgba(0, 128, 0, 0.5)", // Updated background color with transparency
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
  keyboardContainer: {
    marginTop: 20,
  },
  keyboardRow: {
    flexDirection: "row",
  },
  keyboardKey: {
    width: 50,
    height: 50,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 2,
    backgroundColor: "#CCCCCC",
  },
  keyboardKeyText: {
    fontSize: 16,
  },
});

export default CrosswordApp;
