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
    
    // Добавляем отладку для главных блюд
    if (dish.category === 'main-course') {
        console.log('Создана карточка главного блюда:', dish.keyword, dish.name);
    }
    
    dishCard.addEventListener('click', function() {
        console.log('Клик по карточке:', dish.keyword, dish.category);
        handleDishClick(dish.keyword);
    });
    
    return dishCard;
}

function displayDishes() {
    console.log('Отображение блюд...');
    
    // Проверяем что данные загружены
    if (!dishes || dishes.length === 0) {
        console.log('Нет данных для отображения');
        return;
    }
    
    const dishesGrids = document.querySelectorAll('.dishes-grid');
    console.log('Найдено сеток для блюд:', dishesGrids.length);
    
    dishesGrids.forEach(grid => grid.innerHTML = '');
    
    const categories = ['soup', 'main-course', 'salad', 'drink', 'dessert'];
    
    categories.forEach((category, index) => {
        if (dishesGrids[index]) {
            const categoryDishes = dishes
                .filter(dish => dish.category === category)
                .sort((a, b) => a.name.localeCompare(b.name));
                
            categoryDishes.forEach(dish => {
                dishesGrids[index].appendChild(createDishCard(dish));
            });
            
            console.log(`Добавлено ${categoryDishes.length} блюд в категорию ${category}`);
        } else {
            console.warn(`Сетка с индексом ${index} (категория ${category}) не найдена`);
        }
    });
}