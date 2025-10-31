const API_URL = "https://edu.std-900.ist.mospolytech.ru/labs/api";
const API_KEY = "28ff2d45-84c5-4fc7-93dd-be7d780e3196";

async function fetchOrders() {
    const response = await fetch(`${API_URL}/orders?api_key=${API_KEY}`);
    if (!response.ok) return [];
    return await response.json();
}

async function fetchDishes() {
    const res = await fetch(`${API_URL}/dishes?api_key=${API_KEY}`);
    if (!res.ok) return [];
    return await res.json();
}

function getDishName(id, dishes) {
    const dish = dishes.find(d => d.id === id);
    return dish ? dish.name : '';
}

function composeOrderString(order, dishes) {
    let result = [];
    let total = 0;
    
    if(order.soup_id) {
        const dish = dishes.find(d => d.id === order.soup_id);
        if(dish) {
            result.push(dish.name);
            total += dish.price;
        }
    }
    if(order.main_course_id) {
        const dish = dishes.find(d => d.id === order.main_course_id);
        if(dish) {
            result.push(dish.name);
            total += dish.price;
        }
    }
    if(order.salad_id) {
        const dish = dishes.find(d => d.id === order.salad_id);
        if(dish) {
            result.push(dish.name);
            total += dish.price;
        }
    }
    if(order.drink_id) {
        const dish = dishes.find(d => d.id === order.drink_id);
        if(dish) {
            result.push(dish.name);
            total += dish.price;
        }
    }
    if(order.dessert_id) {
        const dish = dishes.find(d => d.id === order.dessert_id);
        if(dish) {
            result.push(dish.name);
            total += dish.price;
        }
    }
    
    order.calculatedTotal = total;
    return result.filter(Boolean).join(', ');
}

function deliveryTypeDisplay(order) {
    if (order.delivery_type === 'by_time' && order.delivery_time) {
        return `Ко времени: ${order.delivery_time}`;
    }
    return 'Как можно скорее (с 7:00 до 23:00)';
}

function formatDate(dt) {
    return new Date(dt).toLocaleString('ru-RU').replace(',','');
}

function openModal(title, content, actions=[]) {
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-content').innerHTML = content;
    const actionsDiv = document.getElementById('modal-actions');
    actionsDiv.innerHTML = '';
    actions.forEach(btn => actionsDiv.appendChild(btn));
    document.getElementById('modal-overlay').style.display = 'flex';
}

function closeModal() {
    document.getElementById('modal-overlay').style.display = 'none';
}

document.getElementById('modal-close').onclick = closeModal;
document.getElementById('modal-overlay').onclick = function(e) {
    if (e.target === this) closeModal();
};

async function renderOrders() {
    const dishes = await fetchDishes();
    const orders = (await fetchOrders()).sort((a,b) => new Date(b.created_at) - new Date(a.created_at));
    const list = document.getElementById('orders-list');
    list.innerHTML = '';
    if(orders.length===0){
        list.innerHTML = '<p>Нет оформленных заказов</p>';
        return;
    }
    orders.forEach((order, i) => {
        const orderDiv = document.createElement('div');
        orderDiv.className = 'order-card';
        orderDiv.innerHTML = `
            <div><b>#${i+1}</b> | ${formatDate(order.created_at)}</div>
            <div>Состав: ${composeOrderString(order, dishes)}</div>
            <div>Сумма: <b>${order.calculatedTotal}₽</b></div>
            <div>Доставка: ${deliveryTypeDisplay(order)}</div>
            <div class="order-actions">
                <button onclick="showOrderModal(${order.id})">Подробнее</button>
                <button onclick="showEditModal(${order.id})">Редактировать</button>
                <button onclick="showDeleteModal(${order.id})">Удалить</button>
            </div>
        `;
        list.appendChild(orderDiv);
    });
}

