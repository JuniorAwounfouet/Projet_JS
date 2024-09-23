<template>
    <div class="navbar">
      <a href="#/">Accueil</a>
      <a href="#/apropos">À Propos</a>
      <a href="#/service">Services</a>
      <a href="#contact">Contact</a>
      <component :is="currentView" />
    </div>
</template>