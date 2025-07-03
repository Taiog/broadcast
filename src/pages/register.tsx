import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterFormData } from "../apps/auth/schemas/register-schema";
import { useRegister } from "../apps/auth/hooks/use-register";
import { Screen } from "../components/screen/screen";
import { FormTitle } from "../components/form/form-title";
import { FormInput } from "../components/form/form-input";
import { PasswordInput } from "../components/form/password-input";
import { ErrorMessage } from "../components/form/error-message";
import { SubmitButton } from "../components/form/submit-button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export function Register() {
    const navigate = useNavigate();

    const { register: registerUser, loading, error } = useRegister();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema)
    });

    const onSubmit = async (data: RegisterFormData) => {
        const result = await registerUser(data.email, data.password);

        if (result.success) {
            navigate("/dashboard");
        }
    };

    return (
        <Screen>
            <Paper elevation={4} className="p-8 w-full max-w-md rounded-xl">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                    <FormTitle title="Criar conta" subtitle="Registre-se com seu email" />
                    <FormInput {...register("email")} label="Email" error={errors.email} />
                    <PasswordInput {...register("password")} error={errors.password} label="Senha" />
                    <ErrorMessage message={error} />
                    <SubmitButton loading={loading} text="Cadastrar" />
                    <Typography variant="body2" className="text-center text-gray-600">
                        Já tem uma conta?{" "}
                        <Link to="/login" className="text-blue-600 hover:underline">
                            Fazer login
                        </Link>
                    </Typography>
                </form>
            </Paper>
        </Screen>
    );
}