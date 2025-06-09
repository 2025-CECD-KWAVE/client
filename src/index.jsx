import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/Main/MainPage"
import NewsDetailPage from './pages/NewsDetailPage/NewsDetailPage';

import './index.css'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage></MainPage>} />
        <Route path='/detail' element={<NewsDetailPage></NewsDetailPage>} />
      </Routes>
    </BrowserRouter>

  </StrictMode>,
)
