import { useForm } from "react-hook-form";
import { connectionSchema, type ConnectionFormData } from "../schemas/connections-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { addConnection, updateConnection, type Connection } from "../connections.model";
import { useEffect } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { ConnectionsForm } from "./connections-form";
import { useCloseDialog } from "../../../components/dialog/dialog-app";

interface ConnectionsDialogProps {
    mode?: "create" | "edit";
    initialData?: Connection
    clientId: string
}

export function ConnectionsDialog(props: ConnectionsDialogProps) {
    const { clientId, mode, initialData } = props

    const onClose = useCloseDialog()

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<ConnectionFormData>({
        resolver: zodResolver(connectionSchema),
        defaultValues: {
            name: initialData?.name || "",
        },
    });

    useEffect(() => {
        reset({
            name: initialData?.name || "",
        });
    }, [initialData, reset]);

    const handleClose = () => {
        onClose();
        reset();
    };

    const handleFormSubmit = async (data: ConnectionFormData) => {
        if (mode === "create") {
            await addConnection(clientId, data.name);
        } else if (initialData?.id) {
            await updateConnection(initialData.id, data);
        }
        handleClose();
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <DialogTitle>
                {mode === "create" ? "Nova conexão" : "Editar conexão"}
            </DialogTitle>
            <DialogContent>
                <ConnectionsForm control={control} errors={errors} />
            </DialogContent>
            <DialogActions>
                <Button variant='outlined' color={'error'} type='button' fullWidth onClick={onClose}>Cancelar</Button>
                <Button
                    variant="contained"
                    type="submit"
                    loading={isSubmitting}
                    fullWidth
                >
                    {mode === "create" ? "Adicionar" : "Salvar"}
                </Button>
            </DialogActions>
        </form>
    );
}