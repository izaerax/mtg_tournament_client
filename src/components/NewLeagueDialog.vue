<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      
      <q-card-section>
          <h3 class="text-h6 text-primary" >Nuova Tappa</h3>
        </q-card-section>
        <q-card-section>
            <q-input class="q-pb-md" type="text" outlined name="name"  v-model="form.name" label="Nome lega" />
            <q-input class="q-pb-md" type="number" outlined name="rounds" v-model="form.rounds" label="Numero Turni" />
            <q-input class="q-pb-md" type="number" outlined name="games" v-model="form.games" label="Numero Games" />
            <q-input class="q-pb-md" type="number" outlined name="duration" v-model="form.duration" label="Durata turno" />
            <q-input class="q-pb-md" type="number" outlined name="sub_fee" v-model="form.sub_fee" label="Quota iscrizione" />
        </q-card-section>
      
      <!-- buttons example -->
      <q-card-actions align="right">
        <q-btn color="primary" label="OK" @click="onOKClick" />
        <q-btn color="primary" label="Cancel" @click="onDialogCancel" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { useDialogPluginComponent } from 'quasar'
import { MtgForm } from 'src/types'
import { AxiosError } from 'axios';
import { api } from 'src/boot/axios';
import { useAuthStore } from 'src/stores/auth-store';
import { ref } from 'vue';


const authStore = useAuthStore();
const form = ref({
  name: '',
  games: 3,
  rounds: 4,
  duration: 45,
  sub_fee: 5,
})

defineEmits([
  ...useDialogPluginComponent.emits
])

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

async function onOKClick () {
  try {
    await api.post('/leagues', form.value, {
      headers: {
        Authorization: `Bearer ${authStore.token}`
      }
    })
    onDialogOK()
  } catch (e) {
    if (e instanceof AxiosError) {
      alert(e.response?.data.message);
      console.error(e.response?.data.message);
    } else {
      alert('errore durante la creazione della lega');
    }
  }
}
</script>