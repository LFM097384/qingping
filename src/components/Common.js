import React from 'react';
import { Container, Paper, Box } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1]
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.98,
    transition: {
      duration: 0.3
    }
  }
};

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  },
  exit: {
    opacity: 0,
    transition: {
      when: "afterChildren"
    }
  }
};

export function PageContainer({ children, maxWidth = 'md', sx = {} }) {
  const location = useLocation();
  
  return (
    <Container 
      maxWidth={maxWidth} 
      sx={{ 
        height: 'calc(100% - 32px)', // 增加上下边距
        display: 'flex',
        flexDirection: 'column',
        py: 2,
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        ...sx
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          style={{ 
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            position: 'relative'
          }}
        >
          <Paper
            elevation={3}
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              borderRadius: 2,
              overflow: 'hidden'
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                overflowY: 'auto',
                overflowX: 'hidden',
                p: 3,
                '&::-webkit-scrollbar': {
                  width: '6px',
                },
                '&::-webkit-scrollbar-track': {
                  backgroundColor: 'rgba(0,0,0,0.05)',
                  borderRadius: '3px',
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: 'rgba(44, 85, 48, 0.3)',
                  borderRadius: '3px',
                  '&:hover': {
                    backgroundColor: 'rgba(44, 85, 48, 0.5)',
                  },
                }
              }}
            >
              <motion.div
                variants={containerVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                {children}
              </motion.div>
            </Box>
          </Paper>
        </motion.div>
      </AnimatePresence>
    </Container>
  );
}

export function FadeIn({ children, delay = 0, duration = 0.5 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.4, 0, 0.2, 1]
      }}
    >
      {children}
    </motion.div>
  );
}
