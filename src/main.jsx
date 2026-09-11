import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { MouseProvider } from './contexts/MouseContext.jsx'
import { LocaleProvider } from './contexts/LocaleContext.jsx'
import { WindowProvider } from './contexts/WindowContext.jsx'
import { TooltipProvider } from './contexts/TooltipContext.jsx'
import { InventoryProvider } from './contexts/InventoryContext.jsx'

import { UpgradeProvider } from './contexts/UpgradeContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MouseProvider>
      <LocaleProvider>
        <WindowProvider>
          <InventoryProvider>
            <TooltipProvider>
              <UpgradeProvider>
                <App />
              </UpgradeProvider>
            </TooltipProvider>
          </InventoryProvider>
        </WindowProvider>
      </LocaleProvider>
    </MouseProvider>
  </StrictMode>,
)
