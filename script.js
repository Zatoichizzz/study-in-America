// Токен вашего бота
const botToken = '6865882636:AAHMcN8Vf6aFxMOH-zkJVLs0KF13xClL9_A';

// chat_id вашего чата
const chatId = '1550629403';

// Функция для отправки сообщения в телеграм
function sendTelegramMessage(message) {
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const data = {
        chat_id: chatId,
        text: message
    };

    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log('Сообщение успешно отправлено в телеграм');
            // После успешной отправки формы обновляем страницу или выводим сообщение об успешной отправке
            alert('Спасибо! Ваша заявка успешно отправлена.');
            // window.location.reload(); // Раскомментируйте эту строку, если хотите автоматически обновить страницу после отправки формы
        } else {
            console.error('Произошла ошибка при отправке в телеграм:', xhr.status);
        }
    };

    xhr.send(JSON.stringify(data));
}

// Обработчик отправки формы
document.getElementById('surveyForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Получаем данные из формы
    const formData = new FormData(this);
    const message = `
        Новая заявка:
        Имя: ${formData.get('name')}
        Электронная почта: ${formData.get('email')}
        Мобильный телефон: ${formData.get('phone')}
        Планы поступления: ${formData.get('plans')}
        Образовательные программы: ${formData.get('programs')}
        Факторы выбора университета: ${formData.getAll('factors[]').join(', ')}
        Ответ на открытый вопрос: ${formData.get('openQuestion')}
    `;

    // Отправляем сообщение в телеграм
    sendTelegramMessage(message);
});
