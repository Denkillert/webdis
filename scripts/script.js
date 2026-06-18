// Данные туров (без изменений, только поменял название в сообщении бронирования)
const tours = [
    { id: 1, name: "Lara Barut Collection", country: "Турция", region: "turkey", nights: 7, price: 955, oldPrice: 1250, img: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=600", desc: "5 звезд, ультра все включено, песчаный пляж. Трансфер из Анталии. Роскошный отдых для всей семьи.", location: "Анталья", rating: 5 },
    { id: 2, name: "Sunrise Crystal Bay Resort", country: "Египет", region: "egypt", nights: 7, price: 690, oldPrice: 890, img: "https://images.pexels.com/photos/753626/pexels-photo-753626.jpeg?auto=compress&cs=tinysrgb&w=600", desc: "Риф у берега, великолепный сервис, питание ultra all inclusive. Превосходное место для дайвинга.", location: "Хургада", rating: 4 },
    { id: 3, name: "Гранд Миллениум Пхукет", country: "Таиланд", region: "thailand", nights: 9, price: 1240, oldPrice: 1560, img: "https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg?auto=compress&cs=tinysrgb&w=600", desc: "Пляж Патонг, завтраки, бассейн, близко к ночной жизни. Идеально для активного отдыха.", location: "Пхукет", rating: 4 },
    { id: 4, name: "Luxury Palm Jumeirah", country: "ОАЭ", region: "uae", nights: 5, price: 1350, oldPrice: 1780, img: "https://bytur.by/wp-content/uploads/2022/10/cover_original-1024x603.jpg", desc: "Вид на море, частный пляж, шопинг. Роскошный отдых в самом сердце Дубая.", location: "Дубай", rating: 5 },
    { id: 5, name: "Римское наследие", country: "Италия", region: "europe", nights: 6, price: 1120, oldPrice: 1440, img: "https://images.pexels.com/photos/1797161/pexels-photo-1797161.jpeg?auto=compress&cs=tinysrgb&w=600", desc: "Экскурсионный тур, завтраки, авиаперелет из Минска. Колизей, Ватикан, фонтаны Треви.", location: "Рим", rating: 5 },
    { id: 6, name: "Bečići Resort & Spa", country: "Черногория", region: "europe", nights: 7, price: 780, oldPrice: 990, img: "https://upload.wikimedia.org/wikipedia/commons/f/f4/AX_Becici_Overview_20060818.jpg", desc: "Семейный отель, питание завтрак+ужин, близость пляжа. Живописные пейзажи Адриатики.", location: "Бечичи", rating: 4 },
    { id: 7, name: "Rixos Premium Seagate", country: "Египет", region: "egypt", nights: 7, price: 1250, oldPrice: 1690, img: "https://viasun.ru/blog/wp-content/uploads/2023/10/34445_17_853_1137_1-1024x768.jpg", desc: "VIP сервис, дайвинг, ультра AI. Один из лучших отелей Шарм-эль-Шейха.", location: "Шарм-эль-Шейх", rating: 5 },
    { id: 8, name: "Kırman Beldibi Hotel", country: "Турция", region: "turkey", nights: 7, price: 820, oldPrice: 1090, img: "https://images.pexels.com/photos/788200/pexels-photo-788200.jpeg?auto=compress&cs=tinysrgb&w=600", desc: "Зеленый сад, 200м до пляжа, концепция полупансион. Отличный вариант для спокойного отдыха.", location: "Кемер", rating: 4 },
    { id: 9, name: "Заполярное сияние", country: "Россия", region: "north", nights: 4, price: 595, oldPrice: 890, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ4r_SKVHovTCqNOYwC67cccT4eE5kB6b03A&s", desc: "🌌 Северное сияние, поездка на побережье Баренцева моря, экскурсия в Териберку, дегустация северной кухни. Незабываемое приключение!", location: "Мурманск", rating: 5 }
];

let activeFilter = "all";
let searchQuery = "";

function renderTours() {
    let filtered = tours.filter(t => {
        if (activeFilter !== "all" && t.region !== activeFilter) return false;
        if (searchQuery && !t.country.toLowerCase().includes(searchQuery.toLowerCase()) && !t.name.toLowerCase().includes(searchQuery.toLowerCase()) && !t.location.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
    });
    const container = document.getElementById("toursContainer");
    if (!container) return;
    if (filtered.length === 0) {
        container.innerHTML = `<div class="empty-state">😔 По вашему запросу туров не найдено. Попробуйте изменить параметры поиска.</div>`;
        return;
    }
    container.innerHTML = filtered.map(tour => {
        const discountPercent = Math.round(((tour.oldPrice - tour.price) / tour.oldPrice) * 100);
        return `
            <div class="tour-card" data-id="${tour.id}">
                <div class="card-img" style="background-image: url('${tour.img}');"></div>
                <div class="card-content">
                    <div class="flex-tag">
                        <span class="country-badge"><i class="fas fa-map-pin"></i> ${tour.country}</span>
                        <span style="font-size:13px; color:#6c7e8a;"><i class="far fa-clock"></i> ${tour.nights} ночей</span>
                    </div>
                    <div class="card-title">${tour.name}</div>
                    <div class="card-details">
                        <span><i class="fas fa-location-dot"></i> ${tour.location}</span>
                        <span><i class="fas fa-star" style="color:#FFB800;"></i> ${tour.rating}</span>
                    </div>
                    <div class="price-block">
                        <span class="price-hot">${tour.price} BYN</span>
                        <span class="old-price">${tour.oldPrice} BYN</span>
                        <span class="discount-badge">-${discountPercent}%</span>
                    </div>
                    <button class="btn-card view-tour-btn" data-id="${tour.id}">Подробнее →</button>
                </div>
            </div>
        `;
    }).join('');
    attachCardEvents();
}

function attachCardEvents() {
    document.querySelectorAll('.view-tour-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = parseInt(btn.getAttribute('data-id'));
            const tour = tours.find(t => t.id === id);
            if (tour) openModal(tour);
        });
    });
    document.querySelectorAll('.tour-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if(e.target.classList.contains('view-tour-btn')) return;
            const id = parseInt(card.getAttribute('data-id'));
            const tour = tours.find(t => t.id === id);
            if (tour) openModal(tour);
        });
    });
}

