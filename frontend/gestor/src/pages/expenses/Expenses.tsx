import ExpenseForm from "./components/ExpenseForm"
import CategoryForm from "./components/CategoryForm"
import { api } from "../../api/client"
import { useState } from "react"
import { useCategoryContext } from "../../context/CategoryContext"
import { useAddExpense } from "../../hooks/useAddExpense"
import { useQueryClient } from '@tanstack/react-query';

function Expenses() {  

  const {categories, refetch} = useCategoryContext()
  const { mutate: addExpense} = useAddExpense();
  const hasCategories = categories && categories.length > 0

  const queryClient = useQueryClient();

  const [categorySuccess, setCategorySuccess] = useState<string | null>(null)
  const [categoryError, setCategoryError] = useState<string | null>(null)
  const [expenseError, setExpenseError] = useState<string | null>(null)
  const [expenseSuccess, setExpenseSuccess] = useState<string | null> (null)

  const handleAddCategory = async (data: any) => {
      try {
        setCategoryError(null)
        setCategorySuccess(null)

        await api.post('/categories/', data)
        setCategorySuccess(`Category added successfully.`)
        
        await refetch()

      } catch (error: any) {
        
        if (error.response) {
          console.log(`Backend error: ${error.response.data}`)
          setCategoryError(JSON.stringify(error.response.data, null, 2))
        } else { 
          setCategoryError("Somethin went wrong. Please try again.")
        }
      }
  }

  const handleAddSubmit = async (data: any) => {

    addExpense(data, {
      onSuccess: () => {
        setExpenseSuccess("Expense added successfully")
        queryClient.invalidateQueries({
          queryKey: ['categoryByMonth']
        })
      },
      onError: (error: any) => {
        if (error.response) {
          setExpenseError(JSON.stringify(error.response.data, null, 2));
        } else {
          setExpenseError("Something went wrong. Please try again.");
        }
      },
    });
    
  }
  return (
    <main>
      
      <h2>Expenses</h2>

      {/* --- CATEGORY FORM --- */}
      <CategoryForm onSubmit={handleAddCategory} />
      {categorySuccess && <p style={{ color: "green" }}>{categorySuccess}</p>}
      {categoryError && <p style={{ color: "red" }}>{categoryError}</p>}

      <hr />

      {/* --- EXPENSE FORM --- */}
      {!hasCategories ? (
        <p style={{ color: "gray" }}>
          ⚠️ You must add at least one category before adding expenses.
        </p>
      ) : (
        <>
          <ExpenseForm onSubmit={handleAddSubmit} />
          {expenseSuccess && <p style={{ color: "green" }}>{expenseSuccess}</p>}
          {expenseError && <p style={{ color: "red" }}>{expenseError}</p>}
        </>
      )}
    </main>
  )
}

export default Expenses
