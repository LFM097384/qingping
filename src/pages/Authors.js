import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Avatar,
  Typography,
  Paper,
  Box,
  IconButton,
  Stack
} from '@mui/material';
import PageContainer from '../components/PageContainer';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import LanguageIcon from '@mui/icons-material/Language';
import FadeIn from '../components/FadeIn';

function AuthorCard({ author }) {
  const navigate = useNavigate();

  const handleSocialClick = (e, url) => {
    e.stopPropagation();  // 防止触发卡片点击
    window.open(url, '_blank');
  };
  
  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        height: '100%',  // 确保卡片等高
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
        }
      }}
      onClick={() => navigate(`/author/${author.id}`)}
    >
      <Stack alignItems="center" spacing={2} height="100%">
        <Avatar
          src={author.avatar}
          alt={author.name}
          sx={{ 
            width: 100, 
            height: 100,
            border: '3px solid rgba(44, 85, 48, 0.1)'
          }}
        />
        <Typography variant="h6" color="#2c5530" fontWeight="500">
          {author.name}
        </Typography>
        <Typography 
          variant="body2" 
          color="text.secondary" 
          textAlign="center"
          sx={{ 
            flexGrow: 1,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {author.bio}
        </Typography>
        <Stack direction="row" spacing={1} justifyContent="center">
          {author.links.github && (
            <IconButton 
              size="small"
              onClick={(e) => handleSocialClick(e, author.links.github)}
              sx={{ 
                color: '#2c5530',
                '&:hover': { color: '#588157', backgroundColor: 'rgba(44, 85, 48, 0.1)' }
              }}
            >
              <GitHubIcon />
            </IconButton>
          )}
          {author.links.twitter && (
            <IconButton 
              size="small"
              onClick={(e) => handleSocialClick(e, author.links.twitter)}
              sx={{ 
                color: '#2c5530',
                '&:hover': { color: '#588157', backgroundColor: 'rgba(44, 85, 48, 0.1)' }
              }}
            >
              <TwitterIcon />
            </IconButton>
          )}
          {author.links.website && (
            <IconButton 
              size="small"
              onClick={(e) => handleSocialClick(e, author.links.website)}
              sx={{ 
                color: '#2c5530',
                '&:hover': { color: '#588157', backgroundColor: 'rgba(44, 85, 48, 0.1)' }
              }}
            >
              <LanguageIcon />
            </IconButton>
          )}
        </Stack>
      </Stack>
    </Paper>
  );
}

function Authors() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/content/authors.json')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch authors');
        }
        return res.json();
      })
      .then(data => {
        console.log('Loaded authors:', data.authors); // 调试日志
        setAuthors(data.authors);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading authors:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <PageContainer>
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <Typography>加载中...</Typography>
        </Box>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <Typography color="error">加载失败: {error}</Typography>
        </Box>
      </PageContainer>
    );
  }

  if (!authors.length) {
    return (
      <PageContainer>
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <Typography>暂无作者信息</Typography>
        </Box>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Typography 
        variant="h4" 
        gutterBottom 
        color="#2c5530" 
        align="center" 
        sx={{ mb: 4, fontWeight: 500 }}
      >
        作者列表
      </Typography>
      <Grid container spacing={3}>
        {authors.map((author) => (
          <Grid item xs={12} sm={6} md={4} key={author.id}>
            <FadeIn>
              <AuthorCard author={author} />
            </FadeIn>
          </Grid>
        ))}
      </Grid>
    </PageContainer>
  );
}

export default Authors;
