#Usamos la imagen base de nodejs 18.15.0
FROM node:18.15.0

#Actaulizamos los repos e instala el editor nano
RUN apt-get update && apt-get install -y nano

#Establecemos el directorio de trabajo
WORKDIR /CeF_backend

COPY package.json ./

#Instalamos las dependencias de node para el proyecto
RUN npm install

#Copiamos todos los archivos y directorios del proyecto en "/CeF_backend"
COPY . .

#Exponemos el puerto 4000
EXPOSE 4000

#Definimos el comando que se ejeecutará cuando el contenedor este corriendo
CMD ["node", "index.js"]