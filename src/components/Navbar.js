import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  // 判断当前路径以高亮显示对应按钮
  const isActive = (path) => location.pathname === path;

  return (
    <Box sx={{ flexGrow: 1, mb: 2 }}>
      <AppBar position="static" sx={{ 
        backgroundColor: 'rgba(44, 85, 48, 0.8)', 
        backdropFilter: 'blur(10px)',
        boxShadow: 2
      }}>
        <Toolbar>
          <HomeIcon 
            sx={{ 
              mr: 2, 
              cursor: 'pointer',
              '&:hover': { opacity: 0.8 }
            }} 
            onClick={() => navigate('/')}
          />
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              flexGrow: 1,
              fontFamily: "'Noto Serif SC', serif",
              fontWeight: 500,
              color: 'white',
              cursor: 'pointer',
              '&:hover': { opacity: 0.8 }
            }}
            onClick={() => navigate('/')}
          >
            青萍之末
          </Typography>
          <Button 
            color="inherit" 
            onClick={() => navigate('/')}
            sx={{ 
              color: 'white', 
              fontFamily: "'Noto Serif SC', serif",
              backgroundColor: isActive('/') ? 'rgba(255, 255, 255, 0.1)' : 'transparent'
            }}
          >
            首页
          </Button>
          <Button 
            color="inherit" 
            onClick={() => navigate('/blog')}
            sx={{ 
              color: 'white', 
              fontFamily: "'Noto Serif SC', serif",
              backgroundColor: isActive('/blog') ? 'rgba(255, 255, 255, 0.1)' : 'transparent'
            }}
          >
            博客
          </Button>
          <Button 
            color="inherit" 
            onClick={() => navigate('/authors')}  // 改为作者列表页面
            sx={{ 
              color: 'white', 
              fontFamily: "'Noto Serif SC', serif",
              backgroundColor: location.pathname.startsWith('/author') ? 'rgba(255, 255, 255, 0.1)' : 'transparent'
            }}
          >
            作者
          </Button>
          <Button 
            color="inherit" 
            onClick={() => navigate('/about')}
            sx={{ 
              color: 'white', 
              fontFamily: "'Noto Serif SC', serif",
              backgroundColor: isActive('/about') ? 'rgba(255, 255, 255, 0.1)' : 'transparent'
            }}
          >
            关于
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
