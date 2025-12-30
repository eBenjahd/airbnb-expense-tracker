import { useQuery } from '@tanstack/react-query'
import { api } from "../api/client"

export interface CategorySummaryItem {
    category__category_name: string,
    total: number,
}

export interface CategorySummaryParams {
    year?: number
    month?: number
}

export const useSummaryCategorybyMonth = (params?: CategorySummaryParams) => {

    return useQuery<CategorySummaryItem[]>({
        queryKey: ['categoryByMonth', params],
        queryFn: async () => {
            const { data } = await api.get<CategorySummaryItem[]>(
                '/expenses/summary_by_category_month/',
                { params}
            )
            return data
        },

        staleTime: 1000 * 60 * 5,
        retry: false,
    })
}