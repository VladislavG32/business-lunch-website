// Функция для фильтрации блюд
function filterDishes(category, kind) {
    const dishesGrid = document.querySelector(`.menu-section:nth-child(${getSectionIndex(category)}) .dishes-grid`);
    const allDishes = dishes.filter(dish => dish.category === category);
    
    let filteredDishes;
    if (kind === 'all') {
        filteredDishes = allDishes;
    } else {
        filteredDishes = allDishes.filter(dish => dish.kind === kind);
    }
    
    dishesGrid.innerHTML = '';
    
    filteredDishes.forEach(dish => {
        dishesGrid.appendChild(createDishCard(dish));
    });
    
    initEventListeners();
}

// Функция для получения индекса секции по категории
function getSectionIndex(category) {
    const categoryOrder = ['soup', 'main', 'salad', 'drink', 'dessert'];
    return categoryOrder.indexOf(category) + 1;
}

function initFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.closest('.filters').getAttribute('data-category');
            const kind = this.getAttribute('data-kind');
            const isActive = this.classList.contains('active');
            
            if (isActive && kind !== 'all') {
                this.classList.remove('active');
                filterDishes(category, 'all');
                
                const allButton = this.closest('.filters').querySelector('[data-kind="all"]');
                allButton.classList.add('active');
            } else {
                const siblingButtons = this.closest('.filters').querySelectorAll('.filter-btn');
                siblingButtons.forEach(btn => btn.classList.remove('active'));
                
                this.classList.add('active');
                
                filterDishes(category, kind);
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', initFilters);