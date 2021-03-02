import React from 'react';
import { ToastProvider } from './toast';
import { QuestionProvider } from './quiz';

const AppProvider: React.FC = ({ children }) => {
  return (
    <ToastProvider>
      <QuestionProvider>{children}</QuestionProvider>
    </ToastProvider>
  );
};

export default AppProvider;
