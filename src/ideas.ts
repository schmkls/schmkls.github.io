import type { ComponentType } from "react";
import TinderForExpenses from "~/pages/TinderForExpenses";
import VisualizeSocialNetworks from "~/pages/VisualizeSocialNetworks";
import NetworkAsNetwork from "~/pages/NetworkAsNetwork";
import MusicGuessr from "~/pages/MusicGuessr";
import Encircled from "~/pages/Encircled";
import FindToWatch from "~/pages/FindToWatch";
import PokemonIRL from "~/pages/PokemonIRL";
import EvolutionRace from "~/pages/EvolutionRace";
import CommunicationTrail from "~/pages/CommunicationTrail";
import Friction from "~/pages/Friction";
import ReceiptPoll from "~/pages/ReceiptPoll";
import WeeklyChars from "~/pages/WeeklyChars";
import TinderForExpensesDemo from "~/pages/TinderForExpenses/TinderForExpensesDemo";
import CommunicationTrailDemo from "~/pages/CommunicationTrail/CommunicationTrailDemo";
import WeeklyCharsDemo from "~/pages/WeeklyChars/WeeklyCharsDemo";

interface Idea {
  path: string;
  title: string;
  tagline: string;
  component: ComponentType<{ tagline: string }>;
  demoComponent?: ComponentType;
}

export const ideas: Idea[] = [
  {
    path: "tinder-for-expenses",
    title: "Tinder for Expenses",
    tagline: "A fun way to review and improve your spending habits",
    component: TinderForExpenses,
    demoComponent: TinderForExpensesDemo,
  },
  {
    path: "visualize-social-networks",
    title: "Visualize Social Networks",
    tagline: "See who you know \u2014 and how they\u2019re connected",
    component: VisualizeSocialNetworks,
  },
  {
    path: "network-as-network",
    title: "Network as Network",
    tagline: "The transparent social network",
    component: NetworkAsNetwork,
  },
  {
    path: "music-guessr",
    title: "MusicGuessr",
    tagline: "Geoguessr for music lovers",
    component: MusicGuessr,
  },
  {
    path: "encircled",
    title: "Encircled",
    tagline: "Go outside and circle your friends",
    component: Encircled,
  },
  {
    path: "find-to-watch",
    title: "Find to Watch",
    tagline: "Spotify Blend for movies",
    component: FindToWatch,
  },
  {
    path: "pokemon-irl",
    title: "Pok\u00e9mon IRL",
    tagline: "Catch \u2018em all \u2014 nature edition",
    component: PokemonIRL,
  },
  {
    path: "evolution-race",
    title: "Evolution Race",
    tagline:
      "A multiplayer classroom game where students race through evolution",
    component: EvolutionRace,
  },
  {
    path: "communication-trail",
    title: "Communication Trail",
    tagline: "One shared timeline for every customer journey",
    component: CommunicationTrail,
    demoComponent: CommunicationTrailDemo,
  },
  {
    path: "friction",
    title: "Friction",
    tagline: "Expose disagreement",
    component: Friction,
  },
  {
    path: "receipt-poll",
    title: "Receipt Poll",
    tagline: "More drinks = better music",
    component: ReceiptPoll,
  },
  {
    path: "weekly-chars",
    title: "Weekly Chars",
    tagline: "Earn your voice, one character at a time",
    component: WeeklyChars,
    demoComponent: WeeklyCharsDemo,
  },
];
