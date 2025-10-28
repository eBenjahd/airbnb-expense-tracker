import { z } from "zod"

export const categorySchema = z.object({
    category_name: z.string()
        .min(1,'Category name is required')
        .transform((val) => val.trim()),
    description: z.string()
        .max(700)
        .optional()
})