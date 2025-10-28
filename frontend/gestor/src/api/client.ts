import axios from 'axios'
import Cookies from 'js-cookie'

export const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL || 'http://localhost:8000/api',
    withCredentials: true,
})

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true

            const refreshToken = Cookies.get('refreshToken')

            if (!refreshToken) {
                return Promise.reject(error)
            }
            
            try {
                const { data } = await axios.post(
                    `${import.meta.env.VITE_BASE_URL || 'http://localhost:8000/api'}/token/refresh/`,
                    {refresh : refreshToken},
                )

                Cookies.set('accessToken', data.access, {expires: 1})
                originalRequest.headers['Authorization'] = `Bearer ${data.access}`;

                console.log('✅ Nuevo accessToken generado:', data.access);

                return api(originalRequest);
            } catch (refreshError){

                Cookies.remove('accessToken');
                Cookies.remove('refreshToken');
                return Promise.reject(refreshError);

            }

        }
        return Promise.reject(error);
    }
)