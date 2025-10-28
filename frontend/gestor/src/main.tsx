import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { CategoryProvider } from './context/CategoryContext.tsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <CategoryProvider>
        <App />
      </CategoryProvider>
    </QueryClientProvider>
  </StrictMode>,
)
