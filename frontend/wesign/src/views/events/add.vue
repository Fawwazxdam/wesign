<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Clock,
  Loader2,
  Save,
} from "lucide-vue-next";
import { eventsApi } from "@/api/modules/event";
import { handleApiError } from "@/api/utils/error-handler";

const router = useRouter();

const isSubmitting = ref(false);
const apiError = ref(null);
const formErrors = ref({});

const formData = ref({
  title: "",
  date: "",
  time: "",
  location: "",
  description: "",
  status: "upcoming",
});

const statusOptions = [
  { value: "upcoming", label: "Akan Datang" },
  { value: "active", label: "Berjalan" },
  { value: "completed", label: "Selesai" },
  { value: "cancelled", label: "Dibatalkan" },
];

const validateForm = () => {
  const errors = {};
  if (!formData.value.title?.trim()) {
    errors.title = "Nama acara wajib diisi";
  }
  if (!formData.value.date) {
    errors.date = "Tanggal wajib diisi";
  }
  if (!formData.value.time) {
    errors.time = "Waktu wajib diisi";
  }
  if (!formData.value.location?.trim()) {
    errors.location = "Lokasi wajib diisi";
  }
  formErrors.value = errors;
  return Object.keys(errors).length === 0;
};

const createEvent = async () => {
  if (!validateForm()) return;

  isSubmitting.value = true;
  apiError.value = null;
  try {
    const payload = {
      title: formData.value.title,
      date: `${formData.value.date} ${formData.value.time}`,
      location: formData.value.location,
      description: formData.value.description,
      status: formData.value.status,
    };

    await eventsApi.create(payload);

    // Navigate back to events list
    router.push("/events");
  } catch (error) {
    console.error("Error creating event:", error);
    apiError.value = handleApiError(error);
  } finally {
    isSubmitting.value = false;
  }
};

const goBack = () => {
  router.push("/events");
};
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <button
          @click="goBack"
          class="p-2 hover:bg-gray-100 rounded-lg transition"
        >
          <ArrowLeft class="h-5 w-5 text-gray-600" />
        </button>
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Tambah Acara</h1>
          <p class="text-gray-500 mt-1">Buat acara baru</p>
        </div>
      </div>
    </div>

    <!-- Form -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <form @submit.prevent="createEvent" class="space-y-6">
        <!-- Title -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Nama Acara <span class="text-red-500">*</span>
          </label>
          <input
            v-model="formData.title"
            type="text"
            class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            placeholder="Masukkan nama acara"
          />
          <p v-if="formErrors.title" class="text-red-500 text-xs mt-1">
            {{ formErrors.title }}
          </p>
        </div>

        <!-- Date & Time -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Tanggal <span class="text-red-500">*</span>
            </label>
            <input
              v-model="formData.date"
              type="date"
              class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
            <p v-if="formErrors.date" class="text-red-500 text-xs mt-1">
              {{ formErrors.date }}
            </p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Waktu <span class="text-red-500">*</span>
            </label>
            <input
              v-model="formData.time"
              type="time"
              class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
            <p v-if="formErrors.time" class="text-red-500 text-xs mt-1">
              {{ formErrors.time }}
            </p>
          </div>
        </div>

        <!-- Location -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Lokasi <span class="text-red-500">*</span>
          </label>
          <input
            v-model="formData.location"
            type="text"
            class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            placeholder="Masukkan lokasi acara"
          />
          <p v-if="formErrors.location" class="text-red-500 text-xs mt-1">
            {{ formErrors.location }}
          </p>
        </div>

        <!-- Status -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Status</label
          >
          <select
            v-model="formData.status"
            class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            <option
              v-for="option in statusOptions"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </select>
        </div>

        <!-- Description -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Deskripsi</label
          >
          <textarea
            v-model="formData.description"
            rows="4"
            class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            placeholder="Masukkan deskripsi acara"
          ></textarea>
        </div>

        <!-- Action Buttons -->
        <div
          class="flex items-center justify-end gap-3 pt-4 border-t border-gray-100"
        >
          <button
            type="button"
            @click="goBack"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
          >
            Batal
          </button>
          <button
            type="submit"
            :disabled="isSubmitting"
            class="px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition disabled:opacity-50 flex items-center gap-2"
          >
            <Loader2 v-if="isSubmitting" class="h-4 w-4 animate-spin" />
            <Save v-else class="h-4 w-4" />
            {{ isSubmitting ? "Menyimpan..." : "Simpan" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
