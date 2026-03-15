<script setup>
import { X } from 'lucide-vue-next';

defineProps({
  show: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg', 'xl', 'full'].includes(value)
  },
  showClose: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits(['close']);

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-full mx-4'
};

const handleClose = () => {
  emit('close');
};

const handleBackdropClick = (event) => {
  if (event.target === event.currentTarget) {
    handleClose();
  }
};
</script>

<template>
  <Teleport to="body">
    <div
      v-if="show"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
      @click="handleBackdropClick"
    >
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/50"></div>

      <!-- Modal Container -->
      <div
        :class="[
          sizeClasses[size],
          'relative bg-white rounded-2xl w-full p-6 shadow-xl'
        ]"
      >
        <!-- Header -->
        <div v-if="title || showClose" class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900">{{ title }}</h3>
          <button
            v-if="showClose"
            @click="handleClose"
            class="text-gray-400 hover:text-gray-600"
          >
            <X class="h-5 w-5" />
          </button>
        </div>

        <!-- Content -->
        <div>
          <slot></slot>
        </div>

        <!-- Footer -->
        <div v-if="$slots.footer" class="mt-4">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </Teleport>
</template>
