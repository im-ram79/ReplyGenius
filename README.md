# 🇮🇳 ReplyGenius

**AI-powered customer message reply generator designed for small businesses, shopkeepers, and retailers in India.**

Built for the **Devpost Build With AI: Basics** Hackathon.

---

## 💡 About the Project

Small business owners in India receive dozens of customer inquiries daily across WhatsApp, SMS, and email. Responding manually takes valuable time, and communicating politely across different Indian regional languages (English, Hindi, and Gujarati) can be challenging.

**ReplyGenius** solves this by generating instant, culturally respectful, and tone-appropriate customer replies in seconds.

### 🛡️ Built-in Factual Safety
A critical design requirement: **ReplyGenius never hallucinates or invents fake order statuses, delivery dates, refund amounts, or store policies.** If specific facts are missing, the AI automatically inserts clearly labeled bracketed placeholders (such as `[Order ID]`, `[Expected Delivery Date]`, or `[Shop Name]`) for the owner to review before hitting send.

---

## ✨ Core Features

- 📱 **Mobile-First Responsive Interface**: Clean, accessible UI designed for both smartphones and desktops.
- 🌐 **Tri-Language Support**:
  - **English**
  - **Hindi (हिंदी)**
  - **Gujarati (ગુજરાતી)**
- 🎭 **Three Tailored Tones**:
  - **Friendly (दोस्ताना / મૈત્રીપૂર્ણ)**: Warm, polite, and approachable.
  - **Professional (व्यावसायिक / વ્યાવસાયિક)**: Courteous, structured, and concise.
  - **Apologetic (माफीनामा / દિલગીર)**: Empathetic, calm, and reassuring for handling disputes or delays.
- ⚡ **One-Click Quick Scenarios**: Example chips for common situations (Delivery Delay, Defective Item, Payment Check, Bulk Discounts).
- 📋 **One-Click Copy**: Instant clipboard copy with visual confirmation.
- 🆓 **Zero-Cost Smart Mode**: Fully testable immediately without needing a paid API key or billing setup.
- 🔒 **Secure Backend**: API keys are handled strictly on the Node.js backend and never exposed to the client or committed to GitHub.

---

## 🛠️ Technology Stack

- **Runtime**: Node.js (v18+)
- **Backend**: Express.js
- **Frontend**: Modern Vanilla HTML5, CSS3 (Custom Responsive Properties), and JavaScript (ES6+)
- **AI Integration**: Google Gemini API (`@google/genai` / Gemini REST) with intelligent offline fallback
- **Configuration**: `dotenv` with safe `.env.example`

---

## 🚀 Quickstart Guide

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18 or higher recommended).

### 1. Clone the repository
```bash
git clone https://github.com/your-username/ReplyGenius.git
cd ReplyGenius
```

### 2. Install dependencies
```bash
npm install
```

### 3. (Optional) Configure Gemini API Key
ReplyGenius runs out-of-the-box in **Zero-Cost Smart Mode** without an API key!

If you wish to use a live Google Gemini key:
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Open `.env` and add your free Gemini API key:
   ```env
   GEMINI_API_KEY=your_actual_key_here
   ```
   *(You can obtain a free key at [Google AI Studio](https://aistudio.google.com/)).*

### 4. Start the Application
```bash
npm start
```
Open your browser and navigate to:
```
http://localhost:3000
```

---

## 🧪 Running Automated Tests

Run the included automated test suite to verify health, multi-language generation, and input validation:

```bash
npm test
```

---

## 📂 Hackathon Planning Documentation

This project was built following the official **Devpost Learn AI Basics** spec-driven curriculum:

- [`devpost/scope.md`](devpost/scope.md) — Idea definition, unique kernel, and PoC boundaries.
- [`devpost/prd.md`](devpost/prd.md) — Product Requirements Document, core journey, and acceptance criteria.
- [`devpost/spec.md`](devpost/spec.md) — Technical blueprint, component architecture, and failure modes.
- [`devpost/checklist.md`](devpost/checklist.md) — Verified end-to-end build slices and commit checkpoints.

---

## 🔒 Security & Privacy

- `.gitignore` strictly protects `.env`, `.env.*`, and personal learning context.
- All external API calls originate server-side to guarantee client key protection.
- No personal customer data is stored or logged.

---

## 📜 License
MIT License. Created by Yash Singh for the Build With AI: Basics Hackathon.
# ReplyGenius
