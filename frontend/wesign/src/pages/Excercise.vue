<script setup>
import { ref, computed } from "vue";

const newTask = ref("");
const tasks = ref([]);

function addTask() {
  if (!newTask.value.trim()) return;

  tasks.value.push({
    id: Date.now(),
    title: newTask.value,
    done: false,
  });

  newTask.value = "";
}

function toggleTask(id) {
  const task = tasks.value.find((t) => t.id === id);
  task.done = !task.done;
}

const totalTask = computed(() => tasks.value.length);
</script>

<template>
  <div class="container">
    <h1 class="text-3xl font-bold mb-3">Vue Task Tracker</h1>

    <input
      v-model="newTask"
      placeholder="Add task..."
      @keyup.enter="addTask"
      class="border border-gray-300 rounded px-4 py-2"
    />
    <button @click="addTask" class="ml-2 rounded bg-green-400 px-4 py-2">
      Add
    </button>

    <p class="mt-4">
      Total Task: <span class="ml-2 font-bold">{{ totalTask }}</span>
    </p>

    <ul class="mt-4">
      <li
        v-for="task in tasks"
        :key="task.id"
        @click="toggleTask(task.id)"
        :style="{ textDecoration: task.done ? 'line-through' : 'none' }"
        class="cursor-pointer my-2 px-2 py-1 rounded hover:bg-gray-200"
      >
        {{ task.title }}
      </li>
    </ul>
  </div>
</template>
