import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useLogin } from "../apps/auth/hooks/use-login";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "../apps/auth/schemas/login-schema";
import { Screen } from "../components/screen/screen";
import { FormTitle } from "../components/form/form-title";
import { FormInput } from "../components/form/form-input";
import { PasswordInput } from "../components/form/password-input";
import { ErrorMessage } from "../components/form/error-message";
import { SubmitButton } from "../components/form/submit-button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export function Login() {
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
            navigate("/dashboard");
        }
    };

    return (
        <Screen>
            <Paper elevation={4} className="p-8 w-full max-w-md rounded-xl">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                    <FormTitle title="Login" subtitle="Acesse sua conta com email e senha" />
                    <FormInput {...register("email")} label="Email" error={errors.email} />
                    <PasswordInput {...register("password")} error={errors.password} label="Senha" />
                    <ErrorMessage message={error} />
                    <SubmitButton loading={loading} text="Entrar" />
                    <Typography variant="body2" className="text-center text-gray-600">
                        Ainda não tem conta?{" "}
                        <Link to="/register" className="text-blue-600 hover:underline">
                            Criar conta
                        </Link>
                    </Typography>
                </form>
            </Paper>
        </Screen>
    );
}