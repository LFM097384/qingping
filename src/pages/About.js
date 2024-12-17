import React from 'react';
import Typography from '@mui/material/Typography';
import { PageContainer, FadeIn } from '../components/Common';

function About() {
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
          关于我们
        </Typography>
        <Typography 
          variant="body1"
          sx={{ 
            fontFamily: "'Noto Serif SC', serif",
            color: '#333'
          }}
        >
          《风赋》曰：风生于地，起于青蘋之末。侵淫溪谷，盛怒于土囊之口。
        </Typography>
      </FadeIn>
    </PageContainer>
  );
}

export default About;
