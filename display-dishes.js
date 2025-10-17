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

function displayDishes() {
    console.log('Загрузка блюд...');
    
    // Простой способ - находим все dishes-grid и заполняем по порядку
    const dishesGrids = document.querySelectorAll('.dishes-grid');
    
    // Очищаем все сетки
    dishesGrids.forEach(grid => grid.innerHTML = '');
    
    // Сортируем блюда по категориям
    const categories = ['soup', 'main', 'salad', 'drink', 'dessert'];
    
    categories.forEach((category, index) => {
        if (dishesGrids[index]) {
            const categoryDishes = dishes
                .filter(dish => dish.category === category)
                .sort((a, b) => a.name.localeCompare(b.name));
                
            categoryDishes.forEach(dish => {
                dishesGrids[index].appendChild(createDishCard(dish));
            });
            
            console.log(`Добавлено ${categoryDishes.length} блюд в категорию ${category}`);
        }
    });
}

document.addEventListener('DOMContentLoaded', displayDishes);