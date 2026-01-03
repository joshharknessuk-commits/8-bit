import { TILE_SIZE } from '../constants';

export type SpriteKey = 'floor' | 'wall' | 'stairs' | 'player' | 'enemy' | 'health_potion' | 'sword';

export class SpriteGenerator {
  private sprites: Map<SpriteKey, HTMLCanvasElement> = new Map();

  constructor() {
    this.generateAll();
  }

  private generateAll(): void {
    this.sprites.set('floor', this.generateFloor());
    this.sprites.set('wall', this.generateWall());
    this.sprites.set('stairs', this.generateStairs());
    this.sprites.set('player', this.generatePlayer());
    this.sprites.set('enemy', this.generateEnemy());
    this.sprites.set('health_potion', this.generateHealthPotion());
    this.sprites.set('sword', this.generateSword());
  }

  getSprite(key: SpriteKey): HTMLCanvasElement | undefined {
    return this.sprites.get(key);
  }

  private createCanvas(): [HTMLCanvasElement, CanvasRenderingContext2D] {
    const canvas = document.createElement('canvas');
    canvas.width = TILE_SIZE;
    canvas.height = TILE_SIZE;
    const ctx = canvas.getContext('2d')!;
    return [canvas, ctx];
  }

  private generateFloor(): HTMLCanvasElement {
    const [canvas, ctx] = this.createCanvas();

    // Dark stone base
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, TILE_SIZE, TILE_SIZE);

    // Cracked stone texture
    ctx.fillStyle = '#252525';
    ctx.fillRect(1, 1, 6, 6);
    ctx.fillRect(9, 1, 6, 6);
    ctx.fillRect(1, 9, 6, 6);
    ctx.fillRect(9, 9, 6, 6);

