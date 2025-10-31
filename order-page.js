const API_KEY = '28ff2d45-84c5-4fc7-93dd-be7d780e3196';
const API_BASE_URL = 'https://edu.std-900.ist.mospolytech.ru/labs/api';

async function initOrderPage() {
    await loadDishes();
    loadOrderFromStorage();
    displayOrderDishes();
    updateOrderForm();
    initDeliveryTime();
    initOrderForm();
}

function displayOrderDishes() {
    const orderGrid = document.querySelector('.order-dishes-grid');
    const emptyMessage = document.getElementById('empty-order');
    const orderFormSection = document.querySelector('.order-form-section');
    
    if (!orderGrid) return;

    orderGrid.innerHTML = '';

    const hasItems = Object.values(selectedDishes).some(dish => dish !== null);
    
    if (!hasItems) {
        if (emptyMessage) emptyMessage.style.display = 'block';
        if (orderFormSection) orderFormSection.style.display = 'none';
        return;
    }

    if (emptyMessage) emptyMessage.style.display = 'none';
    if (orderFormSection) orderFormSection.style.display = 'block';

    Object.entries(selectedDishes).forEach(([category, dish]) => {
        if (dish) {
            const dishCard = createOrderDishCard(dish, category);
            orderGrid.appendChild(dishCard);
        }
    });
}

function createOrderDishCard(dish, category) {
    const card = document.createElement('div');
    card.className = 'order-dish-card';
    card.setAttribute('data-category', category);
    
    card.innerHTML = `
        <img src="${dish.image}" alt="${dish.name}">
        <div class="order-dish-info">
            <div class="price">${dish.price}₽</div>
            <div class="name">${dish.name}</div>
            <div class="weight">${dish.count}</div>
            <button class="remove-btn" data-category="${category}">Удалить</button>
        </div>
    `;

    const removeBtn = card.querySelector('.remove-btn');
    removeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        removeDishFromOrder(category);
        displayOrderDishes();
        updateOrderForm();
    });

    return card;
}

function initOrderForm() {
    const form = document.getElementById('order-form');
    if (!form) return;
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (!selectedDishes.drink) {
            showValidation('Выберите напиток');
            return;
        }
        
        const formData = new FormData(form);
        const timeTypeRadio = document.querySelector('input[name="delivery_time_type"]:checked');
        const deliveryType = timeTypeRadio ? timeTypeRadio.value : 'now';
        const deliveryTimeInput = document.getElementById('delivery-time');
        const deliveryTime = deliveryTimeInput ? deliveryTimeInput.value : null;
        
        const data = {
            full_name: formData.get('full_name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            delivery_address: formData.get('delivery_address'),
            subscribe: formData.get('subscribe') ? 1 : 0,
            delivery_type: deliveryType,
            delivery_time: deliveryType === 'by_time' ? deliveryTime : null,
            comment: formData.get('comment'),
            soup_id: selectedDishes.soup?.id || null,
            main_course_id: selectedDishes['main-course']?.id || null,
            salad_id: selectedDishes.salad?.id || null,
            drink_id: selectedDishes.drink?.id || null,
            dessert_id: selectedDishes.dessert?.id || null
        };
        
        if (!data.full_name || !data.email || !data.phone || !data.delivery_address) {
            showValidation('Заполните все обязательные поля');
            return;
        }
        
        if (data.delivery_type === 'by_time' && !data.delivery_time) {
            showValidation('Укажите время доставки');
            return;
        }
        
        try {
            const resp = await fetch(`${API_BASE_URL}/orders?api_key=${API_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            
            if (!resp.ok) {
                const error = await resp.json();
                showError(error.error || 'Ошибка при оформлении заказа');
                return;
            }
            
            showSuccess('Заказ успешно отправлен!');
            localStorage.removeItem('lunchOrder');
            selectedDishes = { soup: null, 'main-course': null, salad: null, drink: null, dessert: null };
            setTimeout(() => window.location.href = 'orders.html', 1500);
        } catch (err) {
            showError('Ошибка сети: ' + err.message);
        }
    });
}

function validateOrder() {
    const soup = selectedDishes.soup;
    const main = selectedDishes['main-course'];
    const salad = selectedDishes.salad;
    const drink = selectedDishes.drink;
    
    const validCombos = [
        soup && main && salad && drink,
        soup && main && drink,
        soup && salad && drink,
        main && salad && drink,
        main && drink
    ];
    
    return { isValid: validCombos.some(combo => combo) };
}

document.addEventListener('DOMContentLoaded', initOrderPage);
