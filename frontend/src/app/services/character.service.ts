import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Character, CharacterFilters, CharactersResponse } from '../models/character.model';

const API_BASE = 'http://localhost:3000/api';

@Injectable({ providedIn: 'root' })
export class CharacterService {
  private readonly http = inject(HttpClient);

  getCharacters(filters: CharacterFilters = {}): Observable<CharactersResponse> {
    let params = new HttpParams();
    if (filters.name) params = params.set('name', filters.name);
    if (filters.status) params = params.set('status', filters.status);
    if (filters.page) params = params.set('page', String(filters.page));

    return this.http.get<CharactersResponse>(`${API_BASE}/characters`, { params });
  }

  getCharacterById(id: number): Observable<Character> {
    return this.http.get<Character>(`${API_BASE}/characters/${id}`);
  }
}
