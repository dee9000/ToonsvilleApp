<template>
    <div ref="tiltCard" class="card-container animate__animated animate__backInUp">
      <!-- Header -->
      <div class="card-header d-flex justify-content-between align-items-center px-3 py-2">
        <h5
          @click="resetToDefault(); triggerTada()"
          class="kablammo-fun"
          :class="{ 'animate__animated animate__tada': headerTada }"
        >
          Toonsville
        </h5>
        <div class="theme-toggle">
          <ThemeToggle />
        </div>
      </div>
  
      <!-- Banner -->
      <div class="top-banner">
        <transition name="fade-image" ><!--transition between images-->
        <img :src="image" class="w-100 h-100 object-fit-cover" alt="Banner" :key="image"/>
        </transition>
        <!-- <div class="profile-circle">
          <img :src="circleImage" class="img-thumbnail rounded-circle animate__animated animate__bounce" alt="Profile" />
        </div>-->
        <!--THE DYNAMIC TITLE SECTION-->
        <h1 class="lead text-center sigmar-one-regular animate__animated animate__backInUp">{{ title }}</h1>
      </div>
  
      <!-- Body -->
      <div class="card-body text-center roboto-lemurianstar">
        <div v-if="!showFavorites">
          <!--THE SEARCH FIELD-->
          <input
            type="text"
            v-model="searchQuery"
            class="form-control mb-2 roboto-lemurianstar rounded-input"
            placeholder="Search for a cartoon...🦊 🧙‍♂️ 🎯"
          />
          <ul class="list-group mb-3" v-if="searchQuery">
            <li
              v-for="cartoon in filteredCartoons"
              :key="cartoon.id"
              class="list-group-item roboto-lemurianstar"
              @click="selectCartoon(cartoon)"
              style="cursor: pointer;"
            >
            <!-- THE DROPDOWN LIST NAMES SECTION-->
              {{ cartoon.title }}
            </li>
          </ul>
            <!-- THE DYNAMIC DESCRIPTION SECTION -->
          <p class="text-center">{{ subtitle }}</p>
          <!-- THE DESCRIPTION SECTION -->
          <div class="description-box roboto-lemurianstar" v-if="selectedId">
            <ul class="list-unstyled text-start cartoon-meta">
              <li><strong>Years Aired:</strong> {{ yearsAired }}</li>
              <li><strong>Genre:</strong> {{ genre }}</li>
              <li><strong>Country:</strong> {{ country }}</li>
              <li><strong>Network:</strong> {{ network }}</li>
              <li><strong>Episodes:</strong> {{ episodes }}</li>
              <li><strong>Main Characters:</strong> {{ mainCharacters.join(', ') }}</li>
            </ul>
            {{ description }}
            <p>
              <button
                class="confetti-button roboto-lemurianstar"
                :class="{ 'clicked': saveButtonClicked }"
                @mousedown="saveButtonClicked = true"
                @mouseup="saveButtonClicked = false"
                @mouseleave="saveButtonClicked = false"
                @click="animateConfetti($event)"
                :disabled="isAlreadySaved"
              >
                {{ isAlreadySaved ? 'Saved 👍🏽' : 'Save 🎉' }}
              </button>
            </p>
          </div>
  
          <div class="d-flex justify-content-start mt-3">
            <button :class="{ 'zoom-in': isZoomed }" class="btn btn-sm roboto-lemurianstar basketball-btn" @click="toggleView" @mousedown="isZoomed = true"
                  @mouseup="isZoomed = false"
                  @mouseleave="isZoomed = false">
              {{ showFavorites ? 'Browse' : '🏀' }}
            </button>
          </div>
        </div>
  
        <div v-else>
          <h5>Your Favorites</h5>
          <p v-if="favorites.length === 0">No favorites yet.</p>
          <ul class="list-group text-start">
            <li class="list-group-item py-1 d-flex align-items-center justify-content-between" v-for="(fav, i) in favorites" :key="i">
               <span>{{ fav.title }}</span>
               <button class="btn btn-sm trash-button wiggle-on-hover" @click="removeFavorite(fav.id)">🗑️</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, onMounted, nextTick, computed } from 'vue';
  import confetti from 'canvas-confetti';
  import { useCartoonApi } from '../composables/useCartoonApi';
  import ThemeToggle from './ThemeToggle.vue';
  import VanillaTilt from 'vanilla-tilt';
  
  const { cartoons, fetchCartoons } = useCartoonApi();
  
  const tiltCard = ref(null);
  const showFavorites = ref(false);
  const selectedId = ref('');
  const favorites = ref([]);
  const headerTada = ref(false);
  const searchQuery = ref('');
  const saveButtonClicked = ref(false);
  const isZoomed = ref(false);
  
  const defaults = {
    image: '/images/disney.jpg',
    circleImage: '/images/toonsville.png',
    title: 'Toonsville',
    subtitle: 'Welcome to your retro cartoon hub! Your one stop Retro cartoon station for those Saturday morning cartoons and after-school shows from the 70s, 80s, and 90s!',
    description: '',
  };
  
  const image = ref(defaults.image);
  const circleImage = ref(defaults.circleImage);
  const title = ref(defaults.title);
  const subtitle = ref(defaults.subtitle);
  const description = ref(defaults.description);
  const yearsAired = ref('');
  const genre = ref('');
  const country = ref('');
  const network = ref('');
  const episodes = ref(0);
  const mainCharacters = ref([]);
  
  const resetToDefault = () => {
    image.value = defaults.image;
    circleImage.value = defaults.circleImage;
    title.value = defaults.title;
    subtitle.value = defaults.subtitle;
    description.value = defaults.description;
    selectedId.value = '';
    searchQuery.value = '';
    showFavorites.value = false;
    yearsAired.value = '';
    genre.value = '';
    country.value = '';
    network.value = '';
    episodes.value = 0;
    mainCharacters.value = [];
  };
  
  const filteredCartoons = computed(() => {
    return cartoons.value.filter(c =>
      c.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });
  
  const selectCartoon = (cartoon) => {
    selectedId.value = cartoon.id.toString();
    searchQuery.value = '';
  };

  const removeFavorite = (id)=>{
    favorites.value = favorites.value.filter(f=>f.id !==id);
  };
  
  onMounted(async () => {
    await fetchCartoons();
    resetToDefault();
  
    await nextTick();
    if (tiltCard.value) {
      VanillaTilt.init(tiltCard.value, {
        max: 15,
        speed: 400,
        glare: true,
        'max-glare': 0.3,
        scale: 1.05,
      });
    }
  });
  
  const triggerTada = async () => {
    headerTada.value = false;
    await nextTick();
    headerTada.value = true;
  };
  
  const toggleView = () => {
    showFavorites.value = !showFavorites.value;
  };
  
  watch(selectedId, (newVal) => {
    const selected = cartoons.value.find((c) => c.id.toString() === newVal);
    if (selected) {
      image.value = selected.image;
      circleImage.value = selected.circleImage;
      title.value = selected.title;
      subtitle.value = selected.subtitle;
      description.value = selected.description;
      yearsAired.value = selected.yearsAired;
      genre.value = selected.genre;
      country.value = selected.country;
      network.value = selected.network;
      episodes.value = selected.episodes;
      mainCharacters.value = selected.mainCharacters || [];
    } else {
      resetToDefault();
    }
  });
  
  const isAlreadySaved = computed(() => {
    const selected = cartoons.value.find((c) => c.id.toString() === selectedId.value);
    return selected && favorites.value.some((f) => f.id === selected.id);
  });
  
  const animateConfetti = (event) => {
    const rect = event.target.getBoundingClientRect();
    const sound = new Audio('/sounds/cartoon-pop.mp3');
    sound.currentTime = 0;
    sound.play();
  
    confetti({
      particleCount: 100,
      spread: 70,
      startVelocity: 30,
      angle: 60,
      origin: {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight,
      },
    });
  
    const selected = cartoons.value.find((c) => c.id.toString() === selectedId.value);
    if (selected && !favorites.value.some((f) => f.id === selected.id)) {
      favorites.value.push(selected);
    }
  };
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Galindo&family=Irish+Grover&family=Kablammo&family=Sigmar+One&display=swap');
  @import 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css';
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap');
  
  
  .card-container {
    width: 480px;
    background: #fff;
    border-radius: 12px;
    overflow: hidden;
    margin: 2rem auto;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease-in-out;
    will-change: transform;
  }
  
  .top-banner {
    background-color: #000;
    height: 350px;
    position: relative;
  }
  
  .top-banner::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 120px;
    background: linear-gradient(to bottom,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.6) 60%,
      #fff 100%);
    z-index: 2;
  }
  
  .top-banner img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
  .fade-image-enter-active,
