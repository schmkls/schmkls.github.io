import type { ComponentType } from "react";
import TheOfflineGarden from "~/pages/TheOfflineGarden";
import AmbientProductivity from "~/pages/AmbientProductivity";
import PaperComputing from "~/pages/PaperComputing";

interface Idea {
  path: string;
  title: string;
  component: ComponentType;
}

export const ideas: Idea[] = [
  { path: "the-offline-garden", title: "The Offline Garden", component: TheOfflineGarden },
  { path: "ambient-productivity", title: "Ambient Productivity", component: AmbientProductivity },
  { path: "paper-computing", title: "Paper Computing", component: PaperComputing },
];
