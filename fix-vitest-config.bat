@echo off
echo 🔧 Corrigiendo configuración de Vitest...
echo.


echo 📝 Actualizando vite.config.ts...
(
echo import { defineConfig } from 'vite';
echo import react from '@vitejs/plugin-react';
echo.
echo export default defineConfig({
echo   plugins: [react()],
echo   test: {
echo     globals: true,          // ¡IMPORTANTE! Expone describe, it, expect, beforeEach, etc.
echo     environment: 'jsdom',
echo     setupFiles: './src/test/setup.ts',
echo     css: true,
echo   },
echo });
) > vite.config.ts


if not exist src\test mkdir src\test
echo 📝 Creando/Actualizando setup.ts...
(
echo import '@testing-library/jest-dom/vitest';
echo import { beforeEach, afterEach, vi } from 'vitest';
echo import { cleanup } from '@testing-library/react';
echo.
echo // Configuración global para tests
echo beforeEach(() => {
echo   // Configuraciones previas a cada test
echo });
echo.
echo afterEach(() => {
echo   cleanup();
echo   vi.clearAllMocks();
echo });
) > src\test\setup.ts


echo 📝 Creando versión temporal del test...
if exist src\presentation\components\CharacterCard.test.tsx (
    (
    echo import { describe, it, expect, vi } from 'vitest';
    echo import { render, screen, fireEvent } from '@testing-library/react';
    echo import { CharacterCard } from './CharacterCard';
    echo import { Character } from '../../core/entities/character.entity';
    echo.
    echo describe('CharacterCard', () => {
    echo   const mockCharacter: Character = {
    echo     id: 1,
    echo     name: 'Rick Sanchez',
    echo     status: 'Alive',
    echo     species: 'Human',
    echo     type: '',
    echo     gender: 'Male',
    echo     origin: { name: 'Earth (C-137)', url: '' },
    echo     location: { name: 'Citadel of Ricks', url: '' },
    echo     image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    echo     episode: [],
    echo     url: '',
    echo     created: ''
    echo   };
    echo.
    echo   it('renders character information', () => {
    echo     const mockOnClick = vi.fn();
    echo     render((^<CharacterCard character={mockCharacter} onClick={mockOnClick} /^>));
    echo     expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    echo   });
    echo.
    echo   it('calls onClick when clicked', () => {
    echo     const mockOnClick = vi.fn();
    echo     render((^<CharacterCard character={mockCharacter} onClick={mockOnClick} /^>));
    echo     const card = screen.getByTestId('character-card') || screen.getByRole('button');
    echo     fireEvent.click(card);
    echo     expect(mockOnClick).toHaveBeenCalledWith(mockCharacter);
    echo   });
    echo.
    echo   it('shows green dot for Alive status', () => {
    echo     const mockOnClick = vi.fn();
    echo     render((^<CharacterCard character={mockCharacter} onClick={mockOnClick} /^>));
    echo     const dot = document.querySelector('.bg-green-500');
    echo     expect(dot).toBeInTheDocument();
    echo   });
    echo });
    ) > src\presentation\components\CharacterCard.test.tsx
)

echo.
echo ✅ Configuración actualizada!
echo.
echo Ejecuta: npm test
echo.
pause