<script setup>
import { ref } from 'vue'

// Données du formulaire
const formData = ref({
  name: '',
  email: '',
  message: ''
})

// État du formulaire envoyé
const submitted = ref(false)

// Fonction de soumission du formulaire

const submitForm = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData.value)
    });

    const data = await response.json();
    console.log(data); // Gérer la réponse du serveur

    // Si le formulaire est soumis avec succès, définir `submitted` à true
    submitted.value = true;
  } catch (error) {
    console.error('Erreur lors de l\'envoi du formulaire :', error);
  }
};
</script>

<template>
    <div>
    <h2>Contact Us</h2>
    <div class="formulaire">
        <form @submit.prevent="submitForm">
        <div>
            <label for="name">Name:</label>
            <input type="text" id="name" v-model="formData.name" required />
        </div>

        <div class="error-message">
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="formData.email" required />
            <span v-if="!formData.email && formSubmitted">Le champ email est requis</span>
        </div>

        <div>
            <label for="message">Message:</label>
            <textarea id="message" v-model="formData.message" required></textarea>
        </div>

        <button type="submit">Send</button>
        </form>
    </div>

    <div v-if="submitted" class="success-message">
      <h3>Thank you for contacting us, {{ formData.name }}!</h3>
      <p>We will get back to you at {{ formData.email }}.</p>
    </div>
  </div>
</template>

<style scoped>

.formulaire{
    display: flex ;
    justify-content: center;
}
form {
  max-width: 400px;
  margin: 20px 0;
}

div {
  margin-bottom: 10px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input, textarea {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>