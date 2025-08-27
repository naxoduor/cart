FROM node:16.14.2
RUN mkdir -p /app
WORKDIR /app

COPY package*.json ./

RUN npm config set strict-ssl false
RUN npm config get proxy
RUN npm config rm proxy
RUN npm config rm https-proxy

RUN npm install
RUN npm install --save react@^16.8.0 react-dom@^16.8.0

COPY . .

EXPOSE 3000

CMD [ "npm", "start"]