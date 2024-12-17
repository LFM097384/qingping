import React from 'react';
import Typography from '@mui/material/Typography';
import { PageContainer, FadeIn } from '../components/Common';

function Home() {
  return (
    <PageContainer maxWidth="sm">
      <FadeIn>
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
          易曰，云从龙，风从虎，
          风起于青萍之末。
        </Typography>
      </FadeIn>
    </PageContainer>
  );
}

export default Home;
