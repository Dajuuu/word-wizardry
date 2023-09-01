import { useState, useEffect } from "react";
import { Audio } from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage";

const soundButtonClick = "./assets/sounds/buttonClick.mp3"; // Hardcoded path to button click sound file
const soundLevelCompleted = "./assets/sounds/levelCompleted.mp3"; // Hardcoded path to level completed sound file

export const useButtonClickSound = () => {
  const [soundLoaded, setSoundLoaded] = useState(false);
  const [soundObjectBtnClick, setSoundObjectBtnClick] = useState(null);
  const [loadingSound, setLoadingSound] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

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

    loadSoundSetting(); // Fetch sound setting from AsyncStorage when component mounts
  }, []);

  const loadSound = async () => {
    if (loadingSound) {
      // If sound is already being loaded, return to prevent concurrent loads
      return;
    }

    setLoadingSound(true);

    try {
      const { sound } = await Audio.Sound.createAsync(
        require(soundButtonClick)
      );
      setSoundObjectBtnClick(sound);
      setSoundLoaded(true);
    } catch (error) {
      console.error(`Error loading sound ${soundButtonClick}:`, error);
      setSoundLoaded(false);
    } finally {
      setLoadingSound(false);
    }
  };

  const handleButtonSoundPlay = async () => {
    if (soundEnabled == true) {
      // Only play sound if sound is enabled and not already loading
      if (!soundLoaded) {
        await loadSound(); // Load the sound if not already loaded
      }

      if (soundObjectBtnClick) {
        try {
          await soundObjectBtnClick.replayAsync();
        } catch (error) {
          console.error(`Error playing sound ${soundButtonClick}:`, error);
          // Attempt to reload and replay the sound
          console.log("Attempting to reload and replay the sound...");
          await loadSound(); // Reload the sound
          await soundObjectBtnClick.replayAsync(); // Retry playback
        }
      }
    }
  };

  useEffect(() => {
    loadSound();
    return () => {
      if (soundObjectBtnClick) {
        soundObjectBtnClick.unloadAsync();
      }
    };
  }, []);

  return { soundLoaded, handleButtonSoundPlay };
};

export const useLevelCompletedSound = () => {
  const [soundLoaded, setSoundLoaded] = useState(false);
  const [soundObjectLvlCompleted, setSoundObjectLvlCompleted] = useState(null);
  const [loadingSound, setLoadingSound] = useState(false);

  const loadSound = async () => {
    if (loadingSound) {
      // If sound is already being loaded, return to prevent concurrent loads
      return;
    }
    setLoadingSound(true);
    try {
      const { sound } = await Audio.Sound.createAsync(
        require(soundLevelCompleted)
      );
      setSoundObjectLvlCompleted(sound);
      setSoundLoaded(true);
    } catch (error) {
      console.error(`Error loading sound ${soundLevelCompleted}:`, error);
      setSoundLoaded(false);
    } finally {
      setLoadingSound(false);
    }
  };

  const handleLevelCompletedSoundPlay = async () => {
    if (!soundLoaded) {
      await loadSound(); // Load the sound if not already loaded
    }

    if (soundObjectLvlCompleted) {
      try {
        await soundObjectLvlCompleted.replayAsync();
      } catch (error) {
        console.error(`Error playing sound ${soundLevelCompleted}:`, error);
        // Attempt to reload and replay the sound
        console.log("Attempting to reload and replay the sound...");
        await loadSound(); // Reload the sound
        await soundObjectLvlCompleted.replayAsync(); // Retry playback
      }
    }
  };

  useEffect(() => {
    loadSound();
    return () => {
      if (soundObjectLvlCompleted) {
        soundObjectLvlCompleted.unloadAsync();
      }
    };
  }, []);

  return { soundLoaded, handleLevelCompletedSoundPlay };
};
