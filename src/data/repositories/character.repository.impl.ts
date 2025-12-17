import axios from 'axios';
import { 
  CharacterRepository, 
  CharacterFilters, 
  CharacterResponse 
} from '../../core/repositories/character.repository';
import { Character, Episode } from '../../core/entities/character.entity';
import { CharacterAdapter } from '../adapters/character.adapter';
import { 
  CharacterApiResponse, 
  CharacterApiData, 
  EpisodeApiData 
} from '../dto/character.dto';


const BASE_URL = 'https://rickandmortyapi.com/api';

export class CharacterRepositoryImpl implements CharacterRepository {
  private api = axios.create({
    baseURL: BASE_URL,
    timeout: 10000
  });

  async getCharacters(filters?: CharacterFilters): Promise<CharacterResponse> {
    try {
      const params = this.buildQueryParams(filters);
      const response = await this.api.get<CharacterApiResponse>('/character', { params });
      
      return {
        info: response.data.info,
        results: response.data.results.map(CharacterAdapter.toDomain)
      };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return {
          info: { 
            count: 0, 
            pages: 0, 
            next: null, 
            prev: null 
          },
          results: []
        };
      }
      throw new Error('Error fetching characters');
    }
  }

  async getCharacterById(id: number): Promise<Character> {
    try {
     
      const response = await this.api.get<CharacterApiData>(`/character/${id}`);
      return CharacterAdapter.toDomain(response.data);
    } catch (error) {
    
      throw new Error(`Error fetching character with id ${id}`);
    }
  }

  async getEpisodes(episodeUrls: string[]): Promise<Episode[]> {
    try {
     
      const episodeIds = episodeUrls.map(url => {
        const match = url.match(/\/(\d+)$/);
        return match ? parseInt(match[1]) : null;
      }).filter((id): id is number => id !== null);

      if (episodeIds.length === 0) return [];
      
     
      if (episodeIds.length === 1) {
        const episode = await this.getEpisodeById(episodeIds[0]);
        return [episode];
      }
      

      const idsToFetch = episodeIds.slice(0, 10); 
      
      const response = await this.api.get<EpisodeApiData[] | EpisodeApiData>(
        `/episode/${idsToFetch.join(',')}`
      );
      
      const episodesData = Array.isArray(response.data) 
        ? response.data 
        : [response.data];
      
      return episodesData.map(CharacterAdapter.toEpisodeDomain);
    } catch (error) {
      console.error('Error fetching episodes:', error);
      return [];
    }
  }

  async getEpisodeById(id: number): Promise<Episode> {
    try {
      const response = await this.api.get<EpisodeApiData>(`/episode/${id}`);
      return CharacterAdapter.toEpisodeDomain(response.data);
    } catch (error) {
      throw new Error(`Error fetching episode with id ${id}`);
    }
  }

  private buildQueryParams(filters?: CharacterFilters): Record<string, string | number> {
    const params: Record<string, string | number> = {};
    
    if (filters?.name) params.name = filters.name;
    if (filters?.status) params.status = filters.status;
    if (filters?.species) params.species = filters.species;
    if (filters?.type) params.type = filters.type;
    if (filters?.gender) params.gender = filters.gender;
    if (filters?.page) params.page = filters.page;
    
    return params;
  }
}