import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Create the context for sound settings
const SoundSettingContext = createContext();

// Create the context for music settings
const MusicSettingContext = createContext();

// Custom hooks to access the contexts
export const useSoundSetting = () => useContext(SoundSettingContext);
export const useMusicSetting = () => useContext(MusicSettingContext);

// Context provider components
export const SoundSettingProvider = ({ children }) => {
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    const loadSoundSetting = async () => {
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

  const toggleSoundSetting = async (newValue) => {
    setSoundEnabled(newValue);
    console.log(newValue);
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

export const MusicSettingProvider = ({ children }) => {
  // This is the inital state of music play. It has to be false,
  // otherwise the music will start regardless of the state of on app start
  const [musicEnabled, setMusicEnabled] = useState(false);

  useEffect(() => {
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

  const toggleMusicSetting = async (newValue) => {
    setMusicEnabled(newValue);
    console.log(newValue);
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
