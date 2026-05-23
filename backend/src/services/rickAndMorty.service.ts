import axios, { AxiosError } from 'axios';
import { Character, CharacterFilters, CharactersResponse } from '../types/character.types';

const BASE_URL = 'https://rickandmortyapi.com/api';

export class RickAndMortyService {
  async getCharacters(filters: CharacterFilters): Promise<CharactersResponse> {
    const params = new URLSearchParams();
    if (filters.name) params.set('name', filters.name);
    if (filters.status) params.set('status', filters.status);
    if (filters.species) params.set('species', filters.species);
    if (filters.gender) params.set('gender', filters.gender);
    if (filters.page) params.set('page', String(filters.page));

    const response = await axios.get<CharactersResponse>(
      `${BASE_URL}/character?${params.toString()}`
    );
    return response.data;
  }

  async getCharacterById(id: number): Promise<Character> {
    const response = await axios.get<Character>(`${BASE_URL}/character/${id}`);
    return response.data;
  }

  isNotFoundError(error: unknown): boolean {
    return error instanceof AxiosError && error.response?.status === 404;
  }
}

export const rickAndMortyService = new RickAndMortyService();
