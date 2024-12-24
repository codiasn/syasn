# Utiliser une image de base officielle Node.js Alpine
FROM node:18

# Définir le répertoire de travail
WORKDIR /app

# Copier package.json et package-lock.json
COPY package.json ./

# Installer les dépendances
RUN yarn install

# Copier tout le reste du code
COPY . .

# Construire l'application pour la production
RUN yarn build

# Exposer le port que l'application utilisera (utilisé à partir du fichier .env)
EXPOSE ${PORT}

# Lancer l'application
CMD ["yarn", "start"]
