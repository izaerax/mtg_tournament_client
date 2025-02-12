<template>
  <q-page>
    <q-form autofocus method="post" @submit.prevent="onSubmit()">
      <q-card >
        <q-card-section>
          <h3 class="text-h6 text-primary" >Nuova Lega</h3>
        </q-card-section>
        <q-card-section>
            <q-input class="q-pb-md" type="text" outlined name="name"  v-model="form.name" label="Nome lega" />
            <q-input class="q-pb-md" type="number" outlined name="rounds" v-model="form.rounds" label="Numero Turni" />
            <q-input class="q-pb-md" type="number" outlined name="games" v-model="form.games" label="Numero Games" />
            <q-input class="q-pb-md" type="number" outlined name="duration" v-model="form.duration" label="Durata turno" />
            <q-input class="q-pb-md" type="number" outlined name="sub_fee" v-model="form.sub_fee" label="Quota iscrizione" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn padding="sm lg" class="q-px-md" type="submit" color="primary" label="Crea"/>
          <q-btn padding="sm lg" flat class="q-px-md" type="cancel" color="secondary" label="Annulla" @click="onCancel()"/>
        </q-card-actions>
      </q-card>
    </q-form>
  </q-page>
</template>
<script setup lang="ts">
import { AxiosError } from 'axios';
import { api } from 'src/boot/axios';
import { useAuthStore } from 'src/stores/auth-store';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const authStore = useAuthStore();

const form = ref({
  name: '',
  games: 3,
  rounds: 4,
  duration: 45,
  sub_fee: 5,
})

const onSubmit = async () => {
  try {
    await api.post('/leagues', form.value, {
      headers: {
        Authorization: `Bearer ${authStore.token}`
      }
    })
    router.push({name: 'Homepage'})
  } catch (e) {
    if (e instanceof AxiosError) {
      alert(e.response?.data.message);
      console.error(e.response?.data.message);
    } else {
      alert('errore durante la creazione della lega');
    }
  }
}
const onCancel = () => {
  router.push({name: 'Homepage'})
}
</script>
