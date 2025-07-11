import Button from '@mui/material/Button'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { useCloseDialog } from './dialog-app'

interface AlertDialogProps {
    title: string
    description: string
    buttonText: string
    onClick: () => Promise<void>
}
export function AlertDialog(props: AlertDialogProps) {
    const { buttonText, description, title, onClick } = props

    const onClose = useCloseDialog()
    return (
        <>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{description}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant='outlined' color={'error'} type='button' fullWidth onClick={onClose}>Cancelar</Button>
                <Button
                    variant="contained"
                    fullWidth
                    color='error'
                    onClick={() => {
                        onClick()
                        onClose()
                    }}
                >
                    {buttonText}
                </Button>
            </DialogActions>
        </>
    )
}
