<template>
  <q-card bordered flat>
    <q-card-section class="q-py-none">
      <h3 class="text-h6 text-primary">{{ league.name }}</h3>
    </q-card-section>

    <q-card-section class="q-pa-none">
      <q-table
        class="q-pa-none q-ma-none"
        title="Tappe"
        :rows="league.tournaments"
        :columns="tournamentColumns"
        hide-pagination
        flat
      />
    </q-card-section>

    <q-card-actions align="right">
      <q-btn color="primary" label="nuova tappa" />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import { QTableColumn } from 'quasar';
import { League } from 'src/stores/league-store';
defineProps<{league: League}>()

const tournamentColumns: QTableColumn[] = [
  {
    field: 'date',
    label: 'Data',
    name: 'date',
    align: 'left',
    format: (val) => (new Date(val)).toLocaleDateString()
  },{
    field: 'playersCount',
    label: 'Iscritti',
    name: 'playersCount',
  },{
    field: 'duration',
    label: 'Tempo round',
    name: 'duration',
    format: (val) => `${val} min`
  },{
    field: 'prize',
    label: 'Montepremi',
    name: 'prize',
    format: (val) => `${val || '-'} €`
  },{
    field: 'winner',
    label: 'Vincitore',
    name: 'winner',
    format: (val) => `${val || ''}`
  },
]
</script>

<style lang="scss">

</style>
