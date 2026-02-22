import type { ComponentType } from "react";
import TinderForExpenses from "~/pages/TinderForExpenses";
import VisualizeSocialNetworks from "~/pages/VisualizeSocialNetworks";
import NetworkAsNetwork from "~/pages/NetworkAsNetwork";
import MusicGuessr from "~/pages/MusicGuessr";

interface Idea {
  path: string;
  title: string;
  component: ComponentType;
}

export const ideas: Idea[] = [
  {
    path: "tinder-for-expenses",
    title: "Tinder for Expenses",
    component: TinderForExpenses,
  },
  {
    path: "visualize-social-networks",
    title: "Visualize Social Networks",
    component: VisualizeSocialNetworks,
  },
  {
    path: "network-as-network",
    title: "Network as Network",
    component: NetworkAsNetwork,
  },
  {
    path: "music-guessr",
    title: "MusicGuessr",
    component: MusicGuessr,
  },
];
