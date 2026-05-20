// Admin Page - Menu Management (CRUD Operations)

let currentEditId = null;
let deleteItemId = null;

// Render menu table
function renderMenuTable() {
    const tableBody = document.getElementById('menuTableBody');
    if (!tableBody) return;
    
    const menuItems = MandiApp.getMenuItems();
    
    tableBody.innerHTML = menuItems.map(item => `
        <tr>
            <td>
                <img src="${item.image}" alt="${item.name}" onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop'">
            </td>
            <td>${item.name}</td>
            <td>${item.category}</td>
            <td>${item.size}</td>
            <td>${MandiApp.formatCurrency(item.price)}</td>
            <td class="actions">
                <button class="edit-btn" onclick="editItem(${item.id})">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="delete-btn" onclick="showDeleteConfirm(${item.id})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </td>
        </tr>
    `).join('');
}

// Show add item modal
function showAddModal() {
    currentEditId = null;
    const modal = document.getElementById('itemModal');
    const modalTitle = document.getElementById('modalTitle');
    const form = document.getElementById('itemForm');
    
    if (modal && modalTitle && form) {
        modalTitle.innerHTML = '<i class="fas fa-plus-circle"></i> Add Menu Item';
        form.reset();
        document.getElementById('itemId').value = '';
        modal.classList.add('active');
    }
}

// Close item modal
function closeItemModal() {
    const modal = document.getElementById('itemModal');
    if (modal) {
        modal.classList.remove('active');
        currentEditId = null;
    }
}

// Edit item
function editItem(id) {
    const menuItems = MandiApp.getMenuItems();
    const item = menuItems.find(i => i.id === id);
    
    if (!item) return;
    
    currentEditId = id;
    
    const modal = document.getElementById('itemModal');
    const modalTitle = document.getElementById('modalTitle');
    
    if (modal && modalTitle) {
        modalTitle.innerHTML = '<i class="fas fa-edit"></i> Edit Menu Item';
        
        document.getElementById('itemId').value = item.id;
        document.getElementById('itemName').value = item.name;
        document.getElementById('itemCategory').value = item.category;
        document.getElementById('itemSize').value = item.size;
        document.getElementById('itemPrice').value = item.price;
        document.getElementById('itemImage').value = item.image;
        
        modal.classList.add('active');
    }
}

// Save item (Create/Update)
function saveItem(e) {
    e.preventDefault();
    
    const name = document.getElementById('itemName').value.trim();
    const category = document.getElementById('itemCategory').value;
    const size = document.getElementById('itemSize').value;
    const price = parseInt(document.getElementById('itemPrice').value);
    const image = document.getElementById('itemImage').value;
    
    if (!name || !category || !size || !price || !image) {
        MandiApp.showToast('Please fill all fields', true);
        return;
    }
    
    const menuItems = MandiApp.getMenuItems();
    
    if (currentEditId) {
        // Update existing item
        const index = menuItems.findIndex(i => i.id === currentEditId);
        if (index !== -1) {
            menuItems[index] = {
                ...menuItems[index],
                name,
                category,
                size,
                price,
                image
            };
            MandiApp.showToast('Menu item updated successfully');
        }
    } else {
        // Create new item
        const newItem = {
            id: Date.now(),
            name,
            category,
            size,
            price,
            image
        };
        menuItems.push(newItem);
        MandiApp.showToast('Menu item added successfully');
    }
    
    MandiApp.saveMenuItems(menuItems);
    renderMenuTable();
    closeItemModal();
}

// Show delete confirmation
function showDeleteConfirm(id) {
    const menuItems = MandiApp.getMenuItems();
    const item = menuItems.find(i => i.id === id);
    
    if (!item) return;
    
    deleteItemId = id;
    
    const modal = document.getElementById('deleteModal');
    const itemName = document.getElementById('deleteItemName');
    
    if (modal && itemName) {
        itemName.textContent = `${item.name} (${item.size}) - ${MandiApp.formatCurrency(item.price)}`;
        modal.classList.add('active');
    }
}

// Close delete modal
function closeDeleteModal() {
    const modal = document.getElementById('deleteModal');
    if (modal) {
        modal.classList.remove('active');
        deleteItemId = null;
    }
}

// Confirm delete
function confirmDelete() {
    if (!deleteItemId) return;
    
    let menuItems = MandiApp.getMenuItems();
    menuItems = menuItems.filter(i => i.id !== deleteItemId);
    
    MandiApp.saveMenuItems(menuItems);
    MandiApp.showToast('Menu item deleted successfully');
    
    renderMenuTable();
    closeDeleteModal();
}

// Initialize admin page
function initializeAdminPage() {
    renderMenuTable();
    
    // Add item button
    const addItemBtn = document.getElementById('addItemBtn');
    if (addItemBtn) {
        addItemBtn.addEventListener('click', showAddModal);
    }
    
    // Close modal button
    const closeItemModalBtn = document.getElementById('closeItemModal');
    if (closeItemModalBtn) {
        closeItemModalBtn.addEventListener('click', closeItemModal);
    }
    
    // Cancel button
    const cancelItemBtn = document.getElementById('cancelItemBtn');
    if (cancelItemBtn) {
        cancelItemBtn.addEventListener('click', closeItemModal);
    }
    
    // Form submit
    const itemForm = document.getElementById('itemForm');
    if (itemForm) {
        itemForm.addEventListener('submit', saveItem);
    }
    
    // Delete modal buttons
    const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
    if (cancelDeleteBtn) {
        cancelDeleteBtn.addEventListener('click', closeDeleteModal);
    }
    
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener('click', confirmDelete);
    }
    
    // Close modals on outside click
    const itemModal = document.getElementById('itemModal');
    if (itemModal) {
        itemModal.addEventListener('click', (e) => {
            if (e.target === itemModal) {
                closeItemModal();
            }
        });
    }
    
    const deleteModal = document.getElementById('deleteModal');
    if (deleteModal) {
        deleteModal.addEventListener('click', (e) => {
            if (e.target === deleteModal) {
                closeDeleteModal();
            }
        });
    }
}

// Run on page load
document.addEventListener('DOMContentLoaded', initializeAdminPage);
