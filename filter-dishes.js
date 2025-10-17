function createDishCard(dish) {
    const dishCard = document.createElement('div');
    dishCard.className = 'dish-card';
    dishCard.setAttribute('data-dish', dish.keyword);
    dishCard.setAttribute('data-category', dish.category);
    
    dishCard.innerHTML = `
        <img src="${dish.image}" alt="${dish.name}" 
             onerror="this.style.display='none'">
        <p class="price">${dish.price}Р</p>
        <p class="name">${dish.name}</p>
        <p class="weight">${dish.count}</p>
        <button>Добавить</button>
    `;
    
    dishCard.addEventListener('click', function() {
        handleDishClick(dish.keyword);
    });
    
    return dishCard;
}

function filterDishes(category, kind) {
    console.log(`Фильтрация: категория=${category}, вид=${kind}`);
    
    const menuSections = document.querySelectorAll('.menu-section');
    let targetSection = null;
    
    menuSections.forEach(section => {
        const filters = section.querySelector('.filters');
        if (filters && filters.getAttribute('data-category') === category) {
            targetSection = section;
        }
    });
    
    if (!targetSection) {
        console.error(`Секция с категорией ${category} не найдена`);
        return;
    }
    
    const dishesGrid = targetSection.querySelector('.dishes-grid');
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
    
    console.log(`Отображено ${filteredDishes.length} блюд в категории ${category}`);
}

function initFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filtersContainer = this.closest('.filters');
            const category = filtersContainer.getAttribute('data-category');
            const kind = this.getAttribute('data-kind');
            const isActive = this.classList.contains('active');
            
            console.log(`Клик: категория=${category}, вид=${kind}, активна=${isActive}`);
            
            if (isActive && kind !== 'all') {
                this.classList.remove('active');
                filterDishes(category, 'all');

                const allButton = filtersContainer.querySelector('[data-kind="all"]');
                allButton.classList.add('active');
            } else {
                const siblingButtons = filtersContainer.querySelectorAll('.filter-btn');
                siblingButtons.forEach(btn => btn.classList.remove('active'));

                this.classList.add('active');

                filterDishes(category, kind);
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', initFilters);