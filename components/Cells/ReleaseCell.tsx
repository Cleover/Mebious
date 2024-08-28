import React from "react";
import { View, Text, getTheme } from "../Themed";
import { StyleSheet } from "react-native";
import { SvgUri } from "react-native-svg";

import type { ReleaseDataType } from "@/Definitions/ReleaseType";
import hexToRGBA from "@/Functions/HexToRGBA";
import getLanguageSVG from "@/constants/LanguageTable";

import { ReleaseIcons, releaseGlyphMap } from "@/Icons/ReleaseIcons";
import type { ReleaseIconNames } from "@/Icons/ReleaseIcons";
import { Ionicons } from "@expo/vector-icons";

export default function ReleaseCell({
  releaseData,
}: {
  releaseData: ReleaseDataType;
}) {
  const THEME = getTheme();

  const languageSVGs = releaseData.languages?.map((language, index) => {
    const svgData = getLanguageSVG(language.lang);
    if (svgData) {
      return (
        <View
          key={index}
          style={styles.iconContainer}
        >
          <SvgUri width={20} height={20} uri={svgData.svg ?? ""} />
        </View>
      );
    }
    return null;
  });

  const platformSVGs = releaseData.platforms?.map((platform, index) => {
    return (
      <View key={index} style={[styles.iconContainer, { paddingLeft: 3 }]}>
        <SvgUri
          width={16}
          height={16}
          uri={`https://code.blicky.net/yorhel/vndb/raw/branch/master/icons/plat/${platform}.svg`}
        />
      </View>
    );
  });

  const getReleaseIcon = (medium?: string): ReleaseIconNames => {
    const releaseIconName = MEDIUM[medium || "otc"] as ReleaseIconNames;

    if (
      releaseIconName &&
      Object.keys(releaseGlyphMap).includes(releaseIconName)
    ) {
      return releaseIconName;
    } else {
      return "cartridge";
    }
  };

  const mediumsUsed = new Set();

  const mediumIcons = releaseData.media?.map((media, index) => {
    const name = getReleaseIcon(media.medium);
    if (mediumsUsed.has(name)) {
      return undefined;
    } else {
      mediumsUsed.add(name);
      return (
        <ReleaseIcons
          key={index}
          size={13}
          name={getReleaseIcon(media.medium)}
          color={"#706f6f"}
        />
      );
    }
  });

  return (
    <View style={styles.pb6half}>
      <View
        style={[
          styles.releaseBox,
          { backgroundColor: hexToRGBA(THEME.highlight, 0.2) },
        ]}
      >
        <View
          style={[
            styles.row,
            styles.rowBetween,
          ]}
        >
          <View style={styles.row}>{languageSVGs}</View>

          <View style={styles.row}>{platformSVGs}</View>
        </View>

        <View style={styles.rowLeft}>
          <View style={styles.row}>
            <Text style={[styles.title, styles.bold]} numberOfLines={2}>
              {releaseData.title}
            </Text>
          </View>
        </View>

        {/* Patch or Unofficial */}
        {(releaseData.patch || !releaseData.official) && (
          <Text style={[styles.pt2half, { color: THEME.patch }]}>
            {`(${!releaseData.official ? "Unofficial" : ""}${
              !releaseData.official && releaseData.patch ? " " : ""
            }${releaseData.patch ? "Patch" : ""})`}
          </Text>
        )}
        {/* Release Info */}
        <View
          style={[
            styles.row,
            styles.pt2half,
          ]}
        >
          <View style={styles.rowLeft}>
            {releaseData.vns && releaseData.vns?.length > 0 && (
              <View style={styles.row}>
                <View style={{ paddingRight: 5 }}>
                  <Ionicons
                    size={13}
                    name={"grid-outline"}
                    color={
                      releaseData.vns[0]?.rtype === "complete"
                        ? "#67C93B"
                        : releaseData.vns[0]?.rtype === "partial"
                        ? "#A84FE3"
                        : releaseData.vns[0]?.rtype === "trial"
                        ? "#D6483C"
                        : "white"
                    }
                  />
                </View>
                <Text style={[styles.title]}>{releaseData.released}</Text>
                {releaseData.minage ? (
                  <View style={styles.row}>
                    <Text style={[styles.title, { paddingHorizontal: 5 }]}>
                      •
                    </Text>
                    <Text style={[styles.title]}>{releaseData.minage}+</Text>
                  </View>
                ) : null}
              </View>
            )}
          </View>
          <View
            style={[
              styles.rowRight,
              styles.gap5,
            ]}
          >
            {releaseData.notes && (
              <ReleaseIcons size={13} name={"notes"} color={"#706f6f"} />
            )}

            {mediumIcons}

            <ReleaseIcons
              size={13}
              name={getAspectRatioSvg(releaseData.resolution)}
              color={"#706f6f"}
            />
            <ReleaseIcons
              size={13}
              name={releaseData.freeware ? "free" : "nonfree"}
              color={"#706f6f"}
            />

            {releaseData.voiced && releaseData.voiced >= 1 && (
              <ReleaseIcons
                size={13}
                name={"voiced"}
                color={
                  releaseData.voiced == 1
                    ? "#CF7170"
                    : releaseData.voiced == 2
                    ? "#C98C5D"
                    : releaseData.voiced == 3
                    ? "D9CD8D"
                    : "#B8D164"
                }
              />
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  releaseBox: {
    borderRadius: 5,
    padding: 10,
  },
  pb6half: {
    paddingBottom: 6.5,
  },
  pt2half: {
    paddingTop: 2.5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowLeft: {
    flex: 1,
  },
  rowRight: {
    paddingLeft: 5,
    flexDirection: "row",
  },
  title: {
    fontSize: 14,
  },
  bold: {
    fontWeight: "bold",
  },
  ph20: {
    paddingHorizontal: 20,
  },
  iconContainer: {
    paddingRight: 3,
  },
  gap5: {
    gap: 5,
  },
  rowBetween: {
    justifyContent: "space-between",
  },
});

function getAspectRatioSvg(input?: string | Array<number>) {
  if (input && Array.isArray(input) && input.length === 2) {
    const width = input[0] ?? 1;
    const height = input[1] ?? 1;
    if (width / height === 4 / 3) return "reso-43";
    else if (width / height === 16 / 9) return "reso-169";
  }
  return "reso-custom";
}

const MEDIUM: { [key: string]: string } = {
  dc: "cartridge",
  cd: "disk",
  dvd: "disk",
  gdr: "disk",
  blr: "disk",
  flp: "cartridge",
  cas: "cartridge",
  mrt: "cartridge",
  mem: "cartridge",
  umd: "disk",
  nod: "disk",
  in: "download",
  otc: "cartridge",
};
