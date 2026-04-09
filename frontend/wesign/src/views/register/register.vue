<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
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
} from "lucide-vue-next";
import { eventsApi } from "@/api/modules/event";
import { handleApiError } from "@/api/utils/error-handler";
import { useToast } from "@/api/composables/useToast";

const route = useRoute();
const router = useRouter();
const { showSuccess, showError } = useToast();

const isLoading = ref(true);
const isSubmitting = ref(false);
const apiError = ref(null);
const event = ref(null);

const eventId = route.params.id;

const formData = reactive({
  name: "",
  email: "",
  phone: "",
  institution: "",
});

const formErrors = reactive({
  name: "",
  email: "",
  phone: "",
  institution: "",
});

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

const fetchEventDetails = async () => {
  isLoading.value = true;
  apiError.value = null;
  try {
    const response = await eventsApi.getById(eventId);
    event.value = response.data.data || response;
  } catch (error) {
    console.error("Error fetching event details:", error);
    apiError.value = handleApiError(error);
  } finally {
    isLoading.value = false;
  }
};

const validateForm = () => {
  let isValid = true;
  formErrors.name = "";
  formErrors.email = "";
  formErrors.phone = "";
  formErrors.institution = "";

  if (!formData.name.trim()) {
    formErrors.name = "Nama wajib diisi";
    isValid = false;
  }

  if (!formData.email.trim()) {
    formErrors.email = "Email wajib diisi";
    isValid = false;
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    formErrors.email = "Format email tidak valid";
    isValid = false;
  }

  return isValid;
};

const submitForm = async () => {
  if (!validateForm()) return;

  isSubmitting.value = true;
  apiError.value = null;

  try {
    const response = await eventsApi.registerParticipant(eventId, formData);
    const participantData = response.data?.data || response.data;
    showSuccess("Pendaftaran berhasil!");
    router.push(`/tickets/${participantData.qr_code}`);
  } catch (error) {
    console.error("Error registering participant:", error);
    apiError.value = handleApiError(error);
    showError("Gagal mendaftar. Silakan coba lagi.");
  } finally {
    isSubmitting.value = false;
  }
};

