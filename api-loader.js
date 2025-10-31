const API_URL = 'https://edu.std-900.ist.mospolytech.ru/labs/api/dishes';

let dishes = [];

async function loadDishes() {
    try {
        console.log('Загрузка данных меню с сервера...');
        
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        console.log(`Успешно загружено ${data.length} блюд`);
        
        dishes = data;
        return data;
        
    } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
        
        // Показываем сообщение об ошибке
        if (typeof showNotification === 'function') {
            showNotification('Не удалось загрузить меню. Пожалуйста, попробуйте позже.');
        }
        
        return [];
    }
}

function getDishesByCategory(category) {
    return dishes.filter(dish => dish.category === category);
}

function getDishByKeyword(keyword) {
    return dishes.find(dish => dish.keyword === keyword);
}

// Делаем функции глобально доступными
window.dishes = dishes;
window.loadDishes = loadDishes;
window.getDishesByCategory = getDishesByCategory;
window.getDishByKeyword = getDishByKeyword;