// Language System - English & Tamil

const translations = {
    en: {
        // Login Page
        loginTitle: 'Arabian Bismi Mandi',
        loginSubtitle: 'Restaurant Billing System',
        mobileLabel: 'Mobile Number',
        mobilePlaceholder: 'Enter your mobile number',
        passwordLabel: 'Password',
        passwordPlaceholder: 'Enter password',
        loginBtn: 'Login',
        invalidCreds: 'Invalid mobile number or password',
        fillAllFields: 'Please fill all fields',
        invalidMobile: 'Enter valid 10-digit mobile number',
        selectLang: 'Select Language',

        // Navigation
        navOrder: 'Order',
        navMenu: 'Menu',
        navSales: 'Sales',
        navExpenses: 'Expenses',
        navLogout: 'Logout',

        // Order Page
        ourMenu: 'Our Menu',
        yourCart: 'Your Cart',
        clearCart: 'Clear Cart',
        cartEmpty: 'Your cart is empty',
        total: 'Total',
        printBill: 'Print Bill',
        payNow: 'Pay Now',
        addedToCart: 'added to cart',
        cartCleared: 'Cart cleared',
        cartIsEmpty: 'Cart is empty!',

        // Payment
        choosePayment: 'Choose Payment Method',
        amount: 'Amount',
        cashPayment: 'Cash Payment',
        qrPayment: 'QR Code / UPI',
        scanToPay: 'Scan to Pay',
        scanInfo: 'Scan the QR code with any UPI app to complete payment',
        paymentDone: 'Payment Done',
        amountToCollect: 'Amount to Collect',
        collectCash: 'Collect cash from the customer and confirm',
        cashReceived: 'Cash Received',
        paymentSuccess: 'Payment successful! Bill No:',

        // Admin Page
        manageMenu: 'Manage Menu Items',
        addNewItem: 'Add New Item',
        addMenuItem: 'Add Menu Item',
        editMenuItem: 'Edit Menu Item',
        itemName: 'Item Name',
        category: 'Category',
        selectCategory: 'Select Category',
        size: 'Size/Portion',
        selectSize: 'Select Size',
        price: 'Price',
        selectImage: 'Select Image',
        chooseImage: 'Choose an image',
        cancel: 'Cancel',
        saveItem: 'Save Item',
        confirmDelete: 'Confirm Delete',
        deleteConfirmMsg: 'Are you sure you want to delete this menu item?',
        delete: 'Delete',
        image: 'Image',
        name: 'Name',
        actions: 'Actions',
        edit: 'Edit',

        // Categories
        chicken: 'Chicken',
        mutton: 'Mutton',
        beef: 'Beef',
        drinks: 'Drinks',
        desserts: 'Desserts',

        // Sizes
        full: 'Full',
        half: 'Half',
        single: 'Single',
        couples: 'Couples',
        family: 'Family',
        regular: 'Regular',

        // Reports Page
        monthlySalesReport: 'Monthly Sales Report',
        applyFilter: 'Apply Filter',
        exportCSV: 'Export CSV',
        totalSales: 'Total Sales',
        totalOrders: 'Total Orders',
        avgOrder: 'Average Order',
        itemsSold: 'Items Sold',
        dailySales: 'Daily Sales',
        salesByCategory: 'Sales by Category',
        salesHistory: 'Sales History',
        billNo: 'Bill No',
        date: 'Date',
        time: 'Time',
        items: 'Items',
        view: 'View',
        noSalesData: 'No sales data available for the selected period',
        orderDetails: 'Order Details',
        itemsOrdered: 'Items Ordered',
        reportExported: 'Report exported successfully',
        noDataExport: 'No data to export',

        // Expenses Page
        dailyExpenses: 'Daily Expenses',
        addExpense: 'Add Expense',
        editExpense: 'Edit Expense',
        expenseCategory: 'Category',
        description: 'Description',
        amountRs: 'Amount (₹)',
        todaysTotal: "Today's Total",
        noExpenses: 'No expenses recorded for this date',
        deleteExpense: 'Are you sure you want to delete this expense?',
        saveExpense: 'Save Expense',
        expenseAdded: 'Expense added successfully',
        expenseUpdated: 'Expense updated successfully',
        expenseDeleted: 'Expense deleted successfully',

        // Expense Categories
        groceries: 'Groceries / Raw Materials',
        meat: 'Meat & Chicken',
        gas: 'Gas / Fuel',
        salary: 'Salary / Wages',
        rent: 'Rent',
        electricity: 'Electricity Bill',
        transport: 'Transport',
        maintenance: 'Maintenance / Repair',
        packaging: 'Packaging',
        other: 'Other',

        // Bill
        billTitle: 'ARABIAN BISMI MANDI',
        billSubtitle: 'Taste The Arabian Tradition',
        billAddress: 'M.A.N Mega Mart, Ayyampettai',
        billPhone: 'Phone: 9894092449, 9025499668',
        billThankYou: 'Thank you for dining with us!',
        billVisitAgain: 'Visit Again!',
        qty: 'Qty',

        // Months
        january: 'January', february: 'February', march: 'March',
        april: 'April', may: 'May', june: 'June',
        july: 'July', august: 'August', september: 'September',
        october: 'October', november: 'November', december: 'December'
    },
    ta: {
        // Login Page
        loginTitle: 'அரேபியன் பிஸ்மி மந்தி',
        loginSubtitle: 'உணவகம் பில்லிங் மென்பொருள்',
        mobileLabel: 'மொபைல் எண்',
        mobilePlaceholder: 'மொபைல் எண்ணை உள்ளிடவும்',
        passwordLabel: 'கடவுச்சொல்',
        passwordPlaceholder: 'கடவுச்சொல்லை உள்ளிடவும்',
        loginBtn: 'உள்நுழைக',
        invalidCreds: 'தவறான மொபைல் எண் அல்லது கடவுச்சொல்',
        fillAllFields: 'அனைத்து புலங்களையும் நிரப்பவும்',
        invalidMobile: 'சரியான 10 இலக்க மொபைல் எண்ணை உள்ளிடவும்',
        selectLang: 'மொழியைத் தேர்ந்தெடுக்கவும்',

        // Navigation
        navOrder: 'ஆர்டர்',
        navMenu: 'மெனு',
        navSales: 'விற்பனை',
        navExpenses: 'செலவுகள்',
        navLogout: 'வெளியேறு',

        // Order Page
        ourMenu: 'எங்கள் மெனு',
        yourCart: 'உங்கள் கார்ட்',
        clearCart: 'கார்ட் அழி',
        cartEmpty: 'உங்கள் கார்ட் காலியாக உள்ளது',
        total: 'மொத்தம்',
        printBill: 'பில் அச்சிடு',
        payNow: 'இப்போது செலுத்து',
        addedToCart: 'கார்ட்டில் சேர்க்கப்பட்டது',
        cartCleared: 'கார்ட் அழிக்கப்பட்டது',
        cartIsEmpty: 'கார்ட் காலியாக உள்ளது!',

        // Payment
        choosePayment: 'பணம் செலுத்தும் முறையைத் தேர்வுசெய்க',
        amount: 'தொகை',
        cashPayment: 'பணம் செலுத்துதல்',
        qrPayment: 'QR குறியீடு / UPI',
        scanToPay: 'ஸ்கேன் செய்து செலுத்தவும்',
        scanInfo: 'எந்த UPI ஆப்பிலும் QR குறியீட்டை ஸ்கேன் செய்து பணம் செலுத்தவும்',
        paymentDone: 'பணம் செலுத்தப்பட்டது',
        amountToCollect: 'வசூலிக்க வேண்டிய தொகை',
        collectCash: 'வாடிக்கையாளரிடம் பணம் வசூலித்து உறுதிப்படுத்தவும்',
        cashReceived: 'பணம் பெறப்பட்டது',
        paymentSuccess: 'பணம் வெற்றிகரமாக செலுத்தப்பட்டது! பில் எண்:',

        // Admin Page
        manageMenu: 'மெனு உருப்படிகளை நிர்வகி',
        addNewItem: 'புதிய உருப்படி சேர்',
        addMenuItem: 'மெனு உருப்படி சேர்',
        editMenuItem: 'மெனு உருப்படி திருத்து',
        itemName: 'உருப்படி பெயர்',
        category: 'வகை',
        selectCategory: 'வகையைத் தேர்ந்தெடுக்கவும்',
        size: 'அளவு',
        selectSize: 'அளவைத் தேர்ந்தெடுக்கவும்',
        price: 'விலை',
        selectImage: 'படத்தைத் தேர்ந்தெடுக்கவும்',
        chooseImage: 'ஒரு படத்தை தேர்வுசெய்க',
        cancel: 'ரத்துசெய்',
        saveItem: 'உருப்படி சேமி',
        confirmDelete: 'நீக்குவதை உறுதிப்படுத்து',
        deleteConfirmMsg: 'இந்த மெனு உருப்படியை நீக்க விரும்புகிறீர்களா?',
        delete: 'நீக்கு',
        image: 'படம்',
        name: 'பெயர்',
        actions: 'செயல்கள்',
        edit: 'திருத்து',

        // Categories
        chicken: 'சிக்கன்',
        mutton: 'மட்டன்',
        beef: 'பீஃப்',
        drinks: 'பானங்கள்',
        desserts: 'இனிப்புகள்',

        // Sizes
        full: 'முழு',
        half: 'அரை',
        single: 'ஒருவர்',
        couples: 'இருவர்',
        family: 'குடும்பம்',
        regular: 'வழக்கமான',

        // Reports Page
        monthlySalesReport: 'மாத விற்பனை அறிக்கை',
        applyFilter: 'வடிகட்டு',
        exportCSV: 'CSV ஏற்றுமதி',
        totalSales: 'மொத்த விற்பனை',
        totalOrders: 'மொத்த ஆர்டர்கள்',
        avgOrder: 'சராசரி ஆர்டர்',
        itemsSold: 'விற்கப்பட்ட பொருட்கள்',
        dailySales: 'தினசரி விற்பனை',
        salesByCategory: 'வகை வாரியான விற்பனை',
        salesHistory: 'விற்பனை வரலாறு',
        billNo: 'பில் எண்',
        date: 'தேதி',
        time: 'நேரம்',
        items: 'பொருட்கள்',
        view: 'பார்',
        noSalesData: 'தேர்ந்தெடுக்கப்பட்ட காலத்திற்கு விற்பனை தரவு இல்லை',
        orderDetails: 'ஆர்டர் விவரங்கள்',
        itemsOrdered: 'ஆர்டர் செய்யப்பட்ட பொருட்கள்',
        reportExported: 'அறிக்கை வெற்றிகரமாக ஏற்றுமதி செய்யப்பட்டது',
        noDataExport: 'ஏற்றுமதி செய்ய தரவு இல்லை',

        // Expenses Page
        dailyExpenses: 'தினசரி செலவுகள்',
        addExpense: 'செலவு சேர்',
        editExpense: 'செலவு திருத்து',
        expenseCategory: 'வகை',
        description: 'விவரம்',
        amountRs: 'தொகை (₹)',
        todaysTotal: 'இன்றைய மொத்தம்',
        noExpenses: 'இந்த தேதிக்கு செலவுகள் பதிவு செய்யப்படவில்லை',
        deleteExpense: 'இந்த செலவை நீக்க விரும்புகிறீர்களா?',
        saveExpense: 'செலவு சேமி',
        expenseAdded: 'செலவு வெற்றிகரமாக சேர்க்கப்பட்டது',
        expenseUpdated: 'செலவு வெற்றிகரமாக புதுப்பிக்கப்பட்டது',
        expenseDeleted: 'செலவு வெற்றிகரமாக நீக்கப்பட்டது',

        // Expense Categories
        groceries: 'மளிகை / மூலப்பொருட்கள்',
        meat: 'இறைச்சி & கோழி',
        gas: 'எரிவாயு / எரிபொருள்',
        salary: 'சம்பளம் / கூலி',
        rent: 'வாடகை',
        electricity: 'மின்சார கட்டணம்',
        transport: 'போக்குவரத்து',
        maintenance: 'பராமரிப்பு / பழுதுபார்ப்பு',
        packaging: 'பேக்கேஜிங்',
        other: 'மற்றவை',

        // Bill
        billTitle: 'அரேபியன் பிஸ்மி மந்தி',
        billSubtitle: 'அரேபிய பாரம்பரியத்தை சுவையுங்கள்',
        billAddress: 'M.A.N மெகா மார்ட், அய்யம்பேட்டை',
        billPhone: 'தொலைபேசி: 9894092449, 9025499668',
        billThankYou: 'எங்களுடன் உணவருந்தியதற்கு நன்றி!',
        billVisitAgain: 'மீண்டும் வாருங்கள்!',
        qty: 'அளவு',

        // Months
        january: 'ஜனவரி', february: 'பிப்ரவரி', march: 'மார்ச்',
        april: 'ஏப்ரல்', may: 'மே', june: 'ஜூன்',
        july: 'ஜூலை', august: 'ஆகஸ்ட்', september: 'செப்டம்பர்',
        october: 'அக்டோபர்', november: 'நவம்பர்', december: 'டிசம்பர்'
    }
};

// Get current language
function getLang() {
    return localStorage.getItem('abm_lang') || 'en';
}

// Set language
function setLang(lang) {
    localStorage.setItem('abm_lang', lang);
}

// Get translated text
function t(key) {
    const lang = getLang();
    return translations[lang][key] || translations['en'][key] || key;
}

// Apply translations to elements with data-lang attribute
function applyTranslations() {
    const lang = getLang();
    
    // Translate elements with data-lang attribute
    document.querySelectorAll('[data-lang]').forEach(el => {
        const key = el.getAttribute('data-lang');
        const text = t(key);
        if (text) {
            if (el.tagName === 'INPUT' && el.getAttribute('placeholder')) {
                el.setAttribute('placeholder', text);
            } else {
                el.textContent = text;
            }
        }
    });
    
    // Translate elements with data-lang-placeholder attribute
    document.querySelectorAll('[data-lang-placeholder]').forEach(el => {
        const key = el.getAttribute('data-lang-placeholder');
        const text = t(key);
        if (text) {
            el.setAttribute('placeholder', text);
        }
    });
}

// Export
window.Lang = {
    t,
    getLang,
    setLang,
    applyTranslations,
    translations
};
