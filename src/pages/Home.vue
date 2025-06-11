<template>
  <div class="home-wrapper">
    <!-- Vertical background text -->
    <h1 class="vertical-title">
      <span
        v-for="(char, index) in titleText"
        :key="index"
        class="letter"
        :style="{ animationDelay: `${index * 0.1}s` }"
      >
        {{ char }}
      </span>
    </h1>

    <!-- Main cartoon card -->
    <div class="home">
      <CartoonCard />
    </div>
  </div>
</template>

<script setup>
import CartoonCard from '../components/CartoonCard.vue';

const titleText = 'Toonsville'.split('');
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kablammo&display=swap');

.home-wrapper {
  position: relative;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eeeeee;
  overflow: hidden;
}

.vertical-title {
  position: absolute;
  left: 13%;
  top: 50%;
  transform: translateY(-50%) rotate(-90deg);
  font-size: 7rem;
  color: rgba(195, 67, 24, 0.564);
  font-family: 'Kablammo', cursive;
  z-index: 0;
  pointer-events: none;
  white-space: nowrap;
  font-weight: 400;
  letter-spacing: 2px;
}

.letter {
  display: inline-block;
  animation: bounceIn 0.6s ease-out;
}

@keyframes bounceIn {
  0% {
    transform: translateY(-100%) scale(0.3);
    opacity: 0;
  }
  50% {
    transform: translateY(10%) scale(1.1);
    opacity: 1;
  }
  70% {
    transform: translateY(-5%) scale(0.95);
  }
  100% {
    transform: translateY(0) scale(1);
  }
}

.home {
  position: relative;
  z-index: 1;
}
</style>
