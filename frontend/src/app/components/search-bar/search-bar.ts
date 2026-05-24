import { Component, input, output } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-search-bar',
  imports: [InputTextModule, IconFieldModule, InputIconModule, ButtonModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css',
})
export class SearchBar {
  placeholder = input('Buscar personaje...');
  value = input('');
  searched = output<Event>();
  cleared = output<void>();

  onInput(event: Event): void {
    this.searched.emit(event);
  }

  onClear(): void {
    this.cleared.emit();
  }
}
