<template>
  <main class="window-height row justify-center items-center">
    <q-card flat bordered class="login-card q-py-md">
      <q-card-section>
        <div class="text-h6 text-center q-pt-xs">EBT Tournament</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit="onSubmit()" class="q-px-xl">
          <q-input
            type="email"
            v-model="form.email"
            name="email"
            label="email"
            outlined
            :rules="[(val) => (val && val.length > 0) || 'Campo richiesto']"
            class="q-mb-md"
          />
          <q-input
            type="password"
            v-model="form.password"
            outlined
            name="password"
            label="password"
            :rules="[(val) => (val && val.length > 0) || 'Campo richiesto']"
            class="q-mb-lg"
          />
          <q-btn
            type="submit"
            label="Login"
            color="primary"
            class="full-width q-mb-md"
          />
          <q-btn
            label="Registrati"
            flat
            class="full-width"
            @click="onRegister()"
          />
        </q-form>
      </q-card-section>
    </q-card>
  </main>
</template>

<script setup lang="ts">
import { LoginFormRequest, useAuthStore } from 'src/stores/auth-store';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const form = ref<LoginFormRequest>({
  email: authStore.email,
  password: authStore.password,
});

const onSubmit = async () => {
  await authStore.login(form.value);
  router.push({ name: 'Homepage' });
};

const onRegister = () => {
  router.push({ name: 'Register' });
};
</script>

<style lang="scss">
.login-card {
  min-width: 330px;
}
</style>
