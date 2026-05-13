import './App.css'
import { Outlet } from 'react-router-dom'
import HeaderComponent from './pages/public/components/HeaderComponent'
import FooterComponent from './pages/public/components/FooterComponent'

function App() {


  return (<>
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
