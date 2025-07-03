import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import type { ReactNode } from 'react'

interface TableHeaderProps {
    buttonText: string
    buttonIcon: ReactNode
    handleOpenCreate: (event: React.MouseEvent<HTMLElement>) => void
    rightComponent?: ReactNode
}

export function TableHeader(props: TableHeaderProps) {
    const { buttonText, buttonIcon, handleOpenCreate, rightComponent } = props

    return (
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} padding={'6px'}>
            <Button
                variant="text"
                size="small"
                startIcon={buttonIcon}
                onClick={(e) => handleOpenCreate(e)}
            >
                {buttonText}
            </Button>
            {rightComponent}
        </Box>
    )
}