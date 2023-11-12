import { v4 } from 'uuid';

export function createCardStack<T>(card: T, count: number): Array<T> {
  return Array.from({ length: count }, () => ({ ...card, id: v4() }));
}
