import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// ---***---
// Contexts are needed to make sure the options are saved for the user.
// That would be annoying if the user would have to manually turn off or on all the settings whenever app reloads.
// ---***---
// https://react.dev/reference/react/createContext

// Create the context for sound settings
const SoundSettingContext = createContext();
// Create the context for music settings
const MusicSettingContext = createContext();
// Create the context for vibration settings
const VibrationSettingContext = createContext();

// Custom hooks to access the contexts
export const useSoundSetting = () => useContext(SoundSettingContext);
export const useMusicSetting = () => useContext(MusicSettingContext);
export const useVibrationSetting = () => useContext(VibrationSettingContext);

// Context provider components
export const SoundSettingProvider = ({ children }) => {
  // In what state should the sound start - true, the sound is on
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    // See what sound settings are saved for the user.
    // If there is non declared, initalise it
    const loadSoundSetting = async () => {
      // Written with a help of ChatGPT - start
      try {
        const soundSetting = await AsyncStorage.getItem("soundSetting");
        if (soundSetting !== null) {
          setSoundEnabled(soundSetting === "true");
        }
      } catch (error) {
        console.error("Error fetching sound setting:", error);
      }
    };

    loadSoundSetting();
  }, []);

  // Function that allows to change the state of sound (turn on/off)
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
// Written with a help of ChatGPT - end

// Rest of the functions are very similar to the one above, so they are based out of it
export const MusicSettingProvider = ({ children }) => {
  // This is the inital state of music play. VERY IMPORTANT! It has to be false,
  // otherwise the music will start regardless of the state of on app start
  const [musicEnabled, setMusicEnabled] = useState(false);

  useEffect(() => {
    // See what music settings are saved for the user.
    // If there is non declared, initalise it
    const loadMusicSetting = async () => {
      try {
        const musicSetting = await AsyncStorage.getItem("musicSetting");
        if (musicSetting !== null) {
          setMusicEnabled(musicSetting === "true");
        }
      } catch (error) {
        console.error("Error fetching music setting:", error);
      }
    };

    loadMusicSetting();
  }, []);

  // Function that allows to change the state of music (turn on/off)
  const toggleMusicSetting = async (newValue) => {
    setMusicEnabled(newValue);
    try {
      await AsyncStorage.setItem("musicSetting", newValue.toString());
    } catch (error) {
      console.error("Error saving music setting:", error);
    }
  };

  return (
    <MusicSettingContext.Provider value={{ musicEnabled, toggleMusicSetting }}>
      {children}
    </MusicSettingContext.Provider>
  );
};

// Vibration
export const VibrationSettingProvider = ({ children }) => {
  // In what state should the vibrations start - true, the vibrations are on
  const [vibrationEnabled, setVibrationEnabled] = useState(false);

  useEffect(() => {
    // See what sound settings are saved for the user.
    // If there is non declared, initalise it
    const loadVibrationSetting = async () => {
      try {
        const vibrationSetting = await AsyncStorage.getItem("vibrationSetting");
        if (vibrationSetting !== null) {
          setVibrationEnabled(vibrationSetting === "true");
        }
      } catch (error) {
        console.error("Error fetching vibration setting:", error);
      }
    };

    loadVibrationSetting();
  }, []);

  // Function that allows to change the state of vibrations (turn on/off)
  const toggleVibrationSetting = async (newValue) => {
    setVibrationEnabled(newValue);
    try {
      await AsyncStorage.setItem("vibrationSetting", newValue.toString());
    } catch (error) {
      console.error("Error saving vibration setting:", error);
    }
  };

  return (
    <VibrationSettingContext.Provider
      value={{ vibrationEnabled, toggleVibrationSetting }}
    >
      {children}
    </VibrationSettingContext.Provider>
  );
};