.fade-image-leave-active {
  transition: opacity 0.8s ease;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.fade-image-enter-from,
.fade-image-leave-to {
  opacity: 0;
}

.sigmar-one-regular {
  font-family: "Sigmar One", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: x-large;
  color: #a53814;

  /* Clean light stroke */
  -webkit-text-stroke: 1.5px #f0f0f0;
  text-stroke: 1.5px #f0f0f0;

  /* High-elevation soft shadow */
  text-shadow: 1px 5px 5px rgba(0, 0, 0, 0.4);
}



  
  .profile-circle {
    position: absolute;
    bottom: -40px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 100px;
    z-index: 10;
  }
  
  .profile-circle img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .card-body {
    padding: 4rem 1rem 1rem;
  }
  
  .form-control {
    max-width: 90%;
    margin: 0 auto;
    font-size: 1rem;
  }
  
  .list-group-item:hover {
    background-color: #f0f0f0;
  }
  
  .description-box {
    max-height: 250px;
    overflow-y: auto;
    padding: 0.5rem 0.75rem;
    border: 1px solid #ddd;
    border-radius: 6px;
    background-color: #f9f9f9;
    text-align: left;
    font-size: 0.875rem;
    line-height: 1.4;
  }
  
  .rounded-input {
    border-radius: 999px;
    padding-left: 1rem;
  }
  
  .confetti-button.clicked {
    transform: scale(0.92);
    background-color: #a53814;
  }
  
  .confetti-button {
    margin-top: 1em;
    padding: 8px 15px;
    font-size: 16px;
    background-color: #a53814;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: transform 0.1s ease-in-out;
  }
  
  .confetti-button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  
  .description-box .confetti-button {
    color: #f9f9f9;
  }
  
  .kablammo-fun {
    font-family: "Kablammo", system-ui;
    font-weight: 400;
    color: rgb(196, 55, 4);
    cursor: pointer;
    transition: transform 0.2s ease;
  }
  
  .kablammo-fun:hover {
    color: red;
    transform: scale(1.05);
  }
  
  .roboto-lemurianstar {
    font-family: "Roboto", sans-serif;
    font-weight: 500;
    color: #333;
  }
  
  .cartoon-meta li {
    font-size: 0.85rem;
    margin-bottom: 4px;
    color: #333;
  }

  .card-container.dark-theme {
  background-color: #1e1e1e;
  color: #f1f1f1;
}

.card-container.dark-theme .description-box {
  background-color: #2b2b2b;
  border-color: #555;
}

.card-container.dark-theme .form-control {
  background-color: #333;
  color: #f1f1f1;
  border-color: #666;
}

.card-container.dark-theme .confetti-button {
  background-color: #ff4d94;
}

.card-container.dark-theme .list-group-item {
  background-color: #3a3a3a;
  color: #f1f1f1;

}

.card-container.dark-theme .list-group-item:hover {
  background-color: #f1f1f1;
  color: #3a3a3a;
}

.card-container.dark-theme {
  background-color: #474646;
  color: #f1f1f1; /* Make all text inside white-ish */
}

/* Explicit overrides for specific elements */
.card-container.dark-theme .description-box,
.card-container.dark-theme .cartoon-meta li,
.card-container.dark-theme p,
.card-container.dark-theme h5,
.card-container.dark-theme h1,
.card-container.dark-theme .roboto-lemurianstar,
.card-container.placeholder,
.card-container.dark-theme ul{
  color: #f1f1f1;
}
/** place holder dark theme */
/* Light theme placeholder */
.form-control::placeholder {
  color: #878686;
  opacity: 1; /* override Firefox's default */
}

/* Dark theme placeholder */
::v-deep(html.dark) .form-control::placeholder {
  color: #ccc;
}



/**favourites remove */
.btn-outline-danger {
  font-size: 0.8rem;
  padding: 2px 8px;
}

.trash-button{
  margin-left: auto;
  background: transparent;
  font-size: 0.8rem;
  cursor: pointer;
}

@keyframes wiggle {
  0%, 100% { transform: rotate(0); }
  25% { transform: rotate(-10deg); }
  50% { transform: rotate(10deg); }
  75% { transform: rotate(-5deg); }
}

.wiggle-on-hover:hover {
  display: inline-block;
  animation: wiggle 0.4s ease-in-out;
}

.trash-button {
  margin-left: auto;
  background: transparent;
  border: none;
  font-size: 1rem;
  cursor: pointer;
}

.basketball-btn {
  font-size: 2rem;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  outline: none;             /* Removes outline in most browsers */
  background: none;
  border: none;                 /* 🔸 Ensure no border is showing */
}

.basketball-btn:hover {
  animation: bounce 1s ease;
}
.basketball-btn:focus {
  outline: none;             /* Removes focus outline on click */
  box-shadow: none;          /* Also prevent glow if browser applies it */
}
.basketball-btn:focus-visible {
  outline: 2px solid #ff6600; /* or any custom style you like */
}



@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-20px);
  }
  60% {
    transform: translateY(-10px);
  }
}
.zoom-in {
  transform: scale(0.85);
  transition: transform 0.1s ease-in-out;
}




  </style>
  