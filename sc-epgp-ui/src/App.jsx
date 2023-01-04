import NavBar from './components/Layout/NavBar';
import Footer from './components/Layout/Footer';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

// Pages
import Home from './pages/home/Home';
import PlayerPage from './pages/playerpage/PlayerPage';
import DataUpload from './pages/dataupload/DataUpload';

function App() {
  return (
    <BrowserRouter>
      <div className='flex flex-col items-center min-h-screen min-w-screen bg-gradient-to-t from-bgGr1 to-bgGr2'>
        <NavBar className='grow-0' />
        <div className='flex flex-col flex-grow max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-8 text-text'>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/characters/:region/:realm/:playerName' element={<PlayerPage />}></Route>
            <Route path='/sc/admin/upload' element={<DataUpload />}></Route>
            <Route path='*' element={<Navigate to='/' />}></Route>
          </Routes>
        </div>
        <Footer className='grow-0' />
      </div>
    </BrowserRouter>
  );
}

export default App;
