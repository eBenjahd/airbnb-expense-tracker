import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { loginSchema, type LoginFormValues } from "../../schemas/authSchema";
import { loginUser } from "../../api/authAPI";
import Cookies from "js-cookie";
import { useState } from "react";
import Form from "./components/Form";

function LoginForm() {

    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()
    const { control, handleSubmit, formState: { errors }, reset } = useForm<LoginFormValues>({
        resolver:zodResolver(loginSchema),
        defaultValues: {
            email:"",
            password:""
        }
    });

    const onSubmit = async(data: LoginFormValues) => {
        try {
            const res = await loginUser(data);

            Cookies.set("accessToken", res.tokens.access, { expires: 1 });
            Cookies.set("refreshToken", res.tokens.refresh, { expires: 7 });

            console.log(`User logged in: ${res.user.email}`); // debug

            navigate('/', {replace: true})
            reset();
            setError(null);

        } catch (err: any) {
            console.log("Error while logging in."); // debug
            setError(err.response?.data?.non_field_errors || "Something unexpected happened.");
        }
    }

    const fields = [
        { name: "email", label: "Email", placeholder: "email@email.com" },
        { name: "password", label: "Password", placeholder: "********", type: "password" },
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

export default LoginForm
