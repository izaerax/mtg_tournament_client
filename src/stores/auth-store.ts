import { AxiosError } from 'axios';
import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';

export interface LoginFormRequest {
  email: string;
  password: string;
}

export interface RegisterFormRequest {
  name: string;
  email: string;
  firstname: string;
  lastname: string;
  dci_number: number;
  password: string;
  password_confirmation: string;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    name: '',
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    dci_number: 0,
    token: '',
  }),

  getters: {
    username: (state) => state.email,
    isAuthenticated: (state) => state.token != '',
  },

  actions: {
    logout() {
      this.name = '';
      this.email = '';
      this.password = '';
      this.firstname = '';
      this.lastname = '';
      this.dci_number = 0;
      this.token = '';
    },

    async login(form: LoginFormRequest): Promise<boolean> {
      try {
        const resp = await api.post('/login', form);
        this.name = resp.data.name;
        this.firstname = resp.data.firstname;
        this.lastname = resp.data.lastname;
        this.email = resp.data.email;
        this.dci_number = resp.data.dci_number;
        this.token = resp.data.token;
        return true;
      } catch (e) {
        console.debug(e);
        if (e instanceof AxiosError) {
          alert(e.response?.data.message);
          console.error(e.response?.data.message);
        } else {
          alert('errore durante la login');
        }
        return false;
      }
    },

    async register(form: RegisterFormRequest): Promise<boolean> {
      try {
        const resp = await api.post('/register', form);
        this.name = resp.data.name;
        this.firstname = resp.data.firstname;
        this.lastname = resp.data.lastname;
        this.email = resp.data.email;
        this.dci_number = resp.data.dci_number;
        this.token = resp.data.token;
        return true;
      } catch (e) {
        if (e instanceof AxiosError) {
          alert(e.response?.data.message);
          console.error(e.response?.data.message);
        } else {
          alert('errore durante la registrazione');
        }
        return false;
      }
    },
  },
});
