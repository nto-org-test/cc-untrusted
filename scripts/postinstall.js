/**
 * Post-Install Script
 * Runs automatically after npm install
 * Sets up the environment and validates the installation
 */

const fs = require('fs');
const path = require('path');

console.log('Running post-install setup...\n');

/**
 * Check Node.js version
 */
function checkNodeVersion() {
  const requiredVersion = 18;
  const currentVersion = parseInt(process.version.slice(1).split('.')[0], 10);

  if (currentVersion < requiredVersion) {
    console.error(`❌ Node.js version ${requiredVersion} or higher is required`);
    console.error(`   Current version: ${process.version}`);
    process.exit(1);
  }

  console.log(`✓ Node.js version check passed (${process.version})`);
}

/**
 * Create .env file from .env.example if it doesn't exist
 */
function setupEnvironment() {
  const envExample = path.join(__dirname, '..', '.env.example');
  const envFile = path.join(__dirname, '..', '.env');

  if (!fs.existsSync(envFile)) {
    if (fs.existsSync(envExample)) {
      fs.copyFileSync(envExample, envFile);
      console.log('✓ Created .env file from .env.example');
      console.log('  → Please update .env with your configuration');
    } else {
      console.log('ℹ No .env.example found, skipping .env creation');
    }
  } else {
    console.log('✓ .env file already exists');
  }
}

/**
 * Create necessary directories
 */
function createDirectories() {
  const dirs = ['logs', 'temp'];

  dirs.forEach(dir => {
    const dirPath = path.join(__dirname, '..', dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      console.log(`✓ Created directory: ${dir}/`);
    }
  });
}

/**
 * Display welcome message
 */
function displayWelcome() {
  console.log('\n' + '='.repeat(50));
  console.log('  Installation complete!');
  console.log('='.repeat(50));
  console.log('\nNext steps:');
  console.log('  1. Configure your .env file');
  console.log('  2. Run: npm start');
  console.log('  3. Read the README.md for more information\n');
}

/**
 * Main setup function
 */
function main() {
  try {
    checkNodeVersion();
    setupEnvironment();
    createDirectories();
    displayWelcome();
  } catch (error) {
    console.error('Post-install failed:', error);
    process.exit(1);
  }
}

main();
