
// ============================================
// CALCULATOR APP - JAVASCRIPT
// ============================================

// Get calculator display and buttons
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".buttons button");

// Listen for button clicks
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        handleInput(button.textContent.trim());
    });
});

// Handle calculator input
function handleInput(value) {

    // Clear display
    if (value === "AC") {
        display.value = "";
        return;
    }

    // Delete last character
    if (value === "DEL") {
        if (display.value === "Error") {
            display.value = "";
        } else {
            display.value = display.value.slice(0, -1);
        }
        return;
    }

    // Calculate result
    if (value === "=") {
        calculateResult();
        return;
    }

    // Clear error before starting again
    if (display.value === "Error") {
        display.value = "";
    }

    // Add number or operator
    display.value += value;
}

// Calculate the answer
function calculateResult() {

    const originalExpression = display.value;

    if (originalExpression.trim() === "") {
        return;
    }

    try {

        // Convert calculator symbols
        const expression = originalExpression
            .replace(/×/g, "*")
            .replace(/÷/g, "/")
            .replace(/%/g, "/100");

        // Allow only basic mathematical characters
        const allowedCharacters = /^[0-9+\-*/().\s]+$/;

        if (!allowedCharacters.test(expression)) {
            throw new Error("Invalid expression");
        }

        // Perform calculation
        const result = Function(
            '"use strict"; return (' + expression + ');'
        )();

        // Check result
        if (typeof result !== "number" || !Number.isFinite(result)) {
            throw new Error("Invalid result");
        }

        // Display clean result
        display.value = Number.parseFloat(
            result.toPrecision(12)
        ).toString();

    } catch (error) {

        display.value = "Error";

    }
}

// Keyboard support
document.addEventListener("keydown", (event) => {

    const key = event.key;

    // Numbers and decimal point
    if (/^[0-9.]$/.test(key)) {
        handleInput(key);
        return;
    }

    // Mathematical operators
    if (key === "+") {
        handleInput("+");
    }

    else if (key === "-") {
        handleInput("-");
    }

    else if (key === "*") {
        handleInput("×");
    }

    else if (key === "/") {
        event.preventDefault();
        handleInput("÷");
    }

    else if (key === "%") {
        handleInput("%");
    }

    // Enter to calculate
    else if (key === "Enter" || key === "=") {
        event.preventDefault();
        handleInput("=");
    }

    // Backspace to delete
    else if (key === "Backspace") {
        handleInput("DEL");
    }

    // Escape to clear
    else if (key === "Escape") {
        handleInput("AC");
    }

});
