// ==================== LOGIC GATE DEFINITIONS ====================
const LOGIC_GATES = {
    AND: {
        name: 'AND',
        symbol: '∧',
        description: 'الناتج يكون 1 فقط عندما يكون كلا المدخلين 1',
        operation: (a, b) => a && b,
        inputs: 2
    },
    OR: {
        name: 'OR',
        symbol: '∨',
        description: 'الناتج يكون 1 عندما يكون أحد المدخلين على الأقل 1',
        operation: (a, b) => a || b,
        inputs: 2
    },
    NOT: {
        name: 'NOT',
        symbol: '¬',
        description: 'الناتج هو عكس المدخل A',
        operation: (a) => !a,
        inputs: 1
    },
    XOR: {
        name: 'XOR',
        symbol: '⊕',
        description: 'الناتج يكون 1 عندما يكون المدخلان مختلفين',
        operation: (a, b) => a !== b,
        inputs: 2
    },
    NAND: {
        name: 'NAND',
        symbol: '⊼',
        description: 'الناتج يكون 0 فقط عندما يكون كلا المدخلين 1',
        operation: (a, b) => !(a && b),
        inputs: 2
    },
    NOR: {
        name: 'NOR',
        symbol: '⊽',
        description: 'الناتج يكون 1 فقط عندما يكون كلا المدخلين 0',
        operation: (a, b) => !(a || b),
        inputs: 2
    },
    XNOR: {
        name: 'XNOR',
        symbol: '⊙',
        description: 'الناتج يكون 1 عندما يكون المدخلان متساويين',
        operation: (a, b) => a === b,
        inputs: 2
    }
};

// ==================== SVG GATE SHAPES ====================
function drawGateSVG(gateName) {
    const svg = document.getElementById('gate-svg');
    const nameDisplay = document.getElementById('gate-name-display');

    // Clear previous SVG content
    svg.innerHTML = '';
    nameDisplay.textContent = gateName;

    // Define colors
    const strokeColor = 'url(#gateGradient)';
    const fillColor = 'none';
    const strokeWidth = 3;

    // Add gradient definition
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    gradient.setAttribute('id', 'gateGradient');
    gradient.setAttribute('x1', '0%');
    gradient.setAttribute('y1', '0%');
    gradient.setAttribute('x2', '100%');
    gradient.setAttribute('y2', '100%');

    const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop1.setAttribute('offset', '0%');
    stop1.setAttribute('style', 'stop-color:hsl(280, 85%, 65%);stop-opacity:1');

    const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop2.setAttribute('offset', '100%');
    stop2.setAttribute('style', 'stop-color:hsl(200, 90%, 55%);stop-opacity:1');

    gradient.appendChild(stop1);
    gradient.appendChild(stop2);
    defs.appendChild(gradient);
    svg.appendChild(defs);

    // Input lines
    const inputY1 = 45;
    const inputY2 = 105;
    const inputX = 20;

    const input1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    input1.setAttribute('x1', inputX);
    input1.setAttribute('y1', inputY1);
    input1.setAttribute('x2', inputX + 30);
    input1.setAttribute('y2', inputY1);
    input1.setAttribute('stroke', strokeColor);
    input1.setAttribute('stroke-width', strokeWidth);

    // Draw gate shape based on type
    switch (gateName) {
        case 'AND':
            drawANDGate(svg, strokeColor, strokeWidth);
            svg.appendChild(input1);
            const input2And = createInputLine(inputX, inputY2, inputX + 30, inputY2, strokeColor, strokeWidth);
            svg.appendChild(input2And);
            break;

        case 'OR':
            drawORGate(svg, strokeColor, strokeWidth);
            svg.appendChild(input1);
            const input2Or = createInputLine(inputX, inputY2, inputX + 30, inputY2, strokeColor, strokeWidth);
            svg.appendChild(input2Or);
            break;

        case 'NOT':
            drawNOTGate(svg, strokeColor, strokeWidth);
            const inputNot = createInputLine(inputX, 75, inputX + 30, 75, strokeColor, strokeWidth);
            svg.appendChild(inputNot);
            break;

        case 'XOR':
            drawXORGate(svg, strokeColor, strokeWidth);
            svg.appendChild(input1);
            const input2Xor = createInputLine(inputX, inputY2, inputX + 30, inputY2, strokeColor, strokeWidth);
            svg.appendChild(input2Xor);
            break;

        case 'NAND':
            drawNANDGate(svg, strokeColor, strokeWidth);
            svg.appendChild(input1);
            const input2Nand = createInputLine(inputX, inputY2, inputX + 30, inputY2, strokeColor, strokeWidth);
            svg.appendChild(input2Nand);
            break;

        case 'NOR':
            drawNORGate(svg, strokeColor, strokeWidth);
            svg.appendChild(input1);
            const input2Nor = createInputLine(inputX, inputY2, inputX + 30, inputY2, strokeColor, strokeWidth);
            svg.appendChild(input2Nor);
            break;

        case 'XNOR':
            drawXNORGate(svg, strokeColor, strokeWidth);
            svg.appendChild(input1);
            const input2Xnor = createInputLine(inputX, inputY2, inputX + 30, inputY2, strokeColor, strokeWidth);
            svg.appendChild(input2Xnor);
            break;
    }

    // Output line
    const outputLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    const outputX = gateName === 'NOT' ? 155 : 165;
    outputLine.setAttribute('x1', outputX);
    outputLine.setAttribute('y1', 75);
    outputLine.setAttribute('x2', 180);
    outputLine.setAttribute('y2', 75);
    outputLine.setAttribute('stroke', strokeColor);
    outputLine.setAttribute('stroke-width', strokeWidth);
    svg.appendChild(outputLine);
}

