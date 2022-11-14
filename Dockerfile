FROM node:16-alpine

WORKDIR /app

COPY package.json .

RUN npm install 

COPY . . 

EXPOSE 3100

CMD [ "node", "app/server.js" ]