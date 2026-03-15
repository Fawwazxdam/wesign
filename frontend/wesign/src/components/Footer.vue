<script setup lang="ts">
import { PenTool } from "lucide-vue-next";
</script>

<template>
  <footer class="bg-gray-900 text-white">
    <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 gap-8 md:grid-cols-4">
        <!-- Brand -->
        <div class="md:col-span-2">
          <a class="flex items-center gap-2 text-teal-400" href="/">
            <PenTool class="h-8 w-8" />
            <span class="text-xl font-bold">WeSign</span>
          </a>
          <p class="mt-4 text-gray-400 max-w-md">
            Sistem registrasi tamu dan pengunjung acara yang modern, aman, dan efisien. 
            Solusi terbaik untuk mengelola kehadiran di acara Anda.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-sm font-semibold uppercase tracking-wider text-gray-400">
            Menu
          </h3>
          <ul class="mt-4 space-y-2">
            <li>
              <a href="/" class="text-gray-300 hover:text-teal-400 transition">Home</a>
            </li>
            <li>
              <a href="#features" class="text-gray-300 hover:text-teal-400 transition">Fitur</a>
            </li>
            <li>
              <a href="/events" class="text-gray-300 hover:text-teal-400 transition">Acara</a>
            </li>
            <li>
              <a href="/register" class="text-gray-300 hover:text-teal-400 transition">Daftar</a>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h3 class="text-sm font-semibold uppercase tracking-wider text-gray-400">
            Kontak
          </h3>
          <ul class="mt-4 space-y-2">
            <li class="text-gray-300">
              <span class="font-medium">Email:</span><br>
              <a href="mailto:info@wesign.id" class="hover:text-teal-400 transition">info@wesign.id</a>
            </li>
            <li class="text-gray-300">
              <span class="font-medium">Telepon:</span><br>
              <a href="tel:+6281234567890" class="hover:text-teal-400 transition">+62 812 3456 7890</a>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-8 border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
        <p>&copy; 2026 WeSign. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>
