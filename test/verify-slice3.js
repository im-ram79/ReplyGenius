const fs = require('fs');
const js = fs.readFileSync('public/app.js', 'utf8');
const html = fs.readFileSync('public/index.html', 'utf8');

const hasCopyBtn = html.includes('id="copyBtn"') && js.includes('copyBtn.addEventListener');
const hasClipboard = js.includes('navigator.clipboard') && js.includes('execCommand');
const hasValidation = html.includes('validationAlert') && js.includes('validationAlert');
const hasClear = html.includes('clearBtn') && js.includes('clearBtn');
const hasToast = html.includes('id="toast"') && js.includes('showToast');

console.log({ hasCopyBtn, hasClipboard, hasValidation, hasClear, hasToast });

if (hasCopyBtn && hasClipboard && hasValidation && hasClear && hasToast) {
  console.log('SLICE_3_MECHANICAL_VERIFICATION_SUCCESS');
  process.exit(0);
} else {
  console.error('Verification failed');
  process.exit(1);
}
