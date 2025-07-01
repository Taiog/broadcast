import { Box, Divider, Typography } from '@mui/material'
import { type PropsWithChildren } from 'react'

interface ColumnProps extends PropsWithChildren {
    title: string
}
function Column(props: ColumnProps) {
    const { title, children } = props
    return (
        <Box height="100%" borderRight="1px solid #ccc" overflow="auto" width="100%" display={'flex'} gap={'10px'} flexDirection={'column'}>
            <Typography variant="subtitle1" pt={2} color="black" align="center">
                {title}
            </Typography>
            <Divider color="#ccc" className="m-1" />
            {children}
        </Box>
    )
}

export default Column