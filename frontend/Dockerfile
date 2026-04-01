# Gunakan Node.js Alpine (ringan)
FROM node:22-alpine

WORKDIR /app

# Copy manifest package
COPY wesign/package.json ./wesign/
COPY wesign/package-lock.json ./wesign/

# Install dependencies
WORKDIR /app/wesign
RUN npm install

# Copy semua file project
COPY wesign/ .

# Port default Vite
EXPOSE 5173

# Jalankan Vite dengan flag --host agar bisa diakses dari luar container
CMD ["npm", "run", "dev", "--", "--host"]
