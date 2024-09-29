FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run prisma:gen

RUN npm run prisma:migrate

EXPOSE 3000

CMD ["npm", "run", "start:dev"]