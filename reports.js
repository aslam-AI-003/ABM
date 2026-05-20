// Reports Page - Monthly Sales Report

let dailySalesChart = null;
let categorySalesChart = null;
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

// Initialize filters
function initializeFilters() {
    const monthFilter = document.getElementById('monthFilter');
    const yearFilter = document.getElementById('yearFilter');
    
    if (monthFilter) {
        monthFilter.value = currentMonth;
    }
    
    if (yearFilter) {
        // Populate years (current year and 5 years back)
        const currentYear = new Date().getFullYear();
        for (let year = currentYear; year >= currentYear - 5; year--) {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            yearFilter.appendChild(option);
        }
        yearFilter.value = currentYear;
    }
}

// Get filtered sales
function getFilteredSales(month, year) {
    const sales = MandiApp.getSales();
    
    return sales.filter(sale => {
        const saleDate = new Date(sale.date);
        return saleDate.getMonth() === month && saleDate.getFullYear() === year;
    });
}

// Calculate statistics
function calculateStats(sales) {
    const totalSales = sales.reduce((sum, sale) => sum + sale.total, 0);
    const totalOrders = sales.length;
    const avgOrder = totalOrders > 0 ? Math.round(totalSales / totalOrders) : 0;
    const totalItems = sales.reduce((sum, sale) => sum + sale.itemCount, 0);
    
    return { totalSales, totalOrders, avgOrder, totalItems };
}

// Update statistics display
function updateStats(stats) {
    document.getElementById('totalSales').textContent = MandiApp.formatCurrency(stats.totalSales);
    document.getElementById('totalOrders').textContent = stats.totalOrders;
    document.getElementById('avgOrder').textContent = MandiApp.formatCurrency(stats.avgOrder);
    document.getElementById('totalItems').textContent = stats.totalItems;
}

// Get daily sales data for chart
function getDailySalesData(sales, month, year) {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const dailyData = new Array(daysInMonth).fill(0);
    
    sales.forEach(sale => {
        const day = new Date(sale.date).getDate();
        dailyData[day - 1] += sale.total;
    });
    
    return {
        labels: Array.from({ length: daysInMonth }, (_, i) => i + 1),
        data: dailyData
    };
}

// Get category sales data for chart
function getCategorySalesData(sales) {
    const categoryData = {};
    
    sales.forEach(sale => {
        sale.items.forEach(item => {
            const category = item.category;
            if (!categoryData[category]) {
                categoryData[category] = 0;
            }
            categoryData[category] += item.price * item.quantity;
        });
    });
    
    return {
        labels: Object.keys(categoryData),
        data: Object.values(categoryData)
    };
}

