import { useState, useEffect } from "react";
import { Audio } from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMusicSetting } from "./SoundSettingContext";

const soundButtonClick = "./assets/sounds/buttonClick.mp3";
const soundLevelCompleted = "./assets/sounds/levelCompleted.mp3";
const backgroundMusic = "./assets/sounds/backgroundMusic.mp3";

// Background sound
export const useBackgroundSound = () => {
  const { musicEnabled } = useMusicSetting();
  // Check if the sound was loaded
  const [backgroundSoundLoaded, setBackgroundSoundLoaded] = useState(false);
  // Track the state of the sound object (mounts/unmounts)
  const [backgroundSoundObject, setBackgroundSoundObject] = useState(null);
  // Track sound playback
  const [isSoundPlaying, setIsSoundPlaying] = useState(false);

  const loadBackgroundSound = async () => {
    if (!musicEnabled) {
      if (backgroundSoundObject && isSoundPlaying) {
        // Stop the sound if music is disabled and it's currently playing
        await backgroundSoundObject.stopAsync();
        setIsSoundPlaying(false);
        setBackgroundSoundLoaded(false);
        setBackgroundSoundObject(null);
      }
      return;
    }

    if (backgroundSoundLoaded) {
      return; // Sound is already loaded
    }

    try {
      const { sound } = await Audio.Sound.createAsync(require(backgroundMusic));
      setBackgroundSoundObject(sound);
      setBackgroundSoundLoaded(true);
      await sound.setIsLoopingAsync(true);
      await sound.playAsync();
      await sound.setVolumeAsync(0.1); // Adjust the volume
      setIsSoundPlaying(true); // Set the flag to indicate sound is playing
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

  // Reset the isSoundPlaying flag when the backgroundSoundObject is done playing
  useEffect(() => {
    if (backgroundSoundObject) {
      backgroundSoundObject.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          setIsSoundPlaying(false); // Sound finished playing, reset the flag
        }
      });
    }
  }, [backgroundSoundObject]);

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

// Completed level Sound
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
