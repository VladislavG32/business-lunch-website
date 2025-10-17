// Функция для фильтрации блюд
function filterDishes(category, kind) {
    const dishesGrid = document.querySelector(`.menu-section[data-category="${category}"] .dishes-grid`);
    const allDishes = dishes.filter(dish => dish.category === category);
    
    let filteredDishes;
    if (kind === 'all') {
        filteredDishes = allDishes;
    } else {
        filteredDishes = allDishes.filter(dish => dish.kind === kind);
    }
    
    // Очищаем сетку
    dishesGrid.innerHTML = '';
    
    // Добавляем отфильтрованные блюда
    filteredDishes.forEach(dish => {
        dishesGrid.appendChild(createDishCard(dish));
    });
    
    // Обновляем обработчики событий для новых карточек
    initEventListeners();
}

// Функция для инициализации фильтров
function initFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.closest('.filters').getAttribute('data-category');
            const kind = this.getAttribute('data-kind');
            const isActive = this.classList.contains('active');
            
            if (isActive && kind !== 'all') {
                // Если кликнули на активный фильтр (кроме "Все"), снимаем активность
                this.classList.remove('active');
                filterDishes(category, 'all');
                
                // Активируем кнопку "Все"
                const allButton = this.closest('.filters').querySelector('[data-kind="all"]');
                allButton.classList.add('active');
            } else {
                // Снимаем активность со всех кнопок в этой группе
                const siblingButtons = this.closest('.filters').querySelectorAll('.filter-btn');
                siblingButtons.forEach(btn => btn.classList.remove('active'));
                
                // Активируем текущую кнопку
                this.classList.add('active');
                
                // Применяем фильтр
                filterDishes(category, kind);
            }
        });
    });
}

// Инициализация фильтров при загрузке DOM
document.addEventListener('DOMContentLoaded', initFilters);