import { useQuery } from "@tanstack/react-query";
import { api } from "../api/client";

export interface MonthRangeParams {
    from?: string
    to?: string
}

// for backend response 
export interface MonthlyExpenseSummary {
    month: string
    total: number
}

export const useExpenseSummaryByMonth = (params?: MonthRangeParams) => {
    
    return useQuery<MonthlyExpenseSummary[]>({
        queryKey: ['expenseSummaryByMonth', params],
        queryFn: async () => {
            const {data} = await api.get<MonthlyExpenseSummary[]>(
                '/expenses/summary_by_month/',
                { params }
            )

            return data
        },
        staleTime: 1000 * 60 * 5,
        retry: false
    })
}