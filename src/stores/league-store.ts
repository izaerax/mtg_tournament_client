import { AxiosError } from 'axios';
import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { ref } from 'vue';
import { useAuthStore } from './auth-store';

export interface Tournament {
  id: number,
  date: string,
  rounds: number,
  games: number,
  duration: number,
  winner: string,
  prize: string,
  players: number
}

export interface League {
  id?: number,
  name: string,
  tournaments: Tournament
}

export const useLeagueStore = defineStore('league', () => {

  const authStore = useAuthStore();
  const leagues = ref<League[]>([])

  const loadList = async () => {
    try{
      const response = await api.get('leagues', {
        headers: {
          Authorization: `Bearer ${authStore.token}`
        }
      });
      leagues.value = response.data.data;
    } catch(e) {
      if (e instanceof AxiosError) {
        alert(e.response?.data.message);
        console.error(e.response?.data.message);
      } else {
        alert('errore durante il caricamento delle leghe');
      }
    }
  }

  return {
    leagues,
    loadList
  }
});
