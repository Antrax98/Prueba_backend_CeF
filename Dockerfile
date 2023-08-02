FROM ubuntu:focal

RUN apt-get update && apt-get -y upgrade

RUN apt-get install -y curl

RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash

RUN apt-get install -y nodejs

WORKDIR /CeF_backend

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 4000

ENTRYPOINT ["node", "index.js"]