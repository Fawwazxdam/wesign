# Gunakan Node.js Alpine (ringan)
FROM node:22-alpine

WORKDIR /src

# Copy manifest package
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy semua file project
COPY . .

# Port default Vite
EXPOSE 5173

# Jalankan Vite dengan flag --host agar bisa diakses dari luar container
CMD ["npm", "run", "dev", "--", "--host"]
