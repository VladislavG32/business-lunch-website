let selectedDishes = {
    soup: null,
    main: null,
    salad: null,
    drink: null,
    dessert: null
};

function updateOrderSummary() {
    const orderSoup = document.getElementById('selected-soup');
    const orderMain = document.getElementById('selected-main');
    const orderSalad = document.getElementById('selected-salad');
    const orderDrink = document.getElementById('selected-drink');
    const orderDessert = document.getElementById('selected-dessert');
    const orderTotal = document.getElementById('order-total');
    const orderSummary = document.getElementById('order-summary');
    const emptyMessage = document.getElementById('empty-order-message');
    
    const selectedCount = Object.values(selectedDishes).filter(dish => dish !== null).length;
    
    if (selectedCount === 0) {
        orderSummary.style.display = 'none';
        emptyMessage.style.display = 'block';
    } else {
        orderSummary.style.display = 'block';
        emptyMessage.style.display = 'none';
    }

    orderSoup.textContent = selectedDishes.soup ? `${selectedDishes.soup.name} ${selectedDishes.soup.price}Р` : 'Блюдо не выбрано';
    orderMain.textContent = selectedDishes.main ? `${selectedDishes.main.name} ${selectedDishes.main.price}Р` : 'Блюдо не выбрано';
    orderSalad.textContent = selectedDishes.salad ? `${selectedDishes.salad.name} ${selectedDishes.salad.price}Р` : 'Блюдо не выбрано';
    orderDrink.textContent = selectedDishes.drink ? `${selectedDishes.drink.name} ${selectedDishes.drink.price}Р` : 'Напиток не выбран';
    orderDessert.textContent = selectedDishes.dessert ? `${selectedDishes.dessert.name} ${selectedDishes.dessert.price}Р` : 'Десерт не выбран';

    let total = 0;
    Object.values(selectedDishes).forEach(dish => {
        if (dish) {
            total += dish.price;
        }
    });
    
    orderTotal.textContent = `${total}Р`;
}

function handleDishClick(dishKeyword) {
    console.log('Кликнули на блюдо:', dishKeyword); 
    
    const selectedDish = dishes.find(dish => dish.keyword === dishKeyword);
    
    if (selectedDish) {
        selectedDishes[selectedDish.category] = selectedDish;
        
        updateOrderSummary();

        const allCardsInCategory = document.querySelectorAll(`.dish-card[data-category="${selectedDish.category}"]`);
        allCardsInCategory.forEach(card => {
            card.classList.remove('selected');
        });
        
        const clickedCard = document.querySelector(`[data-dish="${dishKeyword}"]`);
        if (clickedCard) {
            clickedCard.classList.add('selected');
        }
        
        console.log('Выбрано блюдо:', selectedDish.name); 
    }
}

function initEventListeners() {
    setTimeout(() => {
        const dishCards = document.querySelectorAll('.dish-card');
        console.log('Найдено карточек:', dishCards.length)
        
        dishCards.forEach(card => {
            card.addEventListener('click', function() {
                const dishKeyword = this.getAttribute('data-dish');
                handleDishClick(dishKeyword);
            });
        });
    }, 100);
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM загружен, инициализируем обработчики...');
    initEventListeners();
    updateOrderSummary();
    initDeliveryTime();
});



function initDeliveryTime() {
    const timeSpecificRadio = document.getElementById('time-specific');
    const deliveryTimeInput = document.getElementById('delivery-time');
    const timeAsapRadio = document.getElementById('time-asap');
    
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
        
        if (finalHours < 7) {
            finalHours = 7;
            finalMinutes = 0;
        } else if (finalHours >= 23 && finalMinutes > 0) {
            finalHours = 23;
            finalMinutes = 0;
        }
        
        return `${String(finalHours).padStart(2, '0')}:${String(finalMinutes).padStart(2, '0')}`;
    }
    
    function isValidTime(timeString) {
        if (!timeString) return false;
        
        const [hours, minutes] = timeString.split(':').map(Number);
        
        if (hours < 7 || hours > 23) return false;
        if (hours === 23 && minutes > 0) return false;
        
        return minutes % 5 === 0;
    }
    
    deliveryTimeInput.addEventListener('change', function() {
        const roundedTime = roundTo5Minutes(this.value);
        
        if (!isValidTime(this.value)) {

            this.value = roundedTime;
            showTimeMessage('Время автоматически округлено до ближайших 5 минут', 'info');
        }
    });

    deliveryTimeInput.addEventListener('blur', function() {
        if (this.value && !isValidTime(this.value)) {
            const roundedTime = roundTo5Minutes(this.value);
            this.value = roundedTime;
            showTimeMessage('Время автоматически округлено до ближайших 5 минут', 'info');
        }
    });
    
    function showTimeMessage(message, type) {
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
        
        setTimeout(() => {
            if (messageElement.parentNode) {
                messageElement.remove();
            }
        }, 3000);
    }
    
    document.getElementById('order-form').addEventListener('submit', function(event) {
        if (timeSpecificRadio.checked && deliveryTimeInput.value) {
            if (!isValidTime(deliveryTimeInput.value)) {
                event.preventDefault();
                showTimeMessage('Пожалуйста, выберите время с интервалом 5 минут (например: 08:00, 08:05, 08:10)', 'error');
                deliveryTimeInput.focus();
            }
        }
    });
    
    function setDefaultTime() {
        const now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        
        minutes = Math.ceil(minutes / 5) * 5;
        
        if (minutes === 60) {
            minutes = 0;
            hours += 1;
        }
        
        if (hours < 7) {
            hours = 7;
            minutes = 0;
        } else if (hours >= 23) {
            hours = 7;
            minutes = 0;
        }
        
        deliveryTimeInput.value = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    }
    
    setDefaultTime();
    
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