---
doc: spec
status: approved
---

# ReplyGenius — Technical Specification

## How This Works, In Plain Language
ReplyGenius is a simple full-stack web application. It consists of two connected parts:
1. **The Frontend (in the browser)**: A clean, mobile-responsive webpage where the user types a customer inquiry or clicks an example chip, chooses a language (English, Hindi, Gujarati) and tone (Friendly, Professional, Apologetic), and clicks "Generate Reply". It also provides a one-click "Copy Reply" button.
2. **The Backend Server (Node.js & Express)**: A lightweight local web server that receives the request from the browser, formats a safe AI prompt with strict guardrails (never inventing delivery dates, tracking numbers, or refunds), and calls the Google Gemini API using a secret API key stored safely in an environment file (`.env`). If no API key is provided, the backend seamlessly uses a smart built-in fallback mode so the application can be verified and demonstrated immediately with zero setup cost.

This architecture ensures secret API keys are never exposed in the browser or committed to GitHub, while keeping setup completely effortless.

## The Core Journey Through the System
1. **User Input**: The user enters a customer query and selects language and tone in the browser UI.
2. **Client Request**: When the user clicks **Generate Reply**, the frontend validates the text and sends an HTTP POST request to `/api/generate` with a JSON payload: `{ message, language, tone }`.
3. **Server Processing**: The Express backend receives the payload, validates the inputs, and constructs a system prompt enforcing the chosen language, tone, and Indian retail safety rules (inserting bracketed placeholders like `[Order ID]` for missing facts).
4. **AI Generation**: The backend calls the Google Gemini API (or the zero-configuration simulation service if `GEMINI_API_KEY` is not present).
5. **Response Delivery**: The server returns `{ reply, language, tone, status: "success" }` back to the browser.
6. **Display & Copy**: The frontend displays the reply, hides the spinner, enables the **Copy Reply** button, and offers instant clipboard feedback.

PRD ref: `prd.md > The Core Journey`.

