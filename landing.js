function scrollToFeatures() {
    document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', function() {
    const feedbackForm = document.getElementById('feedbackForm');
    
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(feedbackForm);
            
            try {
                showSuccess('Спасибо! Ваше сообщение отправлено. Мы ответим в течение часа.');
                feedbackForm.reset();
            } catch (err) {
                showError('Ошибка при отправке формы');
            }
        });
    }
});