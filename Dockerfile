FROM node:18

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm config set registry https://registry.npmmirror.com

RUN npm install --network-timeout=60000

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
