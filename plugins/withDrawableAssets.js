// https://stackoverflow.com/questions/75776483/how-to-add-images-to-android-drawable-resources-in-expo-without-running-expo-pre

const { writeFileSync } = require("fs");

const { join } = require("path");

const { withDangerousMod } = require("@expo/config-plugins");

const androidFolderPath = ["app", "src", "main", "res", "drawable"];

module.exports = (expoConfig) =>
  withDangerousMod(expoConfig, [
    "android",
    (modConfig) => {
      if (modConfig.modRequest.platform === "android") {
        const androidDrawablePath = join(
          modConfig.modRequest.platformProjectRoot,
          ...androidFolderPath
        );

        const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android">
    <solid android:color="#1c1a1d"/>
    <corners android:radius="10dp"/>
    <padding android:left="0dp" android:top="0dp" android:right="0dp" android:bottom="0dp" />
</shape>`;

        const xmlFilePath = join(
          androidDrawablePath,
          "popupmenu_background.xml"
        );
        writeFileSync(xmlFilePath, xmlContent, { encoding: "utf8" });
      }
      return modConfig;
    },
  ]);
