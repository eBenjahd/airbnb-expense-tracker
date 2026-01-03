import { z } from "zod"

export const categorySchema = z.object({
    category_name: z.string()
        .min(1,'Category name is required')
        .max(100,'Ensure this field has no more than 100 characters.')
        .transform((val) => val.trim()),
    description: z.string()
        .max(700,'Ensure this field has no more than 700 characters.')
        .optional()
})