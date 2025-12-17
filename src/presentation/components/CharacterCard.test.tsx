import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CharacterCard } from './CharacterCard';
import { Character } from '../../core/entities/character.entity';

describe('CharacterCard', () => {
  const mockCharacter: Character = {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: { name: 'Earth (C-137)', url: 'https://...' },
    location: { name: 'Citadel of Ricks', url: 'https://...' },
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    episode: ['https://.../episode/1'],
    url: 'https://...',
    created: '2017-11-04T18:48:46.250Z'
  };

  const mockOnClick = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders character information correctly', () => {
    render(<CharacterCard character={mockCharacter} onClick={mockOnClick} />);
    
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByAltText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Human')).toBeInTheDocument();
    expect(screen.getByText('Alive')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    render(<CharacterCard character={mockCharacter} onClick={mockOnClick} />);
    
    const card = screen.getByTestId('character-card') || 
                 screen.getByRole('button', { name: /rick sanchez/i });
    fireEvent.click(card);
    
    expect(mockOnClick).toHaveBeenCalledTimes(1);
    expect(mockOnClick).toHaveBeenCalledWith(mockCharacter);
  });

  describe('Status indicators', () => {
    it('shows green dot for Alive status', () => {
      render(<CharacterCard character={mockCharacter} onClick={mockOnClick} />);
      
      const statusContainer = screen.getByText('Alive').closest('div');
      const dotElement = statusContainer?.querySelector('.bg-green-500');
      
      expect(dotElement).toBeInTheDocument();
    });

    it('shows red dot for Dead status', () => {
      const deadCharacter = { ...mockCharacter, status: 'Dead' as const };
      render(<CharacterCard character={deadCharacter} onClick={mockOnClick} />);
      
      const statusContainer = screen.getByText('Dead').closest('div');
      const dotElement = statusContainer?.querySelector('.bg-red-500');
      
      expect(dotElement).toBeInTheDocument();
    });

    it('shows gray dot for unknown status', () => {
      const unknownCharacter = { ...mockCharacter, status: 'unknown' as const };
      render(<CharacterCard character={unknownCharacter} onClick={mockOnClick} />);
      
      const statusContainer = screen.getByText('unknown').closest('div');
      const dotElement = statusContainer?.querySelector('.bg-gray-500');
      
      expect(dotElement).toBeInTheDocument();
    });
  });
});