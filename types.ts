
export interface MountainData {
  id: number;
  label: string;
  angle: number; // in degrees
  color?: string;
}

export interface FamilyRole {
  label: string;
  color: string;
  position: { mountain: string; radius: number }[];
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
