// Mocking sounds components
export const useSoundSetting = jest.fn(() => ({
  soundEnabled: true, // Mocked sound state
  toggleSoundSetting: jest.fn(),
}));

export const useMusicSetting = jest.fn(() => ({
  musicEnabled: true, // Mocked music state
  toggleMusicSetting: jest.fn(),
}));

export const useVibrationSetting = jest.fn(() => ({
  vibrationEnabled: true, // Mocked vibration state
  toggleVibrationSetting: jest.fn(),
}));
