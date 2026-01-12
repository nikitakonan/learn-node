FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci
COPY tsconfig.json ./
COPY types ./types
COPY src ./src
COPY public ./public
COPY views ./views
RUN npm run build:server
RUN npm prune --production
EXPOSE 7777

CMD ["npm", "run", "prod"]
