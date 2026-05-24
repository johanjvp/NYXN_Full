import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  imports: [],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css',
})
export class SearchBar {
  placeholder = input('Buscar personaje...');
  value = input('');
  searched = output<Event>();

  onInput(event: Event): void {
    this.searched.emit(event);
  }
}
