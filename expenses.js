// Expenses Page - Daily Expense Tracking (CRUD Operations)

let currentEditExpenseId = null;
let deleteExpenseId = null;
let selectedDate = new Date().toISOString().split('T')[0];

// Get expenses from localStorage
function getExpenses() {
    return JSON.parse(localStorage.getItem('expenses')) || [];
}

// Save expenses to localStorage
function saveExpenses(expenses) {
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Get filtered expenses by date
function getFilteredExpenses(date) {
    const expenses = getExpenses();
    return expenses.filter(exp => exp.date === date);
}

// Calculate total for a date
function calculateDailyTotal(date) {
    const expenses = getFilteredExpenses(date);
    return expenses.reduce((sum, exp) => sum + exp.amount, 0);
}

// Render expense table
function renderExpenseTable() {
    const tableBody = document.getElementById('expenseTableBody');
    const noExpenseMessage = document.getElementById('noExpenseMessage');
    const expenseTotal = document.getElementById('expenseTotal');
    
    if (!tableBody) return;
    
    const expenses = getFilteredExpenses(selectedDate);
    const total = calculateDailyTotal(selectedDate);
    
    if (expenseTotal) {
        expenseTotal.textContent = MandiApp.formatCurrency(total);
    }
    
    if (expenses.length === 0) {
        tableBody.innerHTML = '';
        if (noExpenseMessage) noExpenseMessage.style.display = 'block';
        return;
    }
    
    if (noExpenseMessage) noExpenseMessage.style.display = 'none';
    
    // Sort by time descending
    const sorted = [...expenses].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    tableBody.innerHTML = sorted.map(exp => {
        const time = new Date(exp.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
        return `
            <tr>
                <td><span class="expense-category-badge">${exp.category}</span></td>
                <td>${exp.description}</td>
                <td><strong>${MandiApp.formatCurrency(exp.amount)}</strong></td>
                <td>${time}</td>
                <td class="actions">
                    <button class="edit-btn" onclick="editExpense('${exp.id}')">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="delete-btn" onclick="showDeleteExpenseConfirm('${exp.id}')">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

// Show add expense modal
function showAddExpenseModal() {
    currentEditExpenseId = null;
    const modal = document.getElementById('expenseModal');
    const modalTitle = document.getElementById('expenseModalTitle');
    const form = document.getElementById('expenseForm');
    
    if (modal && modalTitle && form) {
        modalTitle.innerHTML = '<i class="fas fa-plus-circle"></i> Add Expense';
        form.reset();
        document.getElementById('expenseId').value = '';
        modal.classList.add('active');
    }
}

// Close expense modal
function closeExpenseModal() {
    const modal = document.getElementById('expenseModal');
    if (modal) {
        modal.classList.remove('active');
        currentEditExpenseId = null;
    }
}

// Edit expense
function editExpense(id) {
    const expenses = getExpenses();
    const expense = expenses.find(e => e.id === id);
    
    if (!expense) return;
    
    currentEditExpenseId = id;
    
    const modal = document.getElementById('expenseModal');
    const modalTitle = document.getElementById('expenseModalTitle');
    
    if (modal && modalTitle) {
        modalTitle.innerHTML = '<i class="fas fa-edit"></i> Edit Expense';
        
        document.getElementById('expenseId').value = expense.id;
        document.getElementById('expenseCategory').value = expense.category;
        document.getElementById('expenseDescription').value = expense.description;
        document.getElementById('expenseAmount').value = expense.amount;
        
        modal.classList.add('active');
    }
}

// Save expense (Create/Update)
function saveExpense(e) {
    e.preventDefault();
    
    const category = document.getElementById('expenseCategory').value;
    const description = document.getElementById('expenseDescription').value.trim();
    const amount = parseInt(document.getElementById('expenseAmount').value);
    
    if (!category || !description || !amount) {
        MandiApp.showToast('Please fill all fields', true);
        return;
    }
    
    const expenses = getExpenses();
    
    if (currentEditExpenseId) {
        // Update existing expense
        const index = expenses.findIndex(e => e.id === currentEditExpenseId);
        if (index !== -1) {
            expenses[index] = {
                ...expenses[index],
                category,
                description,
                amount
            };
            MandiApp.showToast('Expense updated successfully');
        }
    } else {
        // Create new expense
        const newExpense = {
            id: MandiApp.generateId(),
            category,
            description,
            amount,
            date: selectedDate,
            createdAt: new Date().toISOString()
        };
        expenses.push(newExpense);
        MandiApp.showToast('Expense added successfully');
    }
    
    saveExpenses(expenses);
    renderExpenseTable();
    closeExpenseModal();
}

// Show delete confirmation
function showDeleteExpenseConfirm(id) {
    const expenses = getExpenses();
    const expense = expenses.find(e => e.id === id);
    
    if (!expense) return;
    
    deleteExpenseId = id;
    
    const modal = document.getElementById('deleteExpenseModal');
    const expenseName = document.getElementById('deleteExpenseName');
    
    if (modal && expenseName) {
        expenseName.textContent = `${expense.category} - ${expense.description} (${MandiApp.formatCurrency(expense.amount)})`;
        modal.classList.add('active');
    }
}

// Close delete modal
function closeDeleteExpenseModal() {
    const modal = document.getElementById('deleteExpenseModal');
    if (modal) {
        modal.classList.remove('active');
        deleteExpenseId = null;
    }
}

// Confirm delete
function confirmDeleteExpense() {
    if (!deleteExpenseId) return;
    
    let expenses = getExpenses();
    expenses = expenses.filter(e => e.id !== deleteExpenseId);
    
    saveExpenses(expenses);
    MandiApp.showToast('Expense deleted successfully');
    
    renderExpenseTable();
    closeDeleteExpenseModal();
}

// Handle date change
function handleDateChange() {
    const dateFilter = document.getElementById('expenseDateFilter');
    if (dateFilter) {
        selectedDate = dateFilter.value;
        renderExpenseTable();
    }
}

// Initialize expenses page
function initializeExpensesPage() {
    // Set today's date
    const dateFilter = document.getElementById('expenseDateFilter');
    if (dateFilter) {
        dateFilter.value = selectedDate;
        dateFilter.addEventListener('change', handleDateChange);
    }
    
    renderExpenseTable();
    
    // Add expense button
    const addExpenseBtn = document.getElementById('addExpenseBtn');
    if (addExpenseBtn) {
        addExpenseBtn.addEventListener('click', showAddExpenseModal);
    }
    
    // Close modal button
    const closeExpenseModalBtn = document.getElementById('closeExpenseModal');
    if (closeExpenseModalBtn) {
        closeExpenseModalBtn.addEventListener('click', closeExpenseModal);
    }
    
    // Cancel button
    const cancelExpenseBtn = document.getElementById('cancelExpenseBtn');
    if (cancelExpenseBtn) {
        cancelExpenseBtn.addEventListener('click', closeExpenseModal);
    }
    
    // Form submit
    const expenseForm = document.getElementById('expenseForm');
    if (expenseForm) {
        expenseForm.addEventListener('submit', saveExpense);
    }
    
    // Delete modal buttons
    const cancelDeleteExpenseBtn = document.getElementById('cancelDeleteExpenseBtn');
    if (cancelDeleteExpenseBtn) {
        cancelDeleteExpenseBtn.addEventListener('click', closeDeleteExpenseModal);
    }
    
    const confirmDeleteExpenseBtn = document.getElementById('confirmDeleteExpenseBtn');
    if (confirmDeleteExpenseBtn) {
        confirmDeleteExpenseBtn.addEventListener('click', confirmDeleteExpense);
    }
    
    // Close modals on outside click
    const expenseModal = document.getElementById('expenseModal');
    if (expenseModal) {
        expenseModal.addEventListener('click', (e) => {
            if (e.target === expenseModal) closeExpenseModal();
        });
    }
    
    const deleteExpenseModal = document.getElementById('deleteExpenseModal');
    if (deleteExpenseModal) {
        deleteExpenseModal.addEventListener('click', (e) => {
            if (e.target === deleteExpenseModal) closeDeleteExpenseModal();
        });
    }
}

// Run on page load
document.addEventListener('DOMContentLoaded', initializeExpensesPage);
