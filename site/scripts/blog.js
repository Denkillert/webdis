// Данные статей
const articles = [
    {
        id: 1,
        title: "🔥 Запуск северного направления!",
        date: "22 мая 2025",
        category: "Анонс",
        excerpt: "Мы рады сообщить о запуске туров на Север! Теперь вы можете отправиться в Мурманск, Териберку и за полярным кругом...",
        fullText: "Мы рады сообщить о запуске туров на Север! Теперь вы можете отправиться в Мурманск, Териберку и за полярным кругом. В программе: охота за Северным сиянием, катание на хаски, дегустация северной кухни и незабываемые фото. Первые туры стартуют в декабре 2025 года.",
        img: "https://images.pexels.com/photos/12029114/pexels-photo-12029114.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        id: 2,
        title: "✈️ Спецпредложение: Турция со скидкой 30%",
        date: "18 мая 2025",
        category: "Акция",
        excerpt: "Только до конца мая — горящие туры в Анталию и Кемер по специальным ценам. Всё включено, трансфер, страховка в подарок...",
        fullText: "Только до конца мая — горящие туры в Анталию и Кемер по специальным ценам. Всё включено, трансфер, страховка в подарок. Отели 4-5 звезд, песчаные пляжи, аквапарки для детей.",
        img: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        id: 3,
        title: "🇪🇬 Египет возвращается! Новые отели в Хургаде",
        date: "10 мая 2025",
        category: "Новость",
        excerpt: "Мы добавили в каталог 5 новых отелей в Хургаде и Шарм-эль-Шейхе с системой Ultra All Inclusive...",
        fullText: "Мы добавили в каталог 5 новых отелей в Хургаде и Шарм-эль-Шейхе с системой Ultra All Inclusive. Отдых на Красном море стал ещё доступнее. Раннее бронирование — дополнительная скидка 10%.",
        img: "https://images.pexels.com/photos/753626/pexels-photo-753626.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        id: 4,
        title: "❄️ Как подготовиться к поездке на Север",
        date: "5 мая 2025",
        category: "Совет",
        excerpt: "Собрали чек-лист вещей, которые обязательно взять с собой в путешествие за полярный круг...",
        fullText: "Одежда: термобельё, флис, пуховик, непромокаемые штаны. Техника: штатив для фото, пауэрбанк. Медикаменты: аптечка от простуды. И главное — хорошее настроение!",
        img: "https://images.pexels.com/photos/1984687/pexels-photo-1984687.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        id: 5,
        title: "🏆 JetRide — лучший туроператор 2024 года",
        date: "28 апреля 2025",
        category: "Достижение",
        excerpt: "Мы получили премию «Выбор года» в номинации «Туроператор №1 в Беларуси»...",
        fullText: "Мы получили премию «Выбор года» в номинации «Туроператор №1 в Беларуси». Спасибо вам за доверие! В этом году мы запустили 15 новых направлений и обслужили более 5000 туристов.",
        img: "https://images.pexels.com/photos/3762807/pexels-photo-3762807.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        id: 6,
        title: "🎄 Раннее бронирование на Новый год",
        date: "20 апреля 2025",
        category: "Акция",
        excerpt: "Забронируйте новогодний тур до 1 сентября и получите скидку до 25%...",
        fullText: "Направления: Таиланд, ОАЭ, Мальдивы, Европа. Мы предлагаем лучшие отели с праздничными программами. Успейте забронировать идеальный Новый год!",
        img: "https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg?auto=compress&cs=tinysrgb&w=600"
    }
];

// Функция отрисовки статей
function renderBlog() {
    const container = document.getElementById("blogContainer");
    if (!container) {
        console.log("Контейнер blogContainer не найден!");
        return;
    }
    
    container.innerHTML = articles.map(article => `
        <div class="blog-card" data-id="${article.id}">
            <div class="blog-img" style="background-image: url('${article.img}');"></div>
            <div class="blog-content">
                <div class="blog-date">
                    <i class="far fa-calendar-alt"></i> ${article.date}
                    <span class="category-tag">${article.category}</span>
                </div>
                <h3 class="blog-title">${article.title}</h3>
                <p class="blog-excerpt">${article.excerpt}</p>
                <a href="#" class="read-more" data-id="${article.id}">Читать далее →</a>
            </div>
        </div>
    `).join('');
    
    attachBlogEvents();
}

// Привязка событий к карточкам
function attachBlogEvents() {
    document.querySelectorAll('.read-more').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const id = parseInt(link.getAttribute('data-id'));
            const article = articles.find(a => a.id === id);
            if (article) openArticleModal(article);
        });
    });
    
    document.querySelectorAll('.blog-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.classList.contains('read-more') || e.target.closest('.read-more')) return;
            const id = parseInt(card.getAttribute('data-id'));
            const article = articles.find(a => a.id === id);
            if (article) openArticleModal(article);
        });
    });
}

// Открытие модального окна со статьёй
function openArticleModal(article) {
    const modal = document.getElementById("articleModal");
    if (!modal) return;
    document.getElementById("articleTitle").innerText = article.title;
    document.getElementById("articleDate").innerHTML = `<i class="far fa-calendar-alt"></i> ${article.date} &nbsp;|&nbsp; <span style="background:#f0f2f5; padding:3px 10px; border-radius:20px;">${article.category}</span>`;
    const imgDiv = document.getElementById("articleImg");
    imgDiv.style.backgroundImage = `url('${article.img}')`;
    document.getElementById("articleFullText").innerHTML = article.fullText;
    modal.style.display = "flex";
}

// Закрытие модального окна
function closeArticleModal() {
    const modal = document.getElementById("articleModal");
    if (modal) modal.style.display = "none";
}

// Запуск при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM загружен, запускаем renderBlog()");
    renderBlog();
    
    const modal = document.getElementById("articleModal");
    if (modal) {
        document.querySelector('#articleModal .close-modal')?.addEventListener('click', closeArticleModal);
        document.getElementById("closeArticleBtn")?.addEventListener('click', closeArticleModal);
        window.addEventListener('click', (e) => {
            if (e.target === modal) closeArticleModal();
        });
    }
});