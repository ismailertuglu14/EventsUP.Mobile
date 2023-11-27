enum LogLevel {
    Debug,
    Info,
    Warning,
    Error,
  }
  
  class LogManager {
    private static instance: LogManager;
    private logLevel: LogLevel;
    private isDevelopment: boolean = process.env.NODE_ENV === 'development';
    private constructor() {
      // Singleton sınıf, doğrudan örneklenemeyecek.
      this.logLevel = LogLevel.Debug; // Varsayılan log seviyesi
    }
  
    public static getInstance(): LogManager {
      // Tek bir örnek döndürme mantığı
      if (!LogManager.instance) {
        LogManager.instance = new LogManager();
      }
  
      return LogManager.instance;
    }
  
    public setLogLevel(logLevel: LogLevel): void {
      // Log seviyesini ayarlamak için kullanılabilir.
      this.logLevel = logLevel;
    }
  
    private log(message: string, level: LogLevel): void {
      // Belirtilen log seviyesine göre loglama yapar.
      if (level >= this.logLevel) {
        console.log(`[${LogLevel[level]}]: ${message}`);
      }
    }
  
    public logDebug(message: string): void {
      this.log(message, LogLevel.Debug);
    }
  
    public logInfo(message: string): void {
      this.log(message, LogLevel.Info);
    }
  
    public logWarning(message: string): void {
      this.log(message, LogLevel.Warning);
    }
  
    public logError(message: string): void {
      this.log(message, LogLevel.Error);
    }
  }
  