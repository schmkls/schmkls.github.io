import type { ComponentType } from "react";
import TinderForExpenses from "~/pages/TinderForExpenses";
import VisualizeSocialNetworks from "~/pages/VisualizeSocialNetworks";

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
];
