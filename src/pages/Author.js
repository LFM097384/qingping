import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Avatar,
  Box,
  Typography,
  IconButton,
  Stack,
  Link as MuiLink,
  Grid,
  Paper
} from '@mui/material';
import { PageContainer, FadeIn } from '../components/Common';  // 修改导入路径
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import LanguageIcon from '@mui/icons-material/Language';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SchoolIcon from '@mui/icons-material/School';  // 为 ORCID 添加图标
import ArticleIcon from '@mui/icons-material/Article';  // 为出版物添加图标

const SocialLink = ({ icon, url, label }) => {
  if (!url) return null;
  return (
    <IconButton
      component="a"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      sx={{ 
        color: '#2c5530',
        '&:hover': { color: '#588157' }
      }}
    >
      {icon}
    </IconButton>
  );
};

function PublicationsList({ publications }) {
  if (!publications?.length) return null;

  return (
    <Box sx={{ mt: 6 }}>
      <Typography variant="h5" gutterBottom color="#2c5530" sx={{ mb: 3 }}>
        <ArticleIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
        出版物
      </Typography>
      <Grid container spacing={2}>
        {publications.map((pub, index) => (
          <Grid item xs={12} key={index}>
            <Paper
              sx={{
                p: 2,
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 3
                }
              }}
              onClick={() => window.open(`https://doi.org/${pub.doi}`, '_blank')}
            >
              <Typography variant="h6" sx={{ color: '#2c5530', fontSize: '1.1rem' }}>
                {pub.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {pub.authors}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, color: '#666' }}>
                {pub.journal} ({pub.year})
              </Typography>
              <Typography variant="body2" color="primary" sx={{ mt: 1 }}>
                DOI: {pub.doi}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

function Author() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [author, setAuthor] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/content/authors.json').then(res => res.json()),
      fetch('/content/blogs/index.json').then(res => res.json())
    ])
      .then(([authorsData, blogsData]) => {
        const foundAuthor = authorsData.authors.find(a => a.id === id);
        const authorPosts = blogsData.posts.filter(post => post.authorId === id);
        setAuthor(foundAuthor);
        setPosts(authorPosts);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading data:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <PageContainer>
        <Typography align="center">加载中...</Typography>
      </PageContainer>
    );
  }

  if (!author) {
    return (
      <PageContainer>
        <Typography align="center" color="error">作者未找到</Typography>
      </PageContainer>
    );
  }

  return (
    <PageContainer maxWidth="md">
      <Box sx={{ position: 'relative', pb: 4 }}>
        <IconButton
          onClick={() => navigate('/authors')}
          sx={{
            position: 'absolute',
            left: 20,
            top: 20,
            color: '#2c5530',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            '&:hover': { backgroundColor: 'rgba(44, 85, 48, 0.1)' }
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        
        <FadeIn>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Avatar
              src={author.avatar}
              alt={author.name}
              sx={{
                width: 150,
                height: 150,
                margin: '0 auto',
                mb: 3,
                border: '4px solid rgba(44, 85, 48, 0.1)'
              }}
            />
            <Typography variant="h3" gutterBottom color="#2c5530" sx={{ fontWeight: 500 }}>
              {author.name}
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, color: '#666666', maxWidth: '600px', mx: 'auto' }}>
              {author.bio}
            </Typography>
            <Stack direction="row" spacing={2} justifyContent="center">
              <SocialLink icon={<GitHubIcon />} url={author.links.github} label="GitHub" />
              <SocialLink icon={<TwitterIcon />} url={author.links.twitter} label="Twitter" />
              <SocialLink icon={<LanguageIcon />} url={author.links.website} label="Website" />
              <SocialLink 
                icon={<SchoolIcon />} 
                url={author.links.orcid} 
                label="ORCID"
              />
            </Stack>
          </Box>

          <PublicationsList publications={author.publications} />

          {posts.length > 0 && (
            <Box sx={{ mt: 6 }}>
              <Typography variant="h5" gutterBottom color="#2c5530" sx={{ mb: 3 }}>
                最近的文章
              </Typography>
              <Grid container spacing={3}>
                {posts.map(post => (
                  <Grid item xs={12} key={post.id}>
                    <Paper
                      sx={{
                        p: 3,
                        cursor: 'pointer',
                        transition: 'transform 0.2s',
                        '&:hover': { transform: 'translateX(8px)' }
                      }}
                      onClick={() => navigate(`/blog/post/${post.id}`)}
                    >
                      <Typography variant="h6" color="#2c5530">{post.title}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {post.date}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </FadeIn>
      </Box>
    </PageContainer>
  );
}

export default Author;
