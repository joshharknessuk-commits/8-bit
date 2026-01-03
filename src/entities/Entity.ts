import { Position } from '../types/Position';

export interface EntityStats {
  maxHp: number;
  attack: number;
}

export abstract class Entity {
  public position: Position;
  public color: string;
  public spriteKey: string;
  public hp: number;
  public maxHp: number;
  public attack: number;

  constructor(position: Position, color: string, spriteKey: string, stats: EntityStats) {
    this.position = { ...position };
    this.color = color;
    this.spriteKey = spriteKey;
    this.hp = stats.maxHp;
    this.maxHp = stats.maxHp;
    this.attack = stats.attack;
  }

  takeDamage(amount: number): void {
    this.hp = Math.max(0, this.hp - amount);
  }

  get isAlive(): boolean {
    return this.hp > 0;
  }
}
