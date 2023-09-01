import { useState, useEffect } from "react";
import { Audio } from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMusicSetting } from "./SoundSettingContext";

const soundButtonClick = "./assets/sounds/buttonClick.mp3"; // Hardcoded path to button click sound file
const soundLevelCompleted = "./assets/sounds/levelCompleted.mp3"; // Hardcoded path to level completed sound file
const backgroundMusic = "./assets/sounds/backgroundMusic.mp3"; // Hardcoded path to level completed sound file

// Background sound
export const useBackgroundSound = () => {
  const { musicEnabled } = useMusicSetting();
  const [backgroundSoundLoaded, setBackgroundSoundLoaded] = useState(false);
  const [backgroundSoundObject, setBackgroundSoundObject] = useState(null);

  const loadBackgroundSound = async () => {
    if (backgroundSoundLoaded || !musicEnabled) {
      console.log("music is" + musicEnabled);
      // If the background sound is already loaded or music is disabled, return
      return;
    }

    try {
      const { sound } = await Audio.Sound.createAsync(require(backgroundMusic));
      setBackgroundSoundObject(sound);
      setBackgroundSoundLoaded(true);
      await sound.setIsLoopingAsync(true);
      await sound.setVolumeAsync(0.1); // Adjust to your preferred volume level
      await sound.playAsync(); // Start playing when music is enabled
    } catch (error) {
      console.error("Error loading background sound:", error);
    }
  };

  useEffect(() => {
    loadBackgroundSound();
    return () => {
      if (backgroundSoundObject) {
        backgroundSoundObject.unloadAsync();
      }
    };
  }, [musicEnabled]);

  // Return backgroundSoundLoaded or other necessary values
  return { backgroundSoundLoaded };
};

// Button click sound
export const useButtonClickSound = () => {
  const [soundLoaded, setSoundLoaded] = useState(false);
  const [soundObjectBtnClick, setSoundObjectBtnClick] = useState(null);
  const [loadingSound, setLoadingSound] = useState(false);

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
      await sound.setVolumeAsync(0.3); // Adjust the volume
      setSoundLoaded(true);
    } catch (error) {
      console.error(`Error loading sound ${soundButtonClick}:`, error);
      setSoundLoaded(false);
    } finally {
      setLoadingSound(false);
    }
  };

  const handleButtonSoundPlay = async () => {
    try {
      const soundSetting = await AsyncStorage.getItem("soundSetting");
      if (soundSetting !== null) {
        // Convert the string to a boolean
        const isSoundEnabled = soundSetting === "true";

        if (isSoundEnabled) {
          // Only play sound if sound is enabled
          if (!soundLoaded) {
            await loadSound(); // Load the sound if not already loaded
          }

          if (soundObjectBtnClick) {
            await soundObjectBtnClick.replayAsync();
          }
        }
      }
    } catch (error) {
      console.error(`Error playing sound ${soundButtonClick}:`, error);
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

// Completed level
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
      await sound.setVolumeAsync(0.3); // Adjust the volume
      setSoundLoaded(true);
    } catch (error) {
      console.error(`Error loading sound ${soundLevelCompleted}:`, error);
      setSoundLoaded(false);
    } finally {
      setLoadingSound(false);
    }
  };

  const handleLevelCompletedSoundPlay = async () => {
    try {
      const soundSetting = await AsyncStorage.getItem("soundSetting");
      if (soundSetting !== null) {
        // Convert the string to a boolean
        const isSoundEnabled = soundSetting === "true";

        if (isSoundEnabled) {
          // Only play sound if sound is enabled
          if (!soundLoaded) {
            await loadSound(); // Load the sound if not already loaded
          }

          if (soundObjectLvlCompleted) {
            await soundObjectLvlCompleted.replayAsync();
          }
        }
      }
    } catch (error) {
      console.error(`Error playing sound ${soundLevelCompleted}:`, error);
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
