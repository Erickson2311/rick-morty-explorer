import React, { useEffect, useState } from 'react';
import { Character, Episode } from '../../core/entities/character.entity';

interface CharacterModalProps {
  character: Character | null;
  isOpen: boolean;
  onClose: () => void;
  fetchEpisodes: (episodeUrls: string[]) => Promise<Episode[]>;
}

export const CharacterModal: React.FC<CharacterModalProps> = ({
  character,
  isOpen,
  onClose,
  fetchEpisodes
}) => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loadingEpisodes, setLoadingEpisodes] = useState(false);

  useEffect(() => {
    if (character && isOpen) {
      setLoadingEpisodes(true);
      fetchEpisodes(character.episode.slice(0, 5)) // Limitar a primeros 5 episodios por rendimiento
        .then(setEpisodes)
        .finally(() => setLoadingEpisodes(false));
    }
  }, [character, isOpen, fetchEpisodes]);

  if (!isOpen || !character) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Alive': return 'text-green-600';
      case 'Dead': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-3xl font-bold text-gray-900">{character.name}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Columna izquierda: Imagen e información básica */}
            <div className="md:col-span-1">
              <img
                src={character.image}
                alt={character.name}
                className="w-full h-auto rounded-lg shadow-md"
              />
              
              <div className="mt-6 space-y-4">
                <div>
                  <h3 className="font-bold text-gray-700 mb-2">Status</h3>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(character.status).replace('text', 'bg')}`} />
                    <span className={`font-semibold ${getStatusColor(character.status)}`}>
                      {character.status}
                    </span>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-bold text-gray-700 mb-2">Species</h3>
                  <p className="text-gray-900">{character.species}</p>
                </div>
                
                <div>
                  <h3 className="font-bold text-gray-700 mb-2">Gender</h3>
                  <p className="text-gray-900 capitalize">{character.gender}</p>
                </div>
              </div>
            </div>
            
            {/* Columna derecha: Información detallada */}
            <div className="md:col-span-2 space-y-6">
              {/* Origen y Localización */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-bold text-gray-700 mb-2">Origin</h3>
                  <p className="text-gray-900">{character.origin.name}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-bold text-gray-700 mb-2">Location</h3>
                  <p className="text-gray-900">{character.location.name}</p>
                </div>
              </div>
              
              {/* Episodios */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold text-gray-700 mb-4">Recent Episodes</h3>
                
                {loadingEpisodes ? (
                  <div className="text-center py-4">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <p className="mt-2 text-gray-600">Loading episodes...</p>
                  </div>
                ) : episodes.length === 0 ? (
                  <p className="text-gray-600 text-center py-4">No episodes found</p>
                ) : (
                  <ul className="space-y-2 max-h-60 overflow-y-auto">
                    {episodes.map((episode) => (
                      <li key={episode.id} className="bg-white p-3 rounded shadow-sm">
                        <div className="font-medium text-gray-900">{episode.name}</div>
                        <div className="text-sm text-blue-600 font-semibold">{episode.episode}</div>
                        <div className="text-xs text-gray-500">Air date: {episode.air_date}</div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};