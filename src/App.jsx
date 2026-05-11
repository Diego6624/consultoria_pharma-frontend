import './App.css'
import { Outlet } from 'react-router-dom'
import HeaderComponent from './components/HeaderComponent'
import FooterComponent from './components/FooterComponent'

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
