<template>
  <main class="window-height row justify-center items-center">
    <q-card flat bordered class="login-card q-py-md">
      <q-card-section>
        <div class="text-h6 text-center q-pt-xs">EBT Tournament</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit="onSubmit()" class="q-px-xl">
          <q-input
            v-model="registerForm.name"
            name="name"
            label="Nome"
            outlined
            class="q-mb-md"
          />
          <q-input
            type="email"
            v-model="registerForm.email"
            name="email"
            label="Email"
            outlined
            class="q-mb-md"
          />
          <q-input
            type="password"
            v-model="registerForm.password"
            outlined
            name="password"
            label="Password"
            class="q-mb-md"
          />
          <q-input
            type="password"
            v-model="registerForm.password_confirmation"
            outlined
            name="password_confirmation"
            label="Conferma password"
            class="q-mb-lg"
          />
          <q-btn
            type="submit"
            label="Registrati"
            color="primary"
            class="full-width q-mb-md"
          />
          <q-btn class="full-width q-mb-md" flat @click="onLogin()"
            >Login</q-btn
          >
        </q-form>
      </q-card-section>
    </q-card>
  </main>
</template>

<script setup lang="ts">
import { RegisterFormRequest, useAuthStore } from 'src/stores/auth-store';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const registerForm = ref<RegisterFormRequest>({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
});

const onSubmit = async () => {
  await authStore.register(registerForm.value);
};

const onLogin = async () => {
  router.push({ name: 'Login' });
};
</script>

<style lang="scss">
.login-card {
  min-width: 330px;
}
</style>
