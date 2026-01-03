export type Action = 'move_up' | 'move_down' | 'move_left' | 'move_right' | 'wait';

export class Input {
  private actionQueue: Action[] = [];

  constructor() {
    window.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  private handleKeyDown(e: KeyboardEvent): void {
    const action = this.keyToAction(e.key);
    if (action) {
      e.preventDefault();
      this.actionQueue.push(action);
    }
  }

  private keyToAction(key: string): Action | null {
    const mapping: Record<string, Action> = {
      'w': 'move_up',
      'W': 'move_up',
      'ArrowUp': 'move_up',
      's': 'move_down',
      'S': 'move_down',
      'ArrowDown': 'move_down',
      'a': 'move_left',
      'A': 'move_left',
      'ArrowLeft': 'move_left',
      'd': 'move_right',
      'D': 'move_right',
      'ArrowRight': 'move_right',
      ' ': 'wait',
    };
    return mapping[key] ?? null;
  }

  hasAction(): boolean {
    return this.actionQueue.length > 0;
  }

  consumeAction(): Action | null {
    return this.actionQueue.shift() ?? null;
  }

  clearActions(): void {
    this.actionQueue = [];
  }
}
