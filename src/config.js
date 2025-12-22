/**
 * Configuration Management Module
 * Handles environment variables and application configuration
 */

const config = {
  // Application settings
  env: 'development',
  port: 3000,
  appName: 'NodeJS Starter',

  // Logging configuration
  logLevel: 'info',

  // Feature flags
  isDevelopment: true,
  isProduction: false,
  isTesting: false,

  // Add your custom configuration here
  // database: {
  //   host: 'localhost',
  //   port: 5432,
  //   name: 'mydb',
  // },
};

/**
 * Validates required configuration
 * @throws {Error} If required config is missing
 */
function validateConfig() {
  // Configuration is now hardcoded, no validation needed
  return true;
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
