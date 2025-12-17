
export interface Character {
  id: number;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  type: string;
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}


export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string; 
  characters: string[];
  url: string;
  created: string;
}


export interface PaginationInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}


export function isCharacterStatus(status: string): status is Character['status'] {
  return ['Alive', 'Dead', 'unknown'].includes(status);
}

export function isCharacterGender(gender: string): gender is Character['gender'] {
  return ['Female', 'Male', 'Genderless', 'unknown'].includes(gender);
}


export function getStatusColor(status: Character['status']): string {
  const colors = {
    Alive: 'text-green-600 bg-green-100',
    Dead: 'text-red-600 bg-red-100',
    unknown: 'text-gray-600 bg-gray-100'
  };
  return colors[status];
}


export function formatEpisodeCode(episodeCode: string): string {
  const match = episodeCode.match(/S(\d+)E(\d+)/);
  if (match) {
    const season = match[1].padStart(2, '0');
    const episode = match[2].padStart(2, '0');
    return `Season ${season}, Episode ${episode}`;
  }
  return episodeCode;
}


export interface CharacterFilters {
  name?: string;
  status?: Character['status'];
  species?: string;
  type?: string;
  gender?: Character['gender'];
  page?: number;
}


export interface CharacterResponse {
  info: PaginationInfo;
  results: Character[];
}


export interface CharacterSummary {
  id: number;
  name: string;
  status: Character['status'];
  species: string;
  image: string;
  episodeCount: number;
}


export function createCharacterSummary(character: Character): CharacterSummary {
  return {
    id: character.id,
    name: character.name,
    status: character.status,
    species: character.species,
    image: character.image,
    episodeCount: character.episode.length
  };
}


export interface CharacterDetails extends Character {
  firstSeen: string;
  lastKnownLocation: string;
  episodeNames: string[];
}


export interface EpisodeSummary {
  id: number;
  name: string;
  episode: string;
  airDate: string;
  characterCount: number;
}


export function createEpisodeSummary(episode: Episode): EpisodeSummary {
  return {
    id: episode.id,
    name: episode.name,
    episode: episode.episode,
    airDate: episode.air_date,
    characterCount: episode.characters.length
  };
}