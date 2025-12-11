import { useState, useEffect, useCallback } from 'react';
import { Character, Episode } from '../../core/entities/character.entity';
import { CharacterFilters } from '../../core/repositories/character.repository';
import { CharacterRepositoryImpl } from '../../data/repositories/character.repository.impl';

export const useCharacters = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 0,
    hasNext: false,
    hasPrev: false
  });

  const repository = new CharacterRepositoryImpl();

  const fetchCharacters = useCallback(async (filters?: CharacterFilters) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await repository.getCharacters({
        ...filters,
        page: filters?.page || 1
      });
      
      setCharacters(response.results);
      setPagination({
        currentPage: filters?.page || 1,
        totalPages: response.info.pages,
        hasNext: !!response.info.next,
        hasPrev: !!response.info.prev
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setCharacters([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCharacterEpisodes = useCallback(async (episodeUrls: string[]): Promise<Episode[]> => {
    try {
      return await repository.getEpisodes(episodeUrls);
    } catch (err) {
      console.error('Error fetching episodes:', err);
      return [];
    }
  }, []);

  return {
    characters,
    loading,
    error,
    pagination,
    fetchCharacters,
    fetchCharacterEpisodes
  };
};