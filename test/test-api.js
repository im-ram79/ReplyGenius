/**
 * Automated Test Suite for ReplyGenius API
 * Tests health checks, multi-language generation, tone variations, and input validation.
 */

const http = require('http');
const app = require('../server');

let server;
const PORT = 3099;
const BASE_URL = `http://localhost:${PORT}`;

async function runTests() {
  console.log('==================================================');
  console.log(' Starting ReplyGenius Automated API Test Suite');
  console.log('==================================================\n');

  let passed = 0;
  let failed = 0;

  async function assert(testName, fn) {
    try {
      await fn();
      console.log(`  ✓ PASS: ${testName}`);
      passed++;
    } catch (err) {
      console.error(`  ✗ FAIL: ${testName}`);
      console.error(`    Error: ${err.message}`);
      failed++;
    }
  }

  // Start temporary test server
  await new Promise((resolve) => {
    server = app.listen(PORT, resolve);
  });

  try {
    // 1. Health check test
    await assert('GET /api/health returns ok status', async () => {
      const res = await fetch(`${BASE_URL}/api/health`);
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const data = await res.json();
      if (data.status !== 'ok' || data.service !== 'ReplyGenius') {
        throw new Error(`Unexpected body: ${JSON.stringify(data)}`);
      }
    });

    // 2. English generation test
    await assert('POST /api/generate (English, Friendly)', async () => {
      const res = await fetch(`${BASE_URL}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: 'Can I get a discount for a bulk order of 10 shirts?',
          language: 'english',
          tone: 'friendly'
        })
      });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const data = await res.json();
      if (data.status !== 'success' || !data.reply || data.language !== 'english') {
        throw new Error(`Invalid response structure: ${JSON.stringify(data)}`);
      }
    });

    // 3. Hindi generation test
    await assert('POST /api/generate (Hindi, Apologetic)', async () => {
      const res = await fetch(`${BASE_URL}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: 'Mera order abhi tak deliver kyu nahi hua?',
          language: 'hindi',
          tone: 'apologetic'
        })
      });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const data = await res.json();
      if (data.status !== 'success' || !data.reply || data.language !== 'hindi') {
        throw new Error(`Invalid response structure: ${JSON.stringify(data)}`);
      }
    });

    // 4. Gujarati generation test
    await assert('POST /api/generate (Gujarati, Professional)', async () => {
      const res = await fetch(`${BASE_URL}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: 'મેં ઓર્ડર કર્યો છે, ટ્રેકિંગ નંબર ક્યારે મળશે?',
          language: 'gujarati',
          tone: 'professional'
        })
      });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const data = await res.json();
      if (data.status !== 'success' || !data.reply || data.language !== 'gujarati') {
        throw new Error(`Invalid response structure: ${JSON.stringify(data)}`);
      }
    });

    // 5. Input validation (Empty message should return 400 Bad Request)
    await assert('POST /api/generate rejects empty message with 400', async () => {
      const res = await fetch(`${BASE_URL}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: '   ',
          language: 'english',
          tone: 'friendly'
        })
      });
      if (res.status !== 400) throw new Error(`Expected status 400, got ${res.status}`);
      const data = await res.json();
      if (data.status !== 'error') throw new Error(`Expected status error`);
    });

    // 6. Safety check - verify presence of placeholder brackets rather than fake facts
    await assert('Safety check: response preserves placeholding tags', async () => {
      const res = await fetch(`${BASE_URL}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: 'Where is my order #55123 and refund?',
          language: 'english',
          tone: 'professional'
        })
      });
      const data = await res.json();
      if (!data.reply.includes('[') || !data.reply.includes(']')) {
        throw new Error(`Expected bracketed placeholders for safety, got: ${data.reply}`);
      }
    });

    console.log('\n--------------------------------------------------');
    console.log(` Test Summary: ${passed} Passed, ${failed} Failed`);
    console.log('--------------------------------------------------\n');

    if (failed > 0) {
      process.exitCode = 1;
    }
  } finally {
    server.close();
  }
}

runTests();
