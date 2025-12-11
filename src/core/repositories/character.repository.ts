import { Character, Episode, PaginationInfo } from '../entities/character.entity';

export interface CharacterFilters {
  name?: string;
  status?: string;
  species?: string;
  type?: string;
  gender?: string;
  page?: number;
}

export interface CharacterResponse {
  info: PaginationInfo;
  results: Character[];
}

export interface CharacterRepository {
  getCharacters(filters?: CharacterFilters): Promise<CharacterResponse>;
  getCharacterById(id: number): Promise<Character>;
  getEpisodes(episodeUrls: string[]): Promise<Episode[]>;
  getEpisodeById(id: number): Promise<Episode>;
}