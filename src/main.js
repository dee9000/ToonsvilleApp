// src/main.js This is the main entry file for your entire Vue app. When the browser loads your app, this file is run first.
//Typical Responsibilities:
//Create your Vue app using createApp(App)

//Register global plugins (e.g., router, Pinia, Bootstrap)

//Mount the app to the DOM (#app in index.html)

import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Imports the router configuration
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap'; // JS features like modals
import 'animate.css'; //animations

const app = createApp(App);   // Step 1: create Vue app

app.use(router);              // Step 2: register the router
app.mount('#app');            // Step 3: mount to <div id="app"> in index.html
