import React, { useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { LinearGradient } from "expo-linear-gradient";
import { CreditsContext } from "./CreditsContext";
import { incrementHintCount } from "./HintManager";
import { useButtonClickSound } from "./SoundManager";

const BuyHintOverlay = ({
  visible,
  onClose,
  onBuyHint,
  hintNumber,
  creditsDecrement,
}) => {
  // Import appropriate operations for credits
  const { credits, removeCredits } = useContext(CreditsContext);
  // Import button sound
  const { handleButtonSoundPlay } = useButtonClickSound();
  // Check if the number of credits that the user has, is greater than the cost of the hint
  const canBuyHint = credits >= creditsDecrement;

  const handleBuyHint = () => {
    if (canBuyHint) {
      // Decrement credits by creditsDecrement
      removeCredits(creditsDecrement);
      // Increment the hint count for the purchased hint
      incrementHintCount(hintNumber, 1);
      // Call the onBuyHint function to handle the rest of the logic (if needed)
      onBuyHint();
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
          <Text style={styles.title}>Buy Hint {hintNumber}</Text>
          <Text style={styles.hintDescription}>
            {/* Change the hintDescription text, based on what hint was chosen */}
            {hintNumber === 1
              ? "Reveal letter in a specific position"
              : hintNumber === 2
              ? "Reveal whole row"
              : hintNumber === 3
              ? "Reveal two letters in random positions"
              : ""}
          </Text>
          <Text style={styles.message}>Would you like to buy this hint?</Text>
          <View style={styles.creditsContainer}>
            <Text style={styles.creditsLabel}>Cost: </Text>
            <Image
              source={require("./assets/credits.png")}
              style={styles.creditsImage}
            />
            {/* Display the cost */}
            <Text style={styles.creditsLabel}>{creditsDecrement} credits</Text>
          </View>
          {/* Close button */}
          <TouchableOpacity
            style={styles.closeButtonContainer}
            onPress={() => {
              handleButtonSoundPlay();
              onClose();
            }}
          >
            {/* Written with a help of ChatGPT */}
            <LinearGradient
              colors={["rgb(255, 67, 67)", "rgb(204, 53, 53)"]}
              style={styles.closeButtonGradient}
              start={{ x: 0.2, y: 0.8 }}
              end={{ x: 0.5, y: 1 }}
            >
              <Icon name="times" style={styles.iconStyle} />
            </LinearGradient>
          </TouchableOpacity>
          {/* Buy button */}
          {/* Disable buy button when user does not have enough credits */}
          <TouchableOpacity
            style={[styles.buyButton, !canBuyHint && styles.disabledButton]}
            onPress={() => {
              handleBuyHint();
              handleButtonSoundPlay();
            }}
            disabled={!canBuyHint}
          >
            <LinearGradient
              colors={["rgb(0, 131, 0)", "rgb(0, 93, 0)"]}
              style={styles.buyButtonGradient}
              start={{ x: 0.7, y: 0.1 }}
              end={{ x: 0.9, y: 0.4 }}
            >
              <Text style={styles.buyButtonText}>Buy</Text>
            </LinearGradient>
          </TouchableOpacity>
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
    marginBottom: 5,
    textAlign: "center",
    fontFamily: "AppFontBold",
  },
  buyButtonText: {
    fontSize: 18,
    fontFamily: "AppFontBold",
    color: "white",
  },
  buyButton: {
    backgroundColor: "transparent",
    marginTop: 20,
    elevation: 5,
    shadowColor: "black", // iOS shadow
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  disabledButton: {
    opacity: 0.5,
  },
  closeButtonContainer: {
    position: "absolute",
    top: -10,
    right: -10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    elevation: 8, // Android shadow
    shadowColor: "black", // iOS shadow
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },

  closeButtonGradient: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  buyButtonGradient: {
    paddingHorizontal: 30,
    paddingVertical: 16,
    borderRadius: 20, //
  },
  iconStyle: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    lineHeight: 40,
  },
  creditsImage: {
    width: 30,
    height: 30,
  },
  creditsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  creditsLabel: {
    fontSize: 18,
    fontFamily: "AppFont",
  },
});

export default BuyHintOverlay;
