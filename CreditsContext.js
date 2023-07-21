import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CreditsContext = createContext();

const CreditsProvider = ({ children }) => {
  // Initialise the number of credits if user does not have any yet
  const [credits, setCredits] = useState(50000);

  useEffect(() => {
    // If user had their credits declared earlier,
    // then load that number of credits onto the account
    loadCreditsFromStorage();
  }, []);

  // load credits data
  const loadCreditsFromStorage = async () => {
    try {
      const storedCredits = await AsyncStorage.getItem("credits");
      if (storedCredits !== null) {
        setCredits(parseInt(storedCredits));
      }
    } catch (error) {
      console.log("Error loading credits from AsyncStorage:", error);
    }
  };

  // save credits data
  const saveCreditsToStorage = async (value) => {
    try {
      await AsyncStorage.setItem("credits", value.toString());
    } catch (error) {
      console.log("Error saving credits to AsyncStorage:", error);
    }
  };

  // add credits
  const addCredits = (amount) => {
    setCredits((prevCredits) => {
      const newCredits = prevCredits + amount;
      saveCreditsToStorage(newCredits);
      return newCredits;
    });
  };

  // remove credits
  const removeCredits = (amount) => {
    setCredits((prevCredits) => {
      const newCredits = prevCredits - amount;
      saveCreditsToStorage(newCredits);
      return newCredits;
    });
  };

  // reset credits
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
