import React from 'react';
import Typography from '@mui/material/Typography';
import PageContainer from '../components/PageContainer';

function Home() {
  return (
    <PageContainer maxWidth="sm">
      <Typography 
        variant="h4" 
        component="h1" 
        gutterBottom
        sx={{ 
          fontFamily: "'Noto Serif SC', serif",
          fontWeight: 500,
          color: '#2c5530'
        }}
      >
        青萍之末
      </Typography>
      <Typography 
        variant="body1"
        sx={{ 
          fontFamily: "'Noto Serif SC', serif",
          color: '#333'
        }}
      >
        溪边青萍，静水流深。
        这是一片寻找内心平静的空间。
      </Typography>
    </PageContainer>
  );
}

export default Home;
