/**
 * ReplyGenius — Client-Side Application Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  const API_BASE = window.location.origin; // Base URL for API calls (same origin in dev)
  // DOM Elements
  const messageInput = document.getElementById('messageInput');
  const charCount = document.getElementById('charCount');
  const clearBtn = document.getElementById('clearBtn');
  const generateBtn = document.getElementById('generateBtn');
  const btnTextContent = generateBtn.querySelector('.btn-text-content');
  const btnLoader = generateBtn.querySelector('.btn-loader');
  const validationAlert = document.getElementById('validationAlert');
  const copyBtn = document.getElementById('copyBtn');
  const copyText = document.getElementById('copyText');
  const copyIcon = document.getElementById('copyIcon');
  const placeholderState = document.getElementById('placeholderState');
  const resultText = document.getElementById('resultText');
  const outputFooter = document.getElementById('outputFooter');
  const toast = document.getElementById('toast');
  const statusText = document.getElementById('statusText');

  // Check Backend Health
  async function checkHealth() {
    try {
      const res = await fetch(`${API_BASE}/api/health`);
      if (res.ok) {
        const ct = res.headers.get('content-type') || '';
        if (!ct.includes('application/json')) {
          throw new Error('Health endpoint returned non‑JSON (likely HTML).');
        }
        const data = await res.json();
        if (data.apiKeyConfigured) {
          statusText.textContent = 'Ready • Gemini Active';
        } else {
          statusText.textContent = 'Ready • Smart Simulation Mode';
        }
      }
    } catch {
      statusText.textContent = 'Offline';
    }
  }
  checkHealth();

  // Character Counter
  messageInput.addEventListener('input', () => {
    charCount.textContent = messageInput.value.length;
    if (messageInput.value.trim().length > 0) {
      validationAlert.style.display = 'none';
    }
  });

  // Clear Input
  clearBtn.addEventListener('click', () => {
    messageInput.value = '';
    charCount.textContent = '0';
    validationAlert.style.display = 'none';
    messageInput.focus();
  });

  // Radio Pill Active State Management
  function setupRadioPills(groupSelector) {
    const pills = document.querySelectorAll(`${groupSelector} .radio-pill`);
    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const input = pill.querySelector('input[type="radio"]');
        if (input) input.checked = true;
      });
    });
  }
  setupRadioPills('#languageSelector');
  setupRadioPills('#toneSelector');

  // Example Chips Click Handler
  const chips = document.querySelectorAll('.chip');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const msg = chip.getAttribute('data-msg');
      const lang = chip.getAttribute('data-lang');
      const tone = chip.getAttribute('data-tone');

      if (msg) {
        messageInput.value = msg;
        charCount.textContent = msg.length;
        validationAlert.style.display = 'none';
      }

      // Sync Language
      if (lang) {
        const langInput = document.querySelector(`input[name="language"][value="${lang}"]`);
        if (langInput) {
          langInput.checked = true;
          document.querySelectorAll('#languageSelector .radio-pill').forEach(p => p.classList.remove('active'));
          langInput.closest('.radio-pill').classList.add('active');
        }
      }

      // Sync Tone
      if (tone) {
        const toneInput = document.querySelector(`input[name="tone"][value="${tone}"]`);
        if (toneInput) {
          toneInput.checked = true;
          document.querySelectorAll('#toneSelector .radio-pill').forEach(p => p.classList.remove('active'));
          toneInput.closest('.radio-pill').classList.add('active');
        }
      }

      showToast('Example loaded! Click Generate Reply.');
    });
  });

  // Toast Helper
  let toastTimer = null;
  function showToast(message) {
    if (toastTimer) clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add('show');
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2500);
  }

  // Get Active Values
  function getSelectedValue(name) {
    const checked = document.querySelector(`input[name="${name}"]:checked`);
    return checked ? checked.value : null;
  }

  // Generate Reply Handler
  generateBtn.addEventListener('click', async () => {
    const message = messageInput.value.trim();
    if (!message) {
      validationAlert.style.display = 'block';
      validationAlert.textContent = 'Please enter or choose a customer message first.';
      messageInput.focus();
      return;
    }

    validationAlert.style.display = 'none';

    // Show Loading
    generateBtn.disabled = true;
    btnTextContent.style.display = 'none';
    btnLoader.style.display = 'inline-flex';
    copyBtn.disabled = true;

    const language = getSelectedValue('language') || 'english';
    const tone = getSelectedValue('tone') || 'friendly';

    try {
      const response = await fetch(`${API_BASE}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, language, tone })
      });

      // Ensure we got JSON, not HTML fallback
      const contentType = response.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        throw new Error('Server returned non‑JSON (likely HTML). Ensure the backend is running and the URL is correct.');
      }
      const data = await response.json();

      if (response.ok && data.status === 'success') {
        // Display Result
        placeholderState.style.display = 'none';
        resultText.style.display = 'block';
        resultText.textContent = data.reply;
        outputFooter.style.display = 'block';
        copyBtn.disabled = false;
        showToast('Reply generated successfully! ✨');
      } else {
        throw new Error(data.message || 'Server error occurred');
      }
    } catch (err) {
      console.error('Generation failed:', err);
      validationAlert.style.display = 'block';
      validationAlert.textContent = `Error: ${err.message || 'Unable to generate reply. Please try again.'}`;
    } finally {
      // Reset Button
      generateBtn.disabled = false;
      btnTextContent.style.display = 'inline';
      btnLoader.style.display = 'none';
    }
  });

  // Copy to Clipboard Handler
  copyBtn.addEventListener('click', async () => {
    const textToCopy = resultText.textContent;
    if (!textToCopy) return;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      // Visual Success State
      copyBtn.classList.add('copied');
      copyIcon.textContent = '✓';
      copyText.textContent = 'Copied!';
      showToast('Copied to clipboard! Ready to paste into WhatsApp/Email.');

      setTimeout(() => {
        copyBtn.classList.remove('copied');
        copyIcon.textContent = '📋';
        copyText.textContent = 'Copy Reply';
      }, 2000);
    } catch (err) {
      console.error('Clipboard copy failed:', err);
      showToast('Could not copy automatically. Please select text manually.');
    }
  });
});
