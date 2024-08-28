import createIconSet from "@expo/vector-icons/createIconSet";

const releaseGlyphMap = {
  "ani-ero": 65,
  "ani-story": 66,
  "cartridge": 67,
  "disk": 68,
  "download": 69,
  "free": 70,
  "nonfree": 71,
  "notes": 72,
  "reso-43": 73,
  "reso-169": 74,
  "reso-custom": 75,
  "voiced": 76,
};

type ReleaseIconNames =
  | "reso-43"
  | "reso-169"
  | "reso-custom"
  | "disk"
  | "cartridge"
  | "download"
  | "ani-ero"
  | "ani-story"
  | "free"
  | "nonfree"
  | "notes"
  | "voiced";

const ReleaseIcons = createIconSet(
  releaseGlyphMap,
  "release",
  require("./../assets/fonts/rel.ttf")
);

export {
  ReleaseIcons,
  releaseGlyphMap
};
export type { ReleaseIconNames };



// Reference List :
// <ReleaseIcons size={100} name="ani-ero" color={"#914040"} />
// <ReleaseIcons size={100} name="ani-story" color={"#914040"} />
// <ReleaseIcons size={100} name="cartridge" color={"#706f6f"} />
// <ReleaseIcons size={100} name="disk" color={"#706f6f"} />
// <ReleaseIcons size={100} name="download" color={"#706f6f"} />
// <ReleaseIcons size={100} name="free" color={"#706f6f"} />
// <ReleaseIcons size={100} name="nonfree" color={"#706f6f"} />
// <ReleaseIcons size={100} name="notes" color={"#706f6f"} />
// <ReleaseIcons size={100} name="reso-43" color={"#706f6f"} />
// <ReleaseIcons size={100} name="reso-169" color={"#706f6f"} />
// <ReleaseIcons size={100} name="reso-custom" color={"#706f6f"} />
// <ReleaseIcons size={100} name="voiced" color={"#4B5B1D"} />