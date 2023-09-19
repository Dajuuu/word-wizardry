import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// https://react.dev/reference/react/createContext
// https://reactnative.dev/docs/asyncstorage
const CreditsContext = createContext();

const CreditsProvider = ({ children }) => {
  // Initialise the number of credits if user does not have any yet
  const [credits, setCredits] = useState(200);

  useEffect(() => {
    // If user had their credits declared earlier,
    // then load that number of credits onto the account
    loadCreditsFromStorage();
  }, []);

  // Load credits data
  const loadCreditsFromStorage = async () => {
    try {
      const storedCredits = await AsyncStorage.getItem("credits");
      if (storedCredits !== null) {
        setCredits(parseInt(storedCredits));
      }
    } catch (error) {
      // Left for testing purposes
      // console.log("Error loading credits from AsyncStorage:", error);
    }
  };

  // Save credits
  const saveCreditsToStorage = async (value) => {
    try {
      await AsyncStorage.setItem("credits", value.toString());
    } catch (error) {
      // Left for testing purposes
      // console.log("Error saving credits to AsyncStorage:", error);
    }
  };

  // Add credits
  const addCredits = (amount) => {
    setCredits((prevCredits) => {
      const newCredits = prevCredits + amount;
      saveCreditsToStorage(newCredits);
      return newCredits;
    });
  };

  // Remove credits
  const removeCredits = (amount) => {
    setCredits((prevCredits) => {
      const newCredits = prevCredits - amount;
      saveCreditsToStorage(newCredits);
      return newCredits;
    });
  };

  // Reset credits - mostly used for testing purposes
  const resetCredits = () => {
    setCredits(0);
    saveCreditsToStorage("0");
  };

  return (
    <CreditsContext.Provider
      value={{ credits, addCredits, removeCredits, resetCredits }}
    >
      {children}
    </CreditsContext.Provider>
  );
};

export { CreditsContext, CreditsProvider };
