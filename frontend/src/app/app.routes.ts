import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/characters/characters').then((m) => m.CharactersPage),
  },
  { path: '**', redirectTo: '' },
];
