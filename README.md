🚐 TravelTrucks — Camper Rental App
📌 Загальна інформація

TravelTrucks — це фронтенд вебзастосунок для компанії, яка займається орендою кемперів.
Проєкт реалізовано з використанням сучасного стеку: Next.js + TypeScript.

Основна мета — створити зручний інтерфейс для перегляду, фільтрації та бронювання кемперів.

🔗 Корисні посилання
📡 API: https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers
🎨 Figma макет: https://www.figma.com/design/I89F75zjlMlV0Ovs6ws1b4/Campers--Copy-?node-id=12105-658&t=5yMTLIW9sezl4JHv-0
🌐 Live Demo:https://travel-trucks-tau-weld.vercel.app/
📂 Repository: https://github.com/Alla-web/travel-trucks

🛠️ Технології
Next.js (App Router)
TypeScript
TanStack Query (React Query)
useInfiniteQuery — для пагінації
Swiper — галерея зображень
CSS Modules / Tailwind CSS (вкажи свій варіант)

📄 Сторінки застосунку
🏠 Home (/)
Банер із закликом до дії
Кнопка View Now → перехід до каталогу

📚 Catalog (/catalog)
Список кемперів (з API)
Фільтрація:
📍 Локація
🚐 Тип кузова
⛽ Тип двигуна
⚙️ Тип трансмісії
Пагінація:
Кнопка Load More
Довантаження по 4 елементи
Картка кемпера:
Основна інформація
Кнопка Show more → відкриває деталі в новій вкладці

🔍 Camper Details (/catalog/[camperId])
Повна інформація про кемпер
🖼️ Галерея (Swiper)
⭐ Відгуки (5-зіркова система)
📝 Форма бронювання
Надсилання на API
Нотифікація про успіх

⚙️ Функціонал
✅ Отримання даних із бекенду
✅ Серверна фільтрація (query params)
✅ Нескінченна пагінація (infinite scroll / Load More)
✅ Динамічні маршрути
✅ Форма бронювання з API
✅ Відгуки та рейтинги
✅ Галерея зображень

# Клонувати репозиторій

git clone https://github.com/your-username/traveltrucks.git

# Перейти в папку

cd traveltrucks

# Встановити залежності

npm install

# Запустити локально

npm run dev
