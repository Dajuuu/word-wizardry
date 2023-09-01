import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Create the context
const SoundSettingContext = createContext();

// Custom hook to access the context
export const useSoundSetting = () => useContext(SoundSettingContext);

// Context provider component
export const SoundSettingProvider = ({ children }) => {
  const [soundEnabled, setSoundEnabled] = useState(true); // Default to true, sound is enabled

  // Load sound setting from AsyncStorage when the app starts
  useEffect(() => {
    const loadSoundSetting = async () => {
      try {
        const soundSetting = await AsyncStorage.getItem("soundSetting");
        if (soundSetting !== null) {
          // Convert the string to a boolean
          setSoundEnabled(soundSetting === "true");
        }
      } catch (error) {
        console.error("Error fetching sound setting:", error);
      }
    };

    loadSoundSetting();
  }, []);

  // Update the sound setting and store it in AsyncStorage
  const toggleSoundSetting = async (newValue) => {
    setSoundEnabled(newValue);
    try {
      await AsyncStorage.setItem("soundSetting", newValue.toString());
    } catch (error) {
      console.error("Error saving sound setting:", error);
    }
  };

  return (
    <SoundSettingContext.Provider value={{ soundEnabled, toggleSoundSetting }}>
      {children}
    </SoundSettingContext.Provider>
  );
};
