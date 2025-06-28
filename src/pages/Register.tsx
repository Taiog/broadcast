import { useNavigate, Link } from "react-router-dom";
import { Paper, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Screen from "../components/screen/Screen";
import FormTitle from "../components/form/FormTitle";
import FormInput from "../components/form/FormInput";
import PasswordInput from "../components/form/PasswordInput";
import ErrorMessage from "../components/form/ErrorMessage";
import SubmitButton from "../components/form/SubmitButton";
import { registerSchema, type RegisterFormData } from "../schemas/registerSchema";
import { useRegister } from "../hooks/useRegister";

function Register() {
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
                    <PasswordInput {...register("password")} error={errors.password} />
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

export default Register;
