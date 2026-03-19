// ==================== LOGIC GATE DEFINITIONS ====================
// Service Worker Registration
if ('serviceWorker' in navigator) {
  // Only attempt registration if it's not a local file:// to avoid console spam during local dev
  if (location.protocol !== 'file:') {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
          .then((registration) => {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
          }, (err) => {
            console.log('ServiceWorker registration failed: ', err);
          });
      });
  }
}

const LOGIC_GATES = {
    AND: {
        name: 'AND',
        symbol: '∧',
        formula: 'X = A · B',
        description: 'الناتج يكون 1 فقط عندما يكون كلا المدخلين 1',
        operation: (a, b) => a && b,
        inputs: 2
    },
    OR: {
        name: 'OR',
        symbol: '∨',
        formula: 'X = A + B',
        description: 'الناتج يكون 1 عندما يكون أحد المدخلين على الأقل 1',
        operation: (a, b) => a || b,
        inputs: 2
    },
    NOT: {
        name: 'NOT',
        symbol: '¬',
        formula: 'X = A\'',
        description: 'الناتج هو عكس المدخل A',
        operation: (a) => !a,
        inputs: 1
    },
    XOR: {
        name: 'XOR',
        symbol: '⊕',
        formula: 'X = A ⊕ B',
        description: 'الناتج يكون 1 عندما يكون المدخلان مختلفين',
        operation: (a, b) => a !== b,
        inputs: 2
    },
    NAND: {
        name: 'NAND',
        symbol: '⊼',
        formula: 'X = (A · B)\'',
        description: 'الناتج يكون 0 فقط عندما يكون كلا المدخلين 1',
        operation: (a, b) => !(a && b),
        inputs: 2
    },
    NOR: {
        name: 'NOR',
        symbol: '⊽',
        formula: 'X = (A + B)\'',
        description: 'الناتج يكون 1 فقط عندما يكون كلا المدخلين 0',
        operation: (a, b) => !(a || b),
        inputs: 2
    },
    XNOR: {
        name: 'XNOR',
        symbol: '⊙',
        formula: 'X = (A ⊕ B)\'',
        description: 'الناتج يكون 1 عندما يكون المدخلان متساويين',
        operation: (a, b) => a === b,
        inputs: 2
    }
};

// ==================== SHARED GATE SHAPES (SVG Paths) ====================
// These match the shapes in the buttons and quiz for consistency
const GATE_SHAPES = {
    AND: `<path d="M 50 30 L 100 30 Q 140 30 140 75 Q 140 120 100 120 L 50 120 L 50 30 Z" fill="none" stroke="currentColor" stroke-width="3"/><line x1="20" y1="55" x2="50" y2="55" stroke="currentColor" stroke-width="3"/><line x1="20" y1="95" x2="50" y2="95" stroke="currentColor" stroke-width="3"/><line x1="140" y1="75" x2="170" y2="75" stroke="currentColor" stroke-width="3"/>`,
    OR: `<path d="M 50 30 Q 70 30 85 45 Q 100 60 110 75 Q 100 90 85 105 Q 70 120 50 120 Q 60 75 50 30 Z" fill="none" stroke="currentColor" stroke-width="3"/><line x1="20" y1="55" x2="50" y2="55" stroke="currentColor" stroke-width="3"/><line x1="20" y1="95" x2="50" y2="95" stroke="currentColor" stroke-width="3"/><line x1="110" y1="75" x2="170" y2="75" stroke="currentColor" stroke-width="3"/>`,
    NOT: `<path d="M 50 30 L 50 120 L 130 75 Z" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="140" cy="75" r="10" fill="none" stroke="currentColor" stroke-width="3"/><line x1="20" y1="75" x2="50" y2="75" stroke="currentColor" stroke-width="3"/><line x1="150" y1="75" x2="170" y2="75" stroke="currentColor" stroke-width="3"/>`,
    NAND: `<path d="M 50 30 L 100 30 Q 140 30 140 75 Q 140 120 100 120 L 50 120 L 50 30 Z" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="150" cy="75" r="10" fill="none" stroke="currentColor" stroke-width="3"/><line x1="20" y1="55" x2="50" y2="55" stroke="currentColor" stroke-width="3"/><line x1="20" y1="95" x2="50" y2="95" stroke="currentColor" stroke-width="3"/><line x1="160" y1="75" x2="170" y2="75" stroke="currentColor" stroke-width="3"/>`,
    NOR: `<path d="M 50 30 Q 70 30 85 45 Q 100 60 110 75 Q 100 90 85 105 Q 70 120 50 120 Q 60 75 50 30 Z" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="120" cy="75" r="10" fill="none" stroke="currentColor" stroke-width="3"/><line x1="20" y1="55" x2="50" y2="55" stroke="currentColor" stroke-width="3"/><line x1="20" y1="95" x2="50" y2="95" stroke="currentColor" stroke-width="3"/><line x1="130" y1="75" x2="170" y2="75" stroke="currentColor" stroke-width="3"/>`,
    XOR: `<path d="M 40 30 Q 50 75 40 120" fill="none" stroke="currentColor" stroke-width="3"/><path d="M 50 30 Q 70 30 85 45 Q 100 60 110 75 Q 100 90 85 105 Q 70 120 50 120 Q 60 75 50 30 Z" fill="none" stroke="currentColor" stroke-width="3"/><line x1="20" y1="55" x2="50" y2="55" stroke="currentColor" stroke-width="3"/><line x1="20" y1="95" x2="50" y2="95" stroke="currentColor" stroke-width="3"/><line x1="110" y1="75" x2="170" y2="75" stroke="currentColor" stroke-width="3"/>`,
    XNOR: `<path d="M 40 30 Q 50 75 40 120" fill="none" stroke="currentColor" stroke-width="3"/><path d="M 50 30 Q 70 30 85 45 Q 100 60 110 75 Q 100 90 85 105 Q 70 120 50 120 Q 60 75 50 30 Z" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="120" cy="75" r="10" fill="none" stroke="currentColor" stroke-width="3"/><line x1="20" y1="55" x2="50" y2="55" stroke="currentColor" stroke-width="3"/><line x1="20" y1="95" x2="50" y2="95" stroke="currentColor" stroke-width="3"/><line x1="130" y1="75" x2="170" y2="75" stroke="currentColor" stroke-width="3"/>`
};

// ==================== SVG GATE SHAPES ====================
// ==================== SVG GATE SHAPES ====================
function drawGateSVG(gateName, targetSvg = null) {
    const svg = targetSvg || document.getElementById('gate-svg');

    // Clear previous SVG content
    svg.innerHTML = '';

    // Get the standard shape (with stroke="currentColor")
    let shapeHTML = GATE_SHAPES[gateName] || '';

    // Create a container group for the shape and inject
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.innerHTML = shapeHTML;

    svg.appendChild(g);
}

