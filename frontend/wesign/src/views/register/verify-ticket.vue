<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { PenTool, QrCode, Loader2, Search } from "lucide-vue-next";
import { eventsApi } from "@/api/modules/event";
import { handleApiError } from "@/api/utils/error-handler";
import { useToast } from "@/api/composables/useToast";

const router = useRouter();
const { showError } = useToast();

const isSubmitting = ref(false);
const apiError = ref(null);

const formData = reactive({
  qr_code: "",
});

const formErrors = reactive({
  qr_code: "",
});

const validateForm = () => {
  let isValid = true;
  formErrors.qr_code = "";

  if (!formData.qr_code.trim()) {
    formErrors.qr_code = "Kode ticket wajib diisi";
    isValid = false;
  }

  return isValid;
};

const submitForm = async () => {
  if (!validateForm()) return;

  isSubmitting.value = true;
  apiError.value = null;

  try {
    await eventsApi.getTicketByQrCode(formData.qr_code);
    router.push(`/tickets/${formData.qr_code}`);
  } catch (error) {
    console.error("Error verifying ticket:", error);
    apiError.value = handleApiError(error);
    showError("Ticket tidak ditemukan. Periksa kembali kode ticket Anda.");
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <section
    class="w-full min-h-screen bg-linear-to-br from-teal-600 to-teal-800 flex items-center justify-center px-4 py-12"
  >
    <div class="w-full max-w-md mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <a href="/" class="inline-flex items-center gap-2 text-white mb-6">
          <PenTool class="h-10 w-10" />
          <span class="text-2xl lg:text-3xl font-bold">WeSign</span>
        </a>
        <h1 class="text-3xl lg:text-4xl font-bold text-white mb-2">
          Cek Ticket
        </h1>
        <p class="text-lg lg:text-xl text-teal-100">
          Masukkan kode ticket untuk melihat detail
        </p>
      </div>

      <!-- Form Card -->
      <div class="bg-white rounded-2xl shadow-2xl p-6 lg:p-8">
        <form @submit.prevent="submitForm" class="space-y-6">
          <!-- QR Code Input -->
          <div>
            <label
              for="qr_code"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              Kode Ticket
            </label>
            <div class="relative">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
              >
                <QrCode class="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="qr_code"
                v-model="formData.qr_code"
                type="text"
                required
                class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                placeholder="Masukkan kode ticket Anda"
              />
            </div>
            <p v-if="formErrors.qr_code" class="mt-1 text-sm text-red-600">
              {{ formErrors.qr_code }}
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
            <Search v-else class="h-5 w-5" />
            {{ isSubmitting ? "Mencari..." : "Cari Ticket" }}
          </button>
        </form>
      </div>

      <!-- Back to Home -->
      <div class="mt-8 text-center">
        <a
          href="/"
          class="inline-flex items-center gap-2 text-teal-100 hover:text-white transition"
        >
          Kembali ke Beranda
        </a>
      </div>
    </div>
  </section>
</template>
