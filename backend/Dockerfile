FROM node:20 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN rm -rf node_modules package-lock.json && npm install
RUN npm run build

CMD ["npm", "run", "start:prod"] 