// ==================== STATE MANAGEMENT ====================
let currentGate = 'AND';
let inputA = false;
let inputB = false;

// ==================== DOM ELEMENTS ====================
const gateButtons = document.querySelectorAll('.gate-btn');
const toggleA = document.getElementById('toggle-a');
const toggleB = document.getElementById('toggle-b');
const gateSvg = document.getElementById('gate-svg');
const gateNameDisplay = document.getElementById('gate-name-display');
const gateDescription = document.getElementById('gate-description');
const outputValue = document.getElementById('output-value');
const truthTableBody = document.getElementById('truth-table-body');
const wireA = document.querySelector('.wire-a');
const wireB = document.querySelector('.wire-b');
const wireOutput = document.querySelector('.wire-output');
const inputBControl = document.getElementById('input-b-control');

// ==================== INITIALIZATION ====================
function init() {
    setupEventListeners();
    updateGateDisplay();
    updateOutput();
    generateTruthTable();
}

// ==================== EVENT LISTENERS ====================
function setupEventListeners() {
    // Gate selection buttons
    gateButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const gate = btn.dataset.gate;
            selectGate(gate);
        });
    });

    // Input toggles - using change event on new checkbox-based UiVerse toggles
    toggleA.addEventListener('change', () => {
        inputA = toggleA.checked;
        updateWire(wireA, inputA);
        updateOutput();
        highlightActiveRow();
    });

    toggleB.addEventListener('change', () => {
        inputB = toggleB.checked;
        updateWire(wireB, inputB);
        updateOutput();
        highlightActiveRow();
    });
}

// ==================== GATE SELECTION ====================
function selectGate(gateName) {
    currentGate = gateName;

    // Update active button
    gateButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.gate === gateName);
    });

    // Show/hide input B based on gate type
    const gate = LOGIC_GATES[gateName];
    if (gate.inputs === 1) {
        inputBControl.style.display = 'none';
    } else {
        inputBControl.style.display = 'flex';
    }

    updateGateDisplay();
    updateOutput();
    generateTruthTable();
    highlightActiveRow();
}

// ==================== DISPLAY UPDATES ====================
function updateGateDisplay() {
    const gate = LOGIC_GATES[currentGate];
    drawGateSVG(currentGate);
    document.getElementById('gate-name-display').textContent = gate.name;
    gateDescription.textContent = gate.description;
    document.getElementById('gate-formula').textContent = gate.formula;
}

// updateToggle not needed — UiVerse toggle CSS handles its own visual state via checkbox
function updateToggle(toggleElement, state) {
    // Legacy stub; visual state is now driven by CSS :checked on the checkbox
}

function updateWire(wireElement, state) {
    const stateValue = state ? 1 : 0;
    wireElement.dataset.state = stateValue;
}

function updateOutput() {
    const gate = LOGIC_GATES[currentGate];
    let result;

    if (gate.inputs === 1) {
        result = gate.operation(inputA);
    } else {
        result = gate.operation(inputA, inputB);
    }

    const outputState = result ? 1 : 0;
    outputValue.dataset.state = outputState;
    outputValue.querySelector('.value-text').textContent = outputState;
    updateWire(wireOutput, result);
}

// ==================== TRUTH TABLE ====================
function generateTruthTable() {
    const gate = LOGIC_GATES[currentGate];
    truthTableBody.innerHTML = '';

    if (gate.inputs === 1) {
        // Single input gate (NOT)
        for (let a = 0; a <= 1; a++) {
            const result = gate.operation(Boolean(a));
            const row = createTableRow([a, '-', result ? 1 : 0]);
            truthTableBody.appendChild(row);
        }
    } else {
        // Two input gates
        for (let a = 0; a <= 1; a++) {
            for (let b = 0; b <= 1; b++) {
                const result = gate.operation(Boolean(a), Boolean(b));
                const row = createTableRow([a, b, result ? 1 : 0]);
                truthTableBody.appendChild(row);
            }
        }
    }

    highlightActiveRow();
}

function createTableRow(values) {
    const row = document.createElement('tr');
    values.forEach(value => {
        const cell = document.createElement('td');
        cell.textContent = value;
        row.appendChild(cell);
    });
    return row;
}

function highlightActiveRow() {
    const gate = LOGIC_GATES[currentGate];
    const rows = truthTableBody.querySelectorAll('tr');

    rows.forEach(row => {
        row.classList.remove('active-row');
    });

    if (gate.inputs === 1) {
        // For NOT gate, highlight based on input A
        const rowIndex = inputA ? 1 : 0;
        if (rows[rowIndex]) {
            rows[rowIndex].classList.add('active-row');
        }
    } else {
        // For two-input gates
        const aVal = inputA ? 1 : 0;
        const bVal = inputB ? 1 : 0;
        const rowIndex = aVal * 2 + bVal;
        if (rows[rowIndex]) {
            rows[rowIndex].classList.add('active-row');
        }
    }
}

// ==================== TAB NAVIGATION ====================
const sidebarNavItems = document.querySelectorAll('.nav-item');
const tabInputs = document.querySelectorAll('.radio-group input[name="tab-option"]');
const tabContents = document.querySelectorAll('.tab-content');

function switchTab(tabName) {
    // Sync sidebar if exists
    sidebarNavItems.forEach(b => b.classList.remove('active'));
    document.querySelectorAll(`.nav-item[data-tab="${tabName}"]`).forEach(b => b.classList.add('active'));

    // Sync radio inputs
    const targetInput = document.getElementById(`tab-${tabName}`);
    if (targetInput) targetInput.checked = true;

    // Update active tab content
    tabContents.forEach(content => {
        content.classList.remove('active');
    });
    const targetTab = document.getElementById(`${tabName}-tab`);
    if (targetTab) {
        targetTab.classList.add('active');
        // Scroll to top of main content when switching
        document.querySelector('.main-body')?.scrollTo(0, 0);

        // Initialize quiz if needed
        if (tabName === 'quiz' && quizState.questions.length === 0) {
            initQuiz();
        }
    }
}

// Event listeners for sidebar nav (if any)
sidebarNavItems.forEach(btn => {
    btn.addEventListener('click', () => {
        switchTab(btn.dataset.tab);
    });
});

// Event listeners for top slider tabs
tabInputs.forEach(input => {
    input.addEventListener('change', (e) => {
        if (e.target.checked) {
            switchTab(e.target.value);
        }
    });
});

