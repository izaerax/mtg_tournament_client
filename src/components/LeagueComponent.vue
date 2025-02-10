<template>
  <q-card bordered flat>
    <q-card-section>
      <h3 class="text-h6">{{ league.name }}</h3>
    </q-card-section>

    <q-card-section>
      <q-table
        title="Tappe"
        :rows="league.tournaments"
        :columns="tournamentColumns"
        hide-pagination
      />
    </q-card-section>

    <q-card-actions align="right">
      <q-btn class="primary" label="nuova tappa" />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import { QTableColumn } from 'quasar';
import { League } from 'src/stores/league-store';
defineProps<{league: League}>()

const tournamentColumns: QTableColumn[] = [
  {
    field: 'id',
    label: 'ID',
    name: 'id',
  },{
    field: 'date',
    label: 'Data',
    name: 'date',
  },{
    field: 'rounds',
    label: 'Rounds',
    name: 'rounds',
  },{
    field: 'games',
    label: 'Games',
    name: 'games',
  },{
    field: 'duration',
    label: 'Tempo',
    name: 'duration',
  },
]
</script>

<style lang="scss">

</style>
