import { MapData } from './TileMap';
import { TileType } from './Tile';
import { MAP_WIDTH, MAP_HEIGHT } from '../constants';

const W = TileType.WALL;
const F = TileType.FLOOR;
const S = TileType.STAIRS;

function createTiles(layout: number[][]): number[] {
  return layout.flat();
}

// Level 1: Simple starting room
function generateLevel1(): MapData {
  const tiles: number[] = [];

  for (let y = 0; y < MAP_HEIGHT; y++) {
    for (let x = 0; x < MAP_WIDTH; x++) {
      // Walls on edges
      if (x === 0 || x === MAP_WIDTH - 1 || y === 0 || y === MAP_HEIGHT - 1) {
        tiles.push(W);
      }
      // Interior walls
      else if (x === 5 && y > 2 && y < 8) {
        tiles.push(W);
      } else if (x === 14 && y > 6 && y < 12) {
        tiles.push(W);
      } else if (y === 7 && x > 7 && x < 12) {
        tiles.push(W);
      }
      // Stairs in corner
      else if (x === 17 && y === 12) {
        tiles.push(S);
      } else {
        tiles.push(F);
      }
    }
  }

  return {
    width: MAP_WIDTH,
    height: MAP_HEIGHT,
    tiles,
    playerStart: { x: 3, y: 3 },
    enemySpawns: [
      { x: 16, y: 3 },
      { x: 10, y: 11 },
    ],
    itemSpawns: [
      { position: { x: 8, y: 3 }, type: 'health_potion' },
      { position: { x: 15, y: 10 }, type: 'sword' },
      { position: { x: 3, y: 12 }, type: 'health_potion' },
    ],
  };
}

// Level 2: Corridor maze
function generateLevel2(): MapData {
  const tiles: number[] = [];

  for (let y = 0; y < MAP_HEIGHT; y++) {
    for (let x = 0; x < MAP_WIDTH; x++) {
      // Walls on edges
      if (x === 0 || x === MAP_WIDTH - 1 || y === 0 || y === MAP_HEIGHT - 1) {
        tiles.push(W);
      }
      // Vertical walls creating corridors
      else if (x === 6 && y < 10) {
        tiles.push(W);
      } else if (x === 13 && y > 4) {
        tiles.push(W);
      }
      // Horizontal walls
      else if (y === 5 && x > 1 && x < 6) {
        tiles.push(W);
      } else if (y === 10 && x > 13 && x < 18) {
        tiles.push(W);
      }
      // Stairs
      else if (x === 2 && y === 12) {
        tiles.push(S);
      } else {
        tiles.push(F);
      }
    }
  }

  return {
    width: MAP_WIDTH,
    height: MAP_HEIGHT,
    tiles,
    playerStart: { x: 17, y: 2 },
    enemySpawns: [
      { x: 3, y: 3 },
      { x: 10, y: 7 },
      { x: 16, y: 12 },
    ],
    itemSpawns: [
      { position: { x: 3, y: 8 }, type: 'health_potion' },
      { position: { x: 17, y: 7 }, type: 'sword' },
    ],
  };
}

// Level 3: Final challenge
function generateLevel3(): MapData {
  const tiles: number[] = [];

  for (let y = 0; y < MAP_HEIGHT; y++) {
    for (let x = 0; x < MAP_WIDTH; x++) {
      // Walls on edges
      if (x === 0 || x === MAP_WIDTH - 1 || y === 0 || y === MAP_HEIGHT - 1) {
        tiles.push(W);
      }
      // Central arena with pillars
      else if ((x === 5 || x === 14) && (y === 4 || y === 10)) {
        tiles.push(W);
      } else if ((x === 8 || x === 11) && y === 7) {
        tiles.push(W);
      }
      // Small rooms in corners
      else if (x === 4 && y > 0 && y < 4) {
        tiles.push(W);
      } else if (x === 15 && y > 10 && y < 14) {
        tiles.push(W);
      }
      // Final stairs (escape!)
      else if (x === 10 && y === 7) {
        tiles.push(S);
      } else {
        tiles.push(F);
      }
    }
  }

  return {
    width: MAP_WIDTH,
    height: MAP_HEIGHT,
    tiles,
    playerStart: { x: 2, y: 2 },
    enemySpawns: [
      { x: 17, y: 2 },
      { x: 17, y: 12 },
      { x: 2, y: 12 },
      { x: 10, y: 10 },
    ],
    itemSpawns: [
      { position: { x: 5, y: 7 }, type: 'health_potion' },
      { position: { x: 14, y: 7 }, type: 'health_potion' },
    ],
  };
}

export const LEVELS: MapData[] = [
  generateLevel1(),
  generateLevel2(),
  generateLevel3(),
];

export const TOTAL_LEVELS = LEVELS.length;
