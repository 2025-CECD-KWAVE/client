import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/Main/MainPage"
import NewsDetailPage from './pages/NewsDetailPage/NewsDetailPage';
import DiscoverPage from './pages/DiscoverPage/DiscoverPage';

import './index.css'
import LoginPage from './pages/Login/LoginPage';
import ShortNewsPage from './pages/ShortNewsPage/ShortNewsPage';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage></MainPage>} />
        <Route path='/detail' element={<NewsDetailPage></NewsDetailPage>} />
        <Route path='/signin' element={<LoginPage></LoginPage>} />
        <Route path='/discover' element={<DiscoverPage></DiscoverPage>} />
        <Route path='/short' element={<ShortNewsPage></ShortNewsPage>} />
      </Routes>
    </BrowserRouter>

  </StrictMode>,
)
