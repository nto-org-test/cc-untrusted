/**
 * Test Suite for Application
 * Basic test examples - expand as needed
 */

const helpers = require('./utils/helpers');

/**
 * Simple test runner
 */
class TestRunner {
  constructor() {
    this.tests = [];
    this.passed = 0;
    this.failed = 0;
  }

  test(name, fn) {
    this.tests.push({ name, fn });
  }

  async run() {
    console.log('Running tests...\n');

    for (const test of this.tests) {
      try {
        await test.fn();
        this.passed++;
        console.log(`✓ ${test.name}`);
      } catch (error) {
        this.failed++;
        console.log(`✗ ${test.name}`);
        console.log(`  Error: ${error.message}`);
      }
    }

    console.log(`\nTests: ${this.passed} passed, ${this.failed} failed, ${this.tests.length} total`);

    if (this.failed > 0) {
      process.exit(1);
    }
  }
}

/**
 * Assert helper
 */
function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}

function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(message || `Expected ${expected}, got ${actual}`);
  }
}

// Test Suite
const runner = new TestRunner();

// Test: Generate ID
runner.test('generateId should return string of correct length', () => {
  const id = helpers.generateId(10);
  assert(typeof id === 'string', 'ID should be a string');
  assertEqual(id.length, 10, 'ID should have length 10');
});

// Test: Email validation
runner.test('isValidEmail should validate email correctly', () => {
  assert(helpers.isValidEmail('test@example.com'), 'Valid email should pass');
  assert(!helpers.isValidEmail('invalid-email'), 'Invalid email should fail');
  assert(!helpers.isValidEmail(''), 'Empty string should fail');
});

// Test: Format bytes
runner.test('formatBytes should format bytes correctly', () => {
  assertEqual(helpers.formatBytes(0), '0 Bytes');
  assertEqual(helpers.formatBytes(1024), '1 KB');
  assertEqual(helpers.formatBytes(1024 * 1024), '1 MB');
});

// Test: Safe JSON parse
runner.test('safeJsonParse should handle invalid JSON', () => {
  const result = helpers.safeJsonParse('invalid json', { default: true });
  assert(result.default === true, 'Should return default value for invalid JSON');
});

runner.test('safeJsonParse should parse valid JSON', () => {
  const result = helpers.safeJsonParse('{"key":"value"}');
  assertEqual(result.key, 'value', 'Should parse valid JSON correctly');
});

// Test: Deep clone
runner.test('deepClone should create independent copy', () => {
  const original = { a: 1, b: { c: 2 } };
  const cloned = helpers.deepClone(original);

  cloned.b.c = 3;

  assertEqual(original.b.c, 2, 'Original should not be modified');
  assertEqual(cloned.b.c, 3, 'Clone should be modified');
});

// Run all tests
runner.run();
