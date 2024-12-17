import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { GlobalStyles } from '@mui/material';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Blog from './pages/Blog';
import Author from './pages/Author';
import Authors from './pages/Authors';
import backgrounds from './config/backgrounds.json';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2c5530', // 青竹色
    },
    secondary: {
      main: '#88a878', // 淡青草色
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
    }
  },
  typography: {
    fontFamily: "'Noto Serif SC', serif",
    button: {
      textTransform: 'none',  // 防止按钮文字自动大写
      fontWeight: 500,
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          },
        },
      },
    },
  },
});

const globalStyles = {
  body: {
    margin: 0,
    padding: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    minHeight: '100vh',
    transition: 'background-image 0.3s ease-in-out',
    overflow: 'hidden'  // 防止body滚动
  },
  '.App': {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'  // 防止整体滚动
  },
  '.main-content': {
    flex: 1,
    position: 'relative',
    overflowY: 'auto',  // 只允许内容区域滚动
    paddingTop: '64px'  // 为导航栏留出空间
  },
  '.navbar': {
    position: 'fixed',  // 固定导航栏
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1100
  }
};

function BackgroundManager() {
  const location = useLocation();
  
  useEffect(() => {
    const path = location.pathname.split('/')[1] || 'home';
    const pageConfig = backgrounds.pages[path] || backgrounds.pages.home;
    
    document.body.style.backgroundImage = `url(${pageConfig.image})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundAttachment = 'fixed';
    document.body.style.backgroundColor = `rgba(255, 255, 255, ${pageConfig.opacity || 0.8})`;
    
    return () => {
      document.body.style.backgroundImage = '';
      document.body.style.backgroundColor = '';
    };
  }, [location]);

  return null;
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={globalStyles} />
      <Router>
        <BackgroundManager />
        <div className="App">
          <div className="navbar">
            <Navbar />
          </div>
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog/*" element={<Blog />} />
              <Route path="/authors" element={<Authors />} />
              <Route path="/author/:id" element={<Author />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
