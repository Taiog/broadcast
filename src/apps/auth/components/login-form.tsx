import { zodResolver } from "@hookform/resolvers/zod";
import Paper from "@mui/material/Paper";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FormInput } from "../../../components/form/form-input";
import { PasswordInput } from "../../../components/form/password-input";
import { useLogin } from "../hooks/use-login";
import { type LoginFormData, loginSchema } from "../schemas/login-schema";
import { AuthFormBase } from "./auth-form-base";

export function LoginForm() {
    const navigate = useNavigate();

    const { login, error, loading } = useLogin();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });;

    const onSubmit = async (data: LoginFormData) => {
        const result = await login(data.email, data.password);

        if (result.success) {
            navigate("/broadcast");
        }
    };

    return (
        <Paper elevation={4} className="p-8 w-full max-w-md rounded-xl">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                <AuthFormBase
                    title="Login"
                    subtitle="Acesse sua conta com email e senha"
                    errorMessage={error || ''}
                    loading={loading}
                    buttonText="Entrar"
                    footer={
                        <>
                            Ainda não tem conta?{" "}
                            <Link to="/register" className="text-blue-600 hover:underline">
                                Criar conta
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