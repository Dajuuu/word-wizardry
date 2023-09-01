import { useState, useEffect } from "react";
import { Audio } from "expo-av";

const soundButtonClick = "./assets/sounds/buttonClick.mp3"; // Hardcoded path to button click sound file
const soundLevelCompleted = "./assets/sounds/levelCompleted.mp3"; // Hardcoded path to level completed sound file

export const useButtonClickSound = () => {
  const [soundLoaded, setSoundLoaded] = useState(false);
  const [soundObjectBtnClick, setSoundObjectBtnClick] = useState(null);

  const loadSound = async () => {
    const soundBtn = new Audio.Sound();
    try {
      await soundBtn.loadAsync(require(soundButtonClick));
      setSoundObjectBtnClick(soundBtn);
      setSoundLoaded(true);
    } catch (error) {
      console.error(`Error loading sound ${soundButtonClick}:`, error);
      setSoundLoaded(false);
    }
  };

  const handleButtonSoundPlay = async () => {
    if (!soundLoaded) {
      await loadSound(); // Load the sound if not already loaded
    }

    if (soundObjectBtnClick) {
      try {
        await soundObjectBtnClick.replayAsync();
      } catch (error) {
        console.error(`Error playing sound ${soundButtonClick}:`, error);
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

  const loadSound = async () => {
    const soundLvl = new Audio.Sound();
    try {
      await soundLvl.loadAsync(require(soundLevelCompleted));
      setSoundObjectLvlCompleted(soundLvl);
      setSoundLoaded(true);
    } catch (error) {
      console.error(`Error loading sound ${soundLevelCompleted}:`, error);
      setSoundLoaded(false);
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