// ==================== NUMBER SYSTEM CONVERTER ====================
const fromBaseSelect = document.getElementById('from-base');
const toBaseSelect = document.getElementById('to-base');
const inputValue = document.getElementById('input-value');
const resultValue = document.getElementById('result-value');
const inputHint = document.getElementById('input-hint');
const outputHint = document.getElementById('output-hint');
const swapBtn = document.getElementById('swap-btn');
const convertBtn = document.getElementById('convert-btn');
const stepsPanel = document.getElementById('steps-panel');
const stepsContent = document.getElementById('steps-content');

// Base information
const baseInfo = {
    2: { name: 'Binary (ثنائي)', pattern: /[^01.]/g, hint: 'Base 2 (0-1, .fractional)' },
    8: { name: 'Octal (ثماني)', pattern: /[^0-7.]/g, hint: 'Base 8 (0-7, .fractional)' },
    10: { name: 'Decimal (عشري)', pattern: /[^0-9.]/g, hint: 'Base 10 (0-9, .fractional)' },
    16: { name: 'Hexadecimal (سداسي عشر)', pattern: /[^0-9A-Fa-f.]/g, hint: 'Base 16 (0-9, A-F, .fractional)' }
};

// Update hints when base changes
function updateHints() {
    const fromBase = fromBaseSelect.value;
    const toBase = toBaseSelect.value;
    inputHint.textContent = baseInfo[fromBase].hint;
    outputHint.textContent = baseInfo[toBase].hint;
}

// Validate input based on current base
function validateInput() {
    const fromBase = fromBaseSelect.value;
    let value = inputValue.value.toUpperCase();

    // Remove invalid characters based on base
    value = value.replace(baseInfo[fromBase].pattern, '');

    // Ensure only one decimal point
    const parts = value.split('.');
    if (parts.length > 2) {
        value = parts[0] + '.' + parts.slice(1).join('');
    }

    inputValue.value = value;
}

// Input validation based on selected base
inputValue.addEventListener('input', (e) => {
    validateInput();
    autoConvert();
});

// Event listeners for base changes
fromBaseSelect.addEventListener('change', () => {
    updateHints();
    validateInput();
    autoConvert();
});

toBaseSelect.addEventListener('change', () => {
    updateHints();
    autoConvert();
});

// Swap button functionality
swapBtn.addEventListener('click', () => {
    const tempBase = fromBaseSelect.value;
    fromBaseSelect.value = toBaseSelect.value;
    toBaseSelect.value = tempBase;

    const tempValue = inputValue.value;
    inputValue.value = resultValue.textContent !== '-' ? resultValue.textContent : '';

    updateHints();
    autoConvert();
});

// Convert button for detailed steps
convertBtn.addEventListener('click', () => {
    if (inputValue.value) {
        showDetailedSteps();
    }
});

// Helper function: Convert any base to decimal (including fractional)
function anyBaseToDecimal(value, base) {
    const parts = value.split('.');
    const integerPart = parts[0] || '0';
    const fractionalPart = parts[1] || '';

    // Convert integer part
    let decimalInteger = parseInt(integerPart, base) || 0;

    // Convert fractional part
    let decimalFractional = 0;
    for (let i = 0; i < fractionalPart.length; i++) {
        const digit = fractionalPart[i];
        const digitValue = parseInt(digit, base);
        decimalFractional += digitValue * Math.pow(base, -(i + 1));
    }

    return decimalInteger + decimalFractional;
}

// Helper function: Convert decimal to any base (including fractional)
function decimalToAnyBase(decimal, base, maxPrecision = 10) {
    const integerPart = Math.floor(decimal);
    const fractionalPart = decimal - integerPart;

    // Convert integer part
    let integerResult = integerPart.toString(base).toUpperCase();

    // Convert fractional part
    let fractionalResult = '';
    let frac = fractionalPart;
    let iterations = 0;

    while (frac > 0 && iterations < maxPrecision) {
        frac *= base;
        const digit = Math.floor(frac);
        fractionalResult += digit < 10 ? digit.toString() : String.fromCharCode(65 + digit - 10);
        frac -= digit;
        iterations++;
    }

    if (fractionalResult) {
        return integerResult + '.' + fractionalResult;
    }
    return integerResult;
}

// Auto-convert function
function autoConvert() {
    const fromBase = parseInt(fromBaseSelect.value);
    const toBase = parseInt(toBaseSelect.value);
    const value = inputValue.value.trim();

    if (!value) {
        resultValue.textContent = '-';
        return;
    }

    try {
        // Convert input to decimal first
        const decimalValue = anyBaseToDecimal(value, fromBase);

        if (isNaN(decimalValue)) {
            resultValue.textContent = 'خطأ (Error)';
            return;
        }

        // Convert decimal to target base
        let result = decimalToAnyBase(decimalValue, toBase);
        resultValue.textContent = result;
    } catch (error) {
        resultValue.textContent = 'خطأ (Error)';
    }
}

// Show detailed conversion steps
function showDetailedSteps() {
    const fromBase = parseInt(fromBaseSelect.value);
    const toBase = parseInt(toBaseSelect.value);
    const value = inputValue.value.trim();

    if (!value) return;

    stepsContent.innerHTML = '';
    stepsPanel.style.display = 'block';

    // Convert to decimal first (if not already decimal)
    const decimalValue = anyBaseToDecimal(value, fromBase);

    if (isNaN(decimalValue)) {
        stepsContent.innerHTML = '<div class="step-card"><div class="step-title">خطأ في الإدخال (Invalid Input)</div></div>';
        return;
    }

    // Check if bases are the same
    if (fromBase === toBase) {
        stepsContent.innerHTML = `
            <div class="step-card">
                <div class="step-title">تحويل من ${baseInfo[fromBase].name.split(' ')[0]} إلى نفس النظام</div>
                <div class="step-explanation">
                    الرقم هو نفسه في النظام ${baseInfo[fromBase].name.split(' ')[0]}، لا حاجة للتحويل.
                </div>
                <div class="step-result">النتيجة: ${value}</div>
            </div>
        `;
        return;
    }

    // Add conversion path indicator
    if (fromBase !== 10 && toBase !== 10) {
        const pathCard = document.createElement('div');
        pathCard.className = 'step-card';
        pathCard.style.background = 'var(--accent-gradient)';
        pathCard.style.borderLeft = 'none';
        const fromName = baseInfo[fromBase].name.split(' ')[0];
        const toName = baseInfo[toBase].name.split(' ')[0];
        pathCard.innerHTML = `
            <div class="step-title" style="color: white;">مسار التحويل (Conversion Path)</div>
            <div class="step-explanation" style="text-align: center; font-size: 1.3rem; margin: 1rem 0; color: white; font-weight: 600;">
                ${fromName} → Decimal → ${toName}
            </div>
        `;
        stepsContent.appendChild(pathCard);
    }

    // Show conversion steps
    if (fromBase !== 10) {
        showToDecimalSteps(value, fromBase, decimalValue);
    }

    if (toBase !== 10) {
        showFromDecimalSteps(decimalValue, toBase, fromBase);
    }


}

