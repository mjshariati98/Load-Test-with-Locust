FROM node:16.12-slim 

WORKDIR /home/frontend

COPY ./package.json .
COPY ./package-lock.json .
COPY ./public/ ./public/
COPY ./src/ ./src/
COPY ./tsconfig.json .
COPY ./.env .
COPY ./.prettierignore .
COPY ./.prettierrc.json .

RUN npm install
