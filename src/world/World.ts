import { TileMap, MapData } from './TileMap';
import { TileType } from './Tile';
import { Entity } from '../entities/Entity';
import { Player } from '../entities/Player';
import { Enemy } from '../entities/Enemy';
import { Item } from '../entities/Item';

export class World {
  public tileMap!: TileMap;
  public player!: Player;
  public enemies: Enemy[] = [];
  public entities: Entity[] = [];
  public items: Item[] = [];

  loadMap(mapData: MapData, existingPlayer?: Player): void {
    this.tileMap = new TileMap(mapData);

    if (existingPlayer) {
      // Preserve player stats, update position
      this.player = existingPlayer;
      this.player.position = { ...this.tileMap.playerStart };
    } else {
      this.player = new Player(this.tileMap.playerStart);
    }

    this.enemies = this.tileMap.enemySpawns.map((pos) => new Enemy(pos));
    this.items = this.tileMap.itemSpawns.map(
      (spawn) => new Item(spawn.position, spawn.type)
    );
    this.entities = [this.player, ...this.enemies];
  }

  isPlayerOnStairs(): boolean {
    const tile = this.tileMap.getTile(this.player.position.x, this.player.position.y);
    return tile.id === TileType.STAIRS;
  }

  isBlocked(x: number, y: number): boolean {
    // Check map walkability
    if (!this.tileMap.isWalkable(x, y)) {
      return true;
    }

    // Check entity collision
    if (this.getEntityAt(x, y)) {
      return true;
    }

    return false;
  }

  getEntityAt(x: number, y: number): Entity | undefined {
    return this.entities.find(
      (entity) => entity.position.x === x && entity.position.y === y
    );
  }

  removeDeadEnemies(): void {
    this.enemies = this.enemies.filter((enemy) => enemy.isAlive);
    this.entities = [this.player, ...this.enemies];
  }

  getItemAt(x: number, y: number): Item | undefined {
    return this.items.find(
      (item) => item.position.x === x && item.position.y === y
    );
  }

  removeItem(item: Item): void {
    this.items = this.items.filter((i) => i !== item);
  }
}