    // Deep cracks
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 7, TILE_SIZE, 2);
    ctx.fillRect(7, 0, 2, TILE_SIZE);
    ctx.fillRect(3, 3, 1, 2);
    ctx.fillRect(11, 10, 2, 1);

    // Dried blood stains (occasional)
    ctx.fillStyle = '#2a1515';
    ctx.fillRect(2, 10, 2, 2);
    ctx.fillRect(12, 3, 1, 1);

    // Subtle worn edges
    ctx.fillStyle = '#1f1f1f';
    ctx.fillRect(0, 0, 1, 1);
    ctx.fillRect(15, 15, 1, 1);

    return canvas;
  }

  private generateWall(): HTMLCanvasElement {
    const [canvas, ctx] = this.createCanvas();

    // Dark gothic stone base
    ctx.fillStyle = '#2a2a2a';
    ctx.fillRect(0, 0, TILE_SIZE, TILE_SIZE);

    // Massive stone blocks
    ctx.fillStyle = '#1a1a1a';

    // Row 1
    ctx.fillRect(0, 0, 7, 5);
    ctx.fillRect(8, 0, 8, 5);

    // Row 2 offset
    ctx.fillRect(0, 6, 4, 4);
    ctx.fillRect(5, 6, 6, 4);
    ctx.fillRect(12, 6, 4, 4);

    // Row 3
    ctx.fillRect(0, 11, 7, 5);
    ctx.fillRect(8, 11, 8, 5);

    // Deep mortar/gaps
    ctx.fillStyle = '#0f0f0f';
    ctx.fillRect(0, 5, TILE_SIZE, 1);
    ctx.fillRect(0, 10, TILE_SIZE, 1);
    ctx.fillRect(7, 0, 1, 5);
    ctx.fillRect(4, 6, 1, 4);
    ctx.fillRect(11, 6, 1, 4);
    ctx.fillRect(7, 11, 1, 5);

    // Weathered highlights
    ctx.fillStyle = '#333333';
    ctx.fillRect(1, 1, 4, 1);
    ctx.fillRect(9, 1, 5, 1);
    ctx.fillRect(1, 12, 4, 1);

    // Skull embedded in wall (dark fantasy touch)
    ctx.fillStyle = '#3a3535';
    ctx.fillRect(10, 7, 3, 2);
    ctx.fillStyle = '#0f0f0f';
    ctx.fillRect(10, 7, 1, 1);
    ctx.fillRect(12, 7, 1, 1);

    // Blood drip
    ctx.fillStyle = '#3a1515';
    ctx.fillRect(2, 2, 1, 3);

    return canvas;
  }

  private generateStairs(): HTMLCanvasElement {
    const [canvas, ctx] = this.createCanvas();

    // Abyssal darkness below
    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, TILE_SIZE, TILE_SIZE);

    // Descending into darkness
    const stepColors = ['#252525', '#1a1a1a', '#101010', '#080808'];
    const stepHeight = 4;

    stepColors.forEach((color, i) => {
      const y = i * stepHeight;
      const indent = i * 2;

      // Worn stone step
      ctx.fillStyle = color;
      ctx.fillRect(indent, y, TILE_SIZE - indent * 2, stepHeight - 1);

      // Step edge
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(indent, y + stepHeight - 1, TILE_SIZE - indent * 2, 1);

      // Faint worn highlight
      ctx.fillStyle = shadeColor(color, 10);
      ctx.fillRect(indent + 1, y, TILE_SIZE - indent * 2 - 2, 1);
    });

    // Dark void sides
    ctx.fillStyle = '#0a0a0a';
    for (let i = 0; i < 4; i++) {
      const y = i * stepHeight;
      const indent = i * 2;
      ctx.fillRect(0, y, indent, stepHeight);
      ctx.fillRect(TILE_SIZE - indent, y, indent, stepHeight);
    }

    // Ominous red glow from below
    ctx.fillStyle = '#1a0505';
    ctx.fillRect(6, 14, 4, 2);

    return canvas;
  }

  private generatePlayer(): HTMLCanvasElement {
    const [canvas, ctx] = this.createCanvas();

    // Body (golden tunic)
    ctx.fillStyle = '#e8c170';
    ctx.fillRect(5, 5, 6, 7);

    // Head (skin tone)
    ctx.fillStyle = '#ddb892';
    ctx.fillRect(5, 2, 6, 4);

    // Hair (brown)
    ctx.fillStyle = '#5c4033';
    ctx.fillRect(5, 1, 6, 2);
    ctx.fillRect(4, 2, 1, 2);
    ctx.fillRect(11, 2, 1, 2);

    // Eyes
    ctx.fillStyle = '#2a2a3a';
    ctx.fillRect(6, 3, 1, 1);
    ctx.fillRect(9, 3, 1, 1);

    // Legs (darker)
    ctx.fillStyle = '#8b6914';
    ctx.fillRect(5, 12, 2, 3);
    ctx.fillRect(9, 12, 2, 3);

    // Boots
    ctx.fillStyle = '#4a3a2a';
    ctx.fillRect(4, 14, 3, 2);
    ctx.fillRect(9, 14, 3, 2);

    // Arms
    ctx.fillStyle = '#ddb892';
    ctx.fillRect(3, 6, 2, 4);
    ctx.fillRect(11, 6, 2, 4);

    // Shield (left hand)
    ctx.fillStyle = '#6a6a8a';
    ctx.fillRect(2, 7, 2, 3);
    ctx.fillStyle = '#8a8aaa';
    ctx.fillRect(2, 7, 2, 1);

    // Sword (right hand)
    ctx.fillStyle = '#aaaacc';
    ctx.fillRect(13, 4, 1, 5);
    ctx.fillStyle = '#8b6914';
    ctx.fillRect(13, 9, 1, 2);

    return canvas;
  }

  private generateEnemy(): HTMLCanvasElement {
    const [canvas, ctx] = this.createCanvas();

    // Goblin body (green)
    ctx.fillStyle = '#4a7c4a';
    ctx.fillRect(4, 6, 8, 6);

    // Head
    ctx.fillStyle = '#5a9c5a';
    ctx.fillRect(4, 2, 8, 5);

    // Ears (pointy)
    ctx.fillStyle = '#4a7c4a';
    ctx.fillRect(2, 2, 2, 3);
    ctx.fillRect(12, 2, 2, 3);

    // Eyes (menacing red)
    ctx.fillStyle = '#cc4444';
    ctx.fillRect(5, 4, 2, 1);
    ctx.fillRect(9, 4, 2, 1);

    // Mouth (toothy grin)
    ctx.fillStyle = '#2a3a2a';
    ctx.fillRect(6, 6, 4, 1);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(6, 6, 1, 1);
    ctx.fillRect(9, 6, 1, 1);

    // Arms
    ctx.fillStyle = '#5a9c5a';
    ctx.fillRect(2, 7, 2, 4);
    ctx.fillRect(12, 7, 2, 4);

    // Legs
    ctx.fillStyle = '#4a7c4a';
    ctx.fillRect(5, 12, 2, 3);
    ctx.fillRect(9, 12, 2, 3);

    // Feet
    ctx.fillStyle = '#3a5c3a';
    ctx.fillRect(4, 14, 3, 2);
    ctx.fillRect(9, 14, 3, 2);

    // Club (right hand)
    ctx.fillStyle = '#6a5a4a';
    ctx.fillRect(13, 5, 2, 6);
    ctx.fillStyle = '#5a4a3a';
    ctx.fillRect(13, 5, 2, 2);

    return canvas;
  }

  private generateHealthPotion(): HTMLCanvasElement {
    const [canvas, ctx] = this.createCanvas();

    // Bottle body
    ctx.fillStyle = '#cc4444';
    ctx.fillRect(5, 6, 6, 7);

    // Bottle neck
    ctx.fillStyle = '#aa3333';
    ctx.fillRect(6, 3, 4, 3);

    // Cork
    ctx.fillStyle = '#8b6914';
    ctx.fillRect(6, 2, 4, 2);

    // Liquid shine
    ctx.fillStyle = '#ff6666';
    ctx.fillRect(6, 7, 2, 4);

    // Glass highlight
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(6, 7, 1, 2);

    // Bottle bottom
    ctx.fillStyle = '#992222';
    ctx.fillRect(5, 12, 6, 1);

    // Heart symbol on bottle
    ctx.fillStyle = '#ff8888';
    ctx.fillRect(7, 9, 1, 1);
    ctx.fillRect(8, 9, 1, 1);
    ctx.fillRect(7, 10, 2, 1);

    return canvas;
  }

  private generateSword(): HTMLCanvasElement {
    const [canvas, ctx] = this.createCanvas();

    // Blade
    ctx.fillStyle = '#ccccee';
    ctx.fillRect(7, 1, 2, 9);

    // Blade tip
    ctx.fillStyle = '#aaaacc';
    ctx.fillRect(7, 0, 2, 1);
    ctx.fillRect(7, 1, 1, 1);

    // Blade shine
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(7, 2, 1, 6);

    // Blade edge (darker)
    ctx.fillStyle = '#9999bb';
    ctx.fillRect(8, 2, 1, 7);

    // Guard (crosspiece)
    ctx.fillStyle = '#8b6914';
    ctx.fillRect(4, 10, 8, 2);
    ctx.fillStyle = '#a67c00';
    ctx.fillRect(4, 10, 8, 1);

    // Handle
    ctx.fillStyle = '#5c4033';
    ctx.fillRect(7, 12, 2, 3);

    // Handle wrap
    ctx.fillStyle = '#4a3020';
    ctx.fillRect(7, 13, 2, 1);

    // Pommel
    ctx.fillStyle = '#8b6914';
    ctx.fillRect(6, 15, 4, 1);

    return canvas;
  }
}

function shadeColor(color: string, percent: number): string {
  const num = parseInt(color.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.min(255, Math.max(0, (num >> 16) + amt));
  const G = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + amt));
  const B = Math.min(255, Math.max(0, (num & 0x0000ff) + amt));
  return `#${((1 << 24) + (R << 16) + (G << 8) + B).toString(16).slice(1)}`;
}
