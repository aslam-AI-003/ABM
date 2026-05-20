// Firebase Configuration and Database Operations
// Using Firebase CDN (compat version for simplicity)

const firebaseConfig = {
    apiKey: "AIzaSyA0h41dnLHhll9QebR4fkiaiG8C3cdo8Es",
    authDomain: "abm-billing.firebaseapp.com",
    projectId: "abm-billing",
    storageBucket: "abm-billing.firebasestorage.app",
    messagingSenderId: "774462936172",
    appId: "1:774462936172:web:3312f7c3876aa09ba77449",
    measurementId: "G-6ZN8GZYY8Q"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// ============ FIRESTORE DATABASE OPERATIONS ============

// --- MENU ITEMS ---
const FireDB = {
    // Get all menu items
    async getMenuItems() {
        try {
            const snapshot = await db.collection('menuItems').orderBy('id').get();
            if (snapshot.empty) {
                // Initialize with default menu items if empty
                await this.initializeDefaultMenu();
                return this.getMenuItems();
            }
            return snapshot.docs.map(doc => doc.data());
        } catch (error) {
            console.error('Error getting menu items:', error);
            // Fallback to localStorage
            return JSON.parse(localStorage.getItem('menuItems')) || [];
        }
    },

    // Initialize default menu items in Firestore
    async initializeDefaultMenu() {
        const batch = db.batch();
        const defaultItems = [
            { id: 1, name: 'Chicken Mandi', category: 'Chicken', size: 'Single', price: 250, image: 'images/single_chicken.jpg' },
            { id: 2, name: 'Chicken Mandi', category: 'Chicken', size: 'Couples', price: 550, image: 'images/half_chicken.webp' },
            { id: 3, name: 'Chicken Mandi', category: 'Chicken', size: 'Family', price: 1100, image: 'images/chicken_mandi_full.webp' },
            { id: 4, name: 'Mutton Mandi', category: 'Mutton', size: 'Single', price: 400, image: 'images/mutton_single.png' },
            { id: 5, name: 'Mutton Mandi', category: 'Mutton', size: 'Couples', price: 800, image: 'images/mutton_half.webp' },
            { id: 6, name: 'Mutton Mandi', category: 'Mutton', size: 'Family', price: 1600, image: 'images/muttonfull.jpg' },
            { id: 7, name: 'Beef Mandi', category: 'Beef', size: 'Single', price: 350, image: 'images/beef_single.webp' },
            { id: 8, name: 'Beef Mandi', category: 'Beef', size: 'Couples', price: 700, image: 'images/beef_half.webp' },
            { id: 9, name: 'Beef Mandi', category: 'Beef', size: 'Family', price: 1400, image: 'images/beef_full.jpg' },
            { id: 10, name: 'Chicken Extra', category: 'Chicken', size: 'Half', price: 230, image: 'images/half_chicken.webp' },
            { id: 11, name: 'Chicken Extra', category: 'Chicken', size: 'Full', price: 450, image: 'images/chicken_mandi_full.webp' }
        ];

        for (const item of defaultItems) {
            const ref = db.collection('menuItems').doc(item.id.toString());
            batch.set(ref, item);
        }
        await batch.commit();
    },

    // Save/Update a menu item
    async saveMenuItem(item) {
        try {
            await db.collection('menuItems').doc(item.id.toString()).set(item);
            return true;
        } catch (error) {
            console.error('Error saving menu item:', error);
            return false;
        }
    },

    // Delete a menu item
    async deleteMenuItem(id) {
        try {
            await db.collection('menuItems').doc(id.toString()).delete();
            return true;
        } catch (error) {
            console.error('Error deleting menu item:', error);
            return false;
        }
    },

    // Save all menu items (bulk)
    async saveAllMenuItems(items) {
        try {
            const batch = db.batch();
            // Clear existing
            const existing = await db.collection('menuItems').get();
            existing.docs.forEach(doc => batch.delete(doc.ref));
            // Add new
            items.forEach(item => {
                const ref = db.collection('menuItems').doc(item.id.toString());
                batch.set(ref, item);
            });
            await batch.commit();
            return true;
        } catch (error) {
            console.error('Error saving menu items:', error);
            return false;
        }
    },

    // --- SALES ---
    async getSales() {
        try {
            const snapshot = await db.collection('sales').orderBy('date', 'desc').get();
            return snapshot.docs.map(doc => doc.data());
        } catch (error) {
            console.error('Error getting sales:', error);
            return JSON.parse(localStorage.getItem('sales')) || [];
        }
    },

    async addSale(sale) {
        try {
            await db.collection('sales').doc(sale.billNo).set(sale);
            return true;
        } catch (error) {
            console.error('Error adding sale:', error);
            return false;
        }
    },

    // --- EXPENSES ---
    async getExpenses() {
        try {
            const snapshot = await db.collection('expenses').orderBy('createdAt', 'desc').get();
            return snapshot.docs.map(doc => doc.data());
        } catch (error) {
            console.error('Error getting expenses:', error);
            return JSON.parse(localStorage.getItem('expenses')) || [];
        }
    },

    async addExpense(expense) {
        try {
            await db.collection('expenses').doc(expense.id).set(expense);
            return true;
        } catch (error) {
            console.error('Error adding expense:', error);
            return false;
        }
    },

    async updateExpense(expense) {
        try {
            await db.collection('expenses').doc(expense.id).set(expense);
            return true;
        } catch (error) {
            console.error('Error updating expense:', error);
            return false;
        }
    },

    async deleteExpense(id) {
        try {
            await db.collection('expenses').doc(id).delete();
            return true;
        } catch (error) {
            console.error('Error deleting expense:', error);
            return false;
        }
    }
};

// Export for use in other scripts
window.FireDB = FireDB;
