import './App.css'
import { Outlet } from 'react-router-dom'
import HeaderComponent from './pages/public/components/HeaderComponent'
import FooterComponent from './pages/public/components/FooterComponent'
import { useScrollToTop } from './hooks/useScrollToTop'
import { useLocation } from 'react-router-dom'
import SeoHead from './components/SeoHead'
import { getPageMetadata } from './lib/seoMetadata'

function App() {
  useScrollToTop();
  const location = useLocation();
  const metadata = getPageMetadata(location.pathname);
  return (<>
    <SeoHead {...metadata} />
    <div className='flex flex-col min-h-dvh'>
      <HeaderComponent />
      <main>
        <Outlet />
      </main>
      <FooterComponent/>
    </div>
  </>)
}

export default App
