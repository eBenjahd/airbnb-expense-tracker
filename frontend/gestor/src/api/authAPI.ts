import { api } from './client';
import type { LoginFormValues, RegisterFormValues } from '../schemas/authSchema';

export interface AuthResponse {
    message: string
    user: {
        id: number
        name: string
        email: string
    }
    tokens: {
        refresh: string
        access: string
    }
}

// Login
export const loginUser = async (data: LoginFormValues): Promise<AuthResponse> => {
    const res = await api.post<AuthResponse>("/login/", data);
    return res.data;
};

// Register
export const registerUser = async (data: RegisterFormValues): Promise<AuthResponse> => {
    const res = await api.post<AuthResponse>("/register/",data);
    return res.data;
}