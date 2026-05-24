import { Component, input, computed } from '@angular/core';
import { Character } from '../../models/character.model';

@Component({
  selector: 'app-character-card',
  imports: [],
  templateUrl: './character-card.html',
  styleUrl: './character-card.css',
})
export class CharacterCard {
  character = input.required<Character>();

  statusClass = computed(() => {
    const map: Record<string, string> = {
      Alive: 'status--alive',
      Dead: 'status--dead',
      unknown: 'status--unknown',
    };
    return map[this.character().status] ?? 'status--unknown';
  });
}
