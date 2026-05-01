import type { ComponentType } from "react";
import TinderForExpenses from "~/pages/TinderForExpenses";
import VisualizeSocialNetworks from "~/pages/VisualizeSocialNetworks";
import NetworkAsNetwork from "~/pages/NetworkAsNetwork";
import MusicGuessr from "~/pages/MusicGuessr";
import Encircled from "~/pages/Encircled";
import FindToWatch from "~/pages/FindToWatch";
import PokemonIRL from "~/pages/PokemonIRL";
import EvolutionRace from "~/pages/EvolutionRace";
import Friction from "~/pages/Friction";
import FrictionDemo from "~/pages/Friction/FrictionDemo/FrictionDemo";
import ReceiptPoll from "~/pages/ReceiptPoll";
import WeeklyChars from "~/pages/WeeklyChars";
import TinderForExpensesDemo from "~/pages/TinderForExpenses/TinderForExpensesDemo";
import WeeklyCharsDemo from "~/pages/WeeklyChars/WeeklyCharsDemo";
import JobSeeker from "~/pages/JobSeeker";
import PlaceYourMusic from "~/pages/PlaceYourMusic";
import Salesque from "~/pages/Salesque";
import Clickguider from "~/pages/Clickguider";

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
    path: "friction",
    title: "Friction",
    tagline: "Expose disagreement",
    component: Friction,
    demoComponent: FrictionDemo,
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
  {
    path: "jobseeker",
    title: "JobSeeker",
    tagline: "Weighted parameter job matching",
    component: JobSeeker,
  },
  {
    path: "place-your-music",
    title: "Place Your Music",
    tagline: "Music on the map",
    component: PlaceYourMusic,
  },
  {
    path: "salesque",
    title: "Salesque",
    tagline: "Real-time sales call assistant",
    component: Salesque,
  },
  {
    path: "clickguider",
    title: "Clickguider",
    tagline: "In-platform interactive guides",
    component: Clickguider,
  },
];
