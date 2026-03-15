<script setup lang="ts">
import { PenTool, User, Mail, Lock, ArrowRight, CalendarCheck, Users, CheckCircle } from "lucide-vue-next";
</script>

<template>
  <section class="min-h-screen bg-linear-to-br from-teal-600 to-teal-800 flex items-center justify-center px-4 py-12">
    <div class="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      
      <!-- Left Side - Info -->
      <div class="hidden lg:block text-white px-8">
        <a href="/" class="inline-flex items-center gap-2 mb-8">
          <PenTool class="h-10 w-10" />
          <span class="text-2xl font-bold">WeSign</span>
        </a>
        
        <h2 class="text-4xl font-bold leading-tight">
          Buat Eventmu,<br>
          <span class="text-teal-200">Kelola Tamumu</span>
        </h2>
        <p class="mt-4 text-lg text-teal-100">
          Platform registrasi tamu terbaik untuk acara Anda. Daftar sekarang dan nikmati kemudahan mengelola kehadiran.
        </p>

        <!-- Benefits -->
        <div class="mt-8 space-y-4">
          <div class="flex items-center gap-3">
            <div class="shrink-0 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <CalendarCheck class="h-5 w-5" />
            </div>
            <span class="text-teal-50">Buat acara dalam hitungan menit</span>
          </div>
          <div class="flex items-center gap-3">
            <div class="shrink-0 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <Users class="h-5 w-5" />
            </div>
            <span class="text-teal-50">Kelola ratusan tamu dengan mudah</span>
          </div>
          <div class="flex items-center gap-3">
            <div class="shrink-0 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <CheckCircle class="h-5 w-5" />
            </div>
            <span class="text-teal-50">Check-in cepat dengan QR Code</span>
          </div>
        </div>
      </div>

      <!-- Right Side - Register Form -->
      <div class="w-full max-w-md mx-auto lg:mx-0">
        <!-- Mobile Logo -->
        <div class="text-center mb-6 lg:hidden">
          <a href="/" class="inline-flex items-center gap-2 text-white">
            <PenTool class="h-10 w-10" />
            <span class="text-2xl font-bold">WeSign</span>
          </a>
        </div>

        <!-- Register Card -->
        <div class="bg-white rounded-2xl shadow-2xl p-8">
          <div class="text-center mb-6">
            <h1 class="text-2xl font-bold text-gray-900">Buat Akun Baru</h1>
            <p class="mt-1 text-sm text-gray-500">Daftar gratis dan mulai kelola acaramu</p>
          </div>

          <form class="space-y-5">
            <!-- Name Field -->
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
                Nama Lengkap
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User class="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autocomplete="name"
                  required
                  class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                  placeholder="Masukkan nama lengkap"
                />
              </div>
            </div>

            <!-- Email Field -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                Alamat Email
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail class="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autocomplete="email"
                  required
                  class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                  placeholder="nama@email.com"
                />
              </div>
            </div>

            <!-- Password Field -->
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
                Kata Sandi
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock class="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autocomplete="new-password"
                  required
                  class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                  placeholder="Minimal 8 karakter"
                />
              </div>
            </div>

            <!-- Confirm Password Field -->
            <div>
              <label for="confirm-password" class="block text-sm font-medium text-gray-700 mb-2">
                Konfirmasi Kata Sandi
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock class="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  autocomplete="new-password"
                  required
                  class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                  placeholder="Ulangi kata sandi"
                />
              </div>
            </div>

            <!-- Terms -->
            <div class="flex items-start">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                class="h-4 w-4 mt-0.5 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
              />
              <label for="terms" class="ml-2 block text-sm text-gray-600">
                Saya setuju dengan 
                <a href="/terms" class="text-teal-600 hover:text-teal-500 font-medium">Syarat & Ketentuan</a> 
                dan 
                <a href="/privacy" class="text-teal-600 hover:text-teal-500 font-medium">Kebijakan Privasi</a>
              </label>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              class="w-full flex items-center justify-center gap-2 bg-teal-600 text-white py-3 px-4 rounded-lg font-semibold shadow-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition"
            >
              Daftar Sekarang
              <ArrowRight class="h-5 w-5" />
            </button>
          </form>

          <!-- Divider -->
          <div class="my-6 flex items-center">
            <div class="flex-1 border-t border-gray-300"></div>
            <span class="px-4 text-sm text-gray-500">atau</span>
            <div class="flex-1 border-t border-gray-300"></div>
          </div>

          <!-- Social Register -->
          <div class="space-y-3">
            <button
              type="button"
              class="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition"
            >
              <svg class="h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Daftar dengan Google
            </button>
          </div>

          <!-- Login Link -->
          <p class="mt-6 text-center text-sm text-gray-600">
            Sudah punya akun?
            <a href="/login" class="font-semibold text-teal-600 hover:text-teal-500 transition">
              Masuk di sini
            </a>
          </p>
        </div>

        <!-- Back to Home -->
        <p class="mt-6 text-center">
          <a href="/" class="text-sm text-teal-100 hover:text-white transition">
            &larr; Kembali ke Beranda
          </a>
        </p>
      </div>
    </div>
  </section>
</template>