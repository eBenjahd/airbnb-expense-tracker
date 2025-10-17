import { z } from "zod";

// LOGIN
export const loginSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email")
    .min(1, "Email is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long"),
});

// REGISTER
export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z
    .string()
    .email("Please enter a valid email")
    .min(1, "Email is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long"),
  confirmPassword: z
    .string()
    .min(8, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type LoginFormValues = z.infer<typeof loginSchema>
export type RegisterFormValues = z.infer<typeof registerSchema>