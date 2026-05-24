import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { debounceTime, distinctUntilChanged, Subject, switchMap, catchError, of, tap, finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { CharacterService } from '../../services/character.service';
import { Character, ApiInfo } from '../../models/character.model';
import { SearchBar } from '../../components/search-bar/search-bar';
import { CharacterCard } from '../../components/character-card/character-card';

@Component({
  selector: 'app-characters',
  imports: [SearchBar, CharacterCard, DecimalPipe, ProgressSpinnerModule, ButtonModule],
  templateUrl: './characters.html',
  styleUrl: './characters.css',
})
export class CharactersPage implements OnInit {
  private readonly characterService = inject(CharacterService);

  characters = signal<Character[]>([]);
  info = signal<ApiInfo | null>(null);
  loading = signal(false);
  error = signal<string | null>(null);
  searchTerm = signal('');
  currentPage = signal(1);

  totalPages = computed(() => this.info()?.pages ?? 1);
  hasPrev = computed(() => this.currentPage() > 1);
  hasNext = computed(() => this.currentPage() < this.totalPages());

  private readonly search$ = new Subject<string>();

  constructor() {
    this.search$
      .pipe(
        debounceTime(350),
        distinctUntilChanged(),
        tap(() => { this.currentPage.set(1); this.loading.set(true); this.error.set(null); }),
        switchMap((name) =>
          this.characterService.getCharacters({ name: name || undefined, page: 1 }).pipe(
            catchError((err) => {
              this.error.set(err.status === 404 ? 'No se encontraron personajes.' : 'Error al cargar los personajes.');
              this.characters.set([]);
              this.info.set(null);
              return of(null);
            }),
            finalize(() => this.loading.set(false))
          )
        ),
        takeUntilDestroyed()
      )
      .subscribe((res) => {
        if (res) {
          this.characters.set(res.results);
          this.info.set(res.info);
        }
      });
  }

  ngOnInit(): void {
    this.load(1);
  }

  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm.set(value);
    this.search$.next(value);
  }

  goToPage(page: number): void {
    this.currentPage.set(page);
    this.load(page);
  }

  private load(page: number): void {
    this.loading.set(true);
    this.error.set(null);

    this.characterService
      .getCharacters({ name: this.searchTerm() || undefined, page })
      .pipe(
        catchError((err) => {
          this.error.set(err.status === 404 ? 'No se encontraron personajes.' : 'Error al cargar los personajes.');
          this.characters.set([]);
          this.info.set(null);
          return of(null);
        }),
        finalize(() => this.loading.set(false))
      )
      .subscribe((res) => {
        if (res) {
          this.characters.set(res.results);
          this.info.set(res.info);
        }
      });
  }
}
