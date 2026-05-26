/**
 * @fileoverview Transaction management module
 * Handles all operations related to transactions data
 * @module transactions
 */

/**
 * Array to store all transactions
 * @type {Array<Object>}
 */
let transactions = [];

/**
 * Generates a unique ID for a transaction
 * @returns {string} Unique transaction ID based on timestamp and random number
 */
function generateTransactionId() {
    return `trans_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Creates a new transaction object
 * @param {string} date - Transaction date and time in ISO format
 * @param {string} category - Category of the transaction
 * @param {number} amount - Transaction amount (positive for income, negative for expense)
 * @param {string} description - Full description of the transaction
 * @returns {Object} Transaction object with id, date, category, amount, and description
 */
function createTransaction(date, category, amount, description) {
    return {
        id: generateTransactionId(),
        date: date,
        category: category,
        amount: parseFloat(amount),
        description: description
    };
}

/**
 * Adds a new transaction to the transactions array
 * @param {Object} transaction - Transaction object to add
 * @returns {Object} The added transaction
 */
function addTransaction(transaction) {
    transactions.push(transaction);
    return transaction;
}

/**
 * Retrieves a transaction by its ID
 * @param {string} id - Transaction ID to find
 * @returns {Object|undefined} Transaction object if found, undefined otherwise
 */
function getTransactionById(id) {
    return transactions.find(trans => trans.id === id);
}

/**
 * Removes a transaction from the array by its ID
 * @param {string} id - Transaction ID to remove
 * @returns {boolean} True if transaction was removed, false if not found
 */
function removeTransaction(id) {
    const index = transactions.findIndex(trans => trans.id === id);
    if (index !== -1) {
        transactions.splice(index, 1);
        return true;
    }
    return false;
}

/**
 * Retrieves all transactions
 * @returns {Array<Object>} Copy of all transactions array
 */
function getAllTransactions() {
    return [...transactions];
}

/**
 * Calculates the total sum of all transactions
 * @returns {number} Total sum of all transaction amounts
 */
function calculateTotal() {
    return transactions.reduce((sum, trans) => sum + trans.amount, 0);
}

/**
 * Calculates total income (sum of positive amounts)
 * @returns {number} Total income from all transactions
 */
function calculateTotalIncome() {
    return transactions
        .filter(trans => trans.amount > 0)
        .reduce((sum, trans) => sum + trans.amount, 0);
}

/**
 * Calculates total expenses (sum of negative amounts)
 * @returns {number} Total expenses from all transactions
 */
function calculateTotalExpenses() {
    return transactions
        .filter(trans => trans.amount < 0)
        .reduce((sum, trans) => sum + trans.amount, 0);
}

/**
 * Validates transaction data
 * @param {string} date - Transaction date to validate
 * @param {string} category - Transaction category to validate
 * @param {number} amount - Transaction amount to validate
 * @param {string} description - Transaction description to validate
 * @returns {Object} Validation result with isValid boolean and errors array
 */
function validateTransaction(date, category, amount, description) {
    const errors = [];

    if (!date || date.trim() === '') {
        errors.push('Date and time are required');
    }

    if (!category || category.trim() === '') {
        errors.push('Category is required');
    }

    if (!amount || isNaN(amount) || parseFloat(amount) === 0) {
        errors.push('Amount must be a non-zero number');
    }

    if (!description || description.trim() === '') {
        errors.push('Description is required');
    } else if (description.trim().length < 3) {
        errors.push('Description must be at least 3 characters long');
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

export {
    createTransaction,
    addTransaction,
    getTransactionById,
    removeTransaction,
    getAllTransactions,
    calculateTotal,
    calculateTotalIncome,
    calculateTotalExpenses,
    validateTransaction
};
