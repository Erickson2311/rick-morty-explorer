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

  it('renders character information correctly', () => {
    render(<CharacterCard character={mockCharacter} onClick={mockOnClick} />);
    
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Species:')).toBeInTheDocument();
    expect(screen.getByText('Human')).toBeInTheDocument();
    expect(screen.getByText('Alive')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    render(<CharacterCard character={mockCharacter} onClick={mockOnClick} />);
    
    const card = screen.getByText('Rick Sanchez').closest('div');
    fireEvent.click(card!);
    
    expect(mockOnClick).toHaveBeenCalledWith(mockCharacter);
  });

  it('shows correct status color for Alive status', () => {
    render(<CharacterCard character={mockCharacter} onClick={mockOnClick} />);
    
    const statusIndicator = screen.getByText('Alive').previousSibling;
    expect(statusIndicator).toHaveClass('bg-green-500');
  });

  it('shows correct status color for Dead status', () => {
    const deadCharacter = { ...mockCharacter, status: 'Dead' as const };
    render(<CharacterCard character={deadCharacter} onClick={mockOnClick} />);
    
    const statusIndicator = screen.getByText('Dead').previousSibling;
    expect(statusIndicator).toHaveClass('bg-red-500');
  });
});