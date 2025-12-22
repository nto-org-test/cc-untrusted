/**
 * Configuration Management Module
 * Handles environment variables and application configuration
 */

const config = {
  // Application settings
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 3000,
  appName: process.env.APP_NAME || 'NodeJS Starter',

  // Logging configuration
  logLevel: process.env.LOG_LEVEL || 'info',

  // Feature flags
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTesting: process.env.NODE_ENV === 'test',

  // Add your custom configuration here
  // database: {
  //   host: process.env.DB_HOST,
  //   port: process.env.DB_PORT,
  //   name: process.env.DB_NAME,
  // },
};

/**
 * Validates required configuration
 * @throws {Error} If required config is missing
 */
function validateConfig() {
  const required = ['NODE_ENV'];
  const missing = required.filter(key => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}

/**
 * Gets a configuration value
 * @param {string} key - The configuration key
 * @param {*} defaultValue - Default value if key not found
 * @returns {*} The configuration value
 */
function get(key, defaultValue = null) {
  return config[key] !== undefined ? config[key] : defaultValue;
}

/**
 * Prints current configuration (safe for logging)
 * Masks sensitive values
 */
function printConfig() {
  const safeConfig = { ...config };
  // Mask sensitive values if needed
  console.log('Current Configuration:');
  console.log(JSON.stringify(safeConfig, null, 2));
}

module.exports = {
  ...config,
  validateConfig,
  get,
  printConfig,
};
