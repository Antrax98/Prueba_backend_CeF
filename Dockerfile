FROM node:18
RUN apt-get update && apt-get install -y nano
WORKDIR /CeF_backend
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . .
EXPOSE 4000
CMD ["node", "index.js"]