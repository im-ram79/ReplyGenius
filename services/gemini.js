/**
 * ReplyGenius - AI Generation Service
 * Handles prompt construction with safety guardrails and calls Gemini API,
 * with an offline simulated fallback for zero-cost, instant testing.
 */

// Safety instructions ensuring the AI does not hallucinate facts
const SYSTEM_INSTRUCTIONS = `
You are ReplyGenius, an AI customer message assistant for small retail and service businesses in India.
Your mission is to write a polite, respectful, and helpful reply to the customer's message.

STRICT SAFETY AND FACTUAL INTEGRITY RULES:
1. NEVER invent order numbers, shipping tracking codes, delivery dates, refund amounts, or company policies.
2. If the customer is asking about status, delivery, or money, politely acknowledge their inquiry and include clear bracketed placeholders for the business owner to fill in (e.g., "[Order ID]", "[Expected Delivery Date]", "[Refund Amount]", "[Shop Name]").
3. Match the requested tone and language accurately:
   - Languages: English, Hindi (हिंदी in Devanagari script), or Gujarati (ગુજરાતી in Gujarati script).
   - Tones:
     * Friendly: Warm, respectful, approachable, and customer-first.
     * Professional: Courteous, concise, formal, and business-like.
     * Apologetic: Empathetic, calm, reassuring, taking ownership without making unverified legal/financial guarantees.
4. Output ONLY the response message ready to be sent to the customer. Do not include metadata, quotes, or conversational preambles.
`;

/**
 * Intelligent fallback generator when GEMINI_API_KEY is not set or network is offline.
 * Provides realistic responses for the three languages and three tones.
 */
function generateFallbackReply(message, language = 'english', tone = 'friendly') {
  const lowerMsg = message.toLowerCase();
  const isDelivery = lowerMsg.includes('deliver') || lowerMsg.includes('parcel') || lowerMsg.includes('order') || lowerMsg.includes('dispatch') || lowerMsg.includes('kaha') || lowerMsg.includes('kab') || lowerMsg.includes('મળ્યું') || lowerMsg.includes('પાર્સલ');
  const isDefect = lowerMsg.includes('damage') || lowerMsg.includes('broken') || lowerMsg.includes('tear') || lowerMsg.includes('defect') || lowerMsg.includes('kharab') || lowerMsg.includes('ખરાબ');
  const isPrice = lowerMsg.includes('price') || lowerMsg.includes('cost') || lowerMsg.includes('rate') || lowerMsg.includes('discount') || lowerMsg.includes('kitna') || lowerMsg.includes('ભાવ');

  if (language.toLowerCase() === 'hindi') {
    if (tone.toLowerCase() === 'apologetic') {
      return `नमस्ते जी, आपको हुई असुविधा के लिए हमें बेहद खेद है। हमने आपकी शिकायत (ऑर्डर आईडी: [Order ID]) दर्ज कर ली है। हमारी टीम इसे तुरंत देख रही है और हम [Expected Time] तक आपको पूरा समाधान देंगे। आपके धैर्य के लिए धन्यवाद। - [Shop Name]`;
    } else if (tone.toLowerCase() === 'professional') {
      if (isDelivery) {
        return `नमस्ते, आपके संदेश के लिए धन्यवाद। आपके ऑर्डर ([Order ID]) की वर्तमान स्थिति की जांच की जा रही है। यह आदेश [Expected Delivery Date] तक पहुंचने की संभावना है। किसी भी अन्य जानकारी के लिए कृपया बताएं। - [Shop Name]`;
      }
      return `नमस्ते, [Shop Name] से संपर्क करने के लिए धन्यवाद। आपका संदेश हमें मिल गया है। इस बारे में हम आपको [Specific Detail/Price] की जानकारी जल्द ही साझा करेंगे। सादर, [Owner/Team Name]`;
    } else { // friendly
      if (isDelivery) {
        return `नमस्ते जी! आपके ऑर्डर का स्टेटस चेक करने के लिए धन्यवाद। आपका पार्सल ([Order ID]) रास्ते में है और [Expected Delivery Date] तक आपके पास पहुंच जाएगा। अगर कोई और मदद चाहिए तो जरूर बताएं! 😊 - [Shop Name]`;
      }
      return `नमस्ते जी! हमसे संपर्क करने के लिए बहुत-बहुत धन्यवाद। हम आपके प्रश्न को समझ गए हैं और [Product/Query Detail] की पूरी जानकारी जल्द से जल्द भेज रहे हैं। आपका दिन शुभ हो! ✨ - [Shop Name]`;
    }
  } else if (language.toLowerCase() === 'gujarati') {
    if (tone.toLowerCase() === 'apologetic') {
      return `નમસ્તે, તમને થયેલી અસુવિધા માટે અમે દિલગીર છીએ. અમે તમારી ફરિયાદ (ઓર્ડર નંબર: [Order ID]) નોંધી લીધી છે અને [Expected Time] સુધીમાં યોગ્ય ઉકેલ આપીશું. તમારા સહકાર બદલ આભાર. - [Shop Name]`;
    } else if (tone.toLowerCase() === 'professional') {
      return `નમસ્તે, [Shop Name] નો સંપર્ક કરવા બદલ આભાર. તમારા ઓર્ડર ([Order ID]) અંગેની વિગતો ચકાસાઈ રહી છે. આ ઓર્ડર [Expected Delivery Date] સુધી પહોંચવાની શક્યતા છે. સાદર, [Owner Name]`;
    } else { // friendly
      return `નમસ્તે! [Shop Name] માં આપનું સ્વાગત છે. તમારો મેસેજ મળ્યો છે અને અમે તમારા ઓર્ડર ([Order ID]) ની સંપૂર્ણ વિગત [Expected Date/Time] સુધીમાં મોકલી આપીશું. કોઈપણ પ્રશ્ન હોય તો અચૂક જણાવશો! 😊`;
    }
  } else {
    // English
    if (tone.toLowerCase() === 'apologetic') {
      return `Dear Customer, we sincerely apologize for the inconvenience caused. We have noted your concern regarding [Order ID / Issue]. Our team is actively looking into this and will provide an update by [Expected Time/Date]. Thank you for your patience and understanding. - [Shop Name]`;
    } else if (tone.toLowerCase() === 'professional') {
      if (isDelivery) {
        return `Hello, thank you for reaching out to [Shop Name]. We have received your inquiry regarding order [Order ID]. Your package is scheduled for delivery on [Expected Delivery Date]. Please let us know if you require any further assistance. Best regards, [Team Name]`;
      }
      return `Hello, thank you for contacting [Shop Name]. We have received your message regarding [Product / Service]. Our team is reviewing the details and will get back to you shortly with [Price / Information]. Best regards, [Team Name]`;
    } else { // friendly
      if (isDelivery) {
        return `Hi there! Thanks for checking in on your order ([Order ID]). It is currently on its way and should reach you by [Expected Delivery Date]. Feel free to message us if you need anything else! Have a wonderful day! 😊 - [Shop Name]`;
      }
      return `Hello! Thank you so much for reaching out to [Shop Name]. We'd be delighted to help you with [Product / Inquiry]. We will share all the details with you by [Time/Date]. Let us know if you have any questions! ✨`;
    }
  }
}

