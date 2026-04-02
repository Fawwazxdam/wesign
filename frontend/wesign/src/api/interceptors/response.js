import router from '@/router'
import { useToast } from 'vue-toastification'
import { addResponseInterceptor } from '../client'

const setupResponseInterceptor = () => {
    addResponseInterceptor(
        (response) => {
            document.body.classList.remove('loading')
            return response
        },
        async (error) => {
            document.body.classList.remove('loading')

            // Error from our custom fetch wrapper
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
                    const message = error.response.data?.message || 'Terjadi kesalahan. Silakan coba lagi.'
                    useToast().showError(message)
                }
            } else {
                useToast().showError('Tidak dapat terhubung ke server. Silakan periksa koneksi internet Anda.')
            }

            return Promise.reject(error)
        }
    )
}

export default setupResponseInterceptor