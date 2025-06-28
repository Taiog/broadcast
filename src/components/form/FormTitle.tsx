import { Typography } from "@mui/material";

interface FormTitleProps {
    title: string;
    subtitle: string;
}

const FormTitle = ({ title, subtitle }: FormTitleProps) => (
    <div>
        <Typography variant="h5" className="text-center font-semibold text-gray-800">
            {title}
        </Typography>
        <Typography variant="body2" className="text-center text-gray-500 mt-1">
            {subtitle}
        </Typography>
    </div>
);

export default FormTitle;
