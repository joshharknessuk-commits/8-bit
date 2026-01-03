import { MapData } from './TileMap';
import { TileType } from './Tile';
import { MAP_WIDTH, MAP_HEIGHT } from '../constants';

const W = TileType.WALL;
const F = TileType.FLOOR;

// Create a simple dungeon room
function generateTestMap(): MapData {
  const tiles: number[] = [];

  for (let y = 0; y < MAP_HEIGHT; y++) {
    for (let x = 0; x < MAP_WIDTH; x++) {
      // Walls on edges
      if (x === 0 || x === MAP_WIDTH - 1 || y === 0 || y === MAP_HEIGHT - 1) {
        tiles.push(W);
      }
      // Some interior walls for interest
      else if (x === 5 && y > 2 && y < 8) {
        tiles.push(W);
      } else if (x === 14 && y > 6 && y < 12) {
        tiles.push(W);
      } else if (y === 7 && x > 7 && x < 12) {
        tiles.push(W);
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

export const TEST_MAP = generateTestMap();
