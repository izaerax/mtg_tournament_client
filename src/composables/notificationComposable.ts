import { Notify } from 'quasar';

const showError = (message: string) => {
  Notify.create({
    type: 'negative',
    message: message,
    position: 'bottom',
  });
};

export function useNotifications() {
  return {
    showError,
  };
}
