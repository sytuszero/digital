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
const binaryInput = document.getElementById('binary-input');
const decimalInput = document.getElementById('decimal-input');
const convertBtn = document.getElementById('convert-btn');
const stepsPanel = document.getElementById('steps-panel');
const stepsContent = document.getElementById('steps-content');

// Input validation
binaryInput.addEventListener('input', (e) => {
    // Allow 0, 1, and one decimal point
    let value = e.target.value;
    // Remove any characters that aren't 0, 1, or .
    value = value.replace(/[^01.]/g, '');
    // Ensure only one decimal point
    const parts = value.split('.');
    if (parts.length > 2) {
        value = parts[0] + '.' + parts.slice(1).join('');
    }
    e.target.value = value;
});

decimalInput.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
});

// Auto-convert on input
binaryInput.addEventListener('input', () => autoConvert('binary'));
decimalInput.addEventListener('input', () => autoConvert('decimal'));

convertBtn.addEventListener('click', () => {
    if (binaryInput.value) {
        showDetailedSteps('binary', binaryInput.value);
    } else if (decimalInput.value) {
        showDetailedSteps('decimal', decimalInput.value);
    }
});

function autoConvert(from) {
    let value;

    if (from === 'binary' && binaryInput.value) {
        // Handle binary with decimal point
        const binaryStr = binaryInput.value;
        if (binaryStr.includes('.')) {
            const [intPart, fracPart] = binaryStr.split('.');
            let decimalValue = 0;

            // Convert integer part
            if (intPart) {
                decimalValue += parseInt(intPart, 2) || 0;
            }

            // Convert fractional part
            if (fracPart) {
                for (let i = 0; i < fracPart.length; i++) {
                    if (fracPart[i] === '1') {
                        decimalValue += Math.pow(2, -(i + 1));
                    }
                }
            }

            decimalInput.value = decimalValue;
        } else {
            value = parseInt(binaryInput.value, 2);
            if (!isNaN(value)) {
                decimalInput.value = value;
            }
        }
    } else if (from === 'decimal' && decimalInput.value) {
        value = parseFloat(decimalInput.value);
        if (!isNaN(value)) {
            // For now, only convert integer part to binary
            // Full decimal to binary fraction conversion is complex
            const intPart = Math.floor(value);
            binaryInput.value = intPart.toString(2);
        }
    }
}

function showDetailedSteps(from, value) {
    stepsContent.innerHTML = '';
    stepsPanel.style.display = 'block';

    if (from === 'binary') {
        showBinaryToDecimalSteps(value);
    } else if (from === 'decimal') {
        showDecimalToBinarySteps(parseInt(value));
    }
}

function showBinaryToDecimalSteps(binary) {
    const stepCard = document.createElement('div');
    stepCard.className = 'step-card';

    // Check if binary has decimal point
    const hasFraction = binary.includes('.');
    let intPart = binary;
    let fracPart = '';

    if (hasFraction) {
        [intPart, fracPart] = binary.split('.');
        intPart = intPart || '0';
    }

    // Create visual representation with arrows
    let binaryDigits = '';
    let arrows = '';
    let powers = '';
    let formula = '';
    let calculation = '';
    let total = 0;

    // Process integer part
    for (let i = 0; i < intPart.length; i++) {
        const position = intPart.length - 1 - i;
        const digit = intPart[i];
        const value = parseInt(digit) * Math.pow(2, position);
        total += value;

        // Build visual representation
        binaryDigits += `<span class="binary-digit">${digit}</span>`;
        arrows += `<span class="arrow">↓</span>`;
        powers += `<span class="power-label">2<sup>${position}</sup></span>`;

        // Build formula
        if (i > 0) {
            formula += ' + ';
            calculation += ' + ';
        }
        formula += `(${digit} × 2<sup>${position}</sup>)`;
        calculation += `${value}`;
    }

    // Add decimal point if present
    if (hasFraction) {
        binaryDigits += `<span class="binary-digit decimal-point">.</span>`;
        arrows += `<span class="arrow"> </span>`;
        powers += `<span class="power-label"> </span>`;
    }

    // Process fractional part
    if (hasFraction && fracPart) {
        for (let i = 0; i < fracPart.length; i++) {
            const position = -(i + 1);
            const digit = fracPart[i];
            const value = parseInt(digit) * Math.pow(2, position);
            total += value;

            // Build visual representation
            binaryDigits += `<span class="binary-digit">${digit}</span>`;
            arrows += `<span class="arrow">↓</span>`;
            powers += `<span class="power-label">2<sup>${position}</sup></span>`;

            // Build formula
            if (i > 0 || intPart.length > 0) {
                formula += ' + ';
                calculation += ' + ';
            }
            formula += `(${digit} × 2<sup>${position}</sup>)`;
            calculation += `${value.toFixed(10).replace(/\.?0+$/, '')}`;
        }
    }

    stepCard.innerHTML = `
        <div class="step-title">Binary → Decimal: ${binary}₂</div>
        
        <div class="visual-mapping">
            <div class="binary-row">${binaryDigits}</div>
            <div class="arrow-row">${arrows}</div>
            <div class="power-row">${powers}</div>
        </div>
        
        <div class="step-explanation">
            ${hasFraction ?
            'الأرقام قبل الفاصلة تُضرب في قوى موجبة من 2، والأرقام بعد الفاصلة تُضرب في قوى سالبة من 2' :
            'كل رقم ثنائي يتم ضربه في 2 مرفوعة لقوة موضعه (من اليمين، بدءاً من 0)'}
        </div>
        
        <div class="step-formula">${formula}</div>
        <div class="step-formula">${calculation}</div>
        
        <div class="step-result">النتيجة النهائية: ${total.toFixed(10).replace(/\.?0+$/, '')}₁₀</div>
    `;

    stepsContent.appendChild(stepCard);
}

function showDecimalToBinarySteps(decimal) {
    const stepCard = document.createElement('div');
    stepCard.className = 'step-card';

    let stepsHTML = '<div class="division-steps">';
    let num = decimal;
    let binary = '';

    if (num === 0) {
        stepsHTML += '<div class="division-row">0 ÷ 2 = 0 <span class="remainder">باقي 0</span></div>';
        binary = '0';
    } else {
        while (num > 0) {
            const remainder = num % 2;
            stepsHTML += `<div class="division-row">${num} ÷ 2 = ${Math.floor(num / 2)} <span class="remainder">باقي ${remainder}</span></div>`;
            binary = remainder + binary;
            num = Math.floor(num / 2);
        }
    }
    stepsHTML += '</div>';

    stepCard.innerHTML = `
        <div class="step-title">Decimal → Binary: ${decimal}₁₀</div>
        
        <div class="step-explanation">
            نقسم الرقم على 2 بشكل متكرر ونأخذ الباقي في كل مرة
        </div>
        
        ${stepsHTML}
        
        <div class="step-explanation">
            نقرأ الأرقام من الأسفل للأعلى (الباقي الأخير أولاً) ⬆️
        </div>
        
        <div class="step-result">النتيجة النهائية: ${binary}₂</div>
    `;

    stepsContent.appendChild(stepCard);
}

// ==================== START APPLICATION ====================
document.addEventListener('DOMContentLoaded', init);