function createInputLine(x1, y1, x2, y2, stroke, width) {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', x1);
    line.setAttribute('y1', y1);
    line.setAttribute('x2', x2);
    line.setAttribute('y2', y2);
    line.setAttribute('stroke', stroke);
    line.setAttribute('stroke-width', width);
    return line;
}

function drawANDGate(svg, stroke, width) {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M 50 30 L 100 30 Q 140 30 140 75 Q 140 120 100 120 L 50 120 L 50 30 Z');
    path.setAttribute('stroke', stroke);
    path.setAttribute('stroke-width', width);
    path.setAttribute('fill', 'none');
    svg.appendChild(path);
}

function drawORGate(svg, stroke, width) {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M 50 30 Q 70 30 85 45 Q 100 60 110 75 Q 100 90 85 105 Q 70 120 50 120 Q 60 75 50 30 Z');
    path.setAttribute('stroke', stroke);
    path.setAttribute('stroke-width', width);
    path.setAttribute('fill', 'none');
    svg.appendChild(path);
}

function drawNOTGate(svg, stroke, width) {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M 50 45 L 50 105 L 130 75 Z');
    path.setAttribute('stroke', stroke);
    path.setAttribute('stroke-width', width);
    path.setAttribute('fill', 'none');
    svg.appendChild(path);

    // Inverter bubble
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', 140);
    circle.setAttribute('cy', 75);
    circle.setAttribute('r', 10);
    circle.setAttribute('stroke', stroke);
    circle.setAttribute('stroke-width', width);
    circle.setAttribute('fill', 'none');
    svg.appendChild(circle);
}

function drawXORGate(svg, stroke, width) {
    // Extra curved line for XOR
    const extraLine = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    extraLine.setAttribute('d', 'M 40 30 Q 50 75 40 120');
    extraLine.setAttribute('stroke', stroke);
    extraLine.setAttribute('stroke-width', width);
    extraLine.setAttribute('fill', 'none');
    svg.appendChild(extraLine);

    // OR gate shape
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M 50 30 Q 70 30 85 45 Q 100 60 110 75 Q 100 90 85 105 Q 70 120 50 120 Q 60 75 50 30 Z');
    path.setAttribute('stroke', stroke);
    path.setAttribute('stroke-width', width);
    path.setAttribute('fill', 'none');
    svg.appendChild(path);
}

function drawNANDGate(svg, stroke, width) {
    // AND gate shape
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M 50 30 L 100 30 Q 140 30 140 75 Q 140 120 100 120 L 50 120 L 50 30 Z');
    path.setAttribute('stroke', stroke);
    path.setAttribute('stroke-width', width);
    path.setAttribute('fill', 'none');
    svg.appendChild(path);

    // Inverter bubble
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', 150);
    circle.setAttribute('cy', 75);
    circle.setAttribute('r', 10);
    circle.setAttribute('stroke', stroke);
    circle.setAttribute('stroke-width', width);
    circle.setAttribute('fill', 'none');
    svg.appendChild(circle);
}

function drawNORGate(svg, stroke, width) {
    // OR gate shape
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M 50 30 Q 70 30 85 45 Q 100 60 110 75 Q 100 90 85 105 Q 70 120 50 120 Q 60 75 50 30 Z');
    path.setAttribute('stroke', stroke);
    path.setAttribute('stroke-width', width);
    path.setAttribute('fill', 'none');
    svg.appendChild(path);

    // Inverter bubble
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', 120);
    circle.setAttribute('cy', 75);
    circle.setAttribute('r', 10);
    circle.setAttribute('stroke', stroke);
    circle.setAttribute('stroke-width', width);
    circle.setAttribute('fill', 'none');
    svg.appendChild(circle);
}

