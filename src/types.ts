/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface HeroSnippet {
  id: string;
  type: string;
  title: string;
  meta: string;
  body?: string;
  color: string;
  stamp?: string;
  stampColor?: string;
  badge?: string;
  left: string; // absolute % values
  top: string;
  width: string;
  rotation: number;
  delay: number; // For intro pile animation delay
}

export interface BriefTask {
  id: string;
  category: 'MUST SEE' | 'FYI' | 'LOW PRIORITY';
  title: string;
  sender: string;
  time: string;
  tags?: string[];
  snippet?: string;
  attachment?: { name: string; size: string };
  actionRequired?: boolean;
}

export interface RoomRow {
  id: string;
  source: string;
  jobTitle: string;
  compensation: string;
  company: string;
  status: 'Live' | 'Active' | 'Case Study' | 'Archive';
}

export interface PeopleContact {
  id: string;
  name: string;
  role: string;
  organization: string;
  avatarColor: string;
  bio: string;
  attributes: { label: string; value: string }[];
  pastInteractions: { date: string; summary: string }[];
  angle: number; // Dynamic angle for constellation positioning
}

export interface SearchPrompt {
  id: string;
  query: string;
  outputName: string;
  outputMeta: string;
}

export interface DrawerDetail {
  id: string;
  label: string;
  count: number;
  color: string;
  icon: string;
  slips: DrawerSlip[];
}

export interface DrawerSlip {
  id: string;
  title: string;
  from: string;
  date: string;
  snippet?: string;
  amount?: string;
  badge?: string;
}

// Global state machine for the scenes
export type SceneId =
  | 'hero'
  | 'brief'
  | 'room'
  | 'search'
  | 'people'
  | 'sorting'
  | 'drawers'
  | 'footer';

export const SCENE_BOUNDS: { id: SceneId; start: number; end: number; label: string }[] = [
  { id: 'hero', start: 0, end: 600, label: 'danfordchris' },
  { id: 'brief', start: 600, end: 1350, label: 'The Brief' },
  { id: 'room', start: 1350, end: 3350, label: 'Room Workspace' },
  { id: 'search', start: 3350, end: 4100, label: 'Universal Search' },
  { id: 'people', start: 4100, end: 4900, label: 'People Index' },
  { id: 'sorting', start: 4900, end: 5600, label: 'Sorting Pipeline' },
  { id: 'drawers', start: 5600, end: 6800, label: 'Folders & Files' },
  { id: 'footer', start: 6800, end: 7700, label: 'Signature' },
];
