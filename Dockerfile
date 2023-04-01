FROM node:19

WORKDIR /app

COPY package*.json ./
RUN npm cache clean --force
RUN npm install
COPY . .
COPY src/config/*.js ./config/

EXPOSE 3000

# CMD npm start
CMD [ "node", "src/server.js" ]