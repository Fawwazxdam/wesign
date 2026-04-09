<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  PenTool,
  User,
  Mail,
  Phone,
  Building2,
  Clock,
  MapPin,
  Loader2,
  ArrowLeft,
} from "lucide-vue-next";
import QrcodeVue from "qrcode.vue";
import { eventsApi } from "@/api/modules/event";
import { handleApiError } from "@/api/utils/error-handler";
import { useToast } from "@/api/composables/useToast";

const route = useRoute();
const router = useRouter();
const { showError } = useToast();

const isLoading = ref(true);
const apiError = ref(null);
const participant = ref(null);

const qrCode = route.params.qr_code;

const qrOptions = {
  size: 256,
  level: "M",
  renderEngine: "canvas",
  backgroundColor: "#ffffff",
  foregroundColor: "#000000",
};

const formatDate = (dateString) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const formatTime = (dateString) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const fetchTicket = async () => {
  isLoading.value = true;
  apiError.value = null;

  try {
    const response = await eventsApi.getTicketByQrCode(qrCode);
    participant.value = response.data.data || response.data;
  } catch (error) {
    console.error("Error fetching ticket:", error);
    apiError.value = handleApiError(error);
    showError("Tiket tidak ditemukan");
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchTicket();
});
</script>

<template>
  <section
    class="w-full min-h-screen bg-linear-to-br from-teal-600 to-teal-800 flex items-center justify-center px-4 py-12"
  >
    <div class="w-full">
      <!-- Loading State -->
      <div
        v-if="isLoading"
        class="flex items-center justify-center py-12 lg:py-24"
      >
        <div class="text-center">
          <Loader2
            class="h-8 w-8 lg:h-12 lg:w-12 text-white animate-spin mx-auto mb-4"
          />
          <span class="text-white text-lg lg:text-xl">Memuat tikett...</span>
        </div>
      </div>

      <!-- Error State -->
      <div
        v-else-if="apiError && !participant"
        class="mx-auto bg-red-50 border border-red-200 rounded-2xl shadow-2xl p-8"
      >
        <div class="text-center">
          <div class="p-4 bg-red-100 rounded-full inline-block mb-4">
            <svg
              class="h-8 w-8 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h2 class="text-xl font-bold text-red-900 mb-2">Terjadi Kesalahan</h2>
          <p class="text-red-700 mb-6">{{ apiError }}</p>
          <button
            @click="router.push('/')"
            class="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>

      <!-- Ticket -->
      <div v-else-if="participant" class="w-full max-w-7xl mx-auto">
        <!-- Back Button -->
        <div class="mb-6">
          <button
            @click="router.push('/')"
            class="inline-flex items-center gap-2 text-teal-100 hover:text-white transition"
          >
            <ArrowLeft class="h-5 w-5" />
            Kembali ke Beranda
          </button>
        </div>

        <!-- Header -->
        <div class="text-center mb-8">
          <a href="/" class="inline-flex items-center gap-2 text-white mb-6">
            <PenTool class="h-10 w-10" />
            <span class="text-2xl lg:text-3xl font-bold">WeSign</span>
          </a>
          <h1 class="text-3xl lg:text-4xl font-bold text-white mb-2">
            Tiket Peserta
          </h1>
          <p class="text-lg lg:text-xl text-teal-100">
            Simpan tiket ini untuk check-in
          </p>
        </div>

        <!-- Main Content Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <!-- Left: QR Code Card -->
          <div class="order-1 lg:order-1">
            <div class="bg-white rounded-2xl shadow-2xl p-6 lg:p-8">
              <div class="text-center">
                <!-- QR Code -->
                <div class="mb-6">
                  <div
                    class="inline-block p-4 bg-white rounded-xl border-2 border-gray-200"
                  >
                    <qrcode-vue
                      v-if="participant?.qr_code"
                      :value="participant.qr_code"
                      :size="qrOptions.size"
                      :level="qrOptions.level"
                      :render-engine="qrOptions.renderEngine"
                      :background-color="qrOptions.backgroundColor"
                      :foreground-color="qrOptions.foregroundColor"
                    />
                    <div
                      v-else
                      class="w-48 h-48 lg:w-64 lg:h-64 flex items-center justify-center"
                    >
                      <Loader2 class="h-12 w-12 text-gray-400 animate-spin" />
                    </div>
                  </div>
                </div>

                <!-- QR Code Value -->
                <div class="bg-gray-100 rounded-lg p-3 mb-6">
                  <p class="text-sm text-gray-500 mb-1">Kode Tiket</p>
                  <p class="font-mono font-bold text-lg text-gray-900">
                    {{ participant.qr_code }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Right: Info Card -->
          <div class="order-1 lg:order-2">
            <div
              class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/20"
            >
              <div class="text-center lg:text-left">
                <div class="space-y-4">
                  <!-- Name -->
                  <div class="flex items-center gap-4 text-white">
                    <div class="p-2 bg-white/20 rounded-lg">
                      <User class="h-5 w-5" />
                    </div>
                    <div class="text-left">
                      <p class="text-sm text-teal-100">Nama Peserta</p>
                      <h2 class="font-bold">{{ participant.name }}</h2>
                    </div>
                  </div>

                  <!-- Details -->
                  <!-- Email -->
                  <div class="flex items-center gap-4 text-white">
                    <div class="p-2 bg-white/20 rounded-lg">
                      <Mail class="h-5 w-5" />
                    </div>
                    <div class="text-left">
                      <p class="text-sm text-teal-100">Email</p>
                      <p class="font-semibold">{{ participant.email }}</p>
                    </div>
                  </div>

                  <!-- Phone -->
                  <div
                    v-if="participant.phone"
                    class="flex items-center gap-4 text-white"
                  >
                    <div class="p-2 bg-white/20 rounded-lg">
                      <Phone class="h-5 w-5" />
                    </div>
                    <div class="text-left">
                      <p class="text-sm text-teal-100">Telepon</p>
                      <p class="font-semibold">{{ participant.phone }}</p>
                    </div>
                  </div>

                  <!-- Institution -->
                  <div
                    v-if="participant.institution"
                    class="flex items-center gap-4 text-white"
                  >
                    <div class="p-2 bg-white/20 rounded-lg">
                      <Building2 class="h-5 w-5" />
                    </div>
                    <div class="text-left">
                      <p class="text-sm text-teal-100">Institusi</p>
                      <p class="font-semibold">{{ participant.institution }}</p>
                    </div>
                  </div>
                </div>

                <!-- Event Info -->
                <div
                  v-if="participant.event"
                  class="mt-8 pt-6 border-t border-white/20"
                >
                  <h3 class="text-lg font-semibold text-white mb-4">
                    Detail Acara
                  </h3>
                  <div class="space-y-4">
                    <div class="flex items-center gap-4 text-white">
                      <div class="p-2 bg-white/20 rounded-lg">
                        <PenTool class="h-5 w-5" />
                      </div>
                      <div class="text-left">
                        <p class="text-sm text-teal-100">Acara</p>
                        <p class="font-semibold">
                          {{ participant.event.title }}
                        </p>
                      </div>
                    </div>

                    <div class="flex items-center gap-4 text-white">
                      <div class="p-2 bg-white/20 rounded-lg">
                        <Clock class="h-5 w-5" />
                      </div>
                      <div class="text-left">
                        <p class="text-sm text-teal-100">Tanggal & Waktu</p>
                        <p class="font-semibold">
                          {{ formatDate(participant.event.date) }} pukul
                          {{ formatTime(participant.event.date) }} WIB
                        </p>
                      </div>
                    </div>

                    <div
                      v-if="participant.event.location"
                      class="flex items-center gap-4 text-white"
                    >
                      <div class="p-2 bg-white/20 rounded-lg">
                        <MapPin class="h-5 w-5" />
                      </div>
                      <div class="text-left">
                        <p class="text-sm text-teal-100">Lokasi</p>
                        <p class="font-semibold">
                          {{ participant.event.location }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
