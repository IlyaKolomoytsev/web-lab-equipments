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

# Строим проект
RUN npm run build

# Шаг 2: Используем официальный образ Nginx для обслуживания статики
FROM nginx:alpine

# Копируем собранный билд из первого шага в папку Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Открываем порт 80 для сервера
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]
