import React, { useContext } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { CreditsContext } from "./CreditsContext"; // Import the CreditsContext
import { incrementClueCount } from "./ClueManager";

const BuyClueOverlay = ({
  visible,
  onClose,
  onBuyClue,
  clueNumber,
  creditsDecrement,
}) => {
  const { credits, removeCredits } = useContext(CreditsContext);

  // Check if the number of credits that the user has, is greater than the cost of the clue
  const canBuyClue = credits >= creditsDecrement;

  const handleBuyClue = () => {
    if (canBuyClue) {
      // Decrement credits by creditsDecrement
      removeCredits(creditsDecrement);
      // Increment the clue count for the purchased clue
      incrementClueCount(clueNumber);
      // Call the onBuyClue function to handle the rest of the logic (if needed)
      onBuyClue();
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Buy Clue {clueNumber}</Text>
          <Text style={styles.message}>Would you like to buy this clue?</Text>
          {/* Display the number of credits */}
          <Text style={styles.creditsText}>Credits: {credits}</Text>
          <Text style={styles.creditsText}>
            After the operation: {credits - creditsDecrement}
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.buyButton, !canBuyClue && styles.disabledButton]}
              onPress={handleBuyClue}
              disabled={!canBuyClue}
            >
              <Text style={styles.buyButtonText}>Buy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    alignItems: "center",
    width: "60%",
    flexDirection: "column",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  buyButton: {
    backgroundColor: "green",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buyButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  cancelButton: {
    backgroundColor: "red",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  buyButton: {
    backgroundColor: "green",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  disabledButton: {
    opacity: 0.5,
  },
});

export default BuyClueOverlay;
