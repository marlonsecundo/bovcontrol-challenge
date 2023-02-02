type Task = () => Promise<void | unknown>;

export class SequentialTaskQueue {
  private tasks: Task[];
  private stopped: boolean;

  constructor(tasks = []) {
    this.tasks = tasks;
    this.stopped = false;
  }

  add(task: Task) {
    this.tasks.push(task);
  }

  async run() {
    this.stopped = false;
    for (const task of this.tasks) {
      if (this.stopped) {
        break;
      }

      try {
        await task();
      } catch (error) {
        this.handleError(error as Error);
      }
    }
  }

  clear() {
    this.tasks = [];
  }

  stop() {
    this.stopped = true;
  }

  handleError(error: Error) {
    console.error(error);
  }
}
