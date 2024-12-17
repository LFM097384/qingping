import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useParams, Link, useLocation } from 'react-router-dom';
import {
  Grid,
  TextField,
  List,
  ListItem,
  ListItemText,
  Typography,
  InputAdornment,
  Chip,
  Stack,
  Box,
  IconButton,
  Avatar
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PageContainer from '../components/PageContainer';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FadeIn } from '../components/Common';
import { motion } from 'framer-motion';

const postListVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const postItemVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut'
    }
  }
};

function BlogList({ searchTerm }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/content/blogs/index.json')
      .then(response => response.json())
      .then(data => {
        setPosts(data.posts);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading blog index:', error);
        setLoading(false);
      });
  }, []);

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <Typography>加载中...</Typography>
      </Box>
    );
  }

  return (
    <FadeIn>
      <motion.div
        variants={postListVariants}
        initial="initial"
        animate="animate"
      >
        <List>
          {filteredPosts.map((post) => (
            <motion.div
              key={post.id}
              variants={postItemVariants}
            >
              <ListItem 
                button
                onClick={() => navigate(`/blog/post/${post.id}`)}
                sx={{
                  mb: 2,
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 1,
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateX(8px)',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                  }
                }}
              >
                <ListItemText
                  primary={
                    <>
                      <Typography variant="h6" sx={{ color: '#2c5530', fontWeight: 500 }}>
                        {post.title}
                      </Typography>
                      <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 1 }}>
                        <Link 
                          to={`/author/${post.authorId}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/author/${post.authorId}`);
                          }}
                          style={{ textDecoration: 'none' }}
                        >
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Avatar
                              src={post.authorAvatar}
                              alt={post.authorName}
                              sx={{ width: 24, height: 24 }}
                            />
                            <Typography sx={{ color: '#2c5530' }}>
                              {post.authorName}
                            </Typography>
                          </Stack>
                        </Link>
                        <Typography variant="body2" sx={{ color: '#666666' }}>
                          {post.date}
                        </Typography>
                      </Stack>
                      <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                        {post.tags.map((tag, index) => (
                          <Chip 
                            key={index} 
                            label={tag} 
                            size="small" 
                            sx={{ 
                              backgroundColor: 'rgba(44, 85, 48, 0.1)',
                              color: '#2c5530',
                              fontWeight: 500
                            }}
                          />
                        ))}
                      </Stack>
                    </>
                  }
                  secondary={
                    <Typography variant="body1" sx={{ mt: 1, color: '#333333' }}>
                      {post.summary}
                    </Typography>
                  }
                />
              </ListItem>
            </motion.div>
          ))}
        </List>
      </motion.div>
    </FadeIn>
  );
}

function BlogPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  const processMarkdown = (content) => {
    // 使用正则表达式匹配第一个标题及其后的换行
    const lines = content.split('\n');
    let skipFirstTitle = false;
    const processedLines = lines.filter(line => {
      if (!skipFirstTitle && line.trim().startsWith('# ')) {
        skipFirstTitle = true;
        return false;
      }
      return true;
    });
    return processedLines.join('\n');
  };

  useEffect(() => {
    fetch('/content/blogs/index.json')
      .then(response => response.json())
      .then(data => {
        const foundPost = data.posts.find(p => p.id === id);
        if (foundPost) {
          setPost(foundPost);
          return fetch(`/content/blogs/${foundPost.fileName}`);
        }
        throw new Error('Post not found');
      })
      .then(response => response.text())
      .then(text => {
        const processedContent = processMarkdown(text);
        console.log('Processed content:', processedContent); // 添加调试日志
        setContent(processedContent);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading blog post:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <Typography>加载中...</Typography>
      </Box>
    );
  }

  if (!post) {
    return <Typography>文章未找到</Typography>;
  }

  return (
    <FadeIn>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <Box sx={{ mt: 4 }}>
          <IconButton 
            onClick={() => navigate('/blog')}
            sx={{ 
              position: 'absolute',
              left: 16,
              top: 16,
              color: '#2c5530',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              '&:hover': {
                backgroundColor: 'rgba(44, 85, 48, 0.1)'
              }
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Box sx={{ pt: 4 }}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Typography variant="h4" gutterBottom sx={{ color: '#2c5530', mb: 3, fontWeight: 500 }}>
                {post.title}
              </Typography>
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
                <Link 
                  to={`/author/${post.authorId}`}
                  style={{ textDecoration: 'none' }}
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Avatar
                      src={post.authorAvatar}
                      alt={post.authorName}
                      sx={{ 
                        width: 40, 
                        height: 40,
                        border: '2px solid rgba(44, 85, 48, 0.1)'
                      }}
                    />
                    <Typography sx={{ color: '#2c5530', fontWeight: 500 }}>
                      {post.authorName}
                    </Typography>
                  </Stack>
                </Link>
                <Typography variant="body2" sx={{ color: '#666666' }}>
                  {post.date}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                {post.tags.map((tag, index) => (
                  <Chip 
                    key={index} 
                    label={tag} 
                    size="small" 
                    sx={{ 
                      backgroundColor: 'rgba(44, 85, 48, 0.1)',
                      color: '#2c5530',
                      fontWeight: 500
                    }}
                  />
                ))}
              </Stack>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Box sx={{ 
                '& img': { maxWidth: '100%' },
                '& a': { color: '#2c5530' },
                '& p': { 
                  color: '#333333',
                  fontSize: '1.1rem',
                  lineHeight: 1.8
                },
                '& h1, & h2, & h3, & h4, & h5, & h6': {
                  color: '#2c5530',
                  fontWeight: 500
                }
              }}>
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  components={{
                    // Remove h1 from components to avoid rendering any h1 tags
                    h2: props => <Typography variant="h5" {...props} gutterBottom sx={{ color: '#2c5530', mt: 3 }} />,
                    h3: props => <Typography variant="h6" {...props} gutterBottom sx={{ color: '#2c5530', mt: 2 }} />,
                    p: props => <Typography variant="body1" {...props} paragraph sx={{ color: '#333333' }} />,
                    a: props => <Link {...props} color="inherit" sx={{ color: '#2c5530' }} />,
                  }}
                >
                  {content}
                </ReactMarkdown>
              </Box>
            </motion.div>
          </Box>
        </Box>
      </motion.div>
    </FadeIn>
  );
}

function Blog() {
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const isPostPage = location.pathname.includes('/post/');

  return (
    <PageContainer maxWidth={isPostPage ? 'md' : 'lg'}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Grid container spacing={3}>
          {!isPostPage && (
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="搜索文章..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 1,
                  '& .MuiInputBase-input': {
                    color: '#333333',
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'rgba(44, 85, 48, 0.3)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(44, 85, 48, 0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#2c5530',
                    },
                  },
                  '& .MuiInputAdornment-root .MuiSvgIcon-root': {
                    color: '#2c5530',
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <Routes>
              <Route index element={<BlogList searchTerm={searchTerm} />} />
              <Route path="post/:id" element={<BlogPost />} />
            </Routes>
          </Grid>
        </Grid>
      </motion.div>
    </PageContainer>
  );
}

export default Blog;
