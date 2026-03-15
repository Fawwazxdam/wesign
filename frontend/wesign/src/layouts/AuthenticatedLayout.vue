<script setup lang="ts">
import { ref } from "vue";
import {
  PenTool,
  Home,
  FileText,
  Calendar,
  Settings,
  LogOut,
  Menu,
  X,
  User,
  ChevronDown,
} from "lucide-vue-next";

const isSidebarOpen = ref(true);
const isProfileDropdownOpen = ref(false);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const toggleProfileDropdown = () => {
  isProfileDropdownOpen.value = !isProfileDropdownOpen.value;
};

const navigationItems = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Acara", href: "/event", icon: Calendar },
  { name: "Pengaturan", href: "/settings", icon: Settings },
];
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <!-- Navbar -->
    <header class="bg-white shadow-md sticky top-0 z-50">
      <div class="mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <!-- Left: Menu Toggle & Logo -->
          <div class="flex items-center gap-4">
            <button
              @click="toggleSidebar"
              class="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition lg:hidden"
            >
              <Menu v-if="!isSidebarOpen" class="h-6 w-6" />
              <X v-else class="h-6 w-6" />
            </button>

            <a class="flex items-center gap-2 text-teal-600" href="/dashboard">
              <PenTool class="h-8 w-8" />
              <span class="text-xl font-bold">WeSign</span>
            </a>
          </div>

          <!-- Right: Profile Dropdown -->
          <div class="relative">
            <button
              @click="toggleProfileDropdown"
              class="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition"
            >
              <div
                class="h-8 w-8 rounded-full bg-teal-100 flex items-center justify-center"
              >
                <User class="h-5 w-5 text-teal-600" />
              </div>
              <span class="hidden sm:block text-sm font-medium text-gray-700"
                >John Doe</span
              >
              <ChevronDown
                :class="[
                  'h-4 w-4 text-gray-500 transition-transform',
                  isProfileDropdownOpen ? 'rotate-180' : '',
                ]"
              />
            </button>

            <!-- Dropdown Menu -->
            <div
              v-if="isProfileDropdownOpen"
              class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50"
            >
              <a
                href="/profile"
                class="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <User class="h-4 w-4" />
                Profil
              </a>
              <a
                href="/settings"
                class="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <Settings class="h-4 w-4" />
                Pengaturan
              </a>
              <hr class="my-1 border-gray-100" />
              <a
                href="/login"
                class="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <LogOut class="h-4 w-4" />
                Keluar
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content Area with Sidebar -->
    <div class="flex flex-1">
      <!-- Sidebar Overlay (Mobile) -->
      <div
        v-if="isSidebarOpen"
        @click="toggleSidebar"
        class="fixed inset-0 bg-black/50 z-30 lg:hidden"
      ></div>

      <!-- Sidebar -->
      <aside
        :class="[
          'fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:transform-none',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        ]"
      >
        <div class="flex flex-col h-full pt-16 lg:pt-0">
          <!-- Sidebar Header (Mobile) -->
          <div
            class="flex items-center justify-between p-4 border-b border-gray-100 lg:hidden"
          >
            <span class="text-lg font-semibold text-gray-800">Menu</span>
            <button
              @click="toggleSidebar"
              class="p-2 rounded-lg text-gray-500 hover:bg-gray-100"
            >
              <X class="h-5 w-5" />
            </button>
          </div>

          <!-- Navigation -->
          <nav class="flex-1 p-4 space-y-1">
            <ul class="space-y-1">
              <li v-for="item in navigationItems" :key="item.name">
                <a
                  :href="item.href"
                  class="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-teal-50 hover:text-teal-600 transition font-medium"
                >
                  <component :is="item.icon" class="h-5 w-5" />
                  {{ item.name }}
                </a>
              </li>
            </ul>
          </nav>

          <!-- Sidebar Footer -->
          <div class="p-4 border-t border-gray-100">
            <div
              class="bg-linear-to-r from-teal-500 to-teal-600 rounded-lg p-4 text-white"
            >
              <h3 class="font-semibold text-sm">Butuh Bantuan?</h3>
              <p class="text-xs text-teal-100 mt-1">
                Hubungi tim support kami untuk bantuan.
              </p>
              <button
                class="mt-3 w-full bg-white text-teal-600 text-sm font-medium py-2 rounded-lg hover:bg-teal-50 transition"
              >
                Hubungi Support
              </button>
            </div>
          </div>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 p-6 lg:p-8 overflow-auto">
        <slot />
      </main>
    </div>
  </div>
</template>
