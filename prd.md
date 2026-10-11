---
doc: prd
status: approved
---

# ReplyGenius — Product Requirements Document (PRD)

A lightweight AI-powered customer message reply generator designed for Indian small business owners, retailers, and freelancers.
Source: `scope.md > Who It's For` and `scope.md > The Core Loop`.

## The Core Journey
1. **Arrival**: The user opens ReplyGenius in their web browser (on smartphone or laptop).
2. **Context Input**: The user enters an incoming customer inquiry into the text box, or clicks one of the provided quick-example message chips (e.g., "Late Delivery Inquiry", "Damaged Item Report", "Product Availability").
3. **Configuration**: The user selects the desired response Language (English, Hindi, or Gujarati) and Tone (Friendly, Professional, or Apologetic).
4. **Action**: The user clicks **Generate Reply**.
5. **Generation**: The application displays a loading spinner and disables the button during processing.
6. **Result & Safety**: The AI generates a polite, contextually accurate reply in the selected language and tone. If specific details (dates, order numbers, refund amounts) are unknown, placeholders such as `[Order ID]` or `[Date]` are clearly shown rather than fabricated.
7. **Copy & Deliver**: The user clicks **Copy Reply**, receives immediate visual confirmation ("Copied to clipboard!"), and pastes the response into WhatsApp, SMS, or email.

## Screens and Layout
ReplyGenius uses a single, focused, responsive screen:
- **Header**: App branding ("ReplyGenius"), tagline ("AI Customer Reply Assistant for Indian Small Businesses"), and a status badge indicating system readiness.
- **Example Chips Bar**: Quick clickable scenarios for instant testing ("Delivery Delay", "Product Pricing", "Defective Item Complaint").
- **Message Input Area**: Clean text area with a placeholder and character counter.
- **Controls Bar**:
  - Language Selector: Segmented controls or dropdown for English, Hindi (हिंदी), and Gujarati (ગુજરાતી).
  - Tone Selector: Segmented controls for Friendly (दोस्ताना / મૈત્રીપૂર્ણ), Professional (व्यावसायिक / વ્યાવસાયિક), Apologetic (माफीनामा / દિલગીર).
  - Primary Action: Prominent "Generate Reply" button with icon.
- **Output Card**:
  - Text display area showing the generated response.
  - "Copy Reply" button with clipboard icon and visual copy feedback.
  - Character and word count indicators.
  - Safety reminder notice: "Please review and replace bracketed placeholders before sending."
- **Feedback & Alerts**: Toast or banner messages for errors, empty input validation, and copy confirmations.

## Look and Feel
- **Visual Style**: Clean, modern, trustworthy, and mobile-first.
- **Color Palette**: 
  - Primary: Deep Indigo (`#4F46E5`) for primary actions and focus highlights.
  - Secondary / Accent: Emerald Green (`#10B981`) for success badges and copy confirmations.
  - Neutral: Crisp slate background (`#F8FAFC`) with elevated white cards (`#FFFFFF`) and dark slate typography (`#1E293B`).
- **Typography**: Clean, legible sans-serif font stack (Inter or system-ui) supporting Latin and Indic scripts (Devanagari for Hindi, Gujarati script).
- **Tone of Copy**: Respectful, encouraging, straightforward, and jargon-free.

## Features and Behavior

### 1. Customer Message Input
- A multi-line text area allowing users to enter customer queries.
- Input validation: Prompts the user if they click Generate with an empty or whitespace-only message.
- Clear button to quickly reset the text area.

### 2. Language and Tone Customization
- **Languages Supported**:
  - English (default)
  - Hindi (हिंदी)
  - Gujarati (ગુજરાતી)
- **Tones Supported**:
  - **Friendly**: Warm, polite, conversational, customer-centric.
  - **Professional**: Formal, structured, business-like, concise.
  - **Apologetic**: Empathetic, de-escalating, taking accountability for customer issues without making unverified legal/financial guarantees.

### 3. Quick-Start Example Scenarios
- Pre-populated buttons representing typical Indian retail situations:
  1. *Delivery Inquiry*: "Bhaiya mera parcel abhi tak nahi mila, kab aayega?" (Hindi)
  2. *Defective Item*: "The shirt I received has a tear on the sleeve. What should I do?" (English)
  3. *Payment / Order Confirmation*: "મેં પેમેન્ટ કરી દીધું છે પણ હજુ કન્ફર્મેશન મળ્યું નથી." (Gujarati)
- Clicking a chip immediately populates the message box and sets suggested language/tone.

### 4. AI Reply Generation & Safety Guardrails
- Implements strict prompt instructions to avoid hallucinating facts:
  - Never fabricate order status, delivery dates, tracking numbers, or refund amounts.
  - When facts are required, provide clean placeholders like `[Order Number]`, `[Expected Delivery Date]`, or `[Shop Name]`.
- Displays an accessible loading spinner and disabled state while awaiting AI response.

### 5. Copy to Clipboard
- One-click copy button using the modern Web Clipboard API.
- Visual state transition: button text updates to "✓ Copied!" for 2 seconds with an emerald accent highlight.
- Graceful fallback for non-secure contexts.

## States and Boundaries
- **First Use (Blank State)**: Text area empty, placeholder visible, example chips highlighted, output card displays a helpful instructional prompt ("Your generated reply will appear here").
- **Loading State**: Primary button disabled, spinner active, output card displays subtle skeleton or loading animation.
- **Success State**: Formatted response visible in output card, Copy button active, character count displayed.
- **Validation State**: Empty message triggers a red/amber inline warning: "Please enter a customer message first."
- **Error State**: Network failure or API rate-limit displays a dismissible banner with a friendly error message and retry prompt.
- **Offline / Mock Mode**: If no Gemini API key is configured, the app seamlessly provides realistic simulated responses so reviewers and users can fully test the complete UI loop at zero cost.

## Product Decisions
- **Single Page Application**: Keeps the experience frictionless for busy shopkeepers.
- **Indic Script Support**: Native rendering for Hindi and Gujarati scripts without requiring external font downloads.
- **Safe Placeholders**: Explicitly preventing hallucinated business guarantees protects shop reputation and prevents customer disputes.
- **Zero-Cost Mock Fallback**: Ensures anyone grading the hackathon can immediately run and test the app without having to configure an external paid account.

## What We're Building
- Complete responsive frontend (HTML, Tailwind CSS / modern CSS, JavaScript).
- Lightweight Express / Node.js backend server serving the frontend and handling `/api/generate`.
- Gemini API backend integration using the official `@google/genai` or Google Gemini REST API.
- Environment variable configuration via `.env` with a safe `.env.example`.
- Automated test scripts and end-to-end verification.

## Deferred From the POC
- Direct WhatsApp API / Webhook integration (requires Meta Business verification).
- User authentication and persistent databases.
- Multi-user shop teams and role management.
- Voice-to-text input in Indian languages.

## Non-Goals
- Inventing shipment or payment tracking data.
- Handling payment gateways or processing refunds.
- Replacing the human business owner's final judgement before sending.

## Open Questions
- Free tier Gemini API model: Gemini 2.5 Flash / Gemini 1.5 Flash provides fast, low-latency, free-tier-compatible responses for multi-language text.
