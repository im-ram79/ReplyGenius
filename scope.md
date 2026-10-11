---
doc: scope
status: approved
---

# ReplyGenius

A simple AI-powered customer message reply generator for small businesses in India.

## The Unique Kernel
Specifically tailored for Indian small business owners and shopkeepers handling everyday customer inquiries, offering localized multi-language generation (English, Hindi, and Gujarati) across distinct business tones (Friendly, Professional, Apologetic), with built-in safety prompts that never fabricate delivery timelines, order numbers, refunds, or policies.

## Who It's For
A small shop owner, boutique retailer, service provider, or freelancer in India who communicates with customers through WhatsApp, SMS, or email and needs quick, polite, and culturally appropriate customer replies without spending stressful minutes drafting each one.

## The Core Loop
1. The user opens ReplyGenius on their phone or desktop browser.
2. The user types/pastes a customer message or clicks one of the realistic example scenarios.
3. The user picks their target language (English, Hindi, Gujarati) and tone (Friendly, Professional, Apologetic).
4. The user clicks **Generate Reply**.
5. ReplyGenius generates a relevant, polite response with placeholder tags like `[Insert Date]` or `[Order ID]` for any unverified factual details.
6. The user clicks **Copy Reply** to copy the generated text directly to their clipboard with instant feedback.

## Inspiration & Identity
- Clean, modern, trustworthy interface optimized for mobile and desktop screens.
- Modern color scheme: Clean slate background with vibrant indigo and emerald accents.
- Interface tone: Clear, approachable, intuitive, and reassuring.

## Why This Matters to the Learner
Allows a beginner creator to build and deploy their first real full-stack AI web application, mastering plan-first development, API key security, and practical full-stack execution for the Devpost Build With AI: Basics hackathon.

## What "Working" Looks Like
Opening the web application in a browser, clicking an example message (e.g., "Mera order kab dispatch hoga?"), selecting Hindi + Friendly, clicking **Generate Reply**, seeing a spinner, and receiving a polite Hindi reply with a functional one-click **Copy Reply** button and toast notification.

## The POC Boundary
- Responsive, mobile-first web interface.
- Customer message text area with validation (cannot be empty).
- Language dropdown / buttons: English, Hindi, Gujarati.
- Tone selection: Friendly, Professional, Apologetic.
- Example message chips for immediate one-click testing.
- Secure Node.js backend to prevent API key exposure in client code.
- Gemini API integration with zero-cost fallback simulation mode for testing without a secret key.
- One-click copy-to-clipboard functionality with visual confirmation.
- Error handling with user-friendly error banners.

## Later
- Direct "Send via WhatsApp" one-click action.
- Additional Indian regional languages (Tamil, Telugu, Bengali, Marathi, Kannada).
- Custom shop settings (saving shop name, signature, and owner contact details).
- Local storage history of past generated replies.

## Explicitly Cut
- User login / authentication accounts (not needed for immediate copy-paste utility).
- Database storage (adds deployment friction without improving the core PoC loop).
- Automated customer message sync (WhatsApp Business API integration is complex and paid).
- Fabricating business policies, refunds, or tracking details (the AI is strictly instructed to use bracketed placeholders if facts are missing).
