FROM node:16.12-slim 

WORKDIR /home/nodejs-backend

COPY ./package.json .
COPY ./package-lock.json .
COPY ./app.js .

RUN npm install
