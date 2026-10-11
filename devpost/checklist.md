---
doc: checklist
status: approved
---

# Build Checklist

Build mode: fast

## Slices

- [ ] **1. Project Bootstrap and Backend API Server**
  Becomes usable: A running Node.js Express server with a functional `POST /api/generate` endpoint that accepts customer message, language, and tone, returning a formatted reply with Indian retail guardrails.
  Why now: Establishes the server foundation, protects API secrets from client code, and provides an immediately testable API endpoint.
  PRD ref: `prd.md > Features and Behavior > 4. AI Reply Generation & Safety Guardrails`
  Spec ref: `spec.md > Components > 2. Express Server`, `spec.md > Components > 3. Gemini Service Module`
  Build: Initialize `package.json`, install Express and dotenv, create `server.js` and `services/gemini.js` with safety prompt generation and mock fallback.
  Verify (mechanical): Start the server, execute an automated HTTP request to `/api/generate`, and confirm a valid JSON response with a generated reply.
  Learner check: Run `npm start` and observe the server start cleanly on port 3000.
  Commit: `Bootstrap Express server with AI reply generator endpoint`

- [ ] **2. Interactive Web Frontend with Multi-Language and Tone Controls**
  Becomes usable: A responsive web page at `http://localhost:3000` where the user can enter a message or click an example scenario, pick language (English, Hindi, Gujarati) and tone, and click "Generate Reply" to see the generated text.
  Why now: Delivers the core user loop so the user can interact directly with the app in their browser.
  PRD ref: `prd.md > The Core Journey`, `prd.md > Screens and Layout`
  Spec ref: `spec.md > Components > 1. Web Client`, `spec.md > Look and Feel`
  Build: Create `public/index.html`, `public/style.css`, and `public/app.js` with responsive layouts, example message chips, language/tone selectors, loading states, and API integration.
  Verify (mechanical): Query `http://localhost:3000` to verify static files load with 200 OK; trigger sample requests for English, Hindi, and Gujarati and verify rendered outputs.
  Learner check: Open `http://localhost:3000` in your web browser, click a quick example message, select Hindi and Friendly, and click "Generate Reply" to see the generated response.
  Commit: `Implement responsive web interface with multi-language and tone controls`

- [ ] **3. Copy to Clipboard, Input Validation, and Error Handling**
  Becomes usable: One-click "Copy Reply" button with animated feedback, empty input validation warnings, and friendly error banners.
  Why now: Completes the final user actions needed to make the reply immediately usable in real messaging apps like WhatsApp.
  PRD ref: `prd.md > Features and Behavior > 5. Copy to Clipboard`, `prd.md > States and Boundaries`
  Spec ref: `spec.md > Important Failure Modes`, `spec.md > Look and Feel`
  Build: Add Clipboard API logic with visual feedback ("✓ Copied!"), validation alerts for empty text, error toast notifications, and clear button.
  Verify (mechanical): Verify client script handles copy events and empty submissions; check validation state triggers correctly.
  Learner check: Click "Copy Reply" on a generated response and paste it into a notepad to confirm it copies properly; try clicking Generate with an empty message to see the friendly warning.
  Commit: `Add one-click copy, input validation, and user feedback alerts`

- [ ] **4. Automated Test Suite, Setup Guide, and Repo Readiness**
  Becomes usable: A complete, self-verifying test script in `test/test-api.js`, comprehensive `README.md`, safe `.env.example`, and clean git history ready for public GitHub publication.
  Why now: Satisfies all hackathon submission requirements and ensures anyone can clone, test, and run the project effortlessly.
  PRD ref: `prd.md > What We're Building`
  Spec ref: `spec.md > File Structure`, `spec.md > Where It Runs and How Someone Tries It`
  Build: Create `test/test-api.js`, `.env.example`, and a beginner-friendly `README.md` with setup instructions and architecture summary.
  Verify (mechanical): Run `node test/test-api.js` to execute automated tests against all languages and tones and ensure 100% pass rate.
  Learner check: Review the README instructions and verify that running `npm test` runs smoothly with all tests passing.
  Commit: `Add automated API test suite, .env.example, and setup documentation`

## Hands-on Checkpoints
- [ ] Early usable behavior explored — [Slice 2: Frontend core loop in browser]
- [ ] Final kick-the-tires exploration and feedback completed

## Final Review
- [ ] Final review complete — feedback resolved and learner confirms ready to ship

## Code Tour and App Map
- [ ] Learning activity complete — guided route, focused alternative, prior practice connected, or brief recap
- [ ] Optional edit and transfer reflection addressed — offered/declined/already covered/not applicable as appropriate
- [ ] `devpost/app-map.html` generated from finished code, checked, and shown, including a project-grounded practice to reuse

Activity and evidence: [to be recorded upon completion]
Route and stops: [to be recorded upon completion]
Edit outcome: [to be recorded upon completion]
Reflection: [to be recorded upon completion]
Activity mode: [to be recorded upon completion]

## Revisions
