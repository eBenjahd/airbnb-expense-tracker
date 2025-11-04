import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/client";

export interface ExpenseInput {
  description: string;
  amount: number;
  category: string;
}

export interface ExpenseResponse {
  id: number;
  description: string;
  amount: number;
  category: string;
  created_at: string;
}

export const useAddExpense = () => {
  const queryClient = useQueryClient();

  return useMutation<ExpenseResponse, any, ExpenseInput>({
    mutationFn: async (newExpense) => {
      const { data } = await api.post<ExpenseResponse>("/expenses/", newExpense);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenseSummaryByCategory"] }); {/* Objects */}
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      queryClient.invalidateQueries({ queryKey: ["summaryDashboard"] });
    },
  });
};