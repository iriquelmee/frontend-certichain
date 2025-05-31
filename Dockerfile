# Etapa 1: Construcción de la aplicación Angular
FROM node:22 AS build

# Configura el directorio de trabajo
WORKDIR /app

# Copia los archivos necesarios para instalar las dependencias
COPY package.json package-lock.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY . .

# Compila la aplicación para producción
RUN npm run build --configuration=production

# Etapa 2: Servir la aplicación con nginx
FROM nginx:stable-alpine

# Copia los archivos compilados de Angular desde la etapa anterior
COPY --from=build /app/dist/certichain/browser /usr/share/nginx/html

# Sobreescribiendo index.html de nginx
COPY --from=build /app/dist/certichain/browser/index.html /usr/share/nginx/html/index.html

# Reemplaza el archivo de configuración de nginx, si es necesario
COPY proxynginx.conf /usr/share/nginx/conf.d/default.conf

#nginx configuracion reemplazando archivo de rial
RUN mv /usr/share/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf

# Reemplaza el archivo de configuración de nginx, si es necesario
COPY nginx.conf /usr/share/nginx/conf.d/nginx.conf

#nginx configuracion reemplazando archivo de rial
RUN mv /usr/share/nginx/conf.d/nginx.conf /etc/nginx/nginx.conf

# Expone el puerto 80 para servir la aplicación
EXPOSE 80

# Comando por defecto para iniciar nginx
CMD ["nginx", "-g", "daemon off;"]