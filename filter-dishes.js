function filterDishes(category, kind) {
    console.log(`Фильтрация: категория=${category}, вид=${kind}`);
    
    const menuSections = document.querySelectorAll('.menu-section');
    let targetSection = null;
    
    menuSections.forEach(section => {
        const filters = section.querySelector('.filters');
        if (filters) {
            const filterCategory = filters.getAttribute('data-category');
            if ((filterCategory === 'main' && category === 'main-course') || filterCategory === category) {
                targetSection = section;
            }
        }
    });
    
    if (!targetSection) {
        console.error(`Секция с категорией ${category} не найдена`);
        return;
    }
    
    const dishesGrid = targetSection.querySelector('.dishes-grid');
    const allDishes = getDishesByCategory(category);
    
    let filteredDishes;
    if (kind === 'all') {
        filteredDishes = allDishes;
    } else {
        if (category === 'main-course') {
            const kindMap = {
                'fish': 'fish',      
                'meat': 'meat',      
                'veg': 'veg'         
            };
            const mappedKind = kindMap[kind] || kind;
            filteredDishes = allDishes.filter(dish => dish.kind === mappedKind);
        } else {
            filteredDishes = allDishes.filter(dish => dish.kind === kind);
        }
    }
    
    dishesGrid.innerHTML = '';
    
    filteredDishes.forEach(dish => {
        dishesGrid.appendChild(createDishCard(dish));
    });
    
    console.log(`Отображено ${filteredDishes.length} блюд в категории ${category}`);
}

function debugMainCourseKinds() {
    const mainDishes = getDishesByCategory('main-course');
    console.log('=== ДИАГНОСТИКА MAIN-COURSE ===');
    console.log('Все главные блюда:', mainDishes.map(dish => ({
        name: dish.name,
        kind: dish.kind,
        keyword: dish.keyword
    })));
    console.log('Уникальные значения kind:', [...new Set(mainDishes.map(dish => dish.kind))]);
    console.log('==============================');
}

// Вызовите эту функцию в initFilters
function initFilters() {
    // Диагностика
    debugMainCourseKinds();
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filtersContainer = this.closest('.filters');
            let category = filtersContainer.getAttribute('data-category');
            const kind = this.getAttribute('data-kind');
            const isActive = this.classList.contains('active');
            
            if (category === 'main') {
                category = 'main-course';
            }
            
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