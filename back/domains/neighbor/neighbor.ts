import { NeighborCardData } from '../../contracts/card.js';
import { Card } from '../card/card.js';

export class NeighborCard extends Card<NeighborCardData> {
  isActivableSetter(): void {
    this.data.isActivable=true;
  }
}