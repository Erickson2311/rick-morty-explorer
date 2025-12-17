import React from 'react';
import { Character } from '../../core/entities/character.entity';

interface CharacterCardProps {
  character: Character;
  onClick: (character: Character) => void;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ character, onClick }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Alive': return 'bg-green-500';
      case 'Dead': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div 
      role="article"
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer transform hover:-translate-y-1"
      onClick={() => onClick(character)}
      data-testid="character-card"
    >
      <div className="relative">
        <img 
          src={character.image} 
          alt={character.name}
          className="w-full h-48 object-cover"
          loading="lazy"
          data-testid="character-image"
        />
        <div className="absolute top-2 right-2 flex items-center gap-2 bg-black/70 text-white px-2 py-1 rounded-full" data-testid="status-container">
          <div 
            className={`w-2 h-2 rounded-full ${getStatusColor(character.status)}`}
            data-testid="status-dot"
          />
          <span className="text-sm font-medium" data-testid="status-text">{character.status}</span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 truncate" data-testid="character-name">{character.name}</h3>
        <div className="mt-2 space-y-1">
          <div className="flex items-center text-sm text-gray-600">
            <span className="font-medium">Especie:</span>
            <span className="ml-2" data-testid="character-species">{character.species}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <span className="font-medium">Genero:</span>
            <span className="ml-2 capitalize">{character.gender}</span>
          </div>
        </div>
      </div>
    </div>
  );
};