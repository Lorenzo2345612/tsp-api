# Etapa 1: Construcción
FROM node AS builder

# Configura el directorio de trabajo
WORKDIR /app

# Copia los archivos de configuración y las dependencias
COPY package*.json ./

# Instala solo las dependencias necesarias para la construcción
RUN npm install --legacy-peer-deps

# Copia el resto de los archivos de la aplicación
COPY . .

# Compila el proyecto
RUN npm run build

# Etapa 2: Producción
FROM node AS runner

# Establece el directorio de trabajo
WORKDIR /app

# Copia solo el resultado de la compilación de la etapa anterior
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Instala únicamente las dependencias de producción
RUN npm install --only=production --legacy-peer-deps

# Expone el puerto por el que se servirá la aplicación
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["node", "dist/main"]

