import React from 'react';
import { Container, Paper, Box } from '@mui/material';

function PageContainer({ children, maxWidth = 'md', sx = {} }) {
  return (
    <Container maxWidth={maxWidth}>
      <Box sx={{ py: 4 }}>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            borderRadius: 2,
            minHeight: '70vh',
            position: 'relative',
            ...sx
          }}
        >
          {children}
        </Paper>
      </Box>
    </Container>
  );
}

export default PageContainer;
