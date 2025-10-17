import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterFormValues } from "../../schemas/authSchema";
import { registerUser } from '../../api/authAPI';
import Cookies from 'js-cookie';
import { useState } from 'react';
import Form from './components/Form';

function RegisterForm() {

    const [error,setError] = useState<string | null>(null)
    const { control, handleSubmit, formState: { errors }, reset } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          },
      });

    const onSubmit = async(data: RegisterFormValues) => {
        try {
            const res = await registerUser(data)

            Cookies.set('accessToken', res.tokens.access, { expires: 1 })
            Cookies.set('refreshToken', res.tokens.refresh, { expires: 7 })
            
            console.log(`User registered correctly: ${res.user}`) // debug, erase in production

            reset()
            setError(null)
        } catch (err: any) {

            console.log(`Error while registering user.`) // debug, erase in production
            setError(err.response?.data?.email || 'Error while creating user.');
        }
    } 

    const fields = [
        { name: "name", label: "Name", placeholder: "Name" },
        { name: "email", label: "Email", placeholder: "email@email.com" },
        { name: "password", label: "Password", placeholder: "********", type: "password" },
        { name: "confirmPassword", label: "Confirm password", placeholder: "********", type: "password" },
      ];
  return (
    <>
        <Form 
            fields={fields}
            control={control}
            errors={errors}
            onSubmit={handleSubmit(onSubmit)}
        />

        {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
    </>
  )
}

export default RegisterForm
