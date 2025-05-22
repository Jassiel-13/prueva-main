# Usar una imagen base de Node.js para construir el proyecto
FROM node:18 AS build

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de package.json y package-lock.json
COPY frontend/package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el código fuente y construir la aplicación
COPY frontend/ .
RUN npm run build

# Usar una imagen de Nginx para servir la app construida
FROM nginx:alpine

# Copiar los archivos estáticos de React desde el contenedor build a Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Exponer el puerto 80 para acceder a la aplicación
EXPOSE 80

# Iniciar el servidor Nginx
CMD ["nginx", "-g", "daemon off;"]
