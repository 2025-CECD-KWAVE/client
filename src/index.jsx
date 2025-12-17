import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/Main/MainPage"
import NewsDetailPage from './pages/NewsDetailPage/NewsDetailPage';
import DiscoverPage from './pages/DiscoverPage/DiscoverPage';

import './index.css'
import LoginPage from './pages/Login/LoginPage';
import ShortNewsPage from './pages/ShortNewsPage/ShortNewsPage';
import ShortVideoPage from './pages/ShortVideoPage/ShortVideoPage';

import ReloadOnce from "./ReloadOnce";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/detail" element={<NewsDetailPage />} />
        <Route path="/signin" element={<LoginPage />} />
        <Route path="/discover" element={<DiscoverPage />} />

        <Route
          path="/short"
          element={
            <ReloadOnce storageKey="short">
              <ShortNewsPage />
            </ReloadOnce>
          }
        />

        <Route
          path="/video"
          element={
            <ReloadOnce storageKey="video">
              <ShortVideoPage />
            </ReloadOnce>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

