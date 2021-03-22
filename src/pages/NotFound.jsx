import React from 'react'
import { Box, Container } from '@material-ui/core'

export default function NotFound() {
    return (
        <Container m={3}>
            <Box style={{ textAlign: 'center' }}>
                <h2 style={{ color: '#eee', fontSize: "70px", borderBottom: "2px solid green" }}> 404 </h2>
                <h4>Not Found</h4>
            </Box>
        </Container>
    )
}
