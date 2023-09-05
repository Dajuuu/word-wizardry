import React, { useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Image,
} from "react-native";
import { CreditsContext } from "./CreditsContext";
import { incrementClueCount } from "./ClueManager";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useButtonClickSound } from "./SoundManager";

// Declare what props can be used for the buyClueOverlay
const BuyClueOverlay = ({
  visible,
  onClose,
  onBuyClue,
  clueNumber,
  creditsDecrement,
}) => {
  // Import appropriate operations for credits
  const { credits, removeCredits } = useContext(CreditsContext);
  // Import button sound
  const { handleButtonSoundPlay } = useButtonClickSound();
  // Check if the number of credits that the user has, is greater than the cost of the clue
  const canBuyClue = credits >= creditsDecrement;

  const handleBuyClue = () => {
    if (canBuyClue) {
      // Decrement credits by creditsDecrement
      removeCredits(creditsDecrement);
      // Increment the clue count for the purchased clue
      incrementClueCount(clueNumber, 1);
      // Call the onBuyClue function to handle the rest of the logic (if needed)
      onBuyClue();
    }
  };

  return (
    // Modal props
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Buy Hint {clueNumber}</Text>
          <Text style={styles.hintDescription}>
            {clueNumber === 1
              ? "Reveal letter in a specific position"
              : clueNumber === 2
              ? "Reveal whole row"
              : clueNumber === 3
              ? "Reveal two letters in random positions"
              : ""}
          </Text>
          <Text style={styles.message}>Would you like to buy this clue?</Text>
          {/* Display credits after operation - negative values can appear */}
          <View style={styles.creditsContainer}>
            <Text style={styles.creditsLabel}>Cost: </Text>
            <Image
              source={require("./assets/credits.png")}
              style={styles.creditsImage}
            />
            <Text style={styles.creditsLabel}>{creditsDecrement} credits</Text>
          </View>
          <TouchableOpacity
            style={styles.closeButtonContainer}
            onPress={() => {
              handleButtonSoundPlay();
              onClose();
            }}
          >
            <LinearGradient
              colors={["rgb(255, 67, 67)", "rgb(204, 53, 53)"]}
              style={styles.closeButtonGradient}
              start={{ x: 0.2, y: 0.8 }}
              end={{ x: 0.5, y: 1 }}
            >
              <Icon name="times" style={styles.iconStyle} />
            </LinearGradient>
          </TouchableOpacity>
          <View style={styles.buttonContainer}>
            {/* Disable buy button when user does not have enough credits */}
            <TouchableOpacity
              style={[styles.buyButton, !canBuyClue && styles.disabledButton]}
              onPress={handleBuyClue}
              disabled={!canBuyClue}
            >
              <Text style={styles.buyButtonText}>Buy</Text>
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
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "rgba(250,234,219,1)",
    padding: 20,
    borderRadius: 8,
    alignItems: "center",
    width: "60%",
    flexDirection: "column",
  },
  title: {
    fontSize: 30,
    // marginBottom: 10,
    fontFamily: "AppFontBold",
  },
  hintDescription: {
    fontSize: 16,
    fontFamily: "AppFont",
    textAlign: "center",
    marginBottom: 26,
  },
  message: {
    fontSize: 16,
    // marginBottom: 20,
    textAlign: "center",
    fontFamily: "AppFontBold",
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
  closeButtonContainer: {
    position: "absolute",
    top: -10, // Adjust the distance from the top
    right: -10, // Adjust the distance from the right
    width: 40, // Adjust as needed for the circle size
    height: 40,
    borderRadius: 20, // Half of the width/height to make it a circle
    backgroundColor: "white", // Set a transparent background
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black", // iOS shadow
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  closeButtonGradient: {
    // padding: 30,
    width: "100%", // Use 100% to make it a circle
    height: "100%", // Use 100% to make it a circle
    borderRadius: 20, // Half of the width/height to make it a circle
  },
  iconStyle: {
    color: "white",
    fontSize: 20,
    textAlign: "center", // Center the icon horizontally
    lineHeight: 40,
  },
  creditsImage: {
    width: 24,
    height: 24,
    // marginRight: 5,
    // marginLeft: -5,
  },
  creditsContainer: {
    flexDirection: "row",
    alignItems: "center", // Center items vertically
  },
  creditsLabel: {
    fontSize: 15,
    fontFamily: "AppFont",
  },
});

export default BuyClueOverlay;
