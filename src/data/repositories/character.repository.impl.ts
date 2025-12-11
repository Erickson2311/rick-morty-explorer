import axios from 'axios';
import { CharacterRepository, CharacterFilters, CharacterResponse } from '../../core/repositories/character.repository';
import { Character, Episode } from '../../core/entities/character.entity';
import { CharacterAdapter } from '../adapters/character.adapter';
import { CharacterApiResponse, EpisodeApiData } from '../dto/character.dto';

// Configuración mejorada
const BASE_URL = import.meta.env.DEV ? '/api' : 'https://rickandmortyapi.com/api';

export class CharacterRepositoryImpl implements CharacterRepository {
  private api = axios.create({
    baseURL: BASE_URL,
    timeout: 15000,
    headers: {
      'Accept': 'application/json',
    }
  });

  async getCharacters(filters?: CharacterFilters): Promise<CharacterResponse> {
    try {
      const params = this.buildQueryParams(filters);
      console.log('Fetching characters from:', BASE_URL, 'with params:', params);
      
      const response = await this.api.get<CharacterApiResponse>('/character', { params });
      return {
        info: response.data.info,
        results: response.data.results.map(CharacterAdapter.toDomain)
      };
    } catch (error) {
      console.error('Error fetching characters:', error);
      
      // Datos mock para desarrollo si hay error
      if (import.meta.env.DEV) {
        console.warn('Using mock data due to API error');
        return this.getMockCharacters();
      }
      
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return {
          info: { count: 0, pages: 0, next: null, prev: null },
          results: []
        };
      }
      
      throw new Error('Error fetching characters');
    }
  }

  async getCharacterById(id: number): Promise<Character> {
    try {
      console.log('Fetching character', id, 'from:', `${BASE_URL}/character/${id}`);
      const response = await this.api.get(`/character/${id}`);
      return CharacterAdapter.toDomain(response.data);
    } catch (error) {
      console.error(`Error fetching character ${id}:`, error);
      throw new Error(`Failed to fetch character ${id}`);
    }
  }

  async getEpisodes(episodeUrls: string[]): Promise<Episode[]> {
    try {
      if (!episodeUrls || episodeUrls.length === 0) return [];
      
      // Extraer IDs de manera segura
      const episodeIds = episodeUrls
        .map(url => {
          if (!url) return null;
          const parts = url.split('/');
          const id = parts[parts.length - 1];
          const numId = parseInt(id);
          return isNaN(numId) ? null : numId;
        })
        .filter((id): id is number => id !== null);
      
      console.log('Episode IDs to fetch:', episodeIds);
      
      if (episodeIds.length === 0) return [];
      
      // Para desarrollo, hacer peticiones individuales si falla la batch
      if (import.meta.env.DEV && episodeIds.length > 1) {
        const episodes: Episode[] = [];
        for (const id of episodeIds.slice(0, 5)) { // Limitar a 5 episodios
          try {
            const episode = await this.getEpisodeById(id);
            episodes.push(episode);
          } catch (error) {
            console.error(`Failed to fetch episode ${id}:`, error);
          }
        }
        return episodes;
      }
      
      // Intentar petición batch
      const url = `/episode/${episodeIds.slice(0, 10).join(',')}`; // Limitar a 10 episodios
      console.log('Fetching episodes from:', `${BASE_URL}${url}`);
      
      const response = await this.api.get<EpisodeApiData[] | EpisodeApiData>(url);
      const episodesData = Array.isArray(response.data) ? response.data : [response.data];
      
      return episodesData.map(CharacterAdapter.toEpisodeDomain);
    } catch (error) {
      console.error('Error fetching episodes:', error);
      
      // Datos mock para desarrollo
      if (import.meta.env.DEV) {
        console.warn('Using mock episodes data');
        return this.getMockEpisodes(episodeUrls.slice(0, 3));
      }
      
      return [];
    }
  }

  async getEpisodeById(id: number): Promise<Episode> {
    try {
      console.log('Fetching episode', id, 'from:', `${BASE_URL}/episode/${id}`);
      const response = await this.api.get<EpisodeApiData>(`/episode/${id}`);
      return CharacterAdapter.toEpisodeDomain(response.data);
    } catch (error) {
      console.error(`Error fetching episode ${id}:`, error);
      
      // Mock data para desarrollo
      if (import.meta.env.DEV) {
        console.warn(`Using mock data for episode ${id}`);
        return {
          id: id,
          name: `Episode ${id}`,
          air_date: 'January 1, 2023',
          episode: `S01E${id.toString().padStart(2, '0')}`,
          characters: [],
          url: `https://rickandmortyapi.com/api/episode/${id}`,
          created: new Date().toISOString()
        };
      }
      
      throw new Error(`Failed to fetch episode ${id}`);
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

  // Datos mock para desarrollo
  private getMockCharacters(): CharacterResponse {
    return {
      info: {
        count: 2,
        pages: 1,
        next: null,
        prev: null
      },
      results: [
        {
          id: 1,
          name: 'Rick Sanchez',
          status: 'Alive',
          species: 'Human',
          type: '',
          gender: 'Male',
          origin: { name: 'Earth (C-137)', url: '' },
          location: { name: 'Citadel of Ricks', url: '' },
          image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
          episode: ['https://rickandmortyapi.com/api/episode/1', 'https://rickandmortyapi.com/api/episode/2'],
          url: '',
          created: ''
        },
        {
          id: 2,
          name: 'Morty Smith',
          status: 'Alive',
          species: 'Human',
          type: '',
          gender: 'Male',
          origin: { name: 'unknown', url: '' },
          location: { name: 'Citadel of Ricks', url: '' },
          image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
          episode: ['https://rickandmortyapi.com/api/episode/1'],
          url: '',
          created: ''
        }
      ]
    };
  }

  private getMockEpisodes(episodeUrls: string[]): Episode[] {
    return episodeUrls.map((url, index) => {
      const id = index + 1;
      return {
        id: id,
        name: `Mock Episode ${id}`,
        air_date: `January ${id}, 2023`,
        episode: `S01E${id.toString().padStart(2, '0')}`,
        characters: [],
        url: url,
        created: new Date().toISOString()
      };
    });
  }
}