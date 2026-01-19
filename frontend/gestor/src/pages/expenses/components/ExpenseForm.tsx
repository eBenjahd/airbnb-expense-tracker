import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { z } from "zod"
import { expenseSchema } from "../../../schemas/expenseSchema"
import InputForm from "../../../components/form/components/InputForm"
import SelectForm from "../../../components/form/components/SelectForm"
import { useCategoryContext } from "../../../context/CategoryContext"

type ExpenseFormValues = z.infer<typeof expenseSchema>

function ExpenseForm({onSubmit}: { onSubmit: (data: ExpenseFormValues) => void }) {


    const { categories } = useCategoryContext()

    const {control, handleSubmit, formState: {errors}} = useForm<ExpenseFormValues>({
        resolver: zodResolver(expenseSchema),
        defaultValues: {
            title: "",
            amount: "",
            payment_method: "cash",
            category: "",
            supplier: "",
            description: "",
          },
    })
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputForm
        name="title"
        control={control}
        label="Title"
        placeholder="Expense title"
        error={errors.title?.message}
        disabled={disabled}
      />

      <InputForm
        name="amount"
        control={control}
        label="Amount"
        type="number"
        placeholder="Amount"
        error={errors.amount?.message}
        disabled={disabled}
      />

      <SelectForm
        name="payment_method"
        label="Payment Method"
        control={control}
        error={errors.payment_method?.message}
        options={[
          { value: "cash", label: "Cash" },
          { value: "bank_transfer", label: "Bank Transfer" },
          { value: "yape", label: "Yape" },
          { value: "plin", label: "Plin" },
          { value: "other", label: "Other" },
        ]}
      />

      <SelectForm
        name="category"
        label="Category"
        control={control}
        error={errors.category?.message}
        options={[
          { value: "", label: "Select a category" },
          ...(categories?.map(c => ({
            value: c.id,
            label: c.category_name,
          })) || []),
        ]}
      />

      <InputForm
        name="supplier"
        control={control}
        label="Supplier"
        placeholder="Service supplier"
        error={errors.supplier?.message}
        disabled={disabled}
      />

      <InputForm
        name="description"
        control={control}
        label="Description"
        placeholder="Describe your expense..."
        error={errors.description?.message}
        disabled={disabled}
      />

      <button type="submit" disabled={disabled}>Add Expense</button>
    </form>
  )
}

export default ExpenseForm
