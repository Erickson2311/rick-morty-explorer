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
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer transform hover:-translate-y-1"
      onClick={() => onClick(character)}
    >
      <div className="relative">
        <img 
          src={character.image} 
          alt={character.name}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
        <div className="absolute top-2 right-2 flex items-center gap-2 bg-black/70 text-white px-2 py-1 rounded-full">
          <div className={`w-2 h-2 rounded-full ${getStatusColor(character.status)}`} />
          <span className="text-sm font-medium">{character.status}</span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 truncate">{character.name}</h3>
        <div className="mt-2 space-y-1">
          <div className="flex items-center text-sm text-gray-600">
            <span className="font-medium">Species:</span>
            <span className="ml-2">{character.species}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <span className="font-medium">Gender:</span>
            <span className="ml-2 capitalize">{character.gender}</span>
          </div>
        </div>
      </div>
    </div>
  );
};