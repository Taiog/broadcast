import Typography from "@mui/material/Typography";

interface FormTitleProps {
    title: string;
    subtitle: string;
}

export function FormTitle(props: FormTitleProps) {
    const { title, subtitle } = props

    return (<div>
        <Typography variant="h5" className="text-center font-semibold text-gray-800">
            {title}
        </Typography>
        <Typography variant="body2" className="text-center text-gray-500 mt-1">
            {subtitle}
        </Typography>
    </div>)
}