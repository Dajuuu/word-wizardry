import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CreditsContext = createContext();

const CreditsProvider = ({ children }) => {
  const [credits, setCredits] = useState(50000);

  useEffect(() => {
    loadCreditsFromStorage();
  }, []);

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

  const saveCreditsToStorage = async (value) => {
    try {
      await AsyncStorage.setItem("credits", value.toString());
    } catch (error) {
      console.log("Error saving credits to AsyncStorage:", error);
    }
  };

  const addCredits = (amount) => {
    setCredits((prevCredits) => {
      const newCredits = prevCredits + amount;
      saveCreditsToStorage(newCredits);
      return newCredits;
    });
  };

  const removeCredits = (amount) => {
    setCredits((prevCredits) => {
      const newCredits = prevCredits - amount;
      saveCreditsToStorage(newCredits);
      return newCredits;
    });
  };

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
