FROM node:8-alpine

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

CMD [ "node", "index.js" ]