// Show conversion from any base to decimal
function showToDecimalSteps(value, fromBase, decimalValue) {
    const stepCard = document.createElement('div');
    stepCard.className = 'step-card';

    const baseName = baseInfo[fromBase].name.split(' ')[0];
    const baseSubscript = fromBase === 2 ? '₂' : fromBase === 8 ? '₈' : '₁₆';

    // Split into integer and fractional parts
    const parts = value.split('.');
    const integerPart = parts[0] || '0';
    const fractionalPart = parts[1] || '';

    // Create visual representation for INTEGER part
    let intDigits = '';
    let intArrows = '';
    let intPowers = '';
    let intFormula = '';
    let intCalculation = '';
    let intTotal = 0;

    // Process integer digits
    for (let i = 0; i < integerPart.length; i++) {
        const position = integerPart.length - 1 - i;
        const digit = integerPart[i].toUpperCase();
        const digitValue = parseInt(digit, fromBase);

        if (isNaN(digitValue)) continue;

        const positionValue = digitValue * Math.pow(fromBase, position);
        intTotal += positionValue;

        intDigits += `<span class="binary-digit">${digit}</span>`;
        intArrows += `<span class="arrow">↓</span>`;
        intPowers += `<span class="power-label">${fromBase}<sup>${position}</sup></span>`;

        if (i > 0) {
            intFormula += ' + ';
            intCalculation += ' + ';
        }
        // For hex, just show the decimal value directly since we have the reference table
        const displayDigit = fromBase === 16 && isNaN(parseInt(digit)) ? digitValue : digit;
        intFormula += `(${displayDigit} × ${fromBase}<sup>${position}</sup>)`;
        intCalculation += `${positionValue}`;
    }

    // Create visual representation for FRACTIONAL part
    let fracDigits = '';
    let fracArrows = '';
    let fracPowers = '';
    let fracFormula = '';
    let fracCalculation = '';
    let fracTotal = 0;

    if (fractionalPart) {
        for (let i = 0; i < fractionalPart.length; i++) {
            const position = -(i + 1);
            const digit = fractionalPart[i].toUpperCase();
            const digitValue = parseInt(digit, fromBase);

            if (isNaN(digitValue)) continue;

            const positionValue = digitValue * Math.pow(fromBase, position);
            fracTotal += positionValue;

            fracDigits += `<span class="binary-digit">${digit}</span>`;
            fracArrows += `<span class="arrow">↓</span>`;
            fracPowers += `<span class="power-label">${fromBase}<sup>${position}</sup></span>`;

            if (i > 0) {
                fracFormula += ' + ';
                fracCalculation += ' + ';
            }
            const displayDigit = fromBase === 16 && isNaN(parseInt(digit)) ? `${digit}(${digitValue})` : digit;
            fracFormula += `(${displayDigit} × ${fromBase}<sup>${position}</sup>)`;
            fracCalculation += `${parseFloat(positionValue.toFixed(10))}`;
        }
    }

    // Build the HTML
    let htmlContent = `
        <div class="step-title">الخطوة 1️⃣: ${baseName} → Decimal: ${value}${baseSubscript}</div>

        <div class="step-explanation" style="background: rgba(99, 102, 241, 0.1); padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
            <strong>📚 الفكرة:</strong><br>
            ${fractionalPart ? 'نحول الجزء الصحيح والجزء الكسري بشكل منفصل' : 'نحول الجزء الصحيح فقط'}
        </div>
    `;

    // Add hex reference table if converting from hexadecimal
    if (fromBase === 16) {
        htmlContent += `
            <div class="step-explanation" style="background: rgba(147, 51, 234, 0.1); padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
                <strong>🔤 مرجع الأحرف السداسية عشرية (Hexadecimal Letters):</strong><br>
                <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 0.5rem; margin-top: 0.5rem; font-family: 'JetBrains Mono', monospace;">
                    <span style="background: rgba(99, 102, 241, 0.2); padding: 0.3rem; border-radius: 4px; text-align: center;">A = 10</span>
                    <span style="background: rgba(99, 102, 241, 0.2); padding: 0.3rem; border-radius: 4px; text-align: center;">B = 11</span>
                    <span style="background: rgba(99, 102, 241, 0.2); padding: 0.3rem; border-radius: 4px; text-align: center;">C = 12</span>
                    <span style="background: rgba(99, 102, 241, 0.2); padding: 0.3rem; border-radius: 4px; text-align: center;">D = 13</span>
                    <span style="background: rgba(99, 102, 241, 0.2); padding: 0.3rem; border-radius: 4px; text-align: center;">E = 14</span>
                    <span style="background: rgba(99, 102, 241, 0.2); padding: 0.3rem; border-radius: 4px; text-align: center;">F = 15</span>
                </div>
            </div>
        `;
    }

    htmlContent += `
        <div class="step-explanation"><strong>🔢 الجزء الصحيح (Integer Part):</strong></div>
        <div class="visual-mapping">
            <div class="binary-row">${intDigits}</div>
            <div class="arrow-row">${intArrows}</div>
            <div class="power-row">${intPowers}</div>
        </div>

        <div class="step-explanation">
            كل رقم يتم ضربه في ${fromBase} مرفوعة لقوة موضعه (من اليمين، بدءاً من 0)
        </div>

        <div class="step-formula">${intFormula}</div>
        <div class="step-formula">${intCalculation}</div>
        <div class="step-formula">= ${intTotal}</div>
    `;

    if (fractionalPart) {
        htmlContent += `
            <div class="step-explanation" style="margin-top: 1rem;"><strong>📉 الجزء الكسري (Fractional Part):</strong></div>
            <div class="visual-mapping">
                <div class="binary-row"><span class="decimal-point">.</span>${fracDigits}</div>
                <div class="arrow-row"><span class="arrow"> </span>${fracArrows}</div>
                <div class="power-row"><span class="power-label" style="opacity: 0;">.</span>${fracPowers}</div>
            </div>

            <div class="step-explanation">
                الأرقام بعد الفاصلة تُضرب في ${fromBase} مرفوعة لقوى سالبة (-1, -2, -3, ...)
            </div>

            <div class="step-formula">${fracFormula}</div>
            <div class="step-formula">${fracCalculation}</div>
            <div class="step-formula">= ${parseFloat(fracTotal.toFixed(10))}</div>

            <div class="step-explanation" style="background: rgba(16, 185, 129, 0.1); padding: 1rem; border-radius: 8px; margin-top: 1rem;">
                <strong>➕ المجموع الكلي:</strong><br>
                ${intTotal} + ${parseFloat(fracTotal.toFixed(10))} = ${decimalValue}
            </div>
        `;
    }

    htmlContent += `<div class="step-result">✅ النتيجة النهائية: ${decimalValue}₁₀</div>`;

    stepCard.innerHTML = htmlContent;
    stepsContent.appendChild(stepCard);
}