## Stack
- **Runtime Environment**: Node.js (v18+ or v20+) — cross-platform JavaScript runtime.
  - Link: [Node.js Documentation](https://nodejs.org/docs/)
- **Backend Framework**: Express.js (v4.x) — fast, unopinionated, minimalist web framework for Node.js.
  - Link: [Express.js Documentation](https://expressjs.com/)
- **AI Integration**: Google Gemini API via `@google/genai` or direct Gemini REST endpoint.
  - Link: [Google Gemini API Docs](https://ai.google.dev/docs)
- **Frontend**: Modern vanilla HTML5, CSS3, and JavaScript (ES6+).
  - Clean responsive styling using modern CSS variables, flexbox, and grid for seamless mobile and desktop performance without complex build pipelines.
- **Environment Management**: `dotenv` — loads environment variables from `.env`.
  - Link: [dotenv Documentation](https://github.com/motdotla/dotenv)

## Where It Runs and How Someone Tries It
- **Runtime**: Runs locally as a Node.js process and is accessed via any modern web browser (Chrome, Edge, Firefox, Safari).
- **Environment Requirements**: Node.js and npm installed. A Gemini API key is optional (smart simulation mode is available out-of-the-box for instant review).
- **Start Command**:
  ```bash
  npm install
  npm start
  ```
- **Access URL**: Open `http://localhost:3000` in your web browser.
- **Hackathon Deliverables**:
  - A short video demo recording the core journey on screen.
  - Public GitHub repository containing clean source code, planning documentation (`scope.md`, `prd.md`, `spec.md`, `checklist.md`), and setup instructions.

## Look and Feel
- **Visual Aesthetic**: Polished, modern, and trustworthy. Designed with mobile usability at the core.
- **Palette**:
  - Background: Crisp Slate (`#F8FAFC`) with subtle contrast.
  - Surface Cards: Pure White (`#FFFFFF`) with soft drop shadows (`rgba(0, 0, 0, 0.05)`).
  - Primary Brand: Deep Indigo (`#4F46E5`), Hover (`#4338CA`).
  - Accent / Success: Emerald Green (`#10B981`) for copy confirmations and ready states.
  - Text: Dark Charcoal (`#0F172A`) for high-contrast legibility.
- **Typography**: Native modern system font stack (`system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif`) with full unicode rendering for Devanagari (Hindi) and Gujarati scripts.
- **Density**: Comfortable spacing with touch-friendly button targets (minimum 44px) for mobile phone screens.

## Components

### 1. Web Client (`public/index.html`, `public/app.js`, `public/style.css`)
- Renders the header, quick-example scenario buttons, customer message input, language/tone selectors, and output display.
- Handles input validation, API calls, loading indicators, clipboard copying, and error display.
- Implements `prd.md > Screens and Layout`, `prd.md > Features and Behavior`.

### 2. Express Server (`server.js`)
- Serves static assets from `public/`.
- Exposes `POST /api/generate` and `GET /api/health`.
- Handles CORS, JSON body parsing, input sanitization, and structured HTTP error responses.
- Implements `prd.md > Features and Behavior > 4. AI Reply Generation & Safety Guardrails`.

### 3. Gemini Service Module (`services/gemini.js`)
- Encapsulates interaction with the Gemini API.
- Constructs the localized Indian retail prompt with safety constraints.
- Provides automatic fallback to realistic localized simulated replies if no API key is configured.
- Implements `prd.md > States and Boundaries > Offline / Mock Mode`.

## Data Model
### Request Body (`POST /api/generate`)
```json
{
  "message": "string (1-2000 characters, required)",
  "language": "english" | "hindi" | "gujarati" (default: "english"),
  "tone": "friendly" | "professional" | "apologetic" (default: "friendly")
}
```

### Response Body (`200 OK`)
```json
{
  "status": "success",
  "reply": "string (the generated reply)",
  "language": "english" | "hindi" | "gujarati",
  "tone": "friendly" | "professional" | "apologetic",
  "isSimulated": boolean
}
```

### Error Response Body (`400 Bad Request` or `500 Server Error`)
```json
{
  "status": "error",
  "message": "User-friendly error explanation"
}
```

## File Structure
```
Replygenius/
├── .env.example            # Sample environment variables (safe for Git)
├── .gitignore              # Ignores .env and personal learner context
├── package.json            # Node.js project manifest and dependencies
├── server.js               # Main Express web server & API routes
├── public/                 # Static frontend assets
│   ├── index.html          # Main HTML user interface
│   ├── style.css           # Modern responsive design & typography
│   └── app.js              # Client-side logic, API calls & copy handler
├── services/               # Backend business logic
│   └── gemini.js           # Gemini API client & safety prompt builder
├── test/                   # Verification and test scripts
│   └── test-api.js         # Automated backend endpoint verification
├── devpost/                # Hackathon planning & learning documentation
│   ├── learner-profile.md  # Learner background (ignored from git)
│   ├── scope.md            # Approved project scope
│   ├── prd.md              # Approved product requirements document
│   ├── spec.md             # Approved technical specification
│   └── checklist.md        # Step-by-step build checklist & verification
└── README.md               # Quickstart guide & documentation
```

## External Services and Dependencies
- **Google Gemini API**: Free tier access (`gemini-2.5-flash` or `gemini-1.5-flash`).
  - Auth: `GEMINI_API_KEY` stored in `.env`.
  - Rate limits: Generous free quota (15 RPM) suitable for hackathons and PoCs.
  - Zero-Cost Fallback: If unconfigured, the app uses a built-in prompt engine that generates realistic context responses without network errors.

## Important Failure Modes
- **Empty or Whitespace Input**: Frontend shows an inline warning and prevents API dispatch. Backend returns `400 Bad Request` if bypassed.
- **Missing or Invalid API Key**: If the API key is missing or quota is exhausted, the server gracefully returns a high-quality simulated response labeled with a helpful badge rather than crashing.
- **Network / Server Disconnect**: Frontend displays a dismissible retry banner explaining that the connection was interrupted.
- **Clipboard Access Denied**: Falls back to an automatic text selection so the user can easily press Ctrl+C / Cmd+C.

## What Was Simplified and Why
- **Vanilla Frontend without Framework**: Used standard HTML/CSS/JS instead of React/Next.js to avoid heavyweight compilation steps, huge bundle sizes, and complexity for a beginner developer, while delivering sub-second load times.
- **In-Memory / Stateless Design**: Avoided setting up an external database (PostgreSQL, MongoDB), keeping local setup to a single `npm install` command.
- **Zero-Cost Simulation Fallback**: Permitted the app to be fully functional immediately without forcing the learner or hackathon judges to obtain or pay for an API key before testing.

## Decisions and Open Issues
- **Technology Choice**: Node.js + Express + Vanilla Web frontend chosen for maximum reliability, speed, and simplicity.
- **Indic Script Support**: Native UTF-8 encoding ensures Hindi and Gujarati text renders crisply across all operating systems.
- **Learner Uncertainty Clarified**: The learner expressed caution around API keys and unexpected billing. This was resolved by implementing a zero-risk default mode and isolating any API key to a server-side `.env` file that is never exposed to the client or git.
