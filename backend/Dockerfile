FROM node:18

RUN node -v

WORKDIR /backend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5001

CMD ["npm", "run", "dev"]