// Render daily sales chart
function renderDailySalesChart(dailyData) {
    const ctx = document.getElementById('dailySalesChart');
    if (!ctx) return;
    
    if (dailySalesChart) {
        dailySalesChart.destroy();
    }
    
    dailySalesChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: dailyData.labels,
            datasets: [{
                label: 'Sales (₹)',
                data: dailyData.data,
                backgroundColor: 'rgba(243, 156, 18, 0.6)',
                borderColor: 'rgba(243, 156, 18, 1)',
                borderWidth: 1,
                borderRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#888',
                        callback: function(value) {
                            return '₹' + value.toLocaleString('en-IN');
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                x: {
                    ticks: {
                        color: '#888'
                    },
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// Render category sales chart
function renderCategorySalesChart(categoryData) {
    const ctx = document.getElementById('categorySalesChart');
    if (!ctx) return;
    
    if (categorySalesChart) {
        categorySalesChart.destroy();
    }
    
    const colors = [
        'rgba(231, 76, 60, 0.8)',
        'rgba(46, 204, 113, 0.8)',
        'rgba(52, 152, 219, 0.8)',
        'rgba(155, 89, 182, 0.8)',
        'rgba(243, 156, 18, 0.8)'
    ];
    
    categorySalesChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: categoryData.labels,
            datasets: [{
                data: categoryData.data,
                backgroundColor: colors.slice(0, categoryData.labels.length),
                borderColor: 'rgba(26, 26, 46, 1)',
                borderWidth: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#fff',
                        padding: 15,
                        usePointStyle: true
                    }
                }
            }
        }
    });
}

// Render sales table
function renderSalesTable(sales) {
    const tableBody = document.getElementById('salesTableBody');
    const noDataMessage = document.getElementById('noDataMessage');
    
    if (!tableBody) return;
    
    if (sales.length === 0) {
        tableBody.innerHTML = '';
        if (noDataMessage) noDataMessage.style.display = 'block';
        return;
    }
    
    if (noDataMessage) noDataMessage.style.display = 'none';
    
    // Sort by date descending
    const sortedSales = [...sales].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    tableBody.innerHTML = sortedSales.map(sale => {
        const saleDate = new Date(sale.date);
        const date = saleDate.toLocaleDateString('en-IN');
        const time = saleDate.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
        
        return `
            <tr>
                <td>${sale.billNo}</td>
                <td>${date}</td>
                <td>${time}</td>
                <td>${sale.itemCount}</td>
                <td>${MandiApp.formatCurrency(sale.total)}</td>
                <td>
                    <button class="view-btn" onclick="viewOrderDetails('${sale.billNo}')">
                        <i class="fas fa-eye"></i> View
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

// View order details
function viewOrderDetails(billNo) {
    const sales = MandiApp.getSales();
    const sale = sales.find(s => s.billNo === billNo);
    
    if (!sale) return;
    
    const modal = document.getElementById('orderDetailsModal');
    const orderDetails = document.getElementById('orderDetails');
    
    if (!modal || !orderDetails) return;
    
    const saleDate = new Date(sale.date);
    
    orderDetails.innerHTML = `
        <div class="order-info">
            <p><strong>Bill No:</strong> ${sale.billNo}</p>
            <p><strong>Date:</strong> ${saleDate.toLocaleDateString('en-IN')}</p>
            <p><strong>Time:</strong> ${saleDate.toLocaleTimeString('en-IN')}</p>
        </div>
        <div class="order-items-list">
            <h4>Items Ordered</h4>
            <ul>
                ${sale.items.map(item => `
                    <li>
                        <span>${item.name} (${item.size}) × ${item.quantity}</span>
                        <span>${MandiApp.formatCurrency(item.price * item.quantity)}</span>
                    </li>
                `).join('')}
            </ul>
        </div>
        <div class="order-total">
            Total: <span>${MandiApp.formatCurrency(sale.total)}</span>
        </div>
    `;
    
    modal.classList.add('active');
}

// Close order details modal
function closeOrderModal() {
    const modal = document.getElementById('orderDetailsModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Apply filter
function applyFilter() {
    const monthFilter = document.getElementById('monthFilter');
    const yearFilter = document.getElementById('yearFilter');
    
    currentMonth = parseInt(monthFilter.value);
    currentYear = parseInt(yearFilter.value);
    
    loadReportData();
}

// Export to CSV
function exportToCSV() {
    const sales = getFilteredSales(currentMonth, currentYear);
    
    if (sales.length === 0) {
        MandiApp.showToast('No data to export', true);
        return;
    }
    
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                       'July', 'August', 'September', 'October', 'November', 'December'];
    
    let csv = 'Bill No,Date,Time,Items,Total\n';
    
    sales.forEach(sale => {
        const saleDate = new Date(sale.date);
        const date = saleDate.toLocaleDateString('en-IN');
        const time = saleDate.toLocaleTimeString('en-IN');
        csv += `${sale.billNo},${date},${time},${sale.itemCount},${sale.total}\n`;
    });
    
    // Download CSV
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sales_report_${monthNames[currentMonth]}_${currentYear}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    MandiApp.showToast('Report exported successfully');
}

// Load report data
function loadReportData() {
    const sales = getFilteredSales(currentMonth, currentYear);
    const stats = calculateStats(sales);
    
    updateStats(stats);
    renderSalesTable(sales);
    
    const dailyData = getDailySalesData(sales, currentMonth, currentYear);
    renderDailySalesChart(dailyData);
    
    const categoryData = getCategorySalesData(sales);
    if (categoryData.labels.length > 0) {
        renderCategorySalesChart(categoryData);
    }
}

// Initialize reports page
function initializeReportsPage() {
    initializeFilters();
    loadReportData();
    
    // Apply filter button
    const applyFilterBtn = document.getElementById('applyFilterBtn');
    if (applyFilterBtn) {
        applyFilterBtn.addEventListener('click', applyFilter);
    }
    
    // Export button
    const exportReportBtn = document.getElementById('exportReportBtn');
    if (exportReportBtn) {
        exportReportBtn.addEventListener('click', exportToCSV);
    }
    
    // Close order modal
    const closeOrderModalBtn = document.getElementById('closeOrderModal');
    if (closeOrderModalBtn) {
        closeOrderModalBtn.addEventListener('click', closeOrderModal);
    }
    
    // Close modal on outside click
    const orderDetailsModal = document.getElementById('orderDetailsModal');
    if (orderDetailsModal) {
        orderDetailsModal.addEventListener('click', (e) => {
            if (e.target === orderDetailsModal) {
                closeOrderModal();
            }
        });
    }
}

// Run on page load
document.addEventListener('DOMContentLoaded', initializeReportsPage);