async function showOrderModal(orderId){
    const dishes = await fetchDishes();
    const order = await fetch(`${API_URL}/orders/${orderId}?api_key=${API_KEY}`).then(r=>r.json());
    let content = `
        <b>Дата:</b> ${formatDate(order.created_at)}<br>
        <b>Состав:</b> ${composeOrderString(order, dishes)}<br>
        <b>Сумма:</b> ${order.calculatedTotal}₽<br>
        <b>Доставка:</b> ${deliveryTypeDisplay(order)}<br>
        <b>Имя:</b> ${order.full_name}<br>
        <b>Телефон:</b> ${order.phone}<br>
        <b>Email:</b> ${order.email}<br>
        <b>Адрес:</b> ${order.delivery_address}<br>
        <b>Комментарий:</b> ${order.comment || 'Нет'}<br>
    `;
    let btn = document.createElement('button');
    btn.textContent = 'Ок';
    btn.onclick = closeModal;
    openModal('Просмотр заказа', content, [btn]);
}

async function showEditModal(orderId){
    const order = await fetch(`${API_URL}/orders/${orderId}?api_key=${API_KEY}`).then(r=>r.json());
    let content = `
        <form id="edit-form">
            <label>Имя: <input name="full_name" type="text" value="${order.full_name}" required></label>
            <label>Email: <input name="email" type="email" value="${order.email}" required></label>
            <label>Телефон: <input name="phone" type="tel" value="${order.phone}" required></label>
            <label>Адрес: <input name="delivery_address" type="text" value="${order.delivery_address}" required></label>
            <label>Комментарий: <textarea name="comment">${order.comment||''}</textarea></label>
            <label>Тип доставки:
                <select name="delivery_type">
                    <option value="now" ${order.delivery_type === "now" ? "selected" : ""}>Как можно скорее</option>
                    <option value="by_time" ${order.delivery_type === "by_time" ? "selected" : ""}>Ко времени</option>
                </select>
            </label>
            <label>Время доставки: <input name="delivery_time" type="time" value="${order.delivery_time||''}"></label>
        </form>
    `;
    let btnSave = document.createElement('button');
    btnSave.textContent = 'Сохранить';
    btnSave.onclick = async function() {
        const form = document.getElementById('edit-form');
        const fd = new FormData(form);
        let data = {};
        fd.forEach((v,k) => data[k]=v);
        try{
            const resp = await fetch(`${API_URL}/orders/${orderId}?api_key=${API_KEY}`,{
                method: "PUT",
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(data)
            });
            if(!resp.ok) throw new Error(await resp.text());
            closeModal();
            showSuccess('Заказ успешно изменён');
            renderOrders();
        }catch(e){
            showError('Ошибка редактирования заказа: ' + e.message);
        }
    };
    let btnCancel = document.createElement('button');
    btnCancel.textContent = 'Отмена';
    btnCancel.onclick = closeModal;
    openModal('Редактирование заказа', content, [btnCancel, btnSave]);
}

function showDeleteModal(orderId){
    let content = `<p style="font-size: 1.1rem;">Вы уверены что хотите удалить заказ?</p>`;
    let btnYes = document.createElement('button');
    btnYes.textContent = 'Да';
    btnYes.classList.add('delete-btn');
    btnYes.onclick = async function(){
        try{
            const resp = await fetch(`${API_URL}/orders/${orderId}?api_key=${API_KEY}`,{
                method: "DELETE"
            });
            if(!resp.ok) throw new Error(await resp.text());
            closeModal();
            showSuccess('Заказ успешно удалён');
            renderOrders();
        }catch(e){
            showError('Ошибка удаления заказа: ' + e.message);
        }
    };
    let btnNo = document.createElement('button');
    btnNo.textContent = 'Отмена';
    btnNo.onclick = closeModal;
    openModal('Удаление заказа', content, [btnNo, btnYes]);
}

window.showOrderModal = showOrderModal;
window.showEditModal = showEditModal;
window.showDeleteModal = showDeleteModal;

renderOrders();