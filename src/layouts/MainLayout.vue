<template>
  <q-layout view="hHh Lpr lFr">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Torneo EBT
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EssentialLink, { EssentialLinkProps } from 'components/EssentialLink.vue';
import { useAuthStore } from 'src/stores/auth-store';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const essentialLinks: EssentialLinkProps[] = [
  {
    title: 'Homepage',
    caption: 'Panoramica dei tornei e leghe',
    icon: 'dashboard',
    action: linkAction('Homepage')
  },
  {
    title: 'Nuova Lega',
    caption: 'Inizia una lega composta da tornei',
    icon: 'add',
    action: linkAction('NewLeague')
  },
  {
    title: 'Giocatori',
    caption: 'Gestione dei giocatori registrati',
    icon: 'group',
    action: linkAction('Players')
  },
  {
    title: 'Profilo',
    caption: 'Gestione del profilo utente',
    icon: 'person',
    action: linkAction('Profile')
  },
  {
    title: 'Logout',
    caption: 'Disconnettiti dalla piattaforma',
    icon: 'logout',
    action: logout
  }
];

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}


function linkAction(routeName: string) {
  return () => router.push({name: routeName});
}

function logout() {
  authStore.logout()
  router.push({name: 'Login'})
}
</script>
