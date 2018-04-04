FROM node:8.6.0-alpine

WORKDIR /app
ADD package.json /app
RUN npm install

COPY . /app

CMD ["npm", "start"]
