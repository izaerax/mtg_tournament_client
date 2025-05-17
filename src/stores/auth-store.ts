import { AxiosError } from 'axios';
import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { ref } from 'vue';

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

export const useAuthStore = defineStore('auth', () => {
  const name = ref('')
  const email = ref('')
  const password = ref('')
  const firstname = ref('')
  const lastname = ref('')
  const dci_number = ref(0)
  const token = ref('')

  const isAuthenticated = () => token.value !== ''

  const logout = () => {
    name.value = '';
    email.value = '';
    password.value = '';
    firstname.value = '';
    lastname.value = '';
    dci_number.value = 0;
    token.value = '';
  }

  const login = async (form: LoginFormRequest): Promise<boolean> => {
    try {
      const resp = await api.post('/login', form);
      name.value = resp.data.name;
      firstname.value = resp.data.firstname;
      lastname.value = resp.data.lastname;
      email.value = resp.data.email;
      dci_number.value = resp.data.dci_number;
      token.value = resp.data.token;
      return true;
    } catch (e) {
      handleError(e)
      return false;
    }
  }

  const register = async (form: RegisterFormRequest): Promise<boolean> => {
    try {
      const resp = await api.post('/register', form);
      name.value = resp.data.name;
      firstname.value = resp.data.firstname;
      lastname.value = resp.data.lastname;
      email.value = resp.data.email;
      dci_number.value = resp.data.dci_number;
      token.value = resp.data.token;
      return true;
    } catch (e) {
      handleError(e)
      return false;
    }
  }

  const handleError = (e: unknown) => {
    if (e instanceof AxiosError) {
      alert(e.response?.data.message);
      console.error(e.response?.data.message);
    } else {
      alert('errore durante la registrazione');
    }
    return false;
  }

  return {
    name,
    email,
    password,
    firstname,
    lastname,
    dci_number,
    token,
    login,
    logout,
    register,
    isAuthenticated
  }
},{
  persist: {
    storage: sessionStorage,
  }
});
