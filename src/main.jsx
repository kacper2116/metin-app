import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { MouseProvider } from './contexts/MouseContext.jsx'
import { TooltipProvider } from './contexts/TooltipContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MouseProvider>
      <TooltipProvider>
        <App />
      </TooltipProvider>
    </MouseProvider>
  </StrictMode>,
)
