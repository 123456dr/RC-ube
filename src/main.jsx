import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/index.css'
//import App from './App.jsx'
import RCube from './pages/RCube'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div style={{width: '100vw', height: '100vh' }}>
      <RCube/>
    </div>
  </StrictMode>,
)
