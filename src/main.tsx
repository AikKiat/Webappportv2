import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MainPage from './pages/main_page/MainPage'
import "./styles/media_queries/media_queries_info_section.css";
import "./styles/media_queries/media_queries_projects_section.css";
import "./styles/media_queries/media_queries_info_pic.css";
import "./styles/media_queries/media_queries_skills_section.css";
import "./styles/media_queries/media_queries_intro_section.css";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MainPage/>
  </StrictMode>,
)
