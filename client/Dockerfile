# build stage
FROM node:lts-alpine as build-stage

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./

RUN npm install --silent

RUN npm install react-scripts@3.0.1 -g --silent

COPY . .

EXPOSE 80

CMD ["npm", "start"]