// Show conversion from decimal to any base
function showFromDecimalSteps(decimal, toBase, fromBase = 10) {
    const stepCard = document.createElement('div');
    stepCard.className = 'step-card';

    const baseName = baseInfo[toBase].name.split(' ')[0];
    const baseSubscript = toBase === 2 ? '₂' : toBase === 8 ? '₈' : '₁₆';
    const baseNameArabic = toBase === 2 ? 'الثنائي' : toBase === 8 ? 'الثماني' : 'السداسي عشر';

    // Split decimal into integer and fractional parts
    const integerPart = Math.floor(decimal);
    const fractionalPart = decimal - integerPart;

    // ===== INTEGER PART CONVERSION =====
    let intStepsHTML = `
        <div class="steps-table-container">
            <table class="steps-table">
                <thead>
                    <tr>
                        <th>القسمة (Division)</th>
                        <th>الناتج (Quotient)</th>
                        <th>الباقي (Remainder)</th>
                        <th>التفاصيل (Check)</th>
                    </tr>
                </thead>
                <tbody>
    `;
    let num = integerPart;
    let intResult = '';
    let stepNumber = 1;

    if (num === 0) {
        intStepsHTML += `
            <tr>
                <td>0 ÷ ${toBase}</td>
                <td>0</td>
                <td><span class="highlight-integer">0</span></td>
                <td>-</td>
            </tr>`;
        intResult = '0';
    } else {
        while (num > 0) {
            const remainder = num % toBase;
            const quotient = Math.floor(num / toBase);
            const remainderStr = remainder < 10 ? remainder.toString() : String.fromCharCode(65 + remainder - 10);

            const product = quotient * toBase;
            const remainderExplanation = remainder < 10 ?
                `${quotient} × ${toBase} = ${product}<br>(${num} - ${product} = ${remainder})` :
                `${quotient} × ${toBase} = ${product}<br>(${num} - ${product} = ${remainder})<br>(الباقي ${remainder} يكتب ${remainderStr})`;

            intStepsHTML += `
                <tr>
                    <td>${num} ÷ ${toBase}</td>
                    <td>${quotient}</td>
                    <td><span class="highlight-integer">${remainderStr}</span></td>
                    <td style="font-size: 0.85em; color: var(--text-secondary);">${remainderExplanation}</td>
                </tr>`;
            intResult = remainderStr + intResult;
            num = quotient;
            stepNumber++;
        }
    }
    intStepsHTML += `
                </tbody>
            </table>
            <div class="read-arrow-vertical" title="اقرأ من الأسفل للأعلى">⬆️</div>
        </div>
    `;

    // ===== FRACTIONAL PART CONVERSION =====
    let fracStepsHTML = '';
    let fracResult = '';

    if (fractionalPart > 0) {
        fracStepsHTML = `
            <div class="steps-table-container">
                <table class="steps-table">
                    <thead>
                        <tr>
                            <th>العملية (Multiplication)</th>
                            <th>الناتج (Product)</th>
                            <th>الجزء الصحيح (Integer)</th>
                            <th>الجزء الكسري الجديد (New Fraction)</th>
                        </tr>
                    </thead>
                    <tbody>
        `;

        let frac = fractionalPart;
        let fracStepNumber = 1;
        const maxIterations = 10;

        while (frac > 0 && fracStepNumber <= maxIterations) {
            const product = frac * toBase;
            const digit = Math.floor(product);
            const digitStr = digit < 10 ? digit.toString() : String.fromCharCode(65 + digit - 10);
            const newFrac = product - digit;

            // Format numbers for clean display
            const displayFrac = parseFloat(frac.toFixed(10));
            const displayProduct = parseFloat(product.toFixed(10));
            let displayNewFrac = parseFloat(newFrac.toFixed(10));
            if (displayNewFrac === 0) displayNewFrac = ".0";

            fracStepsHTML += `
                <tr>
                    <td>${displayFrac} × ${toBase}</td>
                    <td>${displayProduct}</td>
                    <td><span class="highlight-integer">${digitStr}</span></td>
                    <td>${displayNewFrac}</td>
                </tr>`;

            fracResult += digitStr;
            frac = newFrac;
            fracStepNumber++;
        }

        fracStepsHTML += `
                    </tbody>
                </table>
                <div class="read-arrow-vertical" title="اقرأ من الأعلى للأسفل">⬇️</div>
            </div>
        `;
    }

    // Build final result
    const finalResult = fractionalPart > 0 ? `${intResult}.${fracResult}` : intResult;

    // Build HTML
    let htmlContent = `
        <div class="step-title">الخطوة ${fromBase !== 10 ? '2️⃣' : '1️⃣'}: Decimal → ${baseName}: ${decimal}₁₀</div>

        <div class="step-explanation" style="background: rgba(99, 102, 241, 0.1); padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
            <strong>📚 الفكرة الأساسية:</strong><br>
            ${fractionalPart > 0 ?
            `نحول الجزء الصحيح والجزء الكسري بشكل منفصل:<br>
                • الجزء الصحيح: نقسم على ${toBase} ونأخذ الباقي<br>
                • الجزء الكسري: نضرب في ${toBase} ونأخذ الجزء الصحيح` :
            `لتحويل رقم من النظام العشري إلى النظام ${baseNameArabic}، نقسم الرقم على ${toBase} بشكل متكرر.<br>
                <strong>"الباقي"</strong> هو ما يتبقى بعد القسمة (Remainder).<br>
                مثال: 25 ÷ 2 = 12 والباقي 1 (لأن 12 × 2 = 24، ويتبقى 1 ليصبح 25)`}
        </div>
    `;

    // Add hex reference table if converting to hexadecimal
    if (toBase === 16) {
        htmlContent += `
            <div class="step-explanation" style="background: rgba(147, 51, 234, 0.1); padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
                <strong>🔤 مرجع الأحرف السداسية عشرية (Hexadecimal Letters):</strong><br>
                <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 0.5rem; margin-top: 0.5rem; font-family: 'JetBrains Mono', monospace;">
                    <span style="background: rgba(99, 102, 241, 0.2); padding: 0.3rem; border-radius: 4px; text-align: center;">A = 10</span>
                    <span style="background: rgba(99, 102, 241, 0.2); padding: 0.3rem; border-radius: 4px; text-align: center;">B = 11</span>
                    <span style="background: rgba(99, 102, 241, 0.2); padding: 0.3rem; border-radius: 4px; text-align: center;">C = 12</span>
                    <span style="background: rgba(99, 102, 241, 0.2); padding: 0.3rem; border-radius: 4px; text-align: center;">D = 13</span>
                    <span style="background: rgba(99, 102, 241, 0.2); padding: 0.3rem; border-radius: 4px; text-align: center;">E = 14</span>
                    <span style="background: rgba(99, 102, 241, 0.2); padding: 0.3rem; border-radius: 4px; text-align: center;">F = 15</span>
                </div>
            </div>
        `;
    }

    htmlContent += `
        <div class="step-explanation">
            <strong>🔢 الجزء الصحيح (Integer Part): ${integerPart}</strong>
        </div>

        ${intStepsHTML}

        <div class="step-explanation" style="background: rgba(16, 185, 129, 0.1); padding: 1rem; border-radius: 8px; margin-top: 1rem;">
            <strong>⬆️ لماذا نقرأ من الأسفل للأعلى؟</strong><br>
            الباقي الأول يمثل خانة الآحاد (الرقم الأيمن)، والباقي الأخير يمثل الخانة الأكبر (الرقم الأيسر).<br>
            نتيجة الجزء الصحيح: <strong>${intResult}</strong>
        </div>
    `;

    if (fractionalPart > 0) {
        htmlContent += `
            <div class="step-explanation" style="margin-top: 1.5rem;">
                <strong>📉 الجزء الكسري (Fractional Part): 0.${fractionalPart.toString().split('.')[1]}</strong>
            </div>

            <div class="step-explanation" style="background: rgba(99, 102, 241, 0.1); padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
                <strong>💡 الطريقة:</strong><br>
                نضرب الجزء الكسري في ${toBase} بشكل متكرر، ونأخذ الجزء الصحيح من كل نتيجة.<br>
                نقرأ الأرقام من الأعلى للأسفل ⬇️ (عكس الجزء الصحيح!)
            </div>

            ${fracStepsHTML}

            <div class="step-explanation" style="background: rgba(16, 185, 129, 0.1); padding: 1rem; border-radius: 8px; margin-top: 1rem;">
                <strong>⬇️ نقرأ من الأعلى للأسفل:</strong><br>
                نتيجة الجزء الكسري: <strong>.${fracResult}</strong>
            </div>

            <div class="step-explanation" style="background: rgba(147, 51, 234, 0.1); padding: 1rem; border-radius: 8px; margin-top: 1rem;">
                <strong>🔗 الدمج:</strong><br>
                الجزء الصحيح + الجزء الكسري = <strong>${intResult}.${fracResult}</strong>
            </div>
        `;
    }

    htmlContent += `<div class="step-result">✅ النتيجة النهائية: <span style="direction: ltr; display: inline-block;">${finalResult}${baseSubscript}</span></div>`;

    stepCard.innerHTML = htmlContent;
    stepsContent.appendChild(stepCard);
}

