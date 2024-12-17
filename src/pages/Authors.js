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
import { PageContainer, FadeIn } from '../components/Common';  // 修改导入路径
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import LanguageIcon from '@mui/icons-material/Language';

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
        p: 2.5, // 减少内边距
        height: '200px', // 固定高度
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
      <Stack 
        direction="row" // 改为水平布局
        spacing={2.5}
        height="100%"
      >
        <Avatar
          src={author.avatar}
          alt={author.name}
          sx={{ 
            width: 80, // 减小头像尺寸
            height: 80,
            border: '3px solid rgba(44, 85, 48, 0.1)'
          }}
        />
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" color="#2c5530" fontWeight="500" gutterBottom>
            {author.name}
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ 
              flex: 1,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {author.bio}
          </Typography>
          <Stack direction="row" spacing={1} justifyContent="flex-start" sx={{ mt: 1 }}>
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
        </Box>
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
    <PageContainer 
      maxWidth="lg"
      sx={{ height: 'calc(100% - 48px)' }} // 为 Authors 页面特别增加边距
    >
      <Typography 
        variant="h4" 
        gutterBottom 
        color="#2c5530" 
        align="center" 
        sx={{ mb: 4, fontWeight: 500 }}
      >
        青萍作者
      </Typography>
      <Grid container spacing={3}>
        {authors.map((author) => (
          <Grid item xs={12} md={6} lg={4} key={author.id}>
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
