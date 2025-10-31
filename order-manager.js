let selectedDishes = {
    soup: null,
    'main-course': null,
    salad: null,
    drink: null,
    dessert: null
};

function loadOrderFromStorage() {
    const savedOrder = localStorage.getItem('lunchOrder');
    if (savedOrder) {
        const orderIds = JSON.parse(savedOrder);
        if (orderIds.soup) selectedDishes.soup = getDishByKeyword(orderIds.soup);
        if (orderIds['main-course']) selectedDishes['main-course'] = getDishByKeyword(orderIds['main-course']);
        if (orderIds.salad) selectedDishes.salad = getDishByKeyword(orderIds.salad);
        if (orderIds.drink) selectedDishes.drink = getDishByKeyword(orderIds.drink);
        if (orderIds.dessert) selectedDishes.dessert = getDishByKeyword(orderIds.dessert);
    }
}

function saveOrderToStorage() {
    const orderIds = {
        soup: selectedDishes.soup?.keyword || null,
        'main-course': selectedDishes['main-course']?.keyword || null,
        salad: selectedDishes.salad?.keyword || null,
        drink: selectedDishes.drink?.keyword || null,
        dessert: selectedDishes.dessert?.keyword || null
    };
    localStorage.setItem('lunchOrder', JSON.stringify(orderIds));
}

function validateOrder() {
    if (!selectedDishes.drink) {
        return { isValid: false, message: 'Выберите напиток' };
    }
    return { isValid: true, message: '' };
}

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
        if (orderSummary) orderSummary.style.display = 'none';
        if (emptyMessage) emptyMessage.style.display = 'block';
    } else {
        if (orderSummary) orderSummary.style.display = 'block';
        if (emptyMessage) emptyMessage.style.display = 'none';

        if (orderSoup) {
            orderSoup.textContent = selectedDishes.soup ?
                `${selectedDishes.soup.name} ${selectedDishes.soup.price}₽` :
                'Блюдо не выбрано';
        }

        if (orderMain) {
            orderMain.textContent = selectedDishes['main-course'] ?
                `${selectedDishes['main-course'].name} ${selectedDishes['main-course'].price}₽` :
                'Блюдо не выбрано';
        }

        if (orderSalad) {
            orderSalad.textContent = selectedDishes.salad ?
                `${selectedDishes.salad.name} ${selectedDishes.salad.price}₽` :
                'Блюдо не выбрано';
        }

        if (orderDrink) {
            orderDrink.textContent = selectedDishes.drink ?
                `${selectedDishes.drink.name} ${selectedDishes.drink.price}₽` :
                'Напиток не выбран';
        }

        if (orderDessert) {
            orderDessert.textContent = selectedDishes.dessert ?
                `${selectedDishes.dessert.name} ${selectedDishes.dessert.price}₽` :
                'Десерт не выбран';
        }

        let total = 0;
        Object.values(selectedDishes).forEach(dish => {
            if (dish) total += dish.price;
        });

        if (orderTotal) {
            orderTotal.textContent = `${total}₽`;
        }
    }

    updateCheckoutPanel();
}

function updateCheckoutPanel() {
    const checkoutPanel = document.getElementById('checkout-panel');
    const checkoutTotal = document.getElementById('checkout-total');
    const checkoutLink = document.getElementById('checkout-link');
    if (!checkoutPanel) return;

    const selectedCount = Object.values(selectedDishes).filter(dish => dish !== null).length;
    const validation = validateOrder();

    if (selectedCount === 0) {
        checkoutPanel.style.display = 'none';
    } else {
        checkoutPanel.style.display = 'block';
        let total = 0;
        Object.values(selectedDishes).forEach(dish => {
            if (dish) total += dish.price;
        });

        if (checkoutTotal) {
            checkoutTotal.textContent = `${total}₽`;
        }

        if (checkoutLink) {
            if (validation.isValid) {
                checkoutLink.classList.remove('disabled');
                checkoutLink.style.pointerEvents = 'auto';
                checkoutLink.style.opacity = '1';
            } else {
                checkoutLink.classList.add('disabled');
                checkoutLink.style.pointerEvents = 'none';
                checkoutLink.style.opacity = '0.5';
            }
        }
    }
}

function handleDishClick(dishKeyword) {
    const selectedDish = getDishByKeyword(dishKeyword);
    if (selectedDish) {
        selectedDishes[selectedDish.category] = selectedDish;
        saveOrderToStorage();
        updateOrderSummary();

        const allCardsInCategory = document.querySelectorAll(`.dish-card[data-category="${selectedDish.category}"]`);
        allCardsInCategory.forEach(card => {
            card.classList.remove('selected');
        });

        const clickedCard = document.querySelector(`[data-dish="${dishKeyword}"]`);
        if (clickedCard) {
            clickedCard.classList.add('selected');
        }
    }
}

