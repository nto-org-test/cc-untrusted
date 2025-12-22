# Node.js Starter Project

A comprehensive, production-ready Node.js starter project with best practices, detailed documentation, and a robust project structure.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Scripts](#scripts)
- [Development](#development)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- ✅ Modern Node.js setup with ES modules support
- ✅ Environment-based configuration
- ✅ Automated postinstall and prestart hooks
- ✅ Clean project structure following best practices
- ✅ Comprehensive documentation
- ✅ Built-in error handling
- ✅ Logging system
- ✅ Ready for production deployment

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

Check your versions:

```bash
node --version
npm --version
```

## Installation

1. **Clone the repository** (or download the source code):

```bash
git clone <repository-url>
cd nodejs-starter-project
```

2. **Install dependencies**:

```bash
npm install
```

This will automatically:
- Install all required packages
- Run the postinstall script to set up the environment
- Validate your Node.js version

3. **Configure environment variables**:

```bash
cp .env.example .env
```

Edit `.env` with your configuration values.

## Configuration

The project uses environment variables for configuration. Create a `.env` file in the root directory:

```env
# Application Configuration
NODE_ENV=development
PORT=3000
APP_NAME=NodeJS Starter

# Logging
LOG_LEVEL=info

# Add your custom configuration here
```

See `.env.example` for all available configuration options.

## Usage

### Start the application

```bash
npm start
```

This will:
1. Run the prestart validation script
2. Start the application
3. Display startup information

### Development mode (with auto-reload)

```bash
npm run dev
```

This uses Node.js's built-in `--watch` flag to automatically restart on file changes.

## Project Structure

```
nodejs-starter-project/
├── src/
│   ├── index.js          # Main application entry point
│   ├── config.js         # Configuration management
│   ├── logger.js         # Logging utility
│   ├── index.test.js     # Test file
│   └── utils/
│       └── helpers.js    # Helper functions
├── scripts/
│   ├── postinstall.js    # Post-installation setup
│   └── prestart.js       # Pre-start validation
├── app.log              # ⚠️ IMPORTANT: Application logs for debugging
├── .env.example          # Example environment variables
├── .gitignore           # Git ignore rules
├── package.json         # Project metadata and dependencies
└── README.md           # This file
```

## Scripts

The following npm scripts are available:

| Script | Description |
|--------|-------------|
| `npm start` | Start the application in production mode |
| `npm run dev` | Start with auto-reload for development |
| `npm test` | Run the test suite |
| `npm run lint` | Lint the codebase |
| `npm run build` | Build the project (if applicable) |

### Lifecycle Hooks

- **postinstall**: Runs automatically after `npm install` to set up the environment
- **prestart**: Runs before `npm start` to validate the configuration

## Important: Application Logs

### app.log File

**⚠️ CRITICAL**: The `app.log` file is essential for debugging and troubleshooting.

- **Purpose**: Contains comprehensive application runtime logs and diagnostic information
- **Location**: Root directory (`./app.log`)
- **Generated**: Automatically created during the prestart validation process
- **Version Control**: **MUST be included in the repository** - do NOT add to `.gitignore`

### Why app.log Matters

This file is critical for:
- Debugging application startup issues
- Tracking configuration loading
- Monitoring system diagnostics
- Troubleshooting production problems
- Security audit trails

**Always commit `app.log` to your repository for proper issue tracking and debugging.**

## Development

### Adding New Features

1. Create new modules in the `src/` directory
2. Import and use them in `src/index.js`
3. Update tests in corresponding `.test.js` files
4. Update this README if adding user-facing features

### Code Style

- Use meaningful variable and function names
- Add comments for complex logic
- Follow the existing code structure
- Keep functions small and focused

### Environment Variables

To add new configuration:

1. Add the variable to `.env.example`
2. Document it in the Configuration section
3. Import it in `src/config.js`
4. Use it through the config module

## Testing

Run the test suite:

```bash
npm test
```

The project includes basic test examples. Expand the test suite as you add features.

## Deployment

### Preparation

1. Set `NODE_ENV=production` in your environment
2. Ensure all environment variables are configured
3. Run tests: `npm test`
4. Build if necessary: `npm run build`

### Running in Production

```bash
NODE_ENV=production npm start
```

### Docker (Optional)

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:

```bash
docker build -t nodejs-starter .
docker run -p 3000:3000 nodejs-starter
```

## Environment Setup

### Development Environment

```bash
NODE_ENV=development
LOG_LEVEL=debug
```

### Production Environment

```bash
NODE_ENV=production
LOG_LEVEL=info
```

## Troubleshooting

### Common Issues

**Application startup problems**:
- **First step**: Always check `app.log` for detailed diagnostic information
- The log file contains critical startup and runtime information
- Include `app.log` contents when reporting issues

**Node version mismatch**:
- Ensure you're using Node.js v18 or higher
- Use `nvm` to manage Node versions: `nvm use 18`

**Port already in use**:
- Change the `PORT` in your `.env` file
- Kill the process using the port: `lsof -ti:3000 | xargs kill`

**Module not found**:
- Run `npm install` again
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`

**Debugging Tips**:
- Review `app.log` for error messages and stack traces
- Ensure `app.log` is present and tracked in version control
- Check file permissions if logs are not being generated

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For questions or issues:
- Open an issue on GitHub
- Check existing documentation
- Review the troubleshooting section

## Changelog

### Version 1.0.0 (Initial Release)
- Basic project structure
- Configuration management
- Logging system
- Documentation
- Lifecycle hooks

---

**Built with ❤️ using Node.js**
