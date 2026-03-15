import router from '@/router'
import { useToast } from 'vue-toastification'

const setupResponseInterceptor = (apiClient) => {
    apiClient.interceptors.response.use(
        response => {
            document.body.classList.remove('loading')

            return response.data
        },
        async error => {
            document.body.classList.remove('loading')

            if (error.response) {
                const status = error.response.status

                if (status === 401) {
                    localStorage.removeItem('access_token')
                    router.push({ name: 'Login' })
                    useToast().showError('Sesi berakhir. Silakan login kembali.')
                } else if (status === 403) {
                    useToast().showError('Anda tidak memiliki Akses untuk melakukan aksi ini.')
                } else if (status === 404) {
                    useToast().showError('Tidak ditemukan. Silakan periksa kembali permintaan Anda.')
                } else if (status >= 500) {
                    useToast().showError('Terjadi kesalahan pada server. Silakan coba lagi nanti.')
                } else {
                    useToast().showError(error.response.data.message || 'Terjadi kesalahan. Silakan coba lagi.')
                }
            } else {
                useToast().showError('Tidak dapat terhubung ke server. Silakan periksa koneksi internet Anda.')
            }

            return Promise.reject(error)
        }
    )
}

export default setupResponseInterceptor