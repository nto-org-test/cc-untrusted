/**
 * Logging Utility Module
 * Simple logging system with different log levels
 */

const config = require('./config');

const LOG_LEVELS = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

const currentLevel = LOG_LEVELS[config.logLevel] || LOG_LEVELS.info;

/**
 * Formats log message with timestamp
 * @param {string} level - Log level
 * @param {string} message - Log message
 * @returns {string} Formatted log message
 */
function formatMessage(level, message) {
  const timestamp = new Date().toISOString();
  return `[${timestamp}] [${level.toUpperCase()}] ${message}`;
}

/**
 * Logs a message if the level is appropriate
 * @param {string} level - Log level
 * @param {string} message - Message to log
 * @param {*} data - Optional data to log
 */
function log(level, message, data = null) {
  if (LOG_LEVELS[level] <= currentLevel) {
    const formatted = formatMessage(level, message);

    if (level === 'error') {
      console.error(formatted, data || '');
    } else if (level === 'warn') {
      console.warn(formatted, data || '');
    } else {
      console.log(formatted, data || '');
    }
  }
}

/**
 * Logger object with different log level methods
 */
const logger = {
  error: (message, data) => log('error', message, data),
  warn: (message, data) => log('warn', message, data),
  info: (message, data) => log('info', message, data),
  debug: (message, data) => log('debug', message, data),
};

module.exports = logger;
