import { Tile, TILE_REGISTRY } from './Tile';
import { Position } from '../types/Position';
import { ItemType } from '../entities/Item';

export interface ItemSpawn {
  position: Position;
  type: ItemType;
}

export interface MapData {
  width: number;
  height: number;
  tiles: number[];
  playerStart: Position;
  enemySpawns: Position[];
  itemSpawns: ItemSpawn[];
}

export class TileMap {
  public readonly width: number;
  public readonly height: number;
  public readonly playerStart: Position;
  public readonly enemySpawns: Position[];
  public readonly itemSpawns: ItemSpawn[];
  private tiles: Tile[];

  constructor(data: MapData) {
    this.width = data.width;
    this.height = data.height;
    this.playerStart = data.playerStart;
    this.enemySpawns = data.enemySpawns;
    this.itemSpawns = data.itemSpawns;
    this.tiles = data.tiles.map((id) => TILE_REGISTRY[id]);
  }

  getTile(x: number, y: number): Tile {
    if (x < 0 || y < 0 || x >= this.width || y >= this.height) {
      return TILE_REGISTRY[1]; // Return wall for out of bounds
    }
    return this.tiles[y * this.width + x];
  }

  isWalkable(x: number, y: number): boolean {
    return this.getTile(x, y).walkable;
  }
}
