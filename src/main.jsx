import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { MouseProvider } from './contexts/MouseContext.jsx'
import { TooltipProvider } from './contexts/TooltipContext.jsx'
import { LocaleProvider } from './contexts/LocaleContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MouseProvider>
      <LocaleProvider>
        <TooltipProvider>
          <App />
        </TooltipProvider>
      </LocaleProvider>
    </MouseProvider>
  </StrictMode>,
)
