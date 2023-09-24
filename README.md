# Word Wizardry

This is the BSc Computer Science Degree Final Project. It a word-based game with plenty of features.

Here is a small section on how to properly prepare the environment, run the application on both emulated and physical devices and run unit tests. 
In the report, there are also images, for more help.

### Run the app locally
This can be a bit less straightforward, but the whole process of running this application is not hard to do.

1. Download the Word Wizardry file .zip from Github. 
2. Open the folder using IDE. I was using VS Code, version 1.82.2
3. Now all Node modules can be installed. To do this, open a new terminal and type:  `npm i`

**IMPORTANT** - Remember to have Node installed on the system. I was using the version v18.16.1

4. Now all packages are installed and we can run the Expo server. I was doing this in two ways:

 - 4.1. Running on a physical device
`npx expo start --tunnel`

This way QR code is generated by the Expo using the Expo Go app (Android) or the Camera (iOS).

 - 4.2. Running on emulator
`npx expo start`

5. **Follow the next steps only if you are using emulators!** Now when the server is running we can start the Android Studio and Select “Virtual Device Manager”
6. After that, we can select the device and run it
7. If no devices are present, just click “Create Device” and select any device you want. Creating a new emulator is a simple process, so I will omit explaining it here

### Unit tests
The process is simple - follow the steps up to and including point 3. in the “Run the app locally” section. At this stage, all dependencies (Node modules) are installed, and the terminal is opened. To run the tests simply put this command in the terminal:

`npx jest`

Now all tests should run