function drawXNORGate(svg, stroke, width) {
    // Extra curved line for XNOR
    const extraLine = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    extraLine.setAttribute('d', 'M 40 30 Q 50 75 40 120');
    extraLine.setAttribute('stroke', stroke);
    extraLine.setAttribute('stroke-width', width);
    extraLine.setAttribute('fill', 'none');
    svg.appendChild(extraLine);

    // OR gate shape
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M 50 30 Q 70 30 85 45 Q 100 60 110 75 Q 100 90 85 105 Q 70 120 50 120 Q 60 75 50 30 Z');
    path.setAttribute('stroke', stroke);
    path.setAttribute('stroke-width', width);
    path.setAttribute('fill', 'none');
    svg.appendChild(path);

    // Inverter bubble
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', 120);
    circle.setAttribute('cy', 75);
    circle.setAttribute('r', 10);
    circle.setAttribute('stroke', stroke);
    circle.setAttribute('stroke-width', width);
    circle.setAttribute('fill', 'none');
    svg.appendChild(circle);
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

    // Input toggles
    toggleA.addEventListener('click', () => {
        inputA = !inputA;
        updateToggle(toggleA, inputA);
        updateWire(wireA, inputA);
        updateOutput();
        highlightActiveRow();
    });

    toggleB.addEventListener('click', () => {
        inputB = !inputB;
        updateToggle(toggleB, inputB);
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
    gateDescription.textContent = gate.description;
}

function updateToggle(toggleElement, state) {
    const stateValue = state ? 1 : 0;
    toggleElement.dataset.state = stateValue;
    toggleElement.querySelector('.toggle-value').textContent = stateValue;
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
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabName = btn.dataset.tab;

        // Update active tab button
        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Update active tab content
        tabContents.forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${tabName}-tab`).classList.add('active');
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
            fracCalculation += `${positionValue.toFixed(10)}`;
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
            <div class="step-formula">= ${fracTotal.toFixed(10)}</div>

            <div class="step-explanation" style="background: rgba(16, 185, 129, 0.1); padding: 1rem; border-radius: 8px; margin-top: 1rem;">
                <strong>➕ المجموع الكلي:</strong><br>
                ${intTotal} + ${fracTotal.toFixed(10)} = ${decimalValue}
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
    let intStepsHTML = '<div class="division-steps">';
    let num = integerPart;
    let intResult = '';
    let stepNumber = 1;

    if (num === 0) {
        intStepsHTML += `<div class="division-row">0 ÷ ${toBase} = 0 <span class="remainder">باقي 0</span></div>`;
        intResult = '0';
    } else {
        while (num > 0) {
            const remainder = num % toBase;
            const quotient = Math.floor(num / toBase);
            const remainderStr = remainder < 10 ? remainder.toString() : String.fromCharCode(65 + remainder - 10);

            const product = quotient * toBase;
            const remainderExplanation = remainder < 10 ?
                `<div style="margin-top:4px; color:#888;">${quotient} × ${toBase} = ${product}</div>
                 <div>(${num} - ${product} = ${remainder})</div>` :
                `<div style="margin-top:4px; color:#aaa;">${quotient} × ${toBase} = ${product}</div>
                 <div>(${num} - ${product} = ${remainder}) ← (الباقي ${remainder} يكتب ${remainderStr})</div>`;

            intStepsHTML += `
                <div class="division-row">
                    <span class="step-num">${stepNumber}.</span>
                    ${num} ÷ ${toBase} = ${quotient} 
                    <span class="remainder">باقي ${remainderStr}</span>
                    <span class="remainder-hint">${remainderExplanation}</span>
                </div>`;
            intResult = remainderStr + intResult;
            num = quotient;
            stepNumber++;
        }
    }
    intStepsHTML += '</div>';

    // ===== FRACTIONAL PART CONVERSION =====
    let fracStepsHTML = '';
    let fracResult = '';

    if (fractionalPart > 0) {
        fracStepsHTML = '<div class="division-steps">';
        let frac = fractionalPart;
        let fracStepNumber = 1;
        const maxIterations = 10;

        while (frac > 0 && fracStepNumber <= maxIterations) {
            const product = frac * toBase;
            const digit = Math.floor(product);
            const digitStr = digit < 10 ? digit.toString() : String.fromCharCode(65 + digit - 10);
            const newFrac = product - digit;

            const explanation = digit < 10 ?
                `(${frac.toFixed(10)} × ${toBase} = ${product.toFixed(10)})` :
                `(${frac.toFixed(10)} × ${toBase} = ${product.toFixed(10)} حيث ${digitStr}=${digit})`;

            fracStepsHTML += `
                <div class="division-row">
                    <span class="step-num">${fracStepNumber}.</span>
                    ${frac.toFixed(10)} × ${toBase} = ${product.toFixed(10)}
                    <span class="remainder">الجزء الصحيح: ${digitStr}</span>
                    <span class="remainder-hint">${explanation}</span>
                </div>`;

            fracResult += digitStr;
            frac = newFrac;
            fracStepNumber++;
        }

        fracStepsHTML += '</div>';
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

    htmlContent += `<div class="step-result">✅ النتيجة النهائية: ${finalResult}${baseSubscript}</div>`;

    stepCard.innerHTML = htmlContent;
    stepsContent.appendChild(stepCard);
}

// ==================== START APPLICATION ====================
document.addEventListener('DOMContentLoaded', () => {
    init();
    updateHints();
});
