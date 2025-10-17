import { useMutation } from "@tanstack/react-query";
import { loginUser, registerUser } from "../api/authAPI";
import type { LoginFormValues, RegisterFormValues } from "../schemas/authSchema";
import Cookies from 'js-cookie';

// Login hook
export const useLogin = () => {
    return useMutation({
      mutationFn: async (data: LoginFormValues) => {
        const response = await loginUser(data);
        
        Cookies.set("accessToken", response.tokens.access, { expires: 1 });
        Cookies.set("refreshToken", response.tokens.refresh, { expires: 7 });
  
        return response.user;
      },
    });
  };

// Register hook
export const useRegister = () => {
    return useMutation({
      mutationFn: async (data: RegisterFormValues) => {
        const response = await registerUser(data);
  

        Cookies.set("accessToken", response.tokens.access, { expires: 1 });
        Cookies.set("refreshToken", response.tokens.refresh, { expires: 7 });
  
        return response.user;
      },
    });
  };