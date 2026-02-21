import type { ComponentType } from "react";

interface Idea {
  path: string;
  title: string;
  component: ComponentType;
}

export const ideas: Idea[] = [];
