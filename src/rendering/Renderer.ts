import { TILE_SIZE, CANVAS_WIDTH, CANVAS_HEIGHT, CANVAS_SCALE } from '../constants';
import { TileMap } from '../world/TileMap';
import { Entity } from '../entities/Entity';
import { Item } from '../entities/Item';
import { SpriteGenerator, SpriteKey } from './SpriteGenerator';

export class Renderer {
  private ctx: CanvasRenderingContext2D;
  private sprites: SpriteGenerator;

  constructor(private canvas: HTMLCanvasElement) {
    this.canvas.width = CANVAS_WIDTH;
    this.canvas.height = CANVAS_HEIGHT;
    this.canvas.style.width = `${CANVAS_WIDTH * CANVAS_SCALE}px`;
    this.canvas.style.height = `${CANVAS_HEIGHT * CANVAS_SCALE}px`;

    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not get 2D context');
    this.ctx = ctx;

    // Disable image smoothing for crisp pixel art
    this.ctx.imageSmoothingEnabled = false;

    // Generate sprites
    this.sprites = new SpriteGenerator();
  }

  clear(): void {
    this.ctx.fillStyle = '#1a1a2e';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  renderMap(tileMap: TileMap): void {
    for (let y = 0; y < tileMap.height; y++) {
      for (let x = 0; x < tileMap.width; x++) {
        const tile = tileMap.getTile(x, y);
        const sprite = this.sprites.getSprite(tile.name as SpriteKey);

        if (sprite) {
          this.ctx.drawImage(sprite, x * TILE_SIZE, y * TILE_SIZE);
        } else {
          // Fallback to solid color
          this.ctx.fillStyle = tile.color;
          this.ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        }
      }
    }
  }

  renderEntity(entity: Entity): void {
    const sprite = this.sprites.getSprite(entity.spriteKey as SpriteKey);

    if (sprite) {
      this.ctx.drawImage(
        sprite,
        entity.position.x * TILE_SIZE,
        entity.position.y * TILE_SIZE
      );
    } else {
      // Fallback to solid color
      this.ctx.fillStyle = entity.color;
      this.ctx.fillRect(
        entity.position.x * TILE_SIZE + 2,
        entity.position.y * TILE_SIZE + 2,
        TILE_SIZE - 4,
        TILE_SIZE - 4
      );
    }
  }

  renderEntities(entities: Entity[]): void {
    entities.forEach((entity) => this.renderEntity(entity));
  }

  renderItem(item: Item): void {
    const sprite = this.sprites.getSprite(item.definition.type as SpriteKey);

    if (sprite) {
      this.ctx.drawImage(
        sprite,
        item.position.x * TILE_SIZE,
        item.position.y * TILE_SIZE
      );
    } else {
      // Fallback to diamond shape
      const x = item.position.x * TILE_SIZE + TILE_SIZE / 2;
      const y = item.position.y * TILE_SIZE + TILE_SIZE / 2;
      const size = 4;

      this.ctx.fillStyle = item.color;
      this.ctx.beginPath();
      this.ctx.moveTo(x, y - size);
      this.ctx.lineTo(x + size, y);
      this.ctx.lineTo(x, y + size);
      this.ctx.lineTo(x - size, y);
      this.ctx.closePath();
      this.ctx.fill();
    }
  }

  renderItems(items: Item[]): void {
    items.forEach((item) => this.renderItem(item));
  }
}
