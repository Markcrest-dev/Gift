// ==========================================
// GLOBAL GIFT EXCHANGE - MARKETPLACE
// Product filtering, search, and display
// ==========================================

let allGifts = [];
let filteredGifts = [];
let currentView = 'grid';
let currentPage = 1;
const itemsPerPage = 12;

document.addEventListener('DOMContentLoaded', async () => {
    // Load gifts data
    await loadGifts();

    // Initialize event listeners
    initializeEventListeners();

    // Display initial gifts - ensure we have data before displaying
    if (allGifts.length > 0) {
        displayGifts(filteredGifts);
    }
});

// ==========================================
// LOAD GIFTS DATA
// ==========================================

async function loadGifts() {
    try {
        const response = await fetch('data/gifts.json');
        allGifts = await response.json();
        filteredGifts = [...allGifts];
    } catch (error) {
        console.error('Error loading gifts:', error);
        window.GiftExchange.showToast('Failed to load gifts', 'error');
    }
}

// ==========================================
// EVENT LISTENERS
// ==========================================

function initializeEventListeners() {
    // Search input
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', window.GiftExchange.debounce(handleSearch, 300));
    }

    // View toggle
    const gridView = document.getElementById('gridView');
    const listView = document.getElementById('listView');

    if (gridView) {
        gridView.addEventListener('click', () => setView('grid'));
    }

    if (listView) {
        listView.addEventListener('click', () => setView('list'));
    }

    // Sort select
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', handleSort);
    }

    // Filter checkboxes - auto-apply on change
    const filterCheckboxes = document.querySelectorAll('.filter-checkbox');
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });

    // Price inputs - auto-apply on change
    const minPrice = document.getElementById('minPrice');
    const maxPrice = document.getElementById('maxPrice');

    if (minPrice) {
        minPrice.addEventListener('change', applyFilters);
    }

    if (maxPrice) {
        maxPrice.addEventListener('change', applyFilters);
    }

    // Clear filters
    const clearFilters = document.getElementById('clearFilters');
    if (clearFilters) {
        clearFilters.addEventListener('click', resetFilters);
    }

    // Mobile filters toggle
    const mobileFiltersToggle = document.getElementById('mobileFiltersToggle');
    const filtersSidebar = document.getElementById('filtersSidebar');

    if (mobileFiltersToggle && filtersSidebar) {
        mobileFiltersToggle.addEventListener('click', () => {
            filtersSidebar.classList.toggle('active');
        });

        // Close sidebar when clicking outside
        document.addEventListener('click', (e) => {
            if (!filtersSidebar.contains(e.target) && !mobileFiltersToggle.contains(e.target)) {
                filtersSidebar.classList.remove('active');
            }
        });
    }
}

// ==========================================
// SEARCH FUNCTIONALITY
// ==========================================

function handleSearch(e) {
    const query = e.target.value.toLowerCase().trim();

    if (!query) {
        filteredGifts = [...allGifts];
    } else {
        filteredGifts = allGifts.filter(gift => {
            return (
                gift.name.toLowerCase().includes(query) ||
                gift.description.toLowerCase().includes(query) ||
                gift.category.toLowerCase().includes(query) ||
                gift.tags.some(tag => tag.toLowerCase().includes(query))
            );
        });
    }

    displayGifts(filteredGifts);
}

// ==========================================
// FILTERING
// ==========================================

function applyFilters() {
    const selectedCategories = getSelectedFilters('category');
    const selectedGenders = getSelectedFilters('gender');
    const selectedRatings = getSelectedFilters('rating');
    const minPrice = parseFloat(document.getElementById('minPrice')?.value) || 0;
    const maxPrice = parseFloat(document.getElementById('maxPrice')?.value) || Infinity;

    filteredGifts = allGifts.filter(gift => {
        // Category filter
        const matchesCategory = selectedCategories.length === 0 ||
            selectedCategories.includes(gift.category);

        // Gender filter
        const matchesGender = selectedGenders.length === 0 ||
            selectedGenders.some(g => gift.gender.includes(g));

        // Price filter
        const matchesPrice = gift.price >= minPrice && gift.price <= maxPrice;

        // Rating filter
        const matchesRating = selectedRatings.length === 0 ||
            selectedRatings.some(r => gift.rating >= parseFloat(r));

        return matchesCategory && matchesGender && matchesPrice && matchesRating;
    });

    displayGifts(filteredGifts);

    // Close mobile filters after applying
    const filtersSidebar = document.getElementById('filtersSidebar');
    if (filtersSidebar) {
        filtersSidebar.classList.remove('active');
    }
}

function getSelectedFilters(type) {
    const checkboxes = document.querySelectorAll(`[data-filter="${type}"]:checked`);
    return Array.from(checkboxes).map(cb => cb.value);
}

