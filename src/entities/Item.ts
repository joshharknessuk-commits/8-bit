import { Position } from '../types/Position';

export type ItemType = 'health_potion' | 'sword';

export interface ItemDefinition {
  type: ItemType;
  name: string;
  color: string;
  effect: {
    heal?: number;
    attackBoost?: number;
  };
}

export const ITEM_DEFINITIONS: Record<ItemType, ItemDefinition> = {
  health_potion: {
    type: 'health_potion',
    name: 'Health Potion',
    color: '#c44',
    effect: { heal: 5 },
  },
  sword: {
    type: 'sword',
    name: 'Sword',
    color: '#aaa',
    effect: { attackBoost: 1 },
  },
};

export class Item {
  public position: Position;
  public definition: ItemDefinition;

  constructor(position: Position, type: ItemType) {
    this.position = { ...position };
    this.definition = ITEM_DEFINITIONS[type];
  }

  get name(): string {
    return this.definition.name;
  }

  get color(): string {
    return this.definition.color;
  }

  get effect(): ItemDefinition['effect'] {
    return this.definition.effect;
  }
}
