export class GameLoop {
  private isRunning = false;
  private lastTime = 0;

  constructor(
    private update: (deltaTime: number) => void,
    private render: () => void
  ) {}

  start(): void {
    this.isRunning = true;
    this.lastTime = performance.now();
    this.tick();
  }

  stop(): void {
    this.isRunning = false;
  }

  private tick = (): void => {
    if (!this.isRunning) return;

    const now = performance.now();
    const deltaTime = (now - this.lastTime) / 1000;
    this.lastTime = now;

    this.update(deltaTime);
    this.render();

    requestAnimationFrame(this.tick);
  };
}
