<script setup lang="ts">
import { Plus, Search, Filter, Calendar, Edit, Trash2, Eye, Loader2 } from "lucide-vue-next";
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { eventsApi } from "@/api/modules/event";
import { handleApiError } from "@/api/utils/error-handler";
import Modal from "@/components/Modal.vue";

// Router
const router = useRouter();

// State
const searchQuery = ref("");
const isLoading = ref(false);
const isSubmitting = ref(false);
const events = ref([]);
const apiError = ref(null);

// Modal states
const showCreateModal = ref(false);
const showDeleteModal = ref(false);

// Form state
const formData = ref({
  id: null,
  title: "",
  date: "",
  time: "",
  location: "",
  description: "",
  status: "upcoming",
});

// Status options
const statusOptions = [
  { value: "upcoming", label: "Akan Datang", color: "bg-blue-100 text-blue-700" },
  { value: "active", label: "Berjalan", color: "bg-yellow-100 text-yellow-700" },
  { value: "completed", label: "Selesai", color: "bg-green-100 text-green-700" },
  { value: "cancelled", label: "Dibatalkan", color: "bg-red-100 text-red-700" },
];

// Form validation
const formErrors = ref({});

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

// API Functions
const fetchEvents = async () => {
  isLoading.value = true;
  apiError.value = null;
  try {
    const response = await eventsApi.getAll();
    events.value = response.data.data || response.data || [];
    // Add statusColor, formatted date and time to each event
    events.value = events.value.map((event) => {
      const { date, time } = parseDateTime(event.date);
      return {
        ...event,
        date,
        time,
        statusColor: getStatusColor(event.status),
      };
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    apiError.value = handleApiError(error);
  } finally {
    isLoading.value = false;
  }
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
    const response = await eventsApi.create(payload);
    const newEvent = response.data || response;
    const { date, time } = parseDateTime(newEvent.date);
    events.value.unshift({
      ...newEvent,
      date,
      time,
      statusColor: getStatusColor(newEvent.status),
    });
    showCreateModal.value = false;
    resetForm();
  } catch (error) {
    console.error("Error creating event:", error);
    apiError.value = handleApiError(error);
  } finally {
    isSubmitting.value = false;
  }
};

const deleteEvent = async () => {
  isSubmitting.value = true;
  apiError.value = null;
  try {
    await eventsApi.delete(formData.value.id);
    events.value = events.value.filter((e) => e.id !== formData.value.id);
    showDeleteModal.value = false;
    resetForm();
  } catch (error) {
    console.error("Error deleting event:", error);
    apiError.value = handleApiError(error);
    events.value = events.value.filter((e) => e.id !== formData.value.id);
    showDeleteModal.value = false;
    resetForm();
  } finally {
    isSubmitting.value = false;
  }
};

// Helper functions
const parseDateTime = (dateString) => {
  if (!dateString) return { date: "", time: "" };
  const [date, time] = dateString.split(" ");
  return { date, time: time ? time.substring(0, 5) : "" };
};

const getStatusColor = (status) => {
  const statusOption = statusOptions.find((s) => s.value === status);
  return statusOption ? statusOption.color : "bg-gray-100 text-gray-700";
};

const resetForm = () => {
  formData.value = {
    id: null,
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
    status: "upcoming",
  };
  formErrors.value = {};
};

const openCreateModal = () => {
  resetForm();
  showCreateModal.value = true;
};

const openViewModal = (event) => {
  router.push(`/events/${event.id}`);
};

const openDeleteModal = (event) => {
  formData.value = { ...event };
  showDeleteModal.value = true;
};

// Computed
const filteredEvents = computed(() => {
  if (!searchQuery.value) return events.value;
  return events.value.filter(
    (event) =>
      event.title?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      event.location?.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Lifecycle
onMounted(() => {
  fetchEvents();
});
</script>

<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Daftar Acara</h1>
        <p class="text-gray-500 mt-1">Kelola semua acara dan kegiatan Anda di sini.</p>
      </div>
      <button
        @click="router.push('/events/add')"
        class="inline-flex items-center justify-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-teal-700"
      >
        <Plus class="h-4 w-4" />
        Tambah Acara
      </button>
    </div>

    <!-- Filters & Search -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
      <div class="flex flex-col sm:flex-row gap-4">
        <!-- Search -->
        <div class="flex-1 relative">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari acara..."
            class="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>
        <!-- Filter Button -->
        <button
          class="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
        >
          <Filter class="h-4 w-4" />
          Filter
        </button>
      </div>
    </div>

    <!-- Table -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 border-b border-gray-100">
            <tr>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Nama Acara
              </th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Tanggal & Waktu
              </th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Lokasi
              </th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th class="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr
              v-for="event in filteredEvents"
              :key="event.id"
              class="hover:bg-gray-50 transition"
            >
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="p-2 bg-teal-50 rounded-lg">
                    <Calendar class="h-5 w-5 text-teal-600" />
                  </div>
                  <span class="font-medium text-gray-900">{{ event.title }}</span>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm">
                  <p class="text-gray-900 font-medium">{{ event.date }}</p>
                  <p class="text-gray-500">{{ event.time }} WIB</p>
                </div>
              </td>
              <td class="px-6 py-4">
                <span class="text-gray-700">{{ event.location }}</span>
              </td>
              <td class="px-6 py-4">
                <span
                  :class="[event.statusColor, 'px-3 py-1 rounded-full text-xs font-medium']"
                >
                  {{ statusOptions.find(s => s.value === event.status)?.label || event.status }}
                </span>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center justify-end gap-2">
                  <button
                    @click="openViewModal(event)"
                    class="p-2 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition"
                    title="Lihat Detail"
                  >
                    <Eye class="h-4 w-4" />
                  </button>
                  <button
                    @click="router.push(`/events/${event.id}/edit`)"
                    class="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                    title="Edit"
                  >
                    <Edit class="h-4 w-4" />
                  </button>
                  <button
                    @click="openDeleteModal(event)"
                    class="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                    title="Hapus"
                  >
                    <Trash2 class="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div v-if="filteredEvents.length === 0" class="text-center py-12">
        <Calendar class="h-12 w-12 text-gray-300 mx-auto mb-4" />
        <p class="text-gray-500">Tidak ada acara yang ditemukan.</p>
      </div>

      <!-- Pagination -->
      <div class="px-6 py-4 border-t border-gray-100 bg-gray-50">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p class="text-sm text-gray-500">
            Menampilkan {{ filteredEvents.length }} dari {{ events.length }} acara
          </p>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex items-center justify-center py-12">
      <Loader2 class="h-8 w-8 text-teal-600 animate-spin" />
      <span class="ml-3 text-gray-500">Memuat data...</span>
    </div>

    <!-- Delete Confirmation Modal -->
    <Modal
      :show="showDeleteModal"
      title="Hapus Acara"
      size="sm"
      @close="showDeleteModal = false"
    >
      <div class="py-4">
        <div class="flex items-center justify-center mb-4">
          <div class="p-4 bg-red-50 rounded-full">
            <Trash2 class="h-8 w-8 text-red-600" />
          </div>
        </div>
        <p class="text-center text-gray-600">
          Apakah Anda yakin ingin menghapus acara <strong>"{{ formData.title }}"</strong>?
        </p>
        <p class="text-center text-gray-500 text-sm mt-2">
          Tindakan ini tidak dapat dibatalkan.
        </p>
      </div>
      <template #footer>
        <div class="flex justify-end gap-3">
          <button
            @click="showDeleteModal = false"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
          >
            Batal
          </button>
          <button
            @click="deleteEvent"
            :disabled="isSubmitting"
            class="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition disabled:opacity-50 flex items-center gap-2"
          >
            <Loader2 v-if="isSubmitting" class="h-4 w-4 animate-spin" />
            {{ isSubmitting ? "Menghapus..." : "Hapus" }}
          </button>
        </div>
      </template>
    </Modal>
  </div>
</template>
