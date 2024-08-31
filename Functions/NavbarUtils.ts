import type { NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import { clamp } from "react-native-reanimated";

export const handleScrollOpacity = (event: NativeSyntheticEvent<NativeScrollEvent>, topBarOverwrite?: (value: number) => void, hiddenBy = 150) => {
  const currentOffset = event.nativeEvent.contentOffset.y;
  const opacity = clamp(((currentOffset - hiddenBy) / hiddenBy) * -1, 0, 1);

  if (topBarOverwrite) {
    topBarOverwrite(opacity)
  } else {
    (window as any).setTopBarOpacity(opacity);
  }
};