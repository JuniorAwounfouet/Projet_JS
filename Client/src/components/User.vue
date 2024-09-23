<script setup>
import { ref } from 'vue'

defineProps({
  name: String,
  email: String,
  message: String,
  users: Array,
})


</script>

<template>

    <div v-for="(user, iUser) in users">
        {{ user.name }}
    </div>

</template>