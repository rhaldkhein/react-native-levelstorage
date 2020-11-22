module.exports = {
  "testRunner": "jest",
  "runnerConfig": "e2e/config.json",
  "specs": "e2e",
  "behavior": {
    "init": {
      "exposeGlobals": process.env.DETOX_EXPOSE_GLOBALS === "0" ? false : true,
    },
  },
  "configurations": {
    "ios.release": {
      "type": "ios.simulator",
      "build": "export RCT_NO_LAUNCH_PACKAGER=true && xcodebuild -workspace ios/levelstorage.xcworkspace -scheme levelstorage -configuration Release -sdk iphonesimulator -derivedDataPath ios/build -quiet",
      "binaryPath": "./ios/build/Build/Products/Release-iphonesimulator/levelstorage.app",
      "device": {
          "type": "iPhone X"
      }
    },
    "android.release": {
      "type": "android.emulator",
      "build": "cd android && ./gradlew assembleRelease assembleAndroidTest -DtestBuildType=release && cd ..",
      "binaryPath": "./android/app/build/outputs/apk/release/app-release.apk",
      "device": {
          "avdName": "Emu_E2E"
      }
    }
  }
};
