import { useQuery } from "@tanstack/react-query"
import { api } from '../api/client'
import type { Category } from "../types/category"

// ESTA FUNCION ES PARA HACER LA PETICION DE CATEGORIAS QUE SERA USADO DE MANERA POSTERIOR PARA ENVIAR
// UN ID/PK AL BACKEND QUE IDENTIFIQUE LA CATEGORIA

export const useCategory = () => {
    return useQuery<Category[], Error>({
        queryKey: ["categories"],
        queryFn: async () => {
            const { data } = await api.get<Category[]>('/categories/')

            return data
        }, 
        staleTime: 1000 * 60 * 5, // 5 minutos
        retry: false,
    })
}