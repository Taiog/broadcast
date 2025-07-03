import { zodResolver } from "@hookform/resolvers/zod";
import Paper from "@mui/material/Paper";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FormInput } from "../../../components/form/form-input";
import { PasswordInput } from "../../../components/form/password-input";
import { AuthFormBase } from "./auth-form-base";
import { useRegister } from "../hooks/use-register";
import { registerSchema, type RegisterFormData } from "../schemas/register-schema";

export function RegisterForm() {
    const navigate = useNavigate();

    const { register: registerUser, error, loading } = useRegister();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });;

    const onSubmit = async (data: RegisterFormData) => {
        const result = await registerUser(data.email, data.password);

        if (result.success) {
            navigate("/broadcast");
        }
    };

    return (
        <Paper elevation={4} className="p-8 w-full max-w-md rounded-xl">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                <AuthFormBase
                    title="Criar conta"
                    subtitle="Registre-se com seu email"
                    errorMessage={error || ''}
                    loading={loading}
                    buttonText="Cadastrar"
                    footer={
                        <>
                            Já tem uma conta?{" "}
                            <Link to="/login" className="text-blue-600 hover:underline">
                                Fazer login
                            </Link>
                        </>
                    }
                >
                    <FormInput {...register("email")} label="Email" error={errors.email} />
                    <PasswordInput {...register("password")} error={errors.password} label="Senha" />
                </AuthFormBase>
            </form>
        </Paper>
    );
}