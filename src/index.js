import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider,PostsProvider } from './providers';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <PostsProvider>
      <ToastContainer autoClose={5000} position='top-right'/>
        <App />
      </PostsProvider>
   
    </AuthProvider>
    
   
  </React.StrictMode>
);

