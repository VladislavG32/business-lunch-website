// Функция для создания карточки блюда
function createDishCard(dish) {
    const dishCard = document.createElement('div');
    dishCard.className = 'dish-card';
    dishCard.setAttribute('data-dish', dish.keyword);
    
    dishCard.innerHTML = `
        <img src="${dish.image}" alt="${dish.name}">
        <p class="price">${dish.price} ₽</p>
        <p class="name">${dish.name}</p>
        <p class="weight">${dish.count}</p>
        <button>Добавить</button>
    `;
    
    // Добавляем обработчик клика прямо здесь
    dishCard.addEventListener('click', function() {
        handleDishClick(dish.keyword);
    });
    
    return dishCard;
}

// Функция для отображения блюд по категориям
function displayDishes() {
    // Сортируем блюда по названию в алфавитном порядке
    const sortedDishes = [...dishes].sort((a, b) => a.name.localeCompare(b.name));
    
    // Группируем блюда по категориям
    const dishesByCategory = {
        soup: sortedDishes.filter(dish => dish.category === 'soup'),
        main: sortedDishes.filter(dish => dish.category === 'main'),
        drink: sortedDishes.filter(dish => dish.category === 'drink')
    };
    
    // Находим секции на странице
    const soupSection = document.querySelector('.menu-section:nth-child(1) .dishes-grid');
    const mainSection = document.querySelector('.menu-section:nth-child(2) .dishes-grid');
    const drinkSection = document.querySelector('.menu-section:nth-child(3) .dishes-grid');
    
    // Очищаем секции (удаляем статичный контент)
    soupSection.innerHTML = '';
    mainSection.innerHTML = '';
    drinkSection.innerHTML = '';
    
    // Добавляем блюда в соответствующие секции
    dishesByCategory.soup.forEach(dish => {
        soupSection.appendChild(createDishCard(dish));
    });
    
    dishesByCategory.main.forEach(dish => {
        mainSection.appendChild(createDishCard(dish));
    });
    
    dishesByCategory.drink.forEach(dish => {
        drinkSection.appendChild(createDishCard(dish));
    });
}

// Запускаем отображение блюд когда страница загрузится
document.addEventListener('DOMContentLoaded', displayDishes);