document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("surveyForm");
    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Предотвращаем отправку формы по умолчанию
        
        // Получаем данные формы
        const formData = new FormData(form);
        
        // Формируем текст сообщения для отправки в телеграмм
        let message = "Новая заявка на поступление в университеты США:\n";
        formData.forEach(function(value, key) {
            message += key + ": " + value + "\n";
        });
        
        // Отправляем запрос к API Telegram для отправки сообщения боту
        fetch('https://api.telegram.org/bot6865882636:AAHMcN8Vf6aFxMOH-zkJVLs0KF13xClL9_A/sendMessage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: '1550629403',
                text: message
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            alert("Ваша заявка успешно отправлена!");
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
            alert("Произошла ошибка. Пожалуйста, попробуйте позже.");
        });
    });
});
