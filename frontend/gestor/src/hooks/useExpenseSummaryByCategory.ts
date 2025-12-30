import { useQuery } from "@tanstack/react-query";
import { api } from "../api/client";

export interface CategoryParams {
    year?: string
    month?: string
}

export interface CategorySummary {
    category__category_name: string,
    total: number,
    period?: string,
}

export const useExpenseSummaryByCategory = (params?: CategoryParams) => {

    return useQuery<CategorySummary[]>({
        queryKey: ['expenseSummaryByCategory', params],
        queryFn: async () => {
            const {data} = await api.get<CategorySummary[]>(
                '/expenses/summary_by_category/',
                { params }
            )
    
            return data
        },
        staleTime: 1000 * 60 * 5,
        retry: false
    })
}

