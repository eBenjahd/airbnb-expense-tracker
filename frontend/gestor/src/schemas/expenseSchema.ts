import { z } from "zod"

// Note: In this schema, I decided to hardcode the payment method options
// instead of fetching them dynamically from the backend.
// The reason is that this project is meant as a functional demo — 
// the main goal is to demonstrate full-stack integration between 
// the frontend (React + Zod + React Hook Form) and the backend (Django + DRF).

export const expenseSchema = z.object({
    title: z.string().min(1,'Title is required'),
    amount: z.string()
        .min(1, "Amount is required")
        .refine(val => !isNaN(Number(val)) && Number(val) > 0, {
        message: "Must be a number greater than 0",
    }),
    payment_method: z.enum(["cash", "bank_transfer", "yape", "plin", "other"],{
        error: 'Payment method is required',
    }),
    category: z
        .string()
        .min(1,'Category is required'),
    supplier: z
        .string()
        .max(100, 'Supplier name is too long')
        .optional(),
    description: z
        .string()
        .max(500, "Description is too long")
        .optional(),
})