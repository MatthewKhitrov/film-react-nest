# Этап сборки
FROM node:20-alpine AS builder

WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем все зависимости (включая dev-зависимости)
RUN npm ci

# Копируем исходные файлы
COPY . .

# Собираем проект
RUN npm run build

# Этап запуска (production)
FROM node:20-alpine AS production

WORKDIR /app

# Копируем package.json для production зависимостей
COPY package*.json ./

# Устанавливаем только production зависимости
RUN npm ci --only=production

# Копируем собранные файлы из этапа builder
COPY --from=builder /app/dist ./dist
# Копируем node_modules с production зависимостями
COPY --from=builder /app/node_modules ./node_modules

# Стартовая команда
CMD ["node", "dist/main.js"]