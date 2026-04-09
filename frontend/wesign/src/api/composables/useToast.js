import { useToast as useToastOriginal } from 'vue-toastification'

export function useToast() {
  const toast = useToastOriginal()

  const showSuccess = (message) => {
    toast.success(message)
  }

  const showError = (message) => {
    toast.error(message)
  }

  const showWarning = (message) => {
    toast.warning(message)
  }

  return {
    showSuccess,
    showError,
    showWarning
  }
}