/**
 * Main generateReply function
 */
async function generateReply({ message, language = 'english', tone = 'friendly' }) {
  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    throw new Error('Message text is required and cannot be empty.');
  }

  const apiKey = process.env.GEMINI_API_KEY;

  // If no API key is provided, use the smart fallback immediately
  if (!apiKey || apiKey.trim() === '' || apiKey === 'YOUR_GEMINI_API_KEY_HERE') {
    return {
      reply: generateFallbackReply(message, language, tone),
      isSimulated: true,
      language,
      tone
    };
  }

  // Call Google Gemini API
  try {
    const prompt = `
Language requested: ${language}
Tone requested: ${tone}
Customer Message: "${message}"

Write the response following the strict rules. Output only the final response text:
`;

    // Try Gemini 1.5 Flash or Gemini 2.5 Flash endpoint
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: SYSTEM_INSTRUCTIONS }]
        },
        contents: [{
          parts: [{ text: prompt }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 300
        }
      })
    });

    if (!response.ok) {
      console.warn(`Gemini API returned status ${response.status}. Using smart fallback.`);
      return {
        reply: generateFallbackReply(message, language, tone),
        isSimulated: true,
        language,
        tone
      };
    }

    const data = await response.json();
    const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!candidateText || candidateText.trim().length === 0) {
      return {
        reply: generateFallbackReply(message, language, tone),
        isSimulated: true,
        language,
        tone
      };
    }

    return {
      reply: candidateText.trim(),
      isSimulated: false,
      language,
      tone
    };
  } catch (err) {
    console.error('Error invoking Gemini API:', err.message);
    // Graceful fallback prevents crashes
    return {
      reply: generateFallbackReply(message, language, tone),
      isSimulated: true,
      language,
      tone
    };
  }
}

module.exports = {
  generateReply,
  generateFallbackReply
};
