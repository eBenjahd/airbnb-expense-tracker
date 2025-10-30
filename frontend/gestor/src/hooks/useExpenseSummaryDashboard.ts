import { useQuery } from "@tanstack/react-query";
import { api } from "../api/client";

export interface DashboardParams {
    year?: string
    month?: string
}

export interface SummaryDashboard {
    year: number
    year_total: number
    month_total: number
    average_expense: number
}

export const useExpenseSummaryDashboard = (params? : DashboardParams ) => {
    return useQuery<SummaryDashboard>({
        queryKey: ['summaryDashboard', params],
        queryFn: async () => {
            const { data } = await api.get<SummaryDashboard>(
                '/expenses/summary_dashboard',
                { params }
            )

            return data
        },
        staleTime: 1000 * 60 * 5,
        retry: false
    })
}