function removeDishFromOrder(category) {
    selectedDishes[category] = null;
    saveOrderToStorage();

    const card = document.querySelector(`.order-dish-card[data-category="${category}"]`);
    if (card) {
        card.remove();
    }

    updateOrderDisplay();
}

function updateOrderDisplay() {
    const orderGrid = document.querySelector('.order-dishes-grid');
    const emptyMessage = document.getElementById('empty-order');
    const orderFormSection = document.querySelector('.order-form-section');
    if (!orderGrid) return;

    const hasItems = Object.values(selectedDishes).some(dish => dish !== null);

    if (!hasItems) {
        if (emptyMessage) emptyMessage.style.display = 'block';
        if (orderFormSection) orderFormSection.style.display = 'none';
        orderGrid.innerHTML = '';
    } else {
        if (emptyMessage) emptyMessage.style.display = 'none';
        if (orderFormSection) orderFormSection.style.display = 'block';
        updateOrderForm();
    }
}

function updateOrderForm() {
    const soupPrice = document.getElementById('order-soup-price');
    const mainPrice = document.getElementById('order-main-price');
    const saladPrice = document.getElementById('order-salad-price');
    const drinkPrice = document.getElementById('order-drink-price');
    const dessertPrice = document.getElementById('order-dessert-price');
    const totalPrice = document.getElementById('order-total-price');

    const soupName = document.getElementById('order-soup-name');
    const mainName = document.getElementById('order-main-name');
    const saladName = document.getElementById('order-salad-name');
    const drinkName = document.getElementById('order-drink-name');
    const dessertName = document.getElementById('order-dessert-name');

    if (soupName) soupName.textContent = selectedDishes.soup ? selectedDishes.soup.name : 'Не выбрано';
    if (mainName) mainName.textContent = selectedDishes['main-course'] ? selectedDishes['main-course'].name : 'Не выбрано';
    if (saladName) saladName.textContent = selectedDishes.salad ? selectedDishes.salad.name : 'Не выбрано';
    if (drinkName) drinkName.textContent = selectedDishes.drink ? selectedDishes.drink.name : 'Не выбран';
    if (dessertName) dessertName.textContent = selectedDishes.dessert ? selectedDishes.dessert.name : 'Не выбран';

    if (soupPrice) soupPrice.textContent = selectedDishes.soup ? `${selectedDishes.soup.price}₽` : '0₽';
    if (mainPrice) mainPrice.textContent = selectedDishes['main-course'] ? `${selectedDishes['main-course'].price}₽` : '0₽';
    if (saladPrice) saladPrice.textContent = selectedDishes.salad ? `${selectedDishes.salad.price}₽` : '0₽';
    if (drinkPrice) drinkPrice.textContent = selectedDishes.drink ? `${selectedDishes.drink.price}₽` : '0₽';
    if (dessertPrice) dessertPrice.textContent = selectedDishes.dessert ? `${selectedDishes.dessert.price}₽` : '0₽';

    let total = 0;
    Object.values(selectedDishes).forEach(dish => {
        if (dish) total += dish.price;
    });

    if (totalPrice) totalPrice.textContent = `${total}₽`;
}

function initEventListeners() {
    setTimeout(() => {
        const dishCards = document.querySelectorAll('.dish-card');
        dishCards.forEach(card => {
            const newCard = card.cloneNode(true);
            card.parentNode.replaceChild(newCard, card);
        });

        const newCards = document.querySelectorAll('.dish-card');
        newCards.forEach(card => {
            card.addEventListener('click', function() {
                const dishKeyword = this.getAttribute('data-dish');
                handleDishClick(dishKeyword);
            });
        });
    }, 100);
}

function initDeliveryTime() {
    const timeSpecificRadio = document.getElementById('time-specific');
    const deliveryTimeInput = document.getElementById('delivery-time');
    const timeAsapRadio = document.getElementById('time-asap');

    if (!timeSpecificRadio || !deliveryTimeInput || !timeAsapRadio) {
        return;
    }

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
}

window.selectedDishes = selectedDishes;
window.handleDishClick = handleDishClick;
window.updateOrderSummary = updateOrderSummary;
window.loadOrderFromStorage = loadOrderFromStorage;
window.saveOrderToStorage = saveOrderToStorage;
window.removeDishFromOrder = removeDishFromOrder;
window.updateOrderDisplay = updateOrderDisplay;
window.updateOrderForm = updateOrderForm;
window.validateOrder = validateOrder;
