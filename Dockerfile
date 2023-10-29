FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN rm -rf ./dist/

RUN npm run build

CMD [ "npm", "run", "start:dev" ]