import type { PropsWithChildren, ReactNode } from "react";
import { FormTitle } from "../../../components/form/form-title";
import { ErrorMessage } from "../../../components/form/error-message";
import { SubmitButton } from "../../../components/form/submit-button";
import Typography from "@mui/material/Typography";

interface AuthFormBaseProps extends PropsWithChildren {
    title: string;
    subtitle: string;
    errorMessage: string;
    loading: boolean;
    footer?: ReactNode;
    buttonText: string
};
export function AuthFormBase(props: AuthFormBaseProps) {
    const { buttonText, children, errorMessage, loading, subtitle, title, footer } = props

    return (
        <div className="flex flex-col gap-6">
            <FormTitle title={title} subtitle={subtitle} />
            {children}
            <ErrorMessage message={errorMessage} />
            <SubmitButton loading={loading} text={buttonText} />
            {footer && (
                <Typography variant="body2" className="text-center text-gray-600">
                    {footer}
                </Typography>
            )}
        </div>
    );
}