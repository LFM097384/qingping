import React from 'react';
import Typography from '@mui/material/Typography';
import PageContainer from '../components/PageContainer';

function About() {
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
        关于我们
      </Typography>
      <Typography 
        variant="body1"
        sx={{ 
          fontFamily: "'Noto Serif SC', serif",
          color: '#333'
        }}
      >
        青萍之末，取意于《庄子·秋水》："青萍之末，风之余也。"
        表达了对生活细微之处的感悟与思考。
      </Typography>
    </PageContainer>
  );
}

export default About;
