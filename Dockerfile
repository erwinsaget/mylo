FROM node:lts-alpine

WORKDIR /usr/src/app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies
RUN npm install

COPY . .

# build app for production with minification
RUN npm run build

EXPOSE 3030

CMD [ "npm", "start" ]

