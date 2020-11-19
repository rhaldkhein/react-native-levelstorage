module.exports = {
  "testRunner": "jest",
  "runnerConfig": process.env.DETOX_EXPOSE_GLOBALS === '0' ? 'e2eExplicitRequire/config.json' : 'e2e/config.json',
  "specs": process.env.DETOX_EXPOSE_GLOBALS === '0' ? 'e2eExplicitRequire' : 'e2e',
  "behavior": {
    "init": {
      "exposeGlobals": process.env.DETOX_EXPOSE_GLOBALS === '0' ? false : true,
    },
  },
  "configurations": {
    "ios.sim.release": {
      "type": "ios.simulator",
      "binaryPath": "./ios/build/Build/Products/Release-iphonesimulator/example.app",
      "device": {
          "type": "iPhone 11 Pro"
      }
    },
    "android.debug": {
      "type": "android.emulator",
      "build": "cd android && ./gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug && cd ..",
      "binaryPath": "./android/app/build/outputs/apk/release/app-debug.apk",
      "device": {
          "avdName": "Emu_E2E"
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
