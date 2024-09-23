<script setup>
import HelloWorld from './components/HelloWorld.vue'
import User from './components/User.vue';
import { ref, computed } from 'vue';
import Service from './components/Service.vue';
import Apropos from './components/Apropos.vue';
import Acceuil from './components/Accueil.vue';
import Contact from './components/Contact.vue';

const routes = {
  '/': Acceuil,
  '/apropos': Apropos,
  '/service': Service,
  '/contact': Contact
}

const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || NotFound
})

let users = ref([])

// let tasks = ref([
//   {position:1, description:"premier"},
//   {position:2, description:"deuxieme"},
//   {position:3, description:"troisieme"}
// ])

fetch('http://localhost:3000/getUser')
  .then(response => response.json())
  .then(backendUsers => {
    users.value = backendUsers
    console.log(backendUsers)
})

</script>

<template>
  
  <!-- <HelloWorld msg="Vitesse + Vue" /> -->
  <!-- <User :users="users"/> -->
  <div>
    <div class="navbar">
      <a href="#/">Accueil</a>
      <a href="#/apropos">À Propos</a>
      <a href="#/service">Services</a>
      <a href="#/contact">Contact</a>
    </div>
    <component :is="currentView" />
  </div>
</template>

<style scoped>

/*    Mon CSS    */

.navbar {
  background-color: #333;
  overflow: hidden;
}
.navbar a {
  float: left;
  display: block;
  color: white;
  text-align: center;
  padding: 14px 20px;
  text-decoration: none;
}
.navbar a:hover {
  background-color: #ddd;
  color: black;
}

/*    Mon CSS    */
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
