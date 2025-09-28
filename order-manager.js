// Объект для хранения выбранных блюд
let selectedDishes = {
    soup: null,
    main: null,
    drink: null
};

// Функция для обновления блока "Ваш заказ"
function updateOrderSummary() {
    const orderSoup = document.getElementById('selected-soup');
    const orderMain = document.getElementById('selected-main');
    const orderDrink = document.getElementById('selected-drink');
    const orderTotal = document.getElementById('order-total');
    const orderSummary = document.getElementById('order-summary');
    const emptyMessage = document.getElementById('empty-order-message');
    
    const selectedCount = Object.values(selectedDishes).filter(dish => dish !== null).length;
    
    // Показываем/скрываем сообщение "Ничего не выбрано"
    if (selectedCount === 0) {
        orderSummary.style.display = 'none';
        emptyMessage.style.display = 'block';
    } else {
        orderSummary.style.display = 'block';
        emptyMessage.style.display = 'none';
    }
    
    // Обновляем выбранные блюда
    orderSoup.textContent = selectedDishes.soup ? `${selectedDishes.soup.name} - ${selectedDishes.soup.price} ₽` : 'Блюдо не выбрано';
    orderMain.textContent = selectedDishes.main ? `${selectedDishes.main.name} - ${selectedDishes.main.price} ₽` : 'Блюдо не выбрано';
    orderDrink.textContent = selectedDishes.drink ? `${selectedDishes.drink.name} - ${selectedDishes.drink.price} ₽` : 'Напиток не выбран';
    
    // Считаем общую стоимость
    let total = 0;
    Object.values(selectedDishes).forEach(dish => {
        if (dish) {
            total += dish.price;
        }
    });
    
    orderTotal.textContent = `${total} ₽`;
}

// Функция для обработки клика по карточке блюда
function handleDishClick(dishKeyword) {
    console.log('Кликнули на блюдо:', dishKeyword); // Для отладки
    
    // Находим блюдо в массиве по keyword
    const selectedDish = dishes.find(dish => dish.keyword === dishKeyword);
    
    if (selectedDish) {
        // Обновляем выбранное блюдо в соответствующей категории
        selectedDishes[selectedDish.category] = selectedDish;
        
        // Обновляем отображение заказа
        updateOrderSummary();
        
        // Добавляем визуальную обратную связь
        const allCards = document.querySelectorAll('.dish-card');
        allCards.forEach(card => {
            card.classList.remove('selected');
        });
        
        const clickedCard = document.querySelector(`[data-dish="${dishKeyword}"]`);
        if (clickedCard) {
            clickedCard.classList.add('selected');
        }
        
        console.log('Выбрано блюдо:', selectedDish.name); // Для отладки
    }
}

// Инициализация обработчиков событий
function initEventListeners() {
    // Ждем немного чтобы все карточки успели создаться
    setTimeout(() => {
        // Добавляем обработчики клика на все карточки блюд
        const dishCards = document.querySelectorAll('.dish-card');
        console.log('Найдено карточек:', dishCards.length); // Для отладки
        
        dishCards.forEach(card => {
            card.addEventListener('click', function() {
                const dishKeyword = this.getAttribute('data-dish');
                handleDishClick(dishKeyword);
            });
        });
    }, 100);
}

// Инициализация когда страница загрузится
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM загружен, инициализируем обработчики...');
    initEventListeners();
    updateOrderSummary();
    initDeliveryTime();
});



