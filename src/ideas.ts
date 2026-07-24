import type { ComponentType } from "react";
import TinderForExpenses from "~/pages/TinderForExpenses/TinderForExpenses";
import VisualizeSocialNetworks from "~/pages/VisualizeSocialNetworks";
import NetworkAsNetwork from "~/pages/NetworkAsNetwork";
import MusicGuessr from "~/pages/MusicGuessr";
import Encircled from "~/pages/Encircled";
import FindToWatch from "~/pages/FindToWatch";
import PokemonIRL from "~/pages/PokemonIRL";
import EvolutionRace from "~/pages/EvolutionRace";
import Friction from "~/pages/Friction/Friction";
import FrictionDemo from "~/pages/Friction/Demo/FrictionDemo";
import ReceiptPoll from "~/pages/ReceiptPoll";
import WeeklyChars from "~/pages/WeeklyChars/WeeklyChars";
import TinderForExpensesDemo from "~/pages/TinderForExpenses/Demo/TinderForExpensesDemo";
import WeeklyCharsDemo from "~/pages/WeeklyChars/Demo/WeeklyCharsDemo";
import JobSeeker from "~/pages/JobSeeker";
import PlaceYourMusic from "~/pages/PlaceYourMusic";
import Salesque from "~/pages/Salesque";
import Clickguider from "~/pages/Clickguider";
import Referensee from "~/pages/Referensee/Referensee";
import ReferenseeFocusStage from "~/pages/Referensee/Demo/ReferenseeFocusStage/ReferenseeFocusStage";

export interface Idea {
  path: string;
  title: string;
  tagline: string;
  component: ComponentType;
  demoComponent?: ComponentType;
}

interface IdeaSection {
  title: string;
  ideas: Idea[];
}

export const sections: IdeaSection[] = [
  {
    title: "Visualize existing information",
    ideas: [
      {
        path: "visualize-social-networks",
        title: "Visualize Social Networks",
        tagline: "See who you know — and how they’re connected",
        component: VisualizeSocialNetworks,
      },
      {
        path: "referensee",
        title: "Referensee",
        tagline: "See where your news comes from — and how others see it",
        component: Referensee,
        demoComponent: ReferenseeFocusStage,
      },
    ],
  },
  {
    title: "Games",
    ideas: [
      {
        path: "encircled",
        title: "Encircled",
        tagline: "Go outside and circle your friends",
        component: Encircled,
      },
      {
        path: "pokemon-irl",
        title: "Pokémon IRL",
        tagline: "Catch ‘em all — nature edition",
        component: PokemonIRL,
      },
      {
        path: "evolution-race",
        title: "Evolution Race",
        tagline:
          "A multiplayer classroom game where students race through evolution",
        component: EvolutionRace,
      },
    ],
  },
  {
    title: "Music",
    ideas: [
      {
        path: "music-guessr",
        title: "MusicGuessr",
        tagline: "Geoguessr for music lovers",
        component: MusicGuessr,
      },
      {
        path: "place-your-music",
        title: "Place Your Music",
        tagline: "Music on the map",
        component: PlaceYourMusic,
      },
      {
        path: "receipt-poll",
        title: "Receipt Poll",
        tagline: "More drinks = better music",
        component: ReceiptPoll,
      },
    ],
  },
  {
    title: "Social",
    ideas: [
      {
        path: "friction",
        title: "Friction",
        tagline: "Expose disagreement",
        component: Friction,
        demoComponent: FrictionDemo,
      },
      {
        path: "network-as-network",
        title: "Network as Network",
        tagline: "The transparent social network",
        component: NetworkAsNetwork,
      },
      {
        path: "weekly-chars",
        title: "Weekly Chars",
        tagline: "Earn your voice, one character at a time",
        component: WeeklyChars,
        demoComponent: WeeklyCharsDemo,
      },
    ],
  },
  {
    title: "Other B2C Tools",
    ideas: [
      {
        path: "jobseeker",
        title: "JobSeeker",
        tagline: "Weighted parameter job matching",
        component: JobSeeker,
      },
      {
        path: "tinder-for-expenses",
        title: "Tinder for Expenses",
        tagline: "A fun way to review and improve your spending habits",
        component: TinderForExpenses,
        demoComponent: TinderForExpensesDemo,
      },
      {
        path: "find-to-watch",
        title: "Find to Watch",
        tagline: "Spotify Blend for movies",
        component: FindToWatch,
      },
    ],
  },
  {
    title: "Other B2B Tools",
    ideas: [
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
    ],
  },
];

export const ideas: Idea[] = sections.flatMap((section) => section.ideas);
