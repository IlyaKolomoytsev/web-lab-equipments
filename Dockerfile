# Шаг 1: Используем официальный образ Node.js для построения приложения
FROM node:22 AS build

# Устанавливаем рабочую директорию в контейнере
WORKDIR /app

# Копируем package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы проекта
COPY . .

# Строим проект (предполагается, что ты используешь React)
RUN npm run build

# Шаг 2: Создаём образ с бэкендом

FROM node:22 AS backend

# Устанавливаем рабочую директорию для бэкенда
WORKDIR /backend

# Копируем package.json и package-lock.json для установки зависимостей
COPY backend/package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы бэкенда
COPY backend ./

# Запускаем сервер Node.js на порту 5000
EXPOSE 5000
CMD ["npm", "run", "start"]

# Шаг 3: Настройка Nginx для проксирования запросов и обслуживания статики

FROM nginx:alpine

# Копируем собранный билд из первого шага в папку Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Настроим конфигурацию Nginx для проксирования
COPY nginx.conf /etc/nginx/nginx.conf

# Открываем порт 80 для сервера
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]
