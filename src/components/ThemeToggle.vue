<!-- src/components/ThemeToggle.vue -->
<template>
  <div class="toggle-container" :class="{ dark: isDark }" @click="toggleTheme">
    <div :class="['toggle-thumb', isDark ? 'dark' : 'light']">
      <span class="icon">{{ isDark ? '🌙' : '☀️' }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const isDark = ref(false)

const toggleTheme = () => {
  isDark.value = !isDark.value
}

// Apply dark class to the *card container* locally
const updateCardTheme = () => {
  const card = document.querySelector('.card-container')
  if (!card) return

  if (isDark.value) {
    card.classList.add('dark-theme')
  } else {
    card.classList.remove('dark-theme')
  }
}

onMounted(() => {
  const saved = localStorage.getItem('toonsville-theme')
  if (saved) {
    isDark.value = saved === 'dark'
    updateCardTheme()
  }
})

watch(isDark, (val) => {
  localStorage.setItem('toonsville-theme', val ? 'dark' : 'light')
  updateCardTheme()
})
</script>

<style scoped>
.toggle-container {
  margin-top: 0.8em;
  width: 61px;
  height: 31px;
  background-color: #ccc;
  border-radius: 999px;
  padding: 4px;
  cursor: pointer;
  position: relative;
  transition: background-color 0.3s ease-in-out;
}

.toggle-container.dark {
  background-color: #333;
}

.toggle-thumb {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
  top: 3px;
  left: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.toggle-thumb.dark {
  transform: translateX(30px);
}

.icon {
  transition: transform 0.3s ease-in-out;
}
</style>
