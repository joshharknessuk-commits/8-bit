import { Entity } from './Entity';
import { Position } from '../types/Position';
import { World } from '../world/World';

const ENEMY_STATS = {
  maxHp: 3,
  attack: 1,
};

export class Enemy extends Entity {
  constructor(position: Position) {
    super(position, '#4a9c4a', 'enemy', ENEMY_STATS);
  }

  act(world: World): void {
    if (!this.isAlive) return;

    const target = world.player.position;

    // Calculate direction to player
    const dx = Math.sign(target.x - this.position.x);
    const dy = Math.sign(target.y - this.position.y);

    // Check if adjacent to player - attack instead of move
    if (this.isAdjacentTo(world.player.position)) {
      world.player.takeDamage(this.attack);
      return;
    }

    // Try horizontal movement first
    if (dx !== 0 && !world.isBlocked(this.position.x + dx, this.position.y)) {
      this.position.x += dx;
      return;
    }

    // Try vertical movement
    if (dy !== 0 && !world.isBlocked(this.position.x, this.position.y + dy)) {
      this.position.y += dy;
      return;
    }
  }

  private isAdjacentTo(pos: Position): boolean {
    const dx = Math.abs(this.position.x - pos.x);
    const dy = Math.abs(this.position.y - pos.y);
    return (dx === 1 && dy === 0) || (dx === 0 && dy === 1);
  }
}
