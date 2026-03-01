export type CharacterInventory = Record<string, number>;

export interface User {
  id: string;
  name: string;
  avatar: string;
  characterInventory: CharacterInventory;
}

export interface Post {
  id: string;
  authorId: string;
  text: string;
  timestamp: number;
  receivedCharacters: CharacterInventory;
}
