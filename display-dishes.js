// Функция для создания карточки блюда
function createDishCard(dish) {
    const dishCard = document.createElement('div');
    dishCard.className = 'dish-card';
    dishCard.setAttribute('data-dish', dish.keyword);
    dishCard.setAttribute('data-category', dish.category);
    
    dishCard.innerHTML = `
        <img src="${dish.image}" alt="${dish.name}" onerror="this.src='images/menu/placeholder.jpg'">
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
    const sortedDishes = [...dishes].sort((a, b) => a.name.localeCompare(b.name));

    const dishesByCategory = {
        soup: sortedDishes.filter(dish => dish.category === 'soup'),
        main: sortedDishes.filter(dish => dish.category === 'main'),
        salad: sortedDishes.filter(dish => dish.category === 'salad'),
        drink: sortedDishes.filter(dish => dish.category === 'drink'),
        dessert: sortedDishes.filter(dish => dish.category === 'dessert')
    };

    const soupSection = document.querySelector('.menu-section:nth-child(1) .dishes-grid');
    const mainSection = document.querySelector('.menu-section:nth-child(2) .dishes-grid');
    const saladSection = document.querySelector('.menu-section:nth-child(3) .dishes-grid');
    const drinkSection = document.querySelector('.menu-section:nth-child(4) .dishes-grid');
    const dessertSection = document.querySelector('.menu-section:nth-child(5) .dishes-grid');

    soupSection.innerHTML = '';
    mainSection.innerHTML = '';
    saladSection.innerHTML = '';
    drinkSection.innerHTML = '';
    dessertSection.innerHTML = '';

    dishesByCategory.soup.forEach(dish => {
        soupSection.appendChild(createDishCard(dish));
    });
    
    dishesByCategory.main.forEach(dish => {
        mainSection.appendChild(createDishCard(dish));
    });
    
    dishesByCategory.salad.forEach(dish => {
        saladSection.appendChild(createDishCard(dish));
    });
    
    dishesByCategory.drink.forEach(dish => {
        drinkSection.appendChild(createDishCard(dish));
    });
    
    dishesByCategory.dessert.forEach(dish => {
        dessertSection.appendChild(createDishCard(dish));
    });
}

document.addEventListener('DOMContentLoaded', displayDishes);