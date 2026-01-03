import { Entity } from './Entity';
import { Position } from '../types/Position';
import { Action } from '../core/Input';
import { World } from '../world/World';
import { Item } from './Item';

const PLAYER_STATS = {
  maxHp: 10,
  attack: 2,
};

export class Player extends Entity {
  constructor(position: Position) {
    super(position, '#e8c170', 'player', PLAYER_STATS);
  }

  act(action: Action, world: World): void {
    const delta = this.actionToDelta(action);
    const newX = this.position.x + delta.x;
    const newY = this.position.y + delta.y;

    // Check for enemy at target position
    const target = world.getEntityAt(newX, newY);
    if (target && target !== this) {
      // Attack the enemy
      target.takeDamage(this.attack);
      return;
    }

    // Move if not blocked by wall
    if (world.tileMap.isWalkable(newX, newY)) {
      this.position.x = newX;
      this.position.y = newY;

      // Check for item at new position
      const item = world.getItemAt(newX, newY);
      if (item) {
        this.pickupItem(item, world);
      }
    }
  }

  private pickupItem(item: Item, world: World): void {
    const effect = item.effect;

    // Apply healing
    if (effect.heal) {
      this.hp = Math.min(this.maxHp, this.hp + effect.heal);
    }

    // Apply attack boost
    if (effect.attackBoost) {
      this.attack += effect.attackBoost;
    }

    // Remove item from world
    world.removeItem(item);
  }

  private actionToDelta(action: Action): Position {
    switch (action) {
      case 'move_up':
        return { x: 0, y: -1 };
      case 'move_down':
        return { x: 0, y: 1 };
      case 'move_left':
        return { x: -1, y: 0 };
      case 'move_right':
        return { x: 1, y: 0 };
      case 'wait':
      default:
        return { x: 0, y: 0 };
    }
  }
}
