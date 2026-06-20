// Получаем ID тура из URL
const urlParams = new URLSearchParams(window.location.search);
const tourId = parseInt(urlParams.get('id'));
let tour = null;

// Функция для загрузки деталей тура
function loadTourDetails() {
    tour = getTourById(tourId);
    if (!tour) {
        document.getElementById('tourPreview').innerHTML = '<p>Тур не найден. <a href="catalog.html">Вернуться в каталог</a></p>';
        return;
    }

    const preview = document.getElementById('tourPreview');
    preview.innerHTML = `
        <img src="${tour.img}" alt="${tour.name}">
        <h3>${tour.name}</h3>
        <p><i class="fas fa-map-pin"></i> ${tour.country}, ${tour.location}</p>
        <p><i class="fas fa-star" style="color:#FFB800;"></i> ${tour.rating} звезд</p>
        <p><i class="far fa-clock"></i> ${tour.nights} ночей</p>
        <div style="font-size: 22px; font-weight: 800; color: #FF5A3C; margin-top: 10px;">${tour.price} BYN / чел</div>
    `;

    // Устанавливаем минимальную дату заезда (сегодня + 7 дней)
    const today = new Date();
    const minDate = new Date(today.setDate(today.getDate() + 7));
    document.getElementById('checkinDate').min = minDate.toISOString().split('T')[0];

    // Обновляем итоговую цену при изменении количества гостей
    document.getElementById('guests').addEventListener('input', updateTotalPrice);
    updateTotalPrice();
}

function updateTotalPrice() {
    if (!tour) return;
    const guests = parseInt(document.getElementById('guests').value) || 1;
    const total = tour.price * guests;
    document.getElementById('totalPrice').textContent = `Итого: ${total} BYN`;
}

// Валидация формы
function validateForm() {
    let valid = true;

    const name = document.getElementById('customerName').value.trim();
    const email = document.getElementById('customerEmail').value.trim();
    const phone = document.getElementById('customerPhone').value.trim();
    const checkin = document.getElementById('checkinDate').value;
    const guests = parseInt(document.getElementById('guests').value) || 0;

    // Имя
    if (!name) {
        document.getElementById('nameError').style.display = 'block';
        valid = false;
    } else {
        document.getElementById('nameError').style.display = 'none';
    }

    // Email (простая проверка)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        document.getElementById('emailError').style.display = 'block';
        valid = false;
    } else {
        document.getElementById('emailError').style.display = 'none';
    }

    // Телефон
    if (!phone) {
        document.getElementById('phoneError').style.display = 'block';
        valid = false;
    } else {
        document.getElementById('phoneError').style.display = 'none';
    }

    // Дата
    if (!checkin) {
        document.getElementById('dateError').style.display = 'block';
        valid = false;
    } else {
        const selectedDate = new Date(checkin);
        const today = new Date();
        const minDate = new Date(today.setDate(today.getDate() + 7));
        if (selectedDate < minDate) {
            document.getElementById('dateError').style.display = 'block';
            valid = false;
        } else {
            document.getElementById('dateError').style.display = 'none';
        }
    }

    // Количество гостей
    if (guests < 1 || guests > 10) {
        document.getElementById('guestsError').style.display = 'block';
        valid = false;
    } else {
        document.getElementById('guestsError').style.display = 'none';
    }

    return valid;
}

// Симуляция оплаты
function processPayment() {
    if (!validateForm()) {
        // Прокручиваем к первому полю с ошибкой
        const firstError = document.querySelector('.error-message[style*="display: block"]');
        if (firstError) {
            firstError.closest('.form-group')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
    }

    const payBtn = document.getElementById('payBtn');
    const progressDiv = document.getElementById('paymentProgress');
    const progressFill = document.getElementById('progressFill');
    const statusText = document.getElementById('paymentStatus');
    const successMsg = document.getElementById('successMessage');

    // Получаем данные формы
    const name = document.getElementById('customerName').value.trim();
    const email = document.getElementById('customerEmail').value.trim();
    const phone = document.getElementById('customerPhone').value.trim();
    const checkin = document.getElementById('checkinDate').value;
    const guests = parseInt(document.getElementById('guests').value) || 1;

    // Блокируем кнопку
    payBtn.disabled = true;
    payBtn.textContent = 'Обработка...';

    // Показываем прогресс
    progressDiv.style.display = 'block';
    progressFill.style.width = '0%';
    statusText.textContent = 'Инициализация платежа...';

    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15 + 5;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            statusText.textContent = 'Платёж успешно завершён!';
            successMsg.style.display = 'block';

            // Сохраняем бронирование
            const booking = {
                tourId: tour.id,
                tourName: tour.name,
                country: tour.country,
                location: tour.location,
                nights: tour.nights,
                price: tour.price,
                totalPrice: tour.price * guests,
                guests: guests,
                checkinDate: checkin,
                customerName: name,
                customerEmail: email,
                customerPhone: phone,
                status: 'Подтверждено',
                date: new Date().toLocaleDateString('ru-RU')
            };
            addBooking(booking);

            // Перенаправляем в личный кабинет через 2 секунды
            setTimeout(() => {
                window.location.href = 'account.html';
            }, 2000);
        }
        progressFill.style.width = progress + '%';
        if (progress < 50) {
            statusText.textContent = 'Обработка платежа...';
        } else if (progress < 80) {
            statusText.textContent = 'Подтверждение оплаты...';
        } else {
            statusText.textContent = 'Завершение оформления...';
        }
    }, 200);
}

// Обработчик кнопки оплаты
document.addEventListener('DOMContentLoaded', () => {
    loadTourDetails();
    document.getElementById('payBtn').addEventListener('click', processPayment);
});