import React, { useEffect, useState } from 'react';
import { Character } from '../../core/entities/character.entity';
import { CharacterCard } from '../components/CharacterCard';
import { Pagination } from '../components/Pagination';
import { CharacterModal } from '../components/CharacterModal';
import { SearchBar } from '../components/SearchBar';
import { useCharacters } from '../hooks/useCharacters';

export const HomePage: React.FC = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  
  const {
    characters,
    loading,
    error,
    pagination,
    fetchCharacters,
    fetchCharacterEpisodes
  } = useCharacters();

  // Debounce para la búsqueda
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Cargar personajes cuando cambia la página o la búsqueda
  useEffect(() => {
    fetchCharacters({
      page: pagination.currentPage,
      name: debouncedQuery || undefined
    });
  }, [pagination.currentPage, debouncedQuery, fetchCharacters]);

  const handlePageChange = (page: number) => {
    fetchCharacters({ page, name: debouncedQuery || undefined });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Resetear a página 1 al buscar
    if (pagination.currentPage !== 1) {
      handlePageChange(1);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <div className="text-6xl mb-4">😞</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => fetchCharacters({ page: 1 })}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center gap-6">
            <h1 className="text-4xl font-bold text-center text-gray-900">
              Rick & Morty Explorer
            </h1>
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {loading && characters.length === 0 ? (
          <div className="flex justify-center items-center min-h-[60vh]">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Loading characters...</p>
            </div>
          </div>
        ) : characters.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🤔</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No characters found</h2>
            <p className="text-gray-600">
              {debouncedQuery 
                ? `No results for "${debouncedQuery}". Try a different search.`
                : 'No characters available at the moment.'}
            </p>
          </div>
        ) : (
          <>
            {/* Grid de Personajes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
              {characters.map((character) => (
                <CharacterCard
                  key={character.id}
                  character={character}
                  onClick={setSelectedCharacter}
                />
              ))}
            </div>

            {/* Paginación */}
            {pagination.totalPages > 1 && (
              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                hasNext={pagination.hasNext}
                hasPrev={pagination.hasPrev}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </main>

      {/* Modal */}
      <CharacterModal
        character={selectedCharacter}
        isOpen={!!selectedCharacter}
        onClose={() => setSelectedCharacter(null)}
        fetchEpisodes={fetchCharacterEpisodes}
      />

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            Data provided by{' '}
            <a 
              href="https://rickandmortyapi.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline"
            >
              Rick and Morty API
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};