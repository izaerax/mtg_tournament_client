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
  password: string;
  password_confirmation: string;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    name: '',
    email: '',
    password: '',
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
      this.token = '';
    },

    async login(form: LoginFormRequest): Promise<boolean> {
      try {
        const resp = await api.post('/login', form);
        this.name = resp.data.name;
        this.email = resp.data.email;
        this.token = resp.data.token;
        return true;
      } catch (e) {
        if (e instanceof AxiosError) {
          console.error(e.response?.data.message);
        }
        return false;
      }
    },

    async register(form: RegisterFormRequest): Promise<boolean> {
      try {
        const resp = await api.post('/register', form);
        this.name = resp.data.name;
        this.email = resp.data.email;
        this.token = resp.data.token;
        return true;
      } catch (e) {
        if (e instanceof AxiosError) {
          console.error(e.response?.data.message);
        }
        return false;
      }
    },
  },
});
