type LogLevel = 'info' | 'warn' | 'error' | 'debug';

class Logger {
  private getTimestamp(): string {
    return new Date().toISOString();
  }

  private log(level: LogLevel, message: string, ...args: any[]): void {
    const timestamp = this.getTimestamp();
    const formattedArgs = args.length
      ? args
          .map((arg) =>
            typeof arg === 'object' ? JSON.stringify(arg, null, 2) : arg,
          )
          .join(' ')
      : '';

    console[level](
      `[${timestamp}] ${level.toUpperCase()}: ${message}${formattedArgs ? ' ' + formattedArgs : ''}`,
    );
  }

  info(message: string, ...args: any[]): void {
    this.log('info', message, ...args);
  }

  warn(message: string, ...args: any[]): void {
    this.log('warn', message, ...args);
  }

  error(message: string, ...args: any[]): void {
    this.log('error', message, ...args);
  }

  debug(message: string, ...args: any[]): void {
    if (process.env.NODE_ENV !== 'production') {
      this.log('debug', message, ...args);
    }
  }
}

export const logger = new Logger();
