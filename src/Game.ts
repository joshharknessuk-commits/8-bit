import { GameLoop } from './core/GameLoop';
import { Input } from './core/Input';
import { Renderer } from './rendering/Renderer';
import { World } from './world/World';
import { LEVELS, TOTAL_LEVELS } from './world/levels';

export class Game {
  private world: World;
  private renderer: Renderer;
  private input: Input;
  private gameLoop: GameLoop;
  private currentLevel = 0;
  private isGameOver = false;
  private isVictory = false;

  // HUD elements
  private hpBarInner: HTMLElement | null;
  private hpText: HTMLElement | null;
  private attackText: HTMLElement | null;
  private floorText: HTMLElement | null;
  private enemiesCount: HTMLElement | null;
  private gameOverEl: HTMLElement | null;
  private victoryEl: HTMLElement | null;

  constructor(canvas: HTMLCanvasElement) {
    this.renderer = new Renderer(canvas);
    this.input = new Input();
    this.world = new World();
    this.gameLoop = new GameLoop(
      this.update.bind(this),
      this.render.bind(this)
    );

    // Get HUD elements
    this.hpBarInner = document.getElementById('hp-bar-inner');
    this.hpText = document.getElementById('hp-text');
    this.attackText = document.getElementById('attack-text');
    this.floorText = document.getElementById('floor-text');
    this.enemiesCount = document.getElementById('enemies-count');
    this.gameOverEl = document.getElementById('game-over');
    this.victoryEl = document.getElementById('victory');
  }

  start(): void {
    this.currentLevel = 0;
    this.world.loadMap(LEVELS[this.currentLevel]);
    this.updateHUD();
    this.gameLoop.start();
  }

  private update(_deltaTime: number): void {
    if (this.isGameOver || this.isVictory) return;

    // Turn-based: only process when player acts
    if (this.input.hasAction()) {
      const action = this.input.consumeAction();
      if (action) {
        this.processTurn(action);
      }
    }
  }

  private processTurn(action: Parameters<typeof this.world.player.act>[0]): void {
    // Player acts
    this.world.player.act(action, this.world);

    // Check for stairs after moving
    if (this.world.isPlayerOnStairs()) {
      this.nextLevel();
      return;
    }

    // Remove dead enemies
    this.world.removeDeadEnemies();

    // Enemies act
    this.world.enemies.forEach((enemy) => enemy.act(this.world));

    // Update HUD
    this.updateHUD();

    // Check for game over
    if (!this.world.player.isAlive) {
      this.gameOver();
    }
  }

  private nextLevel(): void {
    this.currentLevel++;

    if (this.currentLevel >= TOTAL_LEVELS) {
      this.victory();
      return;
    }

    // Load next level, preserving player stats
    this.world.loadMap(LEVELS[this.currentLevel], this.world.player);
    this.updateHUD();
  }

  private updateHUD(): void {
    const player = this.world.player;

    if (this.hpBarInner) {
      const hpPercent = (player.hp / player.maxHp) * 100;
      this.hpBarInner.style.width = `${hpPercent}%`;
    }

    if (this.hpText) {
      this.hpText.textContent = `${player.hp}/${player.maxHp}`;
    }

    if (this.attackText) {
      this.attackText.textContent = `ATK: ${player.attack}`;
    }

    if (this.floorText) {
      this.floorText.textContent = `Floor: ${this.currentLevel + 1}`;
    }

    if (this.enemiesCount) {
      this.enemiesCount.textContent = `Enemies: ${this.world.enemies.length}`;
    }
  }

  private gameOver(): void {
    this.isGameOver = true;
    this.input.clearActions();
    if (this.gameOverEl) {
      this.gameOverEl.classList.add('show');
    }
  }

  private victory(): void {
    this.isVictory = true;
    this.input.clearActions();
    if (this.victoryEl) {
      this.victoryEl.classList.add('show');
    }
  }

  private render(): void {
    this.renderer.clear();
    this.renderer.renderMap(this.world.tileMap);
    this.renderer.renderItems(this.world.items);
    this.renderer.renderEntities(this.world.entities);
  }
}
