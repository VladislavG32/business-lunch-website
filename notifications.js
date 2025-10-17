// Функция для проверки заказа
function validateOrder() {
    const { soup, main, salad, drink, dessert } = selectedDishes;
    const validCombos = [
        soup && main && salad && drink,
        soup && main && drink,
        soup && salad && drink,
        main && salad && drink,
        main && drink
    ];
    
    if (validCombos.some(combo => combo)) {
        return { isValid: true };
    }
    
    let message = '';
    
    if (!soup && !main && !salad && !drink && !dessert) {
        message = 'Ничего не выбрано. Выберите блюда для заказа';
    } else if (!drink && (soup || main || salad)) {
        message = 'Выберите напиток';
    } else if (soup && !main && !salad) {
        message = 'Выберите главное блюдо/салат/стартер';
    } else if (salad && !soup && !main) {
        message = 'Выберите суп или главное блюдо';
    } else if ((drink || dessert) && !soup && !main && !salad) {
        message = 'Выберите главное блюдо';
    } else {
        message = 'Выберите суп или главное блюдо';
    }
    
    return { isValid: false, message };
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    
    notification.innerHTML = `
        <div class="notification-content">
            <h3>${message}</h3>
            <button class="notification-ok-btn">Окей 💬</button>
        </div>
        <div class="notification-overlay"></div>
    `;
    
    document.body.appendChild(notification);
    
    const okBtn = notification.querySelector('.notification-ok-btn');
    okBtn.addEventListener('click', function() {
        notification.remove();
    });
    
    const overlay = notification.querySelector('.notification-overlay');
    overlay.addEventListener('click', function() {
        notification.remove();
    });
}

function initFormValidation() {
    const orderForm = document.getElementById('order-form');
    
    orderForm.addEventListener('submit', function(event) {
        const validation = validateOrder();
        
        if (!validation.isValid) {
            event.preventDefault();
            showNotification(validation.message);
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    initFormValidation();
});