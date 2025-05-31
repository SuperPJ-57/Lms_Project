import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './routes/App.tsx'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify'
import { AuthProvider } from './context/AuthContext';
// import { setFavicon } from './services/favicon.service';
// import faviconUrl from './assets/favicon-icon.svg?url';

//setFavicon({ href: faviconUrl });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>

    <App />
  </AuthProvider>
    <ToastContainer />
  </StrictMode>,
)