// Функция для управления временем доставки
function initDeliveryTime() {
    const timeSpecificRadio = document.getElementById('time-specific');
    const deliveryTimeInput = document.getElementById('delivery-time');
    const timeAsapRadio = document.getElementById('time-asap');
    
    // Включаем/выключаем поле времени в зависимости от выбора
    timeSpecificRadio.addEventListener('change', function() {
        if (this.checked) {
            deliveryTimeInput.disabled = false;
            deliveryTimeInput.required = true;
        }
    });
    
    timeAsapRadio.addEventListener('change', function() {
        if (this.checked) {
            deliveryTimeInput.disabled = true;
            deliveryTimeInput.required = false;
            deliveryTimeInput.value = '';
        }
    });
    
    // Функция для округления времени до 5 минут
    function roundTo5Minutes(timeString) {
        if (!timeString) return null;
        
        const [hours, minutes] = timeString.split(':').map(Number);
        const roundedMinutes = Math.round(minutes / 5) * 5;
        
        let finalHours = hours;
        let finalMinutes = roundedMinutes;
        
        if (finalMinutes === 60) {
            finalMinutes = 0;
            finalHours += 1;
        }
        
        // Проверяем границы времени
        if (finalHours < 7) {
            finalHours = 7;
            finalMinutes = 0;
        } else if (finalHours >= 23 && finalMinutes > 0) {
            finalHours = 23;
            finalMinutes = 0;
        }
        
        return `${String(finalHours).padStart(2, '0')}:${String(finalMinutes).padStart(2, '0')}`;
    }
    
    // Функция проверки валидности времени
    function isValidTime(timeString) {
        if (!timeString) return false;
        
        const [hours, minutes] = timeString.split(':').map(Number);
        
        // Проверяем границы
        if (hours < 7 || hours > 23) return false;
        if (hours === 23 && minutes > 0) return false;
        
        // Проверяем шаг 5 минут
        return minutes % 5 === 0;
    }
    
    // Обработчик изменения времени
    deliveryTimeInput.addEventListener('change', function() {
        const roundedTime = roundTo5Minutes(this.value);
        
        if (!isValidTime(this.value)) {
            // Если время невалидно, показываем сообщение и устанавливаем округленное время
            this.value = roundedTime;
            showTimeMessage('Время автоматически округлено до ближайших 5 минут', 'info');
        }
    });
    
    // Обработчик ввода с клавиатуры
    deliveryTimeInput.addEventListener('blur', function() {
        if (this.value && !isValidTime(this.value)) {
            const roundedTime = roundTo5Minutes(this.value);
            this.value = roundedTime;
            showTimeMessage('Время автоматически округлено до ближайших 5 минут', 'info');
        }
    });
    
    // Функция для показа сообщений
    function showTimeMessage(message, type) {
        // Удаляем предыдущее сообщение если есть
        const existingMessage = deliveryTimeInput.parentNode.querySelector('.time-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        const messageElement = document.createElement('div');
        messageElement.className = `time-message time-message-${type}`;
        messageElement.textContent = message;
        messageElement.style.cssText = `
            font-size: 0.8em;
            margin-top: 5px;
            padding: 5px;
            border-radius: 3px;
            ${type === 'error' ? 'background-color: #ffe6e6; color: #d00;' : 'background-color: #e6f7ff; color: #0066cc;'}
        `;
        
        deliveryTimeInput.parentNode.appendChild(messageElement);
        
        // Автоматически удаляем сообщение через 3 секунды
        setTimeout(() => {
            if (messageElement.parentNode) {
                messageElement.remove();
            }
        }, 3000);
    }
    
    // Валидация при отправке формы
    document.getElementById('order-form').addEventListener('submit', function(event) {
        if (timeSpecificRadio.checked && deliveryTimeInput.value) {
            if (!isValidTime(deliveryTimeInput.value)) {
                event.preventDefault();
                showTimeMessage('Пожалуйста, выберите время с интервалом 5 минут (например: 08:00, 08:05, 08:10)', 'error');
                deliveryTimeInput.focus();
            }
        }
    });
    
    // Устанавливаем ближайшее корректное время по умолчанию
    function setDefaultTime() {
        const now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        
        // Округляем до ближайших 5 минут
        minutes = Math.ceil(minutes / 5) * 5;
        
        if (minutes === 60) {
            minutes = 0;
            hours += 1;
        }
        
        // Проверяем границы
        if (hours < 7) {
            hours = 7;
            minutes = 0;
        } else if (hours >= 23) {
            hours = 7;
            minutes = 0;
        }
        
        deliveryTimeInput.value = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    }
    
    // Инициализация
    setDefaultTime();
    
    // Добавляем подсказку под полем времени
    const timeHelp = document.createElement('small');
    timeHelp.textContent = 'Доступно время с 07:00 до 23:00 с интервалом 5 минут (например: 08:00, 08:05, 08:10)';
    timeHelp.style.cssText = `
        display: block;
        color: #666;
        margin-top: 5px;
        font-size: 0.9em;
        line-height: 1.3;
    `;
    
    deliveryTimeInput.parentNode.insertBefore(timeHelp, deliveryTimeInput.nextSibling);
}