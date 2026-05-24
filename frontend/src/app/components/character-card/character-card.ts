import { Component, input, computed } from '@angular/core';
import { Character } from '../../models/character.model';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-character-card',
  imports: [CardModule, TagModule, DividerModule],
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
