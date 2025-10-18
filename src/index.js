/**
 * Main Application Entry Point
 * Node.js Starter Project
 */

const config = require('./config');
const logger = require('./logger');
const helpers = require('./utils/helpers');

/**
 * Main application class
 */
class Application {
  constructor() {
    this.name = config.appName;
    this.startTime = Date.now();
    this.isRunning = false;
  }

  /**
   * Initializes the application
   */
  async initialize() {
    try {
      logger.info('Initializing application...');
      logger.info(`Environment: ${config.env}`);
      logger.info(`App Name: ${this.name}`);

      // Validate configuration
      config.validateConfig();

      // Add your initialization logic here
      await this.setupServices();

      logger.info('Application initialized successfully');
    } catch (error) {
      logger.error('Failed to initialize application', error);
      throw error;
    }
  }

  /**
   * Sets up application services
   */
  async setupServices() {
    logger.debug('Setting up services...');

    // Example: Wait for services to be ready
    await helpers.sleep(100);

    // Add your service setup here:
    // - Database connections
    // - External API clients
    // - Message queues
    // - Cache systems

    logger.debug('Services ready');
  }

  /**
   * Starts the application
   */
  async start() {
    try {
      if (this.isRunning) {
        logger.warn('Application is already running');
        return;
      }

      logger.info('Starting application...');

      await this.initialize();

      this.isRunning = true;

      // Main application logic here
      this.run();

      logger.info(`Application started successfully in ${Date.now() - this.startTime}ms`);
      logger.info(`Process ID: ${process.pid}`);

    } catch (error) {
      logger.error('Failed to start application', error);
      process.exit(1);
    }
  }

  /**
   * Main application run loop
   */
  run() {
    logger.info('Application is running...');
    logger.info('Press CTRL+C to stop');

    // Example: Periodic task
    setInterval(() => {
      const uptime = Math.floor((Date.now() - this.startTime) / 1000);
      logger.debug(`Uptime: ${uptime} seconds`);
    }, 30000); // Log every 30 seconds

    // Add your main application logic here
    this.performWork();
  }

  /**
   * Performs the main work of the application
   */
  async performWork() {
    // Example work - replace with your actual logic
    logger.info('Performing work...');

    // Example: Generate a sample ID
    const sampleId = helpers.generateId(12);
    logger.debug(`Generated sample ID: ${sampleId}`);

    // Example: Memory usage
    const memUsage = process.memoryUsage();
    logger.debug(`Memory usage: ${helpers.formatBytes(memUsage.heapUsed)}`);

    // Add your business logic here
  }

  /**
   * Gracefully shuts down the application
   */
  async shutdown() {
    logger.info('Shutting down application...');

    this.isRunning = false;

    // Cleanup logic:
    // - Close database connections
    // - Finish pending operations
    // - Save state

    logger.info('Application shutdown complete');
    process.exit(0);
  }
}

/**
 * Handle uncaught errors
 */
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

/**
 * Handle graceful shutdown
 */
process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (app) app.shutdown();
});

process.on('SIGINT', () => {
  logger.info('SIGINT received');
  if (app) app.shutdown();
});

/**
 * Start the application
 */
const app = new Application();
app.start();

module.exports = Application;