function openModal(tour) {
    const modal = document.getElementById("tourModal");
    if (!modal) return;
    document.getElementById("modalTitle").innerText = `${tour.name}, ${tour.country}`;
    const modalImgDiv = document.getElementById("modalImg");
    modalImgDiv.style.backgroundImage = `url('${tour.img}')`;
    modalImgDiv.style.backgroundSize = "cover";
    modalImgDiv.style.backgroundPosition = "center";
    document.getElementById("modalDesc").innerHTML = `${tour.desc} <br><br><strong>⭐ Рейтинг:</strong> ${tour.rating} звезд<br><strong>📍 Локация:</strong> ${tour.location}<br><strong>🛏️ Проживание:</strong> ${tour.nights} ночей`;
    const discountPercent = Math.round(((tour.oldPrice - tour.price) / tour.oldPrice) * 100);
    document.getElementById("modalPriceHot").innerHTML = `${tour.price} BYN <span style="text-decoration:line-through; font-size:16px; margin-left:10px; color:#9aa8b5;">${tour.oldPrice} BYN</span> <span style="background:#FF4D6D; color:white; padding:3px 8px; border-radius:20px; margin-left:8px; font-size:13px;">-${discountPercent}%</span>`;
    modal.style.display = "flex";
    const bookBtn = document.getElementById("bookNowBtn");
    if(bookBtn) bookBtn.onclick = () => alert(`Забронировать тур "${tour.name}"\nСвяжитесь с нами по телефону +375 (29) 777-88-99 или в мессенджере.`);
}

function closeModalFn() {
    const modal = document.getElementById("tourModal");
    if (modal) modal.style.display = "none";
}

// Инициализация после загрузки DOM
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("tourModal");
    if (modal) {
        document.querySelector('.close-modal')?.addEventListener('click', closeModalFn);
        window.addEventListener('click', (e) => {
            if(e.target === modal) closeModalFn();
        });
    }

    // Фильтры
    const chips = document.querySelectorAll('.chip');
    chips.forEach(chip => {
        chip.addEventListener('click', function() {
            chips.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            activeFilter = this.getAttribute('data-filter');
            renderTours();
        });
    });

    // Поиск в каталоге
    const searchInput = document.getElementById("catalogSearch");
    const searchBtn = document.getElementById("catalogSearchBtn");
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', () => {
            searchQuery = searchInput.value.trim();
            renderTours();
        });
        searchInput.addEventListener('keyup', (e) => {
            if(e.key === 'Enter') {
                searchQuery = searchInput.value.trim();
                renderTours();
            }
        });
    }

    // Получение поискового запроса из URL (если перешли с главной)
    const urlParams = new URLSearchParams(window.location.search);
    const qParam = urlParams.get('q');
    if (qParam && searchInput) {
        searchInput.value = qParam;
        searchQuery = qParam;
        renderTours();
    }

    renderTours();
});
