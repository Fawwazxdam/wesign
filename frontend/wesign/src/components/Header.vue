<script setup lang="ts">
import { PenTool } from "lucide-vue-next";
</script>

<template>
  <header class="bg-white shadow-md sticky top-0 z-50">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <div class="flex-1 md:flex md:items-center md:gap-12">
          <a class="flex items-center gap-2 text-teal-600" href="/">
            <PenTool class="h-8 w-8" />
            <span class="text-xl font-bold">WeSign</span>
          </a>
        </div>

        <div class="md:flex md:items-center md:gap-12">
          <nav aria-label="Global" class="hidden md:block">
            <ul class="flex items-center gap-6 text-sm">
              <li>
                <a
                  class="text-gray-700 transition hover:text-teal-600 font-medium"
                  href="/"
                >
                  Home
                </a>
              </li>

              <li>
                <a
                  class="text-gray-500 transition hover:text-teal-600"
                  href="#features"
                >
                  Fitur
                </a>
              </li>

              <li>
                <a
                  class="text-gray-500 transition hover:text-teal-600"
                  href="/events"
                >
                  Acara
                </a>
              </li>
            </ul>
          </nav>

          <div class="flex items-center gap-3">
            <a
              href="/login"
              class="hidden sm:inline-flex rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-teal-700"
            >
              Masuk
            </a>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