onMounted(() => {
  fetchEventDetails();
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
          <span class="text-white text-lg lg:text-xl"
            >Memuat data acara...</span
          >
        </div>
      </div>

      <!-- Error State -->
      <div
        v-else-if="apiError && !event"
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
            @click="router.go(-1)"
            class="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
          >
            Kembali
          </button>
        </div>
      </div>

      <!-- Registration Form -->
      <div v-else-if="event" class="w-full max-w-7xl mx-auto">
        <!-- Header Section -->
        <div class="text-center mb-8 lg:mb-12">
          <a href="/" class="inline-flex items-center gap-2 text-white mb-6">
            <PenTool class="h-10 w-10" />
            <span class="text-2xl lg:text-3xl font-bold">WeSign</span>
          </a>
          <h1 class="text-3xl lg:text-4xl font-bold text-white mb-2">
            Daftar Acara
          </h1>
          <p class="text-lg lg:text-xl text-teal-100">
            Isi formulir untuk mendaftar sebagai peserta
          </p>
        </div>

        <!-- Main Content Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <!-- Event Info Card (Left Side - Desktop) -->
          <div class="order-2 lg:order-1">
            <div
              class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/20"
            >
              <div class="text-center lg:text-left">
                <div
                  class="flex items-center justify-center lg:justify-start gap-3 mb-4"
                >
                  <div class="p-3 bg-white/20 rounded-xl">
                    <PenTool class="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h2 class="text-2xl lg:text-3xl font-bold text-white">
                      {{ event.title }}
                    </h2>
                    <p class="text-teal-100">Detail Acara</p>
                  </div>
                </div>

                <div class="space-y-4 mt-6">
                  <div class="flex items-center gap-4 text-white">
                    <div class="p-2 bg-white/20 rounded-lg">
                      <Clock class="h-5 w-5" />
                    </div>
                    <div>
                      <p class="text-sm text-teal-100">Tanggal & Waktu</p>
                      <p class="font-semibold">
                        {{ formatDate(event.date) }} pukul
                        {{ formatTime(event.date) }} WIB
                      </p>
                    </div>
                  </div>

                  <div class="flex items-center gap-4 text-white">
                    <div class="p-2 bg-white/20 rounded-lg">
                      <MapPin class="h-5 w-5" />
                    </div>
                    <div>
                      <p class="text-sm text-teal-100">Lokasi</p>
                      <p class="font-semibold">
                        {{ event.location || "Lokasi belum ditentukan" }}
                      </p>
                    </div>
                  </div>
                </div>

                <div class="mt-8 p-4 bg-white/10 rounded-xl">
                  <h3 class="text-lg font-semibold text-white mb-2">
                    Deskripsi Acara
                  </h3>
                  <p class="text-teal-100">
                    {{ event.description || "Tidak ada deskripsi acara" }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Registration Form (Right Side - Desktop) -->
          <div class="order-1 lg:order-2">
            <div class="bg-white rounded-2xl shadow-2xl p-6 lg:p-8">
              <div class="text-center mb-6">
                <h3 class="text-2xl font-bold text-gray-900 mb-2">
                  Formulir Pendaftaran
                </h3>
                <p class="text-gray-600">Lengkapi data Anda untuk mendaftar</p>
              </div>

              <!-- Form -->
              <form @submit.prevent="submitForm" class="space-y-6">
                <!-- Name -->
                <div>
                  <label
                    for="name"
                    class="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Nama Lengkap <span class="text-red-500">*</span>
                  </label>
                  <div class="relative">
                    <div
                      class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                    >
                      <User class="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="name"
                      v-model="formData.name"
                      type="text"
                      required
                      class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                      placeholder="Masukkan nama lengkap Anda"
                    />
                  </div>
                  <p v-if="formErrors.name" class="mt-1 text-sm text-red-600">
                    {{ formErrors.name }}
                  </p>
                </div>

                <!-- Email -->
                <div>
                  <label
                    for="email"
                    class="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email <span class="text-red-500">*</span>
                  </label>
                  <div class="relative">
                    <div
                      class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                    >
                      <Mail class="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      v-model="formData.email"
                      type="email"
                      required
                      class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                      placeholder="nama@email.com"
                    />
                  </div>
                  <p v-if="formErrors.email" class="mt-1 text-sm text-red-600">
                    {{ formErrors.email }}
                  </p>
                </div>

                <!-- Phone -->
                <div>
                  <label
                    for="phone"
                    class="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Nomor Telepon
                  </label>
                  <div class="relative">
                    <div
                      class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                    >
                      <Phone class="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="phone"
                      v-model="formData.phone"
                      type="tel"
                      class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                      placeholder="Masukkan nomor telepon Anda (opsional)"
                    />
                  </div>
                  <p v-if="formErrors.phone" class="mt-1 text-sm text-red-600">
                    {{ formErrors.phone }}
                  </p>
                </div>

                <!-- Institution -->
                <div>
                  <label
                    for="institution"
                    class="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Institusi / Organisasi
                  </label>
                  <div class="relative">
                    <div
                      class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                    >
                      <Building2 class="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="institution"
                      v-model="formData.institution"
                      type="text"
                      class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                      placeholder="Masukkan nama institusi atau organisasi (opsional)"
                    />
                  </div>
                  <p
                    v-if="formErrors.institution"
                    class="mt-1 text-sm text-red-600"
                  >
                    {{ formErrors.institution }}
                  </p>
                </div>

                <!-- Error Message -->
                <div
                  v-if="apiError"
                  class="bg-red-50 border border-red-200 rounded-lg p-3"
                >
                  <p class="text-red-600 text-sm">{{ apiError }}</p>
                </div>

                <!-- Submit Button -->
                <button
                  type="submit"
                  :disabled="isSubmitting"
                  class="w-full flex items-center justify-center gap-2 bg-teal-600 text-white py-3 px-4 rounded-lg font-semibold shadow-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Loader2 v-if="isSubmitting" class="h-5 w-5 animate-spin" />
                  {{ isSubmitting ? "Mendaftarkan..." : "Daftar Sekarang" }}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <!-- Back to Home -->
      <div class="mt-8 lg:mt-12 text-center">
        <a
          href="/"
          class="inline-flex items-center gap-2 text-base lg:text-lg text-teal-100 hover:text-white transition"
        >
          <svg
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Kembali ke Beranda
        </a>
      </div>
    </div>
  </section>
</template>
