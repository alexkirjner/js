/**
 * @fileoverview Utility functions module
 * Contains helper functions for formatting and common operations
 * @module utils
 */

/**
 * Generates a unique ID based on timestamp and random number
 * @returns {string} Unique identifier
 * @example
 * const id = generateId();
 * // Returns something like: "id_1234567890123_abc123def456"
 */
function generateId() {
    return `id_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Formats a date string to a readable format
 * @param {string} dateString - ISO format date string
 * @returns {string} Formatted date and time (e.g., "26 May 2026, 18:30")
 * @example
 * const formatted = formatDate("2026-05-26T18:30:00");
 * // Returns: "26 May 2026, 18:30"
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    
    return date.toLocaleDateString('en-US', options);
}

/**
 * Formats a number as currency string
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code (default: 'USD')
 * @returns {string} Formatted currency string (e.g., "$100.50")
 * @example
 * const formatted = formatCurrency(100.50);
 * // Returns: "$100.50"
 */
function formatCurrency(amount, currency = 'USD') {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    
    return formatter.format(amount);
}

/**
 * Truncates a string to a specified number of words
 * @param {string} text - Text to truncate
 * @param {number} wordCount - Maximum number of words
 * @returns {string} Truncated text with ellipsis if needed
 * @example
 * const truncated = truncateText("This is a long description", 4);
 * // Returns: "This is a long..."
 */
function truncateText(text, wordCount = 4) {
    const words = text.split(' ');
    
    if (words.length > wordCount) {
        return words.slice(0, wordCount).join(' ') + '...';
    }
    
    return text;
}

/**
 * Determines if an amount is positive (income) or negative (expense)
 * @param {number} amount - Amount to check
 * @returns {string} 'income' for positive amounts, 'expense' for negative amounts
 * @example
 * const type = getTransactionType(100);
 * // Returns: "income"
 */
function getTransactionType(amount) {
    return amount > 0 ? 'income' : 'expense';
}

/**
 * Validates if an email string is valid
 * @param {string} email - Email to validate
 * @returns {boolean} True if email format is valid
 * @example
 * const isValid = validateEmail("user@example.com");
 * // Returns: true
 */
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Converts a date object to ISO string format
 * @param {Date} date - Date object to convert
 * @returns {string} ISO format string
 * @example
 * const iso = dateToIso(new Date());
 * // Returns: "2026-05-26T18:30:00"
 */
function dateToIso(date) {
    return date.toISOString().slice(0, 16);
}

/**
 * Clamps a number between min and max values
 * @param {number} value - Value to clamp
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Clamped value
 * @example
 * const clamped = clamp(15, 0, 10);
 * // Returns: 10
 */
function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

/**
 * Delays execution for a specified number of milliseconds
 * @param {number} ms - Milliseconds to delay
 * @returns {Promise} Promise that resolves after delay
 * @example
 * await delay(1000);
 * // Execution paused for 1 second
 */
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export {
    generateId,
    formatDate,
    formatCurrency,
    truncateText,
    getTransactionType,
    validateEmail,
    dateToIso,
    clamp,
    delay
};
