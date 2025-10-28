import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { z } from "zod"
import { categorySchema } from "../../../schemas/categorySchema"
import InputForm from "../../../components/form/components/InputForm"

type CategoryFormValues = z.infer <typeof categorySchema>

function CategoryForm({onSubmit}: {onSubmit: (data: CategoryFormValues) => void}) {

    const { control, handleSubmit, formState: {errors}} = useForm<CategoryFormValues>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            category_name: "",
            description: "",
        },

    })
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputForm
        name="category_name"
        control={control}
        label="Category Name"
        placeholder="Enter a category"
        error={errors.category_name?.message}
      />

      <InputForm
        name="description"
        control={control}
        label="Description"
        placeholder="Description"
        error={errors.description?.message}
      />

      <button type="submit">Add Category</button>
    </form>
  )
}

export default CategoryForm
