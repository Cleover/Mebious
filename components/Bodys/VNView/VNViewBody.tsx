import React, { useState } from "react";
import { View } from "../../Themed";
import { StyleSheet } from "react-native";

import { VNDataType } from "@/Definitions/VNType";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import VNViewBodyGeneral from "./(tabs)/VNViewBodyGeneral";
import VNViewBodyReleases from "./(tabs)/VNViewBodyReleases";
import VNViewBodyRelations from "./(tabs)/VNViewBodyRelations";

export default function VNViewBody({ vnData }: { vnData: VNDataType }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const renderBody = () => {
    switch (selectedIndex) {
      case 0:
        return <VNViewBodyGeneral vnData={vnData} />;
      case 1:
        return <VNViewBodyReleases vnData={vnData} />;
      case 2:
        return <VNViewBodyRelations vnData={vnData} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <SegmentedControl
        values={["General", "Releases", "Relations"]}
        selectedIndex={selectedIndex}
        onChange={(event) => setSelectedIndex(event.nativeEvent.selectedSegmentIndex)}
        tintColor="#24647b"
        fontStyle={{ color: "#fff" }}
      />

      {renderBody()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: "transparent",
    width: "100%",
  },
});