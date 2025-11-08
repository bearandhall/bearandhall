import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Monthly from './pages/Monthly';
import MonthlyYear from './pages/MonthlyYear';
import MonthlyIssue from './pages/MonthlyIssue';
import Novels from './pages/Novels';
import NovelsArticle from './pages/NovelsArticle';
import Misc from './pages/Misc';
import MiscArticle from './pages/MiscArticle';
import Guro from './pages/Guro';
import Techme from './pages/Techme';
import Horse from './pages/Horse';
import Info from './pages/Info';
import NavIcons from './components/NavIcons';
import EdgeNav from './components/EdgeNav';



export default function App() {
  return (
    <>
 
<EdgeNav /> 
    <div className="min-h-screen lg:grid lg:grid-cols-[120px_minmax(0,1fr)]">
      {/* 좌측 세로 내비: 데스크탑에서 항상 보이도록 */}
      <aside className="hidden lg:block">
        <NavIcons />
      </aside>

      {/* 우측 컨텐츠 */}
      <main className="px-6 py-6">
        <Routes>
          {/* 홈 = 곰과회당 소개 */}
          <Route path="/" element={<Home />} />

          {/* 좌측 내비 목적지 */}
          <Route path="/guro" element={<Guro />} />
          <Route path="/techme" element={<Techme />} />
          <Route path="/horse" element={<Horse />} />
          <Route path="/info" element={<Info />} />

          {/* 본문 섹션 */}
          <Route path="/monthly" element={<Monthly />} />
          <Route path="/monthly/:year" element={<MonthlyYear />} />
          <Route path="/monthly/:year/:issue" element={<MonthlyIssue />} />
          <Route path="/novels" element={<Novels />} />
          <Route path="/novels/:slug" element={<NovelsArticle />} />
          <Route path="/misc" element={<Misc />} />
          <Route path="/misc/:slug" element={<MiscArticle />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
    </>
  );
}