function resetFilters() {
    // Uncheck all checkboxes
    document.querySelectorAll('.filter-checkbox').forEach(cb => cb.checked = false);

    // Clear price inputs
    const minPrice = document.getElementById('minPrice');
    const maxPrice = document.getElementById('maxPrice');
    if (minPrice) minPrice.value = '';
    if (maxPrice) maxPrice.value = '';

    // Reset search
    const searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.value = '';

    // Show all gifts
    filteredGifts = [...allGifts];
    displayGifts(filteredGifts);
}

// ==========================================
// SORTING
// ==========================================

function handleSort(e) {
    const sortBy = e.target.value;

    switch (sortBy) {
        case 'price-low':
            filteredGifts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredGifts.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            filteredGifts.sort((a, b) => b.rating - a.rating);
            break;
        case 'newest':
            // Reverse order for newest (assuming order in JSON is newest first)
            filteredGifts.reverse();
            break;
        default:
            // Featured - reapply filters to get correct order
            applyFilters();
            return;
    }

    displayGifts(filteredGifts);
}

// ==========================================
// VIEW TOGGLE
// ==========================================

function setView(view) {
    currentView = view;

    const gridBtn = document.getElementById('gridView');
    const listBtn = document.getElementById('listView');
    const productsGrid = document.getElementById('productsGrid');

    if (view === 'grid') {
        gridBtn?.classList.add('active');
        listBtn?.classList.remove('active');
        productsGrid?.classList.remove('list-view');
    } else {
        listBtn?.classList.add('active');
        gridBtn?.classList.remove('active');
        productsGrid?.classList.add('list-view');
    }

    // Only redisplay if we have gifts to show
    if (filteredGifts.length > 0) {
        displayGifts(filteredGifts);
    }
}

// ==========================================
// DISPLAY GIFTS
// ==========================================

function displayGifts(gifts) {
    const productsGrid = document.getElementById('productsGrid');
    const productsCount = document.getElementById('productsCount');
    const noResults = document.getElementById('noResults');

    if (!productsGrid) return;

    // Update count
    if (productsCount) {
        const count = gifts.length;
        productsCount.textContent = `${count} ${count === 1 ? 'gift' : 'gifts'} found`;
    }

    // Show/hide no results message
    if (gifts.length === 0) {
        productsGrid.classList.add('hidden');
        noResults?.classList.remove('hidden');
        return;
    }

    productsGrid.classList.remove('hidden');
    noResults?.classList.add('hidden');

    // Clear current products
    productsGrid.innerHTML = '';

    // Display gifts
    gifts.forEach((gift, index) => {
        const giftCard = createGiftCard(gift, index);
        productsGrid.appendChild(giftCard);
    });
}

function createGiftCard(gift, index) {
    const card = document.createElement('div');
    card.className = `gift-card reveal hover-lift stagger-${(index % 6) + 1}`;

    // Get gender icons
    const genderIcon = getGenderIcon(gift.gender);

    // Get star rating
    const stars = '⭐'.repeat(Math.floor(gift.rating));

    card.innerHTML = `
    <div class="gift-card-image">
      <img src="${gift.image}" alt="${gift.name}" class="card-image">
      <span class="gift-card-badge badge-red">${gift.category}</span>
    </div>
    <div class="card-body">
      <h3 class="card-title">${gift.name}</h3>
      <p class="card-text">${truncateText(gift.description, 80)}</p>
      <div class="gift-card-meta">
        <span class="gift-card-price">${window.GiftExchange.formatCurrency(gift.price, gift.currency)}</span>
        <span class="badge badge-gray">${genderIcon}</span>
      </div>
      <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem; font-size: 0.875rem;">
        <span>${stars}</span>
        <span class="text-secondary">${gift.rating} (${gift.reviews})</span>
      </div>
      <div class="gift-card-actions">
        <button class="btn btn-primary w-full" onclick="viewGiftDetail('${gift.id}')">
          View Details
        </button>
      </div>
    </div>
  `;

    return card;
}

// ==========================================
// HELPER FUNCTIONS
// ==========================================

function getGenderIcon(genders) {
    if (genders.includes('male') && genders.includes('female')) {
        return '👥 Unisex';
    } else if (genders.includes('male')) {
        return '👨 Male';
    } else if (genders.includes('female')) {
        return '👩 Female';
    }
    return '👥 All';
}

function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

// View gift detail
window.viewGiftDetail = function (giftId) {
    // Store selected gift ID
    window.GiftExchange.Storage.set('selectedGift', giftId);
    // Navigate to detail page
    window.location.href = `gift-detail.html?id=${giftId}`;
};

// Trigger scroll reveal animations
setTimeout(() => {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('active');
        }, index * 50);
    });
}, 100);
