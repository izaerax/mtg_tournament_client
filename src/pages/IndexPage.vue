<template>
  <q-page class="row q-pa-xl">
    <div class="full-width row">
      <LeagueComponent class="col-12 q-mb-xl" v-for="league in leagueStore.leagues" :key="league.id" :league="league"/>
    </div>
    </q-page>
</template>

<script setup lang="ts">
import { useLeagueStore } from 'src/stores/league-store';
import LeagueComponent from 'src/components/LeagueComponent.vue';
import { onBeforeMount } from 'vue';

const leagueStore = useLeagueStore();

onBeforeMount(leagueStore.loadList)
</script>
