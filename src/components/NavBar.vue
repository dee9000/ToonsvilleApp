<!-- src/components/NavBar.vue -->
<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <router-link class="navbar-brand" to="/">Cartoon Explorer</router-link>
  
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/favorites">Favorites</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/details">Details</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </template>
  
  <script setup></script>
  