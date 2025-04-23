FROM node:23-alpine

WORKDIR /frontend

COPY package*.json ./

RUN npm install

COPY .env /frontend/.env
COPY public/ /frontend/public/
COPY src/ /frontend/src/

EXPOSE 3000

CMD ["npm", "start"]