// ==================== QUIZ FUNCTIONALITY ====================

// Quiz state
let quizState = {
    currentQuestion: 0,
    score: 0,
    totalQuestions: 20,
    questions: [],
    answered: false
};

// Generate all possible quiz questions
function generateQuizQuestions() {
    const gates = ['AND', 'OR', 'NAND', 'NOR', 'XOR', 'XNOR'];
    const allQuestions = [];

    // Generate questions for each gate with all possible input combinations
    gates.forEach(gate => {
        const gateInfo = LOGIC_GATES[gate];

        // All possible combinations for 2-input gates
        const combinations = [
            { a: 0, b: 0 },
            { a: 0, b: 1 },
            { a: 1, b: 0 },
            { a: 1, b: 1 }
        ];

        combinations.forEach(combo => {
            let output = gateInfo.operation(combo.a, combo.b);
            // Force boolean to 0/1
            output = output ? 1 : 0;

            allQuestions.push({
                gate: gate,
                requiredOutput: output,
                correctA: combo.a,
                correctB: combo.b
            });
        });
    });

    // Shuffle and select 20 questions
    const shuffled = allQuestions.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 20);
}

// Initialized later in file, just reused GATE_SHAPES
const QUIZ_GATE_SHAPES = GATE_SHAPES;

// Initialize quiz
function initQuiz() {
    quizState.questions = generateQuizQuestions();
    quizState.currentQuestion = 0;
    quizState.score = 0;
    quizState.answered = false;

    // Hide results, show question panel
    document.getElementById('quiz-results').style.display = 'none';
    document.querySelector('.quiz-question-panel').style.display = 'block';

    updateQuizDisplay();
    setupQuizEventListeners();
}

// Update quiz display
function updateQuizDisplay() {
    const question = quizState.questions[quizState.currentQuestion];

    // Update stats
    document.getElementById('question-number').textContent = quizState.currentQuestion + 1;
    document.getElementById('score').textContent = quizState.score;
    const accuracy = quizState.currentQuestion > 0
        ? Math.round((quizState.score / quizState.currentQuestion) * 100)
        : 0;
    document.getElementById('accuracy').textContent = accuracy + '%';

    // Update gate display using hardcoded shapes
    const gateSvg = document.getElementById('quiz-gate-svg');
    gateSvg.innerHTML = QUIZ_GATE_SHAPES[question.gate] || '';
    gateSvg.style.color = 'var(--accent-primary)'; // Ensure currentColor works

    document.getElementById('quiz-gate-name').textContent = question.gate;

    // Update required output
    const outputDisplay = document.getElementById('quiz-required-output');
    outputDisplay.querySelector('.output-value-large').textContent = question.requiredOutput;

    // Update output display color based on value
    if (question.requiredOutput === 0) {
        outputDisplay.style.borderColor = 'var(--color-off)';
        outputDisplay.style.boxShadow = `
            0 0 20px var(--color-off),
            0 0 40px hsla(0, 0%, 35%, 0.3),
            inset 0 0 20px hsla(0, 0%, 35%, 0.2)
        `;
        outputDisplay.querySelector('.output-value-large').style.color = 'var(--color-off)';
        outputDisplay.querySelector('.output-value-large').style.textShadow = '0 0 20px var(--color-off)';
    } else {
        outputDisplay.style.borderColor = 'var(--color-on)';
        outputDisplay.style.boxShadow = `
            0 0 20px var(--color-on),
            0 0 40px hsla(140, 70%, 55%, 0.3),
            inset 0 0 20px hsla(140, 70%, 55%, 0.2)
        `;
        outputDisplay.querySelector('.output-value-large').style.color = 'var(--color-on)';
        outputDisplay.querySelector('.output-value-large').style.textShadow = '0 0 20px var(--color-on)';
    }

    // Reset drop zones
    resetDropZones();

    // Hide feedback
    document.getElementById('feedback-section').style.display = 'none';
    quizState.answered = false;

    // Enable submit button
    document.getElementById('submit-answer-btn').disabled = false;
}

