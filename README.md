# WeSign - Event Attendance Management System

<p align="center">
  <img src="https://img.shields.io/badge/Laravel-11.x-blue?style=flat&logo=laravel" alt="Laravel">
  <img src="https://img.shields.io/badge/Vue-3.x-green?style=flat&logo=vue.js" alt="Vue.js">
  <img src="https://img.shields.io/badge/Docker-Ready-blue?style=flat&logo=docker" alt="Docker">
</p>

## 📋 Deskripsi Project

WeSign adalah aplikasi manajemen kehadiran acara (event attendance management system) yang dibangun dengan:

| Komponen | Technology | Deskripsi |
|----------|------------|------------|
| **Backend** | Laravel 11 + PHP 8.3 | RESTful API untuk manajemen data |
| **Frontend** | Vue.js 3 + Vite | User Interface modern |
| **Database** | MySQL 8.0 | Penyimpanan data relasional |
| **DevOps** | Docker + Compose | Containerisasi untuk development |

### Fitur Utama

- ✅ Manajemen Event (CRUD)
- ✅ Manajemen Peserta
- ✅ Sistem Check-in Peserta
- ✅ Dashboard Admin
- ✅ Authentication (Login/Register)

---

## 🚀 Cara Menjalankan (Docker - Recommendered)

### Prerequisites

- [Docker](https://www.docker.com/) terinstall
- [Docker Compose](https://docs.docker.com/compose/) terinstall

### Langkah-langkah

```bash
# 1. Clone repository dan masuk ke directory
cd wesign

# 2. Buat file konfigurasi environment
echo 'DB_HOST=mysql_db
DB_PORT=3306
DB_DATABASE=wesign
DB_USERNAME=root
DB_PASSWORD=toor
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000
VITE_API_URL=http://localhost:8000' > docker/.env

# 3. Build dan jalankan container
docker-compose up -d --build

# 4. Install dependencies Laravel
docker-compose exec backend composer install
docker-compose exec backend php artisan key:generate
docker-compose exec backend php artisan migrate

# 5. Install dependencies Frontend (jika diperlukan)
docker-compose exec frontend npm install
```

### Akses Aplikasi

| Service | URL | Deskripsi |
|---------|-----|------------|
| **Frontend** | http://localhost:5173 | Vue.js App |
| **Backend API** | http://localhost:8000 | Laravel API |
| **MySQL** | localhost:3306* | Database (via port forwarding jika diperlukan) |

> *Untuk akses MySQL dari host, tambahkan port mapping di docker-compose.yml

### Perintah Docker Berguna

```bash
# Lihat status container
docker-compose ps

# Lihat logs
docker-compose logs -f        # Semua service
docker-compose logs -f backend # Hanya backend

# Stop container
docker-compose down

# Rebuild tanpa cache
docker-compose build --no-cache

# Eksekusi command di container
docker-compose exec backend bash    # Masuk ke container backend
docker-compose exec frontend sh     # Masuk ke container frontend
docker-compose exec mysql_db mysql -u root -p  # Masuk ke MySQL
```

---

## 🏗️ Struktur Project

```
wesign/
├── docker/
│   ├── .env              # Environment variables untuk Docker
│   └── db_data/          # Volume storage untuk MySQL
├── docker-compose.yml    # Konfigurasi orchestration
├── backend/
│   └── wesign-api/       # Laravel Application
│       ├── app/          # Application code (Controllers, Models, Services)
│       ├── config/       # Laravel configuration
│       ├── database/     # Migrations & Seeders
│       ├── routes/       # API routes
│       └── Dockerfile    # Backend container definition
├── frontend/
│   ├── Dockerfile        # Frontend container definition
│   └── wesign/           # Vue.js Application
│       ├── src/
│       │   ├── api/      # API client & interceptors
│       │   ├── components/ # Vue components
│       │   ├── layouts/  # Page layouts
│       │   ├── pages/    # Page components
│       │   └── router/   # Vue Router config
│       └── package.json
└── README.md
```

---

## 🔧 Konfigurasi Database

### Docker Environment Variables

File: `docker/.env`

```env
DB_HOST=mysql_db        # Hostname service MySQL di docker-compose
DB_PORT=3306            # Port default MySQL
DB_DATABASE=wesign      # Nama database
DB_USERNAME=root        # Username MySQL
DB_PASSWORD=toor        # Password root
```

### Konfigurasi Laravel (.env)

Backend membaca konfigurasi dari `backend/wesign-api/.env`:

```env
DB_CONNECTION=mysql
DB_HOST=mysql_db        # Sama dengan service name di docker-compose
DB_PORT=3306
DB_DATABASE=wesign
DB_USERNAME=root
DB_PASSWORD=toor
```

### HealthCheck Configuration

MySQL memiliki healthcheck untuk memastikan database ready sebelum backend start:

```yaml
# docker-compose.yml
mysql_db:
  healthcheck:
    test: ["CMD", "mysqladmin", "ping", "-h", "localhost", "-u", "root", "-p${DB_PASSWORD:-toor}"]
    interval: 10s
    timeout: 5s
    retries: 5
    start_period: 30s

backend:
  depends_on:
    mysql_db:
      condition: service_healthy  # Tunggu sampai healthy!
```

---

## 📝 Cara development lokal (Tanpa Docker)

### Backend (Laravel)

```bash
cd backend/wesign-api

# Install dependencies
composer install

# Copy environment file
cp .env.example .env

# Generate key
php artisan key:generate

# Setup database (pastikan MySQL lokal sudah running)
# Edit .env sesuai konfigurasi MySQL lokal
php artisan migrate
php artisan serve
```

### Frontend (Vue.js)

```bash
cd frontend/wesign

# Install dependencies
npm install

# Run development server
npm run dev
```

---

## 🔐 Keamanan

1. **Credentials**: Semua credentials disimpan di `docker/.env` - JANGAN di-commit ke git!
2. **.gitignore**: File `.env` sudah di-exclude dari version control
3. **Docker Volumes**: Data MySQL tersimpan di `docker/db_data` - persistent antar container restart

---

## 📚 Teknologi yang Digunakan

### Backend
- Laravel 11
- PHP 8.3
- MySQL 8.0
- Laravel Sanctum (Authentication)

### Frontend
- Vue.js 3 (Composition API)
- Vite
- Axios
- Vue Router

### DevOps
- Docker
- Docker Compose

---

## 📄 License

Project ini adalah open source dan tersedia di bawah [MIT License](LICENSE).

---

## 🙋‍♀️ Pertanyaan?

Jika ada pertanyaan atau masalah, buat issue di repository atau hubungi maintainer.