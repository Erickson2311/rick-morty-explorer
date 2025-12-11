import { Character, Episode } from '../../core/entities/character.entity';
import { CharacterApiData, EpisodeApiData } from '../dto/character.dto';

export class CharacterAdapter {
  static toDomain(apiData: CharacterApiData): Character {
    return {
      id: apiData.id,
      name: apiData.name,
      status: apiData.status as 'Alive' | 'Dead' | 'unknown',
      species: apiData.species,
      type: apiData.type,
      gender: apiData.gender as 'Female' | 'Male' | 'Genderless' | 'unknown',
      origin: apiData.origin,
      location: apiData.location,
      image: apiData.image,
      episode: apiData.episode,
      url: apiData.url,
      created: apiData.created
    };
  }

  static toEpisodeDomain(apiData: EpisodeApiData): Episode {
    return {
      id: apiData.id,
      name: apiData.name,
      air_date: apiData.air_date,
      episode: apiData.episode,
      characters: apiData.characters,
      url: apiData.url,
      created: apiData.created
    };
  }
}