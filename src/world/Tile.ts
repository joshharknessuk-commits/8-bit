export interface Tile {
  id: number;
  name: string;
  color: string;
  walkable: boolean;
}

export const TileType = {
  FLOOR: 0,
  WALL: 1,
  STAIRS: 2,
} as const;

export const TILE_REGISTRY: Record<number, Tile> = {
  [TileType.FLOOR]: {
    id: TileType.FLOOR,
    name: 'floor',
    color: '#2d2d44',
    walkable: true,
  },
  [TileType.WALL]: {
    id: TileType.WALL,
    name: 'wall',
    color: '#4a4a6a',
    walkable: false,
  },
  [TileType.STAIRS]: {
    id: TileType.STAIRS,
    name: 'stairs',
    color: '#6a5a3a',
    walkable: true,
  },
};