// Reset drop zones
function resetDropZones() {
    const dropZoneA = document.getElementById('drop-zone-a');
    const dropZoneB = document.getElementById('drop-zone-b');

    dropZoneA.innerHTML = '<span class="drop-placeholder">اضغط للاختيار</span>';
    dropZoneA.setAttribute('data-value', '');

    dropZoneB.innerHTML = '<span class="drop-placeholder">اضغط للاختيار</span>';
    dropZoneB.setAttribute('data-value', '');

    // Reset all switches to unused state
    document.querySelectorAll('.draggable-switch').forEach(sw => {
        sw.classList.remove('used');
        sw.classList.remove('selected');
        sw.removeAttribute('draggable'); // Ensure not draggable
        sw.style.pointerEvents = 'auto';
    });

    // Clear selection state
    deselectSwitch();
}

// Setup quiz event listeners
function setupQuizEventListeners() {
    // Interaction setup (Click only)
    const draggableSwitches = document.querySelectorAll('.draggable-switch');
    const dropZones = document.querySelectorAll('.drop-zone-box');

    draggableSwitches.forEach(sw => {
        sw.onclick = handleSwitchClick; // Use onclick to ensure single listener
        sw.removeAttribute('draggable');
    });

    dropZones.forEach(zone => {
        zone.onclick = handleDropZoneClick;
    });

    // Submit button
    const submitBtn = document.getElementById('submit-answer-btn');
    submitBtn.addEventListener('click', checkAnswer);

    // Next question button
    const nextBtn = document.getElementById('next-question-btn');
    nextBtn.addEventListener('click', nextQuestion);

    // Restart button
    const restartBtn = document.getElementById('restart-quiz-btn');
    restartBtn.addEventListener('click', initQuiz);
}

// Click Selection Handlers
let selectedSwitchElement = null;

function handleSwitchClick(e) {
    if (quizState.answered) return;
    const sw = e.currentTarget;
    if (sw.classList.contains('used')) return;

    const interactiveArea = document.querySelector('.quiz-interactive-area');

    // Toggle selection
    if (selectedSwitchElement === sw) {
        deselectSwitch();
    } else {
        if (selectedSwitchElement) deselectSwitch();
        selectedSwitchElement = sw;
        sw.classList.add('selected');
        if (interactiveArea) interactiveArea.classList.add('selection-active');
        playSound('pick');
    }
}

function deselectSwitch() {
    const interactiveArea = document.querySelector('.quiz-interactive-area');
    if (interactiveArea) interactiveArea.classList.remove('selection-active');

    if (selectedSwitchElement) {
        selectedSwitchElement.classList.remove('selected');
        selectedSwitchElement = null;
    }
}

function handleDropZoneClick(e) {
    if (!selectedSwitchElement || quizState.answered) return;

    const dropZone = e.currentTarget;

    // Check if there is already a switch in this drop zone
    if (dropZone.hasAttribute('data-source-id')) {
        const oldSwitchId = dropZone.getAttribute('data-source-id');
        const oldSwitch = document.getElementById(oldSwitchId);
        if (oldSwitch) {
            // Return the old switch to the pool
            oldSwitch.classList.remove('used');
            oldSwitch.style.pointerEvents = 'auto';
        }
    }

    const value = selectedSwitchElement.getAttribute('data-value');

    // Assign a unique ID to the source switch if it doesn't have one
    if (!selectedSwitchElement.id) {
        selectedSwitchElement.id = 'switch-' + Date.now() + Math.random().toString(36).substr(2, 9);
    }

    processDrop(dropZone, value, selectedSwitchElement.innerHTML, selectedSwitchElement.id);

    selectedSwitchElement.classList.add('used');
    selectedSwitchElement.style.pointerEvents = 'none'; // Disable interactions

    deselectSwitch();
}

// Common Drop Processing
function processDrop(dropZone, value, innerHTML, sourceId) {
    // Clear previous content
    dropZone.innerHTML = '';

    // Clone the switch visual
    const switchClone = document.createElement('div');
    switchClone.className = 'dropped-switch';
    switchClone.innerHTML = innerHTML;
    dropZone.appendChild(switchClone);

    // Set the value and source ID
    dropZone.setAttribute('data-value', value);
    if (sourceId) {
        dropZone.setAttribute('data-source-id', sourceId);
    }

    playSound('drop');
}

