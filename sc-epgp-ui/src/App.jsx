import NavBar from './components/Layout/NavBar';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

// Pages
import Home from './pages/home/Home';
import PlayerPage from './pages/playerpage/PlayerPage';

function App() {
  return (
    <BrowserRouter>
      <div className='min-h-screen min-w-screen bg-gradient-to-t from-bgGr1 to-bgGr2'>
        <NavBar />
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 text-text h-full'>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/characters/:region/:realm/:playerName' element={<PlayerPage />}></Route>
            <Route path='*' element={<Navigate to='/' />}></Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
