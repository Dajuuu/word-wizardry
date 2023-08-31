// SoundManager.js

import { Audio } from "expo-av";

const soundCache = {};

export const loadSound = async (soundFile) => {
  if (!soundCache[soundFile]) {
    const soundObject = new Audio.Sound();
    try {
      await soundObject.loadAsync(soundFile);
      soundCache[soundFile] = soundObject;
    } catch (error) {
      console.error(`Error loading sound '${soundFile}':`, error);
    }
  }

  return soundCache[soundFile];
};

export const playSound = async (soundFile) => {
  const soundObject = soundCache[soundFile];
  if (soundObject) {
    try {
      await soundObject.playAsync();
    } catch (error) {
      console.error(`Error playing sound '${soundFile}':`, error);
    }
  } else {
    console.warn(
      `Sound '${soundFile}' is not loaded. Call loadSound('${soundFile}') first.`
    );
  }
};
