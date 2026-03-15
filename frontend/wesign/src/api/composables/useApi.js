import { ref } from 'vue'
import { handleApiError } from '@/api/utils/error-handler'

export function useApi(apiFunction) {
  const data = ref(null)
  const loading = ref(false)
  const error = ref(null)
  
  const execute = async (...args) => {
    loading.value = true
    error.value = null
    
    try {
      data.value = await apiFunction(...args)
      return data.value
    } catch (err) {
      error.value = handleApiError(err)
      throw error.value
    } finally {
      loading.value = false
    }
  }
  
  return {
    data,
    loading,
    error,
    execute
  }
}