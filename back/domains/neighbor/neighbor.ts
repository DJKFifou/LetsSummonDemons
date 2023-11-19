import { CardFilter, NeighborCardData } from '../../contracts/card.js';
import { Card } from '../card/card.js';

export class NeighborCard extends Card<NeighborCardData> {
  isActivableSetter(): void {
    this.data.isActivable=true;
  }
  
  passFilter(filter: CardFilter): boolean {
    if (!super.passFilter(filter)) {
      return false;
    }

    if (
      filter.neighborTypes &&
      !filter.neighborTypes.includes(this.data.neighborType)
    ) {
      return false;
    }

    if (
      filter.neighborKindnesses &&
      !filter.neighborKindnesses.includes(this.data.neighborKindness)
    ) {
      return false;
    }

    return true;
  }
}
