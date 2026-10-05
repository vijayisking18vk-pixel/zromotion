import React from 'react';
import { renderToString } from 'react-dom/server';
import { motion } from 'framer-motion';

const isClient = typeof window !== 'undefined';

const Test5 = () => (
  React.createElement(motion.div, { 
    initial: isClient ? { opacity: 0, y: 20 } : false, 
    animate: { opacity: 1, y: 0 } 
  }, 'Hello World')
);

console.log('Test5 (SSR isClient=false):', renderToString(React.createElement(Test5)));
