<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Calendar, MapPin, Clock, Users, ArrowLeft, Loader2, Edit, Trash2, UserCheck, UserX } from "lucide-vue-next";
import { eventsApi } from "@/api/modules/event";
import { handleApiError } from "@/api/utils/error-handler";
import Modal from "@/components/Modal.vue";

const route = useRoute();
const router = useRouter();

const isLoading = ref(true);
const isSubmitting = ref(false);
const apiError = ref(null);
const event = ref(null);
const participants = ref([]);
const showDeleteModal = ref(false);

const eventId = route.params.id;

const statusOptions = [
  { value: "upcoming", label: "Akan Datang", color: "bg-blue-100 text-blue-700" },
  { value: "active", label: "Berjalan", color: "bg-yellow-100 text-yellow-700" },
  { value: "completed", label: "Selesai", color: "bg-green-100 text-green-700" },
  { value: "cancelled", label: "Dibatalkan", color: "bg-red-100 text-red-700" },
];

const getStatusColor = (status) => {
  const statusOption = statusOptions.find((s) => s.value === status);
  return statusOption ? statusOption.color : "bg-gray-100 text-gray-700";
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

const fetchEventDetails = async () => {
  isLoading.value = true;
  apiError.value = null;
  try {
    const response = await eventsApi.getById(eventId);
    const eventData = response.data.data || response;
    console.log({eventData})
    event.value = eventData;
    participants.value = eventData.participants || [];
  } catch (error) {
    console.error("Error fetching event details:", error);
    apiError.value = handleApiError(error);
  } finally {
    isLoading.value = false;
  }
};

const goBack = () => {
  router.push("/events");
};

const goToEdit = () => {
  router.push(`/events/${eventId}/edit`);
};

const deleteEvent = async () => {
  isSubmitting.value = true;
  try {
    await eventsApi.delete(eventId);
    router.push("/events");
  } catch (error) {
    console.error("Error deleting event:", error);
    apiError.value = handleApiError(error);
  } finally {
    isSubmitting.value = false;
  }
};

onMounted(() => {
  fetchEventDetails();
});
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
          <h1 class="text-2xl font-bold text-gray-900">Detail Acara</h1>
          <p class="text-gray-500 mt-1">Lihat detail dan peserta acara</p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <button
          @click="goToEdit"
          class="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
        >
          <Edit class="h-4 w-4" />
          Edit
        </button>
        <button
          @click="showDeleteModal = true"
          class="inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition"
        >
          <Trash2 class="h-4 w-4" />
          Hapus
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex items-center justify-center py-12">
      <Loader2 class="h-8 w-8 text-teal-600 animate-spin" />
      <span class="ml-3 text-gray-500">Memuat data...</span>
    </div>

    <!-- Error State -->
    <div v-else-if="apiError && !event" class="bg-red-50 border border-red-200 rounded-lg p-4">
      <p class="text-red-600">{{ apiError }}</p>
    </div>

    <!-- Content -->
    <div v-else-if="event" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Event Info -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Main Card -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div class="flex items-start justify-between mb-6">
            <div class="flex items-center gap-4">
              <div class="p-3 bg-teal-50 rounded-lg">
                <Calendar class="h-6 w-6 text-teal-600" />
              </div>
              <div>
                <h2 class="text-xl font-bold text-gray-900">{{ event.title }}</h2>
                <span
                  :class="[getStatusColor(event.status), 'mt-2 px-3 py-1 rounded-full text-xs font-medium inline-block']"
                >
                  {{ statusOptions.find(s => s.value === event.status)?.label || event.status }}
                </span>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="flex items-center gap-3">
              <Clock class="h-5 w-5 text-gray-400" />
              <div>
                <p class="text-sm text-gray-500">Tanggal & Waktu</p>
                <p class="font-medium text-gray-900">
                  {{ formatDate(event.date) }} pukul {{ formatTime(event.date) }} WIB
                </p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <MapPin class="h-5 w-5 text-gray-400" />
              <div>
                <p class="text-sm text-gray-500">Lokasi</p>
                <p class="font-medium text-gray-900">{{ event.location || "-" }}</p>
              </div>
            </div>
          </div>

          <div class="mt-6 pt-6 border-t border-gray-100">
            <p class="text-sm text-gray-500 mb-2">Deskripsi</p>
            <p class="text-gray-900">{{ event.description || "Tidak ada deskripsi" }}</p>
          </div>
        </div>

        <!-- Participants Section -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-2">
              <Users class="h-5 w-5 text-teal-600" />
              <h3 class="text-lg font-semibold text-gray-900">Peserta</h3>
            </div>
            <span class="text-sm text-gray-500">{{ participants.length }} peserta</span>
          </div>

          <!-- Participants Table -->
          <div v-if="participants.length > 0" class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead class="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th class="px-4 py-3 text-left font-semibold text-gray-600">Nama</th>
                  <th class="px-4 py-3 text-left font-semibold text-gray-600">Email</th>
                  <th class="px-4 py-3 text-left font-semibold text-gray-600">Institusi</th>
                  <th class="px-4 py-3 text-left font-semibold text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr
                  v-for="participant in participants"
                  :key="participant.id"
                  class="hover:bg-gray-50"
                >
                  <td class="px-4 py-3 text-gray-900 font-medium">
                    {{ participant.name }}
                  </td>
                  <td class="px-4 py-3 text-gray-600">{{ participant.email }}</td>
                  <td class="px-4 py-3 text-gray-600">
                    {{ participant.institution || "-" }}
                  </td>
                  <td class="px-4 py-3">
                    <span
                      :class="[
                        participant.status === 'checked_in'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700',
                        'px-2 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1',
                      ]"
                    >
                      <UserCheck v-if="participant.status === 'checked_in'" class="h-3 w-3" />
                      <UserX v-else class="h-3 w-3" />
                      {{ participant.status === "checked_in" ? "Hadir" : "Terdaftar" }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Empty State -->
          <div v-else class="text-center py-12 bg-gray-50 rounded-lg">
            <Users class="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p class="text-gray-500">Belum ada peserta yang terdaftar</p>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
        <!-- Quick Stats -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Ringkasan</h3>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2 text-gray-600">
                <Users class="h-4 w-4" />
                <span class="text-sm">Total Peserta</span>
              </div>
              <span class="font-semibold text-gray-900">{{ participants.length }}</span>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2 text-gray-600">
                <UserCheck class="h-4 w-4" />
                <span class="text-sm">Hadir</span>
              </div>
              <span class="font-semibold text-green-600">
                {{ participants.filter(p => p.status === 'checked_in').length }}
              </span>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2 text-gray-600">
                <UserX class="h-4 w-4" />
                <span class="text-sm">Terdaftar</span>
              </div>
              <span class="font-semibold text-gray-600">
                {{ participants.filter(p => p.status !== 'checked_in').length }}
              </span>
            </div>
          </div>
        </div>

        <!-- Created Info -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Informasi</h3>
          <div class="space-y-3 text-sm">
            <div>
              <p class="text-gray-500">Dibuat pada</p>
              <p class="font-medium text-gray-900">
                {{ event.created_at ? new Date(event.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '-' }}
              </p>
            </div>
            <div>
              <p class="text-gray-500">Terakhir diperbarui</p>
              <p class="font-medium text-gray-900">
                {{ event.updated_at ? new Date(event.updated_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '-' }}
              </p>
            </div>
          </div>
        </div>
      </div>
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
          Apakah Anda yakin ingin menghapus acara <strong>"{{ event?.title }}"</strong>?
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
