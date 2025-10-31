function showNotification(message, type = 'info', duration = 3000) {
    const container = document.getElementById('notifications-container');
    
    if (!container) {
        console.error('Контейнер уведомлений не найден');
        return;
    }

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-text">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;

    container.appendChild(notification);

    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, duration);
}

function showSuccess(message, duration = 3000) {
    showNotification(message, 'success', duration);
}

function showError(message, duration = 4000) {
    showNotification(message, 'error', duration);
}

function showWarning(message, duration = 3500) {
    showNotification(message, 'warning', duration);
}

function showInfo(message, duration = 3000) {
    showNotification(message, 'info', duration);
}

function showValidation(message, duration = 3500) {
    showNotification(message, 'validation', duration);
}

document.addEventListener('DOMContentLoaded', function() {
    if (!document.getElementById('notifications-container')) {
        const container = document.createElement('div');
        container.id = 'notifications-container';
        container.className = 'notifications-container';
        document.body.appendChild(container);
    }
});