// Check answer
function checkAnswer() {
    if (quizState.answered) return;

    const dropZoneA = document.getElementById('drop-zone-a');
    const dropZoneB = document.getElementById('drop-zone-b');

    const userA = dropZoneA.getAttribute('data-value');
    const userB = dropZoneB.getAttribute('data-value');

    // Check if both inputs are filled
    if (userA === '' || userB === '') {
        if (userA === '') dropZoneA.classList.add('shake');
        if (userB === '') dropZoneB.classList.add('shake');

        playSound('wrong');

        setTimeout(() => {
            if (userA === '') dropZoneA.classList.remove('shake');
            if (userB === '') dropZoneB.classList.remove('shake');
        }, 500);
        return;
    }

    const question = quizState.questions[quizState.currentQuestion];
    const gateInfo = LOGIC_GATES[question.gate];

    // Calculate output based on user inputs to allow ANY correct combination
    const valA = parseInt(userA);
    const valB = parseInt(userB);
    let userOutput = gateInfo.operation(valA, valB);
    userOutput = userOutput ? 1 : 0;

    const isCorrect = userOutput === question.requiredOutput;

    quizState.answered = true;

    // Show feedback
    const feedbackSection = document.getElementById('feedback-section');
    const feedbackContent = document.getElementById('feedback-content');

    if (isCorrect) {
        quizState.score++;
        feedbackContent.innerHTML = `
            <div class="feedback-correct">
                <div class="feedback-icon">✓</div>
                <div class="feedback-title">إجابة صحيحة! 🎉</div>
                <div class="feedback-message">
                    أحسنت! الإجابة صحيحة.<br>
                    <span style="font-size: 0.9em; color: var(--text-secondary); margin-top: 5px; display: block;">
                        تذكر: ${gateInfo.description}
                    </span>
                </div>
            </div>
        `;
        playSound('correct');
    } else {
        feedbackContent.innerHTML = `
            <div class="feedback-wrong">
                <div class="feedback-icon">✗</div>
                <div class="feedback-title">إجابة خاطئة</div>
                <div class="feedback-message">
                    لا بأس، حاول المعرفة من الخطأ!<br>
                    <span style="font-weight: bold; color: var(--accent-primary);">${question.gate} Gate:</span> ${gateInfo.description}
                </div>
                <div class="correct-answer-display">
                    <h4>الإجابة الصحيحة:</h4>
                    <div class="correct-inputs">
                        <div class="correct-input-item">
                            <span class="correct-input-label">Input A</span>
                            <span class="correct-input-value">${question.correctA}</span>
                        </div>
                        <div class="correct-input-item">
                            <span class="correct-input-label">Input B</span>
                            <span class="correct-input-value">${question.correctB}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        playSound('wrong');
    }

    feedbackSection.style.display = 'flex';

    // Update stats
    document.getElementById('score').textContent = quizState.score;
    const accuracy = Math.round((quizState.score / (quizState.currentQuestion + 1)) * 100);
    document.getElementById('accuracy').textContent = accuracy + '%';

    // Disable submit button
    document.getElementById('submit-answer-btn').disabled = true;
}

// Next question
function nextQuestion() {
    // Hide feedback modal
    document.getElementById('feedback-section').style.display = 'none';

    quizState.currentQuestion++;

    if (quizState.currentQuestion >= quizState.totalQuestions) {
        showResults();
    } else {
        updateQuizDisplay();
    }
}

// Show results
function showResults() {
    document.querySelector('.quiz-question-panel').style.display = 'none';
    const resultsSection = document.getElementById('quiz-results');
    resultsSection.style.display = 'block';

    const correctAnswers = quizState.score;
    const wrongAnswers = quizState.totalQuestions - quizState.score;
    const percentage = Math.round((quizState.score / quizState.totalQuestions) * 100);

    document.getElementById('correct-answers').textContent = correctAnswers;
    document.getElementById('wrong-answers').textContent = wrongAnswers;
    document.getElementById('final-percentage').textContent = percentage + '%';

    // Performance message
    let message = '';
    let emoji = '';
    if (percentage >= 90) {
        message = 'ممتاز! أنت خبير في البوابات المنطقية! 🌟';
        emoji = '🏆';
        startConfetti();
        playSound('win');
    } else if (percentage >= 75) {
        message = 'جيد جداً! لديك فهم قوي للبوابات المنطقية! 👏';
        emoji = '⭐';
        startConfetti();
        playSound('win');
    } else if (percentage >= 60) {
        message = 'جيد! استمر في التدريب لتحسين مهاراتك! 💪';
        emoji = '👍';
    } else {
        message = 'حاول مرة أخرى! المزيد من التدريب سيساعدك على التحسن! 📚';
        emoji = '💡';
    }

    document.getElementById('performance-message').innerHTML = `${emoji} ${message}`;
}

// Simple Audio Context Synth for Sound Effects
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playSound(type) {
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }

    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    const now = audioCtx.currentTime;

    if (type === 'pick') {
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(300, now);
        oscillator.frequency.exponentialRampToValueAtTime(500, now + 0.1);
        gainNode.gain.setValueAtTime(0.1, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        oscillator.start(now);
        oscillator.stop(now + 0.1);
    } else if (type === 'drop') {
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(500, now);
        oscillator.frequency.exponentialRampToValueAtTime(300, now + 0.1);
        gainNode.gain.setValueAtTime(0.1, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        oscillator.start(now);
        oscillator.stop(now + 0.1);
    } else if (type === 'correct') {
        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(400, now);
        oscillator.frequency.setValueAtTime(600, now + 0.1);
        oscillator.frequency.setValueAtTime(800, now + 0.2);
        gainNode.gain.setValueAtTime(0.1, now);
        gainNode.gain.linearRampToValueAtTime(0.1, now + 0.3);
        gainNode.gain.linearRampToValueAtTime(0, now + 0.5);
        oscillator.start(now);
        oscillator.stop(now + 0.5);
    } else if (type === 'wrong') {
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(300, now);
        oscillator.frequency.linearRampToValueAtTime(150, now + 0.3);
        gainNode.gain.setValueAtTime(0.1, now);
        gainNode.gain.linearRampToValueAtTime(0, now + 0.3);
        oscillator.start(now);
        oscillator.stop(now + 0.3);
    } else if (type === 'win') {
        // Victory Fanfare
        playNote(523.25, now, 0.2); // C5
        playNote(659.25, now + 0.2, 0.2); // E5
        playNote(783.99, now + 0.4, 0.2); // G5
        playNote(1046.50, now + 0.6, 0.6); // C6
    }
}

function playNote(freq, time, duration) {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.type = 'square';
    osc.frequency.setValueAtTime(freq, time);
    gain.gain.setValueAtTime(0.05, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + duration);

    osc.start(time);
    osc.stop(time + duration);
}

// Confetti Effect
function startConfetti() {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);

        // Since we don't have a library, we'll create simple DOM confetti
        createConfetti(5);
    }, 250);
}

function createConfetti(amount) {
    const colors = ['#a855f7', '#0ea5e9', '#ffffff', '#22c55e'];

    for (let i = 0; i < amount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-10px';
        confetti.style.zIndex = '9999';
        confetti.style.pointerEvents = 'none';

        const rotation = Math.random() * 360;
        const duration = Math.random() * 3 + 2;

        confetti.style.transition = `top ${duration}s ease-out, transform ${duration}s linear`;
        document.body.appendChild(confetti);

        requestAnimationFrame(() => {
            confetti.style.top = '110vh';
            confetti.style.transform = `rotate(${rotation + 720}deg)`;
        });

        setTimeout(() => {
            document.body.removeChild(confetti);
        }, duration * 1000);
    }
}

// ==================== START APPLICATION ====================
document.addEventListener('DOMContentLoaded', () => {
    init();
    updateHints();

    // The quiz is now initialized via the switchTab function
    // when the radio-group input changes.

    // Unlock Audio Context on interaction
    document.addEventListener('click', () => {
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
    }, { once: true